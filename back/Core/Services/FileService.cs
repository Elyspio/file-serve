using System.Text;
using FileServe.Api.Abstractions.Interfaces.Repositories;
using FileServe.Api.Abstractions.Interfaces.Services;
using FileServe.Api.Abstractions.Transports;
using FileServe.Api.Core.Assemblers;

namespace FileServe.Api.Core.Services;

internal class FileService : IFileService
{
    private const string PublicUser = "public";

    private readonly FileAssembler fileAssembler = new();


    private readonly IFilesRepository repository;

    public FileService(IFilesRepository repository)
    {
        this.repository = repository;
    }

    public async Task<(byte[] content, string contentType, string filename)> GetContent(Guid id, string? username = null)
    {
        username ??= PublicUser;
        var file = await Get(id, username);
        var content = await repository.GetFileContent(username, id);
        return (content, file.Mime, file.Filename);
    }

    public async Task<string> GetContentAsString(Guid id, string? username = null)
    {
        username ??= PublicUser;
        var content = await repository.GetFileContent(username, id);
        return Encoding.Default.GetString(content);
    }


    public async Task<Stream> GetContentAsStream(Guid id, string? username = null)
    {
        username ??= PublicUser;
        return await repository.GetFileContentAsStream(username, id);
    }

    public async Task<FileData> Get(Guid id, string? username = null)
    {
        username ??= PublicUser;
        var file = await repository.GetFile(username, id);
        return fileAssembler.Convert(file);
    }

    public async Task<List<FileData>> GetAll(bool retrieveHidden, string? username = null)
    {
        username ??= PublicUser;
        var files = await repository.GetFiles(username);

        if (!retrieveHidden)
        {
            files = files.FindAll(f => f.Hidden == false);
        }

        return fileAssembler.Convert(files);
    }

    public async Task Delete(Guid id, string? username = null)
    {
        username ??= PublicUser;
        await repository.DeleteFile(username, id);
    }

    public async Task ToggleVisibility(Guid id, string? username = null)
    {
        username ??= PublicUser;
        await repository.ToggleVisibility(username, id);
    }

    public async Task<FileData> Add(string filename, string mime, Stream content, string location, bool hidden, string? username = null)
    {
        username ??= PublicUser;
        return fileAssembler.Convert(await repository.AddFile(username, filename, mime, content, location, hidden));
    }
}