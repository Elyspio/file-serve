using FileServe.Api.Abstractions.Common.Assemblers;
using FileServe.Api.Abstractions.Transports;
using FileServe.Api.Web.Models;

namespace FileServe.Api.Web.Assemblers;

public class FileAssembler : BaseAssembler<FileData, FileModel>
{
    public override FileModel Convert(FileData obj)
    {
        return new FileModel
        {
            Filename = obj.Filename,
            Id = obj.Id,
            Mime = obj.Mime,
            Username = obj.Username,
            Location = obj.Location,
            Size = obj.Size
        };
    }

    public override FileData Convert(FileModel obj)
    {
        throw new NotImplementedException();
    }
}