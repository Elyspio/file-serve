using Core.Interfaces.Assemblers;
using Core.Models;
using Web.Models;

namespace Web.Assemblers;

public class FileAssembler : BaseAssembler<FileData, FileModel>
{
    public override FileModel Convert(FileData obj)
    {
        return new FileModel
        {
            Filename = obj.Filename,
            Id = obj.Id,
            Mime = obj.Mime,
            Username = obj.Username
        };
    }

    public override FileData Convert(FileModel obj)
    {
        throw new NotImplementedException();
    }
}