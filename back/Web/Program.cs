using System.Net;
using System.Text.Json.Serialization;
using Adapters.Authentication;
using Core.Utils;
using Microsoft.AspNetCore.Mvc.Formatters;
using Serilog;
using Serilog.Events;
using Serilog.Sinks.SystemConsole.Themes;
using Web.Filters;
using Web.Utils;

var frontPath = Env.Get<string>("FRONT_PATH") ?? "/front";

var useBuilder = () =>
{
    var builder = WebApplication.CreateBuilder(args);
    builder.WebHost.ConfigureKestrel((_, options) =>
    {
        options.Listen(IPAddress.Any, 4003, _ => { });
        options.Limits.MaxRequestBodySize = long.MaxValue;
    });


    // Setup CORS
    builder.Services.AddCors(options =>
    {
        options.AddPolicy("Cors",
            b =>
            {
                b.AllowCredentials();
                b.SetIsOriginAllowed(origin => origin.Contains("localhost"));
                b.AllowAnyHeader();
                b.AllowAnyMethod();
            });
    });


    // Inject Adapters
    var authenticationServerUrl = Env.Get<string>("AUTHENTICATION_SERVER_URI");

    builder.Services.AddHttpClient<IAuthenticationClient, AuthenticationClient>(client =>
    {
        var configuration = builder.Configuration;

        client.BaseAddress =
            new Uri(authenticationServerUrl ??
                    $"{configuration["AuthenticationServer:Scheme"]}://{configuration["AuthenticationServer:Host"]}:{configuration["AuthenticationServer:Port"]}");
    });

    builder.Services.AddHttpClient<IUsersClient, UsersClient>(client =>
    {
        var configuration = builder.Configuration;
        client.BaseAddress =
            new Uri(authenticationServerUrl ??
                    $"{configuration["AuthenticationServer:Scheme"]}://{configuration["AuthenticationServer:Host"]}:{configuration["AuthenticationServer:Port"]}");
    });

    // Inject Services
    builder.Services.Scan(scan => scan
        .FromApplicationDependencies()
        .AddClasses(classes => classes.InNamespaces(
            "Core.Services",
            "Db.Repositories",
            "Db.Repositories.Internal"
        ))
        .AsImplementedInterfaces()
        .WithSingletonLifetime());

    // Setup Logging
    builder.Host.UseSerilog((_, lc) => lc
        .Enrich.With(new CallerEnricher())
        .MinimumLevel.Override("Microsoft.EntityFrameworkCore.Database.Command", LogEventLevel.Warning)
        .WriteTo.Console(
            LogEventLevel.Debug,
            "[{Timestamp:HH:mm:ss} {Level}{Caller}] {Message:lj}{NewLine}{Exception}",
            theme: AnsiConsoleTheme.Code
        )
    );

    // Convert Enum to String 
    builder.Services
        .AddControllers(o =>
        {
            o.Conventions.Add(new ControllerDocumentationConvention());
            o.OutputFormatters.RemoveType<StringOutputFormatter>();
        })
        .AddJsonOptions(x => x.JsonSerializerOptions.Converters.Add(new JsonStringEnumConverter()));

    // Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
    builder.Services.AddEndpointsApiExplorer();
    builder.Services.AddSwaggerGen(c =>
    {
        c.CustomOperationIds(e => $"{e.ActionDescriptor.RouteValues["action"]}");
        // c.CustomSchemaIds(type => type.ToString());
        c.OperationFilter<RequireAuthAttribute.Swagger>();
    });


    // Setup SPA Serving
    if (builder.Environment.IsProduction())
        Console.WriteLine($"Server in production, serving SPA from {frontPath} folder");

    // builder.Services.AddSpaStaticFiles(configuration => { configuration.RootPath = frontPath; });


    return builder;
};

var builder = useBuilder();


var app = builder.Build();

var useApp = (WebApplication application) =>
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
        application.UseDefaultFiles(new DefaultFilesOptions
        {
            DefaultFileNames = new List<string> { "index.html" }
        });
        application.UseStaticFiles();
    }

    // Start the application
    application.Run();
};

useApp(app);