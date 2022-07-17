using FileServe.Api.Abstractions.Common.Assemblers;
using FileServe.Api.Abstractions.Models;
using FileServe.Api.Abstractions.Transports;
using MongoDB.Bson;

namespace FileServe.Api.Core.Assemblers;

public class FileAssembler : BaseAssembler<FileData, FileEntity>
{
    public override FileEntity Convert(FileData obj)
    {
        return new FileEntity
        {
            Id = new ObjectId(obj.Id),
            Mime = obj.Mime,
            Username = obj.Username,
            Filename = obj.Filename,
            IdGridFs = new ObjectId(obj.IdGridFs),
            Location = obj.Location,
            Size = obj.Size
        };
    }

    public override FileData Convert(FileEntity obj)
    {
        return new FileData(obj.Id.ToString(), obj.Filename, obj.Username, obj.Mime, obj.IdGridFs.ToString(), obj.Size, obj.Location);
    }
}