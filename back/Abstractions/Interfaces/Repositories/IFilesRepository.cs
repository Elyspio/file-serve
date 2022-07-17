using FileServe.Api.Abstractions.Models;
using FileServe.Api.Abstractions.Transports;

namespace FileServe.Api.Abstractions.Interfaces.Repositories;

public interface IFilesRepository
{
    public Task<List<FileEntity>> GetFiles(string username);
    public Task<FileEntity> AddFile(string username, string filename, string mime, Stream content, string location);
    public Task<byte[]> GetFileContent(string username, string id);
    public Task<Stream> GetFileContentAsStream(string username, string id);

    public Task<FileEntity> GetFile(string username, string id);
    public Task DeleteFile(string username, string id);
}