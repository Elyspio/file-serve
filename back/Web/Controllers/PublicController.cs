using System.ComponentModel.DataAnnotations;
using FileServe.Api.Abstractions.Interfaces.Services;
using FileServe.Api.Abstractions.Transports;
using FileServe.Api.Web.Filters;
using FileServe.Api.Web.Utils;
using Microsoft.AspNetCore.Mvc;
using Microsoft.OpenApi.Models;

namespace FileServe.Api.Web.Controllers;

[ApiController]
[Route("api/files/public", Name = "PublicFiles")]
public class PublicController : ControllerBase
{
    private readonly IAuthenticationService authenticationService;
    private readonly IFileService fileService;
    private readonly Dictionary<Guid, Stream> streams = new();

    public PublicController(IFileService fileService, IAuthenticationService authenticationService)
    {
        this.fileService = fileService;
        this.authenticationService = authenticationService;
    }

    [HttpGet]
    [ProducesResponseType(typeof(List<FileData>), 200)]
    public async Task<IActionResult> GetFiles()
    {
        var token = Request.GetToken(ParameterLocation.Cookie);

        var retrieveHidden = token != default && await authenticationService.IsLogged(token);

        var files = await fileService.GetAll(retrieveHidden);
        return Ok(files);
    }

    [HttpPost]
    [ProducesResponseType(typeof(FileData), 201)]
    [RequestFormLimits(MultipartBodyLengthLimit = long.MaxValue)]
    public async Task<IActionResult> AddFile([Required] [FromForm] string filename, [Required] [FromForm] string location, [Required] IFormFile file, [FromForm] [Required] bool hidden)
    {
        var stream = file.OpenReadStream();
        var data = await fileService.Add(filename, file.ContentType, stream, location, hidden);
        await stream.DisposeAsync();
        return Created($"/files/public/{data.Id}", data);
    }

    [HttpGet("{id:guid}/binary")]
    [Produces("application/octet-stream", Type = typeof(FileResult))]
    public async Task<IActionResult> GetFileContent([Required] Guid id)
    {
        var (content, mime, filename) = await fileService.GetContent(id);
        return new FileContentResult(content, mime)
        {
            FileDownloadName = filename
        };
    }

    [HttpGet("{id:guid}/string")]
    [Produces("text/plain", Type = typeof(string))]
    public async Task<IActionResult> GetFileContentAsString([Required] Guid id)
    {
        var content = await fileService.GetContentAsString(id);
        return Ok(content);
    }


    [HttpGet("{id:guid}/stream")]
    [ProducesResponseType(typeof(byte[]), 200, "application/octet-stream")]
    [ProducesResponseType(typeof(byte[]), 206, "application/octet-stream")]
    public async Task<IActionResult> GetFileContentAsStream([Required] Guid id)
    {
        Stream stream;
        if (streams.ContainsKey(id))
        {
            stream = streams[id];
        }
        else
        {
            stream = await fileService.GetContentAsStream(id);
            streams.Add(id, stream);
        }

        return new FileStreamResult(stream, "application/octet-stream") {EnableRangeProcessing = true};
    }


    [HttpGet("{id:guid}")]
    [ProducesResponseType(typeof(FileData), 200)]
    public async Task<IActionResult> GetFile([Required] Guid id)
    {
        var file = await fileService.Get(id);
        return Ok(file);
    }


    [HttpDelete("{id:guid}")]
    [ProducesResponseType(typeof(void), 204)]
    [RequireAuth]
    public async Task<ActionResult> DeleteFile([Required] Guid id)
    {
        await fileService.Delete(id);
        return NoContent();
    }


    [HttpPut("{id:guid}/visibility")]
    [ProducesResponseType(typeof(void), 204)]
    [RequireAuth]
    public async Task<IActionResult> ToggleVisibility([Required] Guid id)
    {
        await fileService.ToggleVisibility(id);
        return NoContent();
    }

}