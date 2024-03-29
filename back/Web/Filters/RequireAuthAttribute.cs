﻿using FileServe.Api.Abstractions.Interfaces.Services;
using FileServe.Api.Web.Utils;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;
using Microsoft.OpenApi.Models;
using Swashbuckle.AspNetCore.SwaggerGen;

namespace FileServe.Api.Web.Filters;

[AttributeUsage(AttributeTargets.Class | AttributeTargets.Method)]
public class RequireAuthAttribute : ActionFilterAttribute
{
    public const string AuthenticationTokenField = "authentication-token";


    public override async Task OnActionExecutionAsync(ActionExecutingContext context, ActionExecutionDelegate next)
    {
        var authenticationService = context.HttpContext.RequestServices.GetService<IAuthenticationService>();

        if (authenticationService == default)
        {
            context.Result = new StatusCodeResult(500);
            throw new Exception("Dependency injection error, Authentication Service is not available");
        }

        var cookie = context.HttpContext.Request.GetToken(ParameterLocation.Cookie);
        var header = context.HttpContext.Request.GetToken(ParameterLocation.Header);

        var token = cookie ?? header;

        if (token == default)
        {
            context.Result = new UnauthorizedObjectResult("Token not found");
            return;
        }


        if (!await authenticationService.IsLogged(token))
        {
            context.Result = new ForbidResult();
            return;
        }

        var username = await authenticationService.GetUsername(token);
        context.HttpContext.Request.Headers[AuthUtility.UsernameField] = username;
        context.HttpContext.Request.Headers[AuthUtility.TokenField] = token;
        await next();
    }


    public class Swagger : IOperationFilter
    {
        public void Apply(OpenApiOperation operation, OperationFilterContext context)
        {
            context.ApiDescription.TryGetMethodInfo(out var info);

            // Get method attributes
            var attributes = context.MethodInfo.CustomAttributes.ToList();

            // Add class' attributes
            if (info.DeclaringType != null)
            {
                attributes.AddRange(info.DeclaringType.CustomAttributes);
            }

            if (attributes.All(attribute => attribute.AttributeType != typeof(RequireAuthAttribute)))
            {
                return;
            }

            operation.Parameters ??= new List<OpenApiParameter>();

            operation.Parameters.Add(new OpenApiParameter
                {
                    Name = AuthenticationTokenField,
                    In = ParameterLocation.Header,
                    Required = false,
                    AllowEmptyValue = true,
                    Description = "Authentication Token",
                    Schema = new OpenApiSchema
                    {
                        Type = "string"
                    }
                }
            );

            operation.Parameters.Add(new OpenApiParameter
                {
                    Name = AuthenticationTokenField,
                    In = ParameterLocation.Cookie,
                    Required = false,
                    AllowEmptyValue = true,
                    Description = "Authentication Token",
                    Schema = new OpenApiSchema
                    {
                        Type = "string"
                    }
                }
            );

            operation.Responses.Add("401", new OpenApiResponse {Description = "Unauthorized"});
            operation.Responses.Add("403", new OpenApiResponse {Description = "Forbidden"});
        }
    }
}

internal static class RequestExtension
{
    public static string? GetToken(this HttpRequest request, ParameterLocation source)
    {
        return source switch
        {
            ParameterLocation.Cookie => request.Cookies[RequireAuthAttribute.AuthenticationTokenField],
            ParameterLocation.Header => request.Headers[RequireAuthAttribute.AuthenticationTokenField].FirstOrDefault(),
            _ => null
        };
    }
}