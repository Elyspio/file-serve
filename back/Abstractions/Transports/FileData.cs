using System.ComponentModel.DataAnnotations;

namespace FileServe.Api.Abstractions.Transports;

public class FileData
{
    [Required] public Guid Id { get; set; }
    [Required] public string Username { get; set; }
    [Required] public string Filename { get; set; }
    [Required] public string Mime { get; set; }
    [Required] public string Location { get; set; }
    [Required] public long Size { get; set; }
    [Required] public string IdGridFs { get; set; }
    [Required] public bool Hidden { get; set; }
}