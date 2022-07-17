using System.ComponentModel.DataAnnotations;
using FileServe.Api.Abstractions.Interfaces.Services;
using FileServe.Api.Web.Assemblers;
using FileServe.Api.Web.Filters;
using FileServe.Api.Web.Models;
using Microsoft.AspNetCore.Mvc;

namespace FileServe.Api.Web.Controllers;

[ApiController]
[Route("api/files/public", Name = "PublicFiles")]
public class PublicController : ControllerBase
{
    private readonly FileAssembler assembler;


    private readonly IFileService fileService;
    private readonly Dictionary<string, Stream> streams = new();

    public PublicController(IFileService fileService)
    {
        this.fileService = fileService;
        assembler = new FileAssembler();
    }

    [HttpGet]
    [ProducesResponseType(typeof(List<FileModel>), 200)]
    public async Task<IActionResult> GetFiles()
    {
        var files = await fileService.GetPublicFiles();
        return Ok(assembler.Convert(files));
    }

    [HttpPost]
    [ProducesResponseType(typeof(FileModel), 201)]
    [RequestFormLimits(MultipartBodyLengthLimit = long.MaxValue)]
    public async Task<IActionResult> AddFile([Required] [FromForm] string filename, [Required] [FromForm] string location, [Required] IFormFile file)
    {
        var stream = file.OpenReadStream();
        var data = await fileService.AddPublicFile(filename, file.ContentType, stream, location);
        var model = assembler.Convert(data);
        await stream.DisposeAsync();
        return Created($"/files/public/{model.Id}", model);
    }

    [HttpGet("{id}/binary")]
    [Produces("application/octet-stream", Type = typeof(FileResult))]
    public async Task<IActionResult> GetFileContent([Required] string id)
    {
        var (content, mime) = await fileService.GetPublicFileContent(id);
        return new FileContentResult(content, mime);
    }

    [HttpGet("{id}/string")]
    [Produces("text/plain", Type = typeof(string))]
    public async Task<IActionResult> GetFileContentAsString([Required] string id)
    {
        var content = await fileService.GetPublicFileContentAsString(id);
        return Ok(content);
    }


    [HttpGet("{id}/stream")]
    [ProducesResponseType(typeof(byte[]), 200, "application/octet-stream")]
    [ProducesResponseType(typeof(byte[]), 206, "application/octet-stream")]
    public async Task<IActionResult> GetFileContentAsStream([Required] string id)
    {
        Stream stream;
        if (streams.ContainsKey(id))
        {
            stream = streams[id];
        }
        else
        {
            stream = await fileService.GetPublicFileContentAsStream(id);
            streams.Add(id, stream);
        }

        return new FileStreamResult(stream, "application/octet-stream") {EnableRangeProcessing = true};
    }


    [HttpGet("{id}")]
    [ProducesResponseType(typeof(FileModel), 200)]
    public async Task<IActionResult> GetFile([Required] string id)
    {
        var file = await fileService.GetPublicFile(id);
        return Ok(assembler.Convert(file));
    }


    [HttpDelete("{id}")]
    [ProducesResponseType(typeof(void), 204)]
    [RequireAuth]
    public async Task<ActionResult> DeleteFile([Required] string id)
    {
        await fileService.DeletePublicFile(id);
        return NoContent();
    }
}