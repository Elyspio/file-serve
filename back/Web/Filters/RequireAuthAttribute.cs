﻿using Core.Interfaces.Services;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;
using Microsoft.OpenApi.Models;
using Swashbuckle.AspNetCore.SwaggerGen;
using Web.Utils;

namespace Web.Filters;

[AttributeUsage(AttributeTargets.Class | AttributeTargets.Method)]
public class RequireAuthAttribute : ActionFilterAttribute
{
    private const string AuthenticationTokenField = "authentication-token";


    public override async Task OnActionExecutionAsync(
        ActionExecutingContext context,
        ActionExecutionDelegate next)
    {
        var authenticationService = context.HttpContext.RequestServices.GetService<IAuthenticationService>();

        if (authenticationService == default)
        {
            context.Result = new StatusCodeResult(500);
            throw new Exception("Dependency injection error, Authentication Service is not available");
        }

        var cookie = context.HttpContext.Request.Cookies[AuthenticationTokenField];
        var header = context.HttpContext.Request.Headers[AuthenticationTokenField].FirstOrDefault();

        var token = cookie ?? header;

        if (token == default)
        {
            context.Result = new UnauthorizedResult();
            throw new Exception("Token not found");
        }


        if (!await authenticationService.IsLogged(token))
        {
            context.Result = new ForbidResult();
            throw new Exception("You are not authorized for this service");
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
            if (info.DeclaringType != null) attributes.AddRange(info.DeclaringType.CustomAttributes);

            if (attributes.All(attribute => attribute.AttributeType != typeof(RequireAuthAttribute))) return;

            operation.Parameters ??= new List<OpenApiParameter>();

            operation.Parameters.Add(new OpenApiParameter
            {
                Name = AuthenticationTokenField,
                In = ParameterLocation.Header,
                Required = false
            });

            operation.Parameters.Add(new OpenApiParameter
            {
                Name = AuthenticationTokenField,
                In = ParameterLocation.Cookie,
                Required = false,
            });

            operation.Responses.Add("401", new OpenApiResponse { Description = "Unauthorized" });
            operation.Responses.Add("403", new OpenApiResponse { Description = "Forbidden" });
        }
    }
}