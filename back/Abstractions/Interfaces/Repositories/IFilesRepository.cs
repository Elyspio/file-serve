using FileServe.Api.Abstractions.Models;

namespace FileServe.Api.Abstractions.Interfaces.Repositories;

public interface IFilesRepository
{
    public Task<List<FileEntity>> GetFiles(string username);
    public Task<FileEntity> AddFile(string username, string filename, string mime, Stream content, string location, bool hidden);
    public Task<byte[]> GetFileContent(string username, Guid id);
    public Task<Stream> GetFileContentAsStream(string username, Guid id);
    public Task ToggleVisibility(string username, Guid id);

    public Task<FileEntity> GetFile(string username, Guid id);
    public Task DeleteFile(string username, Guid id);
}