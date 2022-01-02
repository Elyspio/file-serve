using System.ComponentModel.DataAnnotations;
using Core.Interfaces.Services;
using Microsoft.AspNetCore.Mvc;
using Web.Assemblers;
using Web.Filters;
using Web.Models;
using Web.Utils;

namespace Web.Controllers;

[ApiController]
[Route("files/user", Name = "Users")]
[RequireAuth]
public class UsersController : ControllerBase
{
    private readonly FileAssembler assembler;
    private readonly IFileService fileService;

    public UsersController(IFileService fileService)
    {
        this.fileService = fileService;
        assembler = new FileAssembler();
    }

    [HttpGet]
    [ProducesResponseType(typeof(List<FileModel>), 200)]
    public async Task<IActionResult> GetFiles()
    {
        var username = AuthUtility.GetUsername(Request);
        var files = await fileService.GetUserFiles(username);
        return Ok(assembler.Convert(files));
    }

    [HttpPost]
    [ProducesResponseType(typeof(FileModel), 201)]
    [RequestFormLimits(MultipartBodyLengthLimit = long.MaxValue)]
    public async Task<IActionResult> AddFile([Required] [FromForm] string filename,
        [Required] [FromForm] string location, [Required] IFormFile file)
    {
        var username = AuthUtility.GetUsername(Request);
        var stream = file.OpenReadStream();
        var created = await fileService.AddUserFile(username, filename, file.ContentType, stream, location);
        await stream.DisposeAsync();
        return Created($"/files/user/{created.Id}", created);
    }

    [HttpGet("{id}/binary")]
    [Produces("application/octet-stream", Type = typeof(FileResult))]
    public async Task<FileResult> GetFileContent([Required] string id)
    {
        var username = AuthUtility.GetUsername(Request);
        var (bytes, mime) = await fileService.GetUserFileContent(username, id);
        return new FileContentResult(bytes, mime);
    }

    [HttpGet("{id}/string")]
    [Produces("text/plain", Type = typeof(string))]
    public async Task<string> GetFileContentAsString([Required] string id)
    {
        var username = AuthUtility.GetUsername(Request);
        var content = await fileService.GetUserFileContentAsString(username, id);
        return content;
    }

    [HttpGet("{id}/stream")]
    [ProducesResponseType(typeof(FileStreamResult), 206, "application/octet-stream")]
    public async Task<IActionResult> GetFileContentAsStream([Required] string id)
    {
        var username = AuthUtility.GetUsername(Request);
        var (content, mime) = await fileService.GetUserFileContent(username, id);
        var stream = new MemoryStream(content);
        return new FileStreamResult(stream, mime);
    }


    [HttpGet("{id}")]
    [Produces("application/json", Type = typeof(FileModel))]
    public async Task<IActionResult> GetFile([Required] string id)
    {
        var username = AuthUtility.GetUsername(Request);
        var file = await fileService.GetUserFile(username, id);
        return Ok(assembler.Convert(file));
    }


    [RequireAuth]
    [HttpDelete("{id}")]
    [ProducesResponseType(typeof(void), 204)]
    public async Task<IActionResult> DeleteFile([Required] string id)
    {
        var username = AuthUtility.GetUsername(Request);
        await fileService.DeleteUserFile(username, id);
        return NoContent();
    }
}