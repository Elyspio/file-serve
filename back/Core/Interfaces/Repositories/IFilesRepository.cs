using Core.Models;

namespace Core.Interfaces.Repositories;

public interface IFilesRepository
{
    public Task<List<FileData>> GetFiles(string username);
    public Task<FileData> AddFile(string username, string filename, string mime, Stream content, string location);
    public Task<byte[]> GetFileContent(string username, string id);
    public Task<FileData> GetFile(string username, string id);
    public Task DeleteFile(string username, string id);
}