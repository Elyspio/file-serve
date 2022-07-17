using System.Runtime.CompilerServices;
using System.Text.Json;
using System.Text.Json.Serialization;
using Microsoft.Extensions.Logging;

namespace FileServe.Api.Abstractions.Common.Helpers;

public static class LogHelper
{
    private static readonly JsonSerializerOptions options = new()
    {
        Converters =
        {
            new JsonStringEnumConverter()
        }
    };

    public static string Get(object value, [CallerArgumentExpression("value")] string name = "")
    {
        return $"{name}={JsonSerializer.Serialize(value, options)}";
    }


    public static void Enter<T>(this ILogger<T> logger, string arguments = "", LogLevel level = LogLevel.Debug, [CallerMemberName] string method = "")
    {
        logger.Log(level, $"Entering - {method}{(arguments.Any() ? ": " : "")}{arguments}");
    }


    public static void Exit<T>(this ILogger<T> logger, string arguments = "", LogLevel level = LogLevel.Debug, [CallerMemberName] string method = "")
    {
        logger.Log(level, $"Exiting - {method}{(arguments.Any() ? ": " : "")}{arguments}");
    }
}