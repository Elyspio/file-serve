namespace FileServe.Api.Abstractions.Transports;

public record FileData(string Id, string Filename, string Username, string Mime, string IdGridFs, long Size, string Location) { }