using Core.Interfaces.Repositories;
using Core.Models;
using Db.Assemblers;
using Db.Entities;
using Db.Repositories.Internal;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging;
using MongoDB.Bson;
using MongoDB.Driver;
using MongoDB.Driver.GridFS;
using FileNotFoundException = Core.Exceptions.FileNotFoundException;

namespace Db.Repositories;

internal class FilesRepository : BaseRepository<FileEntity>, IFilesRepository
{
    private readonly FileAssembler assembler;
    private readonly GridFSBucket gridFsBucket;
    private readonly ILogger<FilesRepository> logger;

    public FilesRepository(IConfiguration configuration, ILogger<FilesRepository> logger) : base(configuration, logger)
    {
        gridFsBucket = new GridFSBucket(context.MongoDatabase, new GridFSBucketOptions
        {
            BucketName = CollectionName
        });
        this.logger = logger;
        assembler = new FileAssembler();
    }

    public async Task<List<FileData>> GetFiles(string username)
    {
        var files = await EntityCollection
            .Find(file => file.Username == username)
            .ToListAsync();

        return assembler.Convert(files).ToList();
    }

    public async Task<FileData> AddFile(string username, string filename, string mime, Stream content, string location)
    {
        var file = new FileEntity
        {
            Filename = filename,
            Mime = mime,
            Username = username,
            Location = location,
            Size = content.Length
        };
        await EntityCollection.InsertOneAsync(file);

        var idGridFs = await gridFsBucket.UploadFromStreamAsync(file.Id.ToString(), content);

        file.IdGridFs = idGridFs;

        await EntityCollection.ReplaceOneAsync(f => f.Id == file.Id, file);

        return assembler.Convert(file);
    }

    public async Task<byte[]> GetFileContent(string username, string id)
    {
        var file = await GetFile(username, id);

        return await gridFsBucket.DownloadAsBytesByNameAsync(file.Id);
    }

    public async Task<Stream> GetFileContentAsStream(string username, string id)
    {
        var file = await GetFile(username, id);

        var outputStream = new MemoryStream();

        await gridFsBucket.DownloadToStreamByNameAsync(file.Id, outputStream);

        return outputStream;
    }



    public async Task<FileData> GetFile(string username, string id)
    {
        var files = await EntityCollection
            .Find(f => f.Id == new ObjectId(id) && f.Username == username)
            .ToListAsync();


        if (!files.Any()) throw new FileNotFoundException(username, id);

        return assembler.Convert(files.First());
    }

    public async Task DeleteFile(string username, string id)
    {
        var file = await GetFile(username, id);
        await gridFsBucket.DeleteAsync(new ObjectId(file.IdGridFs));
        await EntityCollection.FindOneAndDeleteAsync(f => f.Id == new ObjectId(file.Id));
    }
}