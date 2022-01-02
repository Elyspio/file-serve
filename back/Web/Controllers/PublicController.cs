using System.ComponentModel.DataAnnotations;
using Core.Interfaces.Services;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Net.Http.Headers;
using Web.Assemblers;
using Web.Filters;
using Web.Models;

namespace Web.Controllers;

[ApiController]
[Route("files/public", Name = "Public")]
public class PublicController : ControllerBase
{
    private readonly FileAssembler assembler;


    private readonly IFileService fileService;

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
    public async Task<IActionResult> AddFile([Required] [FromForm] string filename,
        [Required] [FromForm] string location, [Required] IFormFile file)
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
    [ProducesResponseType(typeof(FileStreamResult), 206, "application/octet-stream")]
    public async Task<IActionResult> GetFileContentAsStream([Required] string id)
    {
        var (content, mime) = await fileService.GetPublicFileContent(id);
        var stream = new MemoryStream(content);
        return new FileStreamResult(stream, new MediaTypeHeaderValue(mime))
        {
        };
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