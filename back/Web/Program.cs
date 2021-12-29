using System.Net;
using System.Text.Json.Serialization;
using Adapters.Authentication;
using Core.Utils;
using Microsoft.Extensions.FileProviders;
using Serilog;
using Serilog.Events;
using Serilog.Sinks.SystemConsole.Themes;
using Web.Filters;
using Web.Utils;

var useBuilder = () =>
{
    var builder = WebApplication.CreateBuilder(args);

    // Setup HTTP/3
    builder.WebHost.ConfigureKestrel((_, options) =>
    {
        options.Listen(IPAddress.Any, 4003, _ =>
        {
        });
        options.Limits.MaxRequestBodySize = long.MaxValue;
    });

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


    var authenticationServerUrl = Env.Get<string>("AUTHENTICATION_SERVER_URI");

    builder.Services.AddHttpClient<IAuthenticationClient, AuthenticationClient>(client =>
    {
        var configuration = builder.Configuration;
        client.BaseAddress =
            new Uri(authenticationServerUrl ?? $"{configuration["AuthenticationServer:Scheme"]}://{configuration["AuthenticationServer:Host"]}:{configuration["AuthenticationServer:Port"]}");
    });

    builder.Services.AddHttpClient<IUsersClient, UsersClient>(client =>
    {
        var configuration = builder.Configuration;
        client.BaseAddress =
            new Uri(authenticationServerUrl ?? $"{configuration["AuthenticationServer:Scheme"]}://{configuration["AuthenticationServer:Host"]}:{configuration["AuthenticationServer:Port"]}");

    });


    builder.Services.Scan(scan => scan
        .FromApplicationDependencies()
        .AddClasses(classes => classes.InNamespaces(
            "Core.Services",
            "Db.Repositories",
            "Db.Repositories.Internal"
        ))
        .AsImplementedInterfaces()
        .WithSingletonLifetime());


    builder.Host.UseSerilog((_, lc) => lc
        .Enrich.With(new CallerEnricher())
        .MinimumLevel.Override("Microsoft.EntityFrameworkCore.Database.Command", LogEventLevel.Warning)
        .WriteTo.Console(
            LogEventLevel.Debug,
            "[{Timestamp:HH:mm:ss} {Level}{Caller}] {Message:lj}{NewLine}{Exception}",
            theme: AnsiConsoleTheme.Code
        )
    );
    // Add services to the container.

    builder.Services.AddControllers(o => o.Conventions.Add(new ControllerDocumentationConvention()))
        .AddJsonOptions(x => { x.JsonSerializerOptions.Converters.Add(new JsonStringEnumConverter()); }
        );

    // Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
    builder.Services.AddEndpointsApiExplorer();
    builder.Services.AddSwaggerGen(c =>
    {
        c.CustomOperationIds(e =>
            $"{e.ActionDescriptor.RouteValues["controller"]!.Replace(".", "")}{e.ActionDescriptor.RouteValues["action"]}");
        // c.CustomSchemaIds(type => type.ToString());
        c.OperationFilter<RequireAuthAttribute.Swagger>();
    });

    return builder;
};

var builder = useBuilder();


var app = builder.Build();

var useApp = (WebApplication application) =>
{
    application.UseSwagger();
    application.UseSwaggerUI();
    application.UseAdvancedDependencyInjection();

    application.UseCors("Cors");

    application.MapControllers();


    if (application.Environment.IsProduction())
    {
        application.UseStaticFiles(new StaticFileOptions
        {
            FileProvider = new PhysicalFileProvider(Env.Get<string>("FRONT_PATH", true)!),
            RequestPath = "/"
        });
    }


    application.Run();
};

useApp(app);