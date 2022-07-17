using FileServe.Api.Abstractions.Common.Extensions;
using FileServe.Api.Abstractions.Interfaces.Repositories;
using FileServe.Api.Abstractions.Models;
using FileServe.Api.Db.Repositories.Internal;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging;
using MongoDB.Driver;
using MongoDB.Driver.GridFS;

namespace FileServe.Api.Db.Repositories;

internal class FilesRepository : BaseRepository<FileEntity>, IFilesRepository
{
    private readonly GridFSBucket gridFsBucket;
    private readonly ILogger<FilesRepository> logger;

    public FilesRepository(IConfiguration configuration, ILogger<FilesRepository> logger) : base(configuration, logger)
    {
        gridFsBucket = new GridFSBucket(context.MongoDatabase, new GridFSBucketOptions
            {
                BucketName = CollectionName
            }
        );
        this.logger = logger;
    }

    public async Task<List<FileEntity>> GetFiles(string username)
    {
        var files = await EntityCollection.Find(file => file.Username == username).ToListAsync();

        return files;
    }

    public async Task<FileEntity> AddFile(string username, string filename, string mime, Stream content, string location, bool hidden)
    {
        var file = new FileEntity
        {
            Filename = filename,
            Mime = mime,
            Username = username,
            Location = location,
            Size = content.Length,
            Hidden = hidden
        };
        await EntityCollection.InsertOneAsync(file);

        var idGridFs = await gridFsBucket.UploadFromStreamAsync(file.Id.ToString(), content);

        file.IdGridFs = idGridFs;

        await EntityCollection.ReplaceOneAsync(f => f.Id == file.Id, file);

        return file;
    }

    public async Task<byte[]> GetFileContent(string username, Guid id)
    {
        var file = await GetFile(username, id);

        return await gridFsBucket.DownloadAsBytesByNameAsync(file.Id.ToString());
    }

    public async Task<Stream> GetFileContentAsStream(string username, Guid id)
    {
        var file = await GetFile(username, id);

        var outputStream = new MemoryStream();

        await gridFsBucket.DownloadToStreamByNameAsync(file.Id.ToString(), outputStream);

        return outputStream;
    }


    public async Task<FileEntity> GetFile(string username, Guid id)
    {
        var files = await EntityCollection.Find(f => f.Id == id.AsObjectId() && f.Username == username).ToListAsync();


        if (!files.Any())
        {
            throw new FileNotFoundException(username, id.ToString());
        }

        return files.First();
    }

    public async Task DeleteFile(string username, Guid id)
    {
        var file = await GetFile(username, id);
        await gridFsBucket.DeleteAsync(file.IdGridFs);
        await EntityCollection.FindOneAndDeleteAsync(f => f.Id == file.Id);
    }

    public async Task ToggleVisibility(string username, Guid id)
    {
        var file = await GetFile(username, id);

        file.Hidden = !file.Hidden;

        await EntityCollection.ReplaceOneAsync(f => f.Id == id.AsObjectId(), file);
    }
}