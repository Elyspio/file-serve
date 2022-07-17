using System.ComponentModel.DataAnnotations;
using FileServe.Api.Abstractions.Interfaces.Services;
using FileServe.Api.Abstractions.Transports;
using FileServe.Api.Web.Filters;
using FileServe.Api.Web.Utils;
using Microsoft.AspNetCore.Mvc;

namespace FileServe.Api.Web.Controllers;

[ApiController]
[RequireAuth]
[Route("api/files/user", Name = "UserFiles")]
public class UsersController : ControllerBase
{
    private readonly IFileService fileService;
    private readonly Dictionary<Guid, Stream> streams = new();

    public UsersController(IFileService fileService)
    {
        this.fileService = fileService;
    }

    [HttpGet]
    [ProducesResponseType(typeof(List<FileData>), 200)]
    public async Task<IActionResult> GetFiles()
    {
        var username = AuthUtility.GetUsername(Request);
        var files = await fileService.GetAll(true, username);
        return Ok(files);
    }

    [HttpPost]
    [ProducesResponseType(typeof(FileData), 201)]
    [RequestFormLimits(MultipartBodyLengthLimit = long.MaxValue)]
    public async Task<IActionResult> AddFile([Required] [FromForm] string filename, [Required] [FromForm] string location, [Required] IFormFile file, [FromForm] [Required] bool hidden)
    {
        var username = AuthUtility.GetUsername(Request);
        var stream = file.OpenReadStream();
        var created = await fileService.Add(filename, file.ContentType, stream, location, hidden, username);
        await stream.DisposeAsync();
        return Created($"/files/user/{created.Id}", created);
    }

    [HttpGet("{id:guid}/binary")]
    [Produces("application/octet-stream", Type = typeof(FileResult))]
    public async Task<FileResult> GetFileContent([Required] Guid id)
    {
        var username = AuthUtility.GetUsername(Request);
        var (bytes, mime, filename) = await fileService.GetContent(id, username);
        return new FileContentResult(bytes, mime)
        {
            FileDownloadName = filename
        };
    }

    [HttpGet("{id:guid}/string")]
    [Produces("text/plain", Type = typeof(string))]
    public async Task<string> GetFileContentAsString([Required] Guid id)
    {
        var username = AuthUtility.GetUsername(Request);
        var content = await fileService.GetContentAsString(id, username);
        return content;
    }

    [HttpGet("{id:guid}/stream")]
    [ProducesResponseType(typeof(FileStreamResult), 200, "application/octet-stream")]
    [ProducesResponseType(typeof(FileStreamResult), 206, "application/octet-stream")]
    public async Task<IActionResult> GetFileContentAsStream([Required] Guid id)
    {
        Stream stream;
        if (streams.ContainsKey(id))
        {
            stream = streams[id];
        }
        else
        {
            var username = AuthUtility.GetUsername(Request);
            stream = await fileService.GetContentAsStream(id, username);
            streams.Add(id, stream);
        }

        return new FileStreamResult(stream, "application/octet-stream") {EnableRangeProcessing = true};
    }


    [HttpGet("{id:guid}")]
    [Produces("application/json", Type = typeof(FileData))]
    public async Task<IActionResult> GetFile([Required] Guid id)
    {
        var username = AuthUtility.GetUsername(Request);
        var file = await fileService.Get(id, username);
        return Ok(file);
    }


    [HttpDelete("{id:guid}")]
    [ProducesResponseType(typeof(void), 204)]
    public async Task<IActionResult> DeleteFile([Required] Guid id)
    {
        var username = AuthUtility.GetUsername(Request);
        await fileService.Delete(id, username);
        return NoContent();
    }




    [HttpPut("{id:guid}/visibility")]
    [ProducesResponseType(typeof(void), 204)]
    public async Task<IActionResult> ToggleVisibility([Required] Guid id)
    {
        var username = AuthUtility.GetUsername(Request);
        await fileService.ToggleVisibility(id, username);
        return NoContent();
    }



}