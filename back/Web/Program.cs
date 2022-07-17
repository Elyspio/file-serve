using System.Net;
using FileServe.Api.Abstractions.Common.Helpers;
using FileServe.Api.Abstractions.Interfaces.Injections;
using FileServe.Api.Adapters.Injections;
using FileServe.Api.Core.Injections;
using FileServe.Api.Db.Injections;
using FileServe.Api.Web.Filters;
using FileServe.Api.Web.Utils;
using Microsoft.AspNetCore.Mvc.Formatters;
using Microsoft.Extensions.Logging.Console;
using Microsoft.OpenApi.Models;
using Newtonsoft.Json.Converters;

var frontPath = Env.Get("FRONT_PATH", "/front");
const string appPath = "/files";
AppContext.SetSwitch("Switch.Microsoft.AspNetCore.Mvc.EnableRangeProcessing", true);

WebApplicationBuilder UseBuilder()
{
    var builder = WebApplication.CreateBuilder(args);


    builder.Configuration.AddJsonFile("appsettings.docker.json", true, true);

    builder.WebHost.ConfigureKestrel((_, options) => {
            options.Listen(IPAddress.Any, 4003, _ => { });
            options.Limits.MaxRequestBodySize = long.MaxValue;
        }
    );

    // Setup Logging
    builder.Logging.ClearProviders();
    builder.Logging.AddSimpleConsole(o => {
            o.ColorBehavior = LoggerColorBehavior.Enabled;
            o.SingleLine = true;
        }
    );

    // Setup CORS
    builder.Services.AddCors(options => {
            options.AddPolicy("Cors", b => {
                    b.AllowCredentials();
                    b.SetIsOriginAllowed(origin => origin.Contains("localhost"));
                    b.AllowAnyHeader();
                    b.AllowAnyMethod();
                }
            );
        }
    );


    // Inject Subprojects
    builder.Services.AddModule<AdapterModule>(builder.Configuration);
    builder.Services.AddModule<CoreModule>(builder.Configuration);
    builder.Services.AddModule<DatabaseModule>(builder.Configuration);

    // Convert Enum to String 
    builder.Services.AddControllers(o => {
                o.Conventions.Add(new ControllerDocumentationConvention());
                o.OutputFormatters.RemoveType<StringOutputFormatter>();
            }
        )
        .AddNewtonsoftJson(x => x.SerializerSettings.Converters.Add(new StringEnumConverter()));

    // Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
    builder.Services.AddEndpointsApiExplorer();
    builder.Services.AddSwaggerGen(c => {
            if (builder.Environment.IsProduction())
            {
                c.AddServer(new OpenApiServer {Url = appPath});
            }

            c.CustomOperationIds(e => $"{e.ActionDescriptor.RouteValues["action"]}");
            // c.CustomSchemaIds(type => type.ToString());
            c.OperationFilter<RequireAuthAttribute.Swagger>();
        }
    );


    // Setup SPA Serving
    if (builder.Environment.IsProduction())
    {
        Console.WriteLine($"Server in production, serving SPA from {frontPath} folder");
    }

    // builder.Services.AddSpaStaticFiles(configuration => { configuration.RootPath = frontPath; });


    return builder;
}

var builder = UseBuilder();


var app = builder.Build();

void UseApp(WebApplication application)
{
    application.UseSwagger();
    application.UseSwaggerUI();

    // Start Dependency Injection
    application.UseAdvancedDependencyInjection();

    // Allow CORS
    application.UseCors("Cors");

    // Setup Controllers
    application.MapControllers();

    // Start SPA serving
    if (application.Environment.IsProduction())
    {
        //app.UseSpa(spa =>
        //{
        //    spa.Options.SourcePath = frontPath;

        //});
        application.UseDefaultFiles(new DefaultFilesOptions {DefaultFileNames = new List<string> {"index.html"}});
        application.UseStaticFiles();
    }


    // Start the application
    application.Run();
}

UseApp(app);