using FileServe.Api.Abstractions.Common.Assemblers;
using FileServe.Api.Abstractions.Common.Extensions;
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
            Id = obj.Id.AsObjectId(),
            Mime = obj.Mime,
            Username = obj.Username,
            Filename = obj.Filename,
            IdGridFs = new ObjectId(obj.IdGridFs),
            Location = obj.Location,
            Size = obj.Size,
            Hidden = obj.Hidden
        };
    }

    public override FileData Convert(FileEntity obj)
    {
        return new FileData
        {
            Id = obj.Id.AsGuid(),
            Mime = obj.Mime,
            Username = obj.Username,
            Filename = obj.Filename,
            IdGridFs = obj.IdGridFs.ToString(),
            Location = obj.Location,
            Size = obj.Size,
            Hidden = obj.Hidden
        };
    }
}