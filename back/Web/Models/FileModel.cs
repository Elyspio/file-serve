using System.ComponentModel.DataAnnotations;
using System.Diagnostics.CodeAnalysis;

namespace Web.Models;

public class FileModel
{
    [NotNull] [Required] public string Id { get; set; }
    [NotNull] [Required] public string Filename { get; set; }
    [NotNull] [Required] public string Username { get; set; }
    [NotNull] [Required] public string Mime { get; set; }
}