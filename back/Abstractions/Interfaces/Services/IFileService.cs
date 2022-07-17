using FileServe.Api.Abstractions.Transports;

namespace FileServe.Api.Abstractions.Interfaces.Services;

public interface IFileService
{
    /// <summary>
    ///     Get content as stream (utf8) of a file from an user
    /// </summary>
    /// <param name="username">user's id or null for public</param>
    /// <param name="id">file id</param>
    Task<Stream> GetContentAsStream(Guid id, string? username = null);

    /// <summary>
    ///     Get content as string (utf8) of a file from an user
    /// </summary>
    /// <param name="id"></param>
    /// <param name="username"></param>
    /// <returns></returns>
    Task<string> GetContentAsString(Guid id, string? username = null);

    /// <summary>
    ///     Get Content as bytes of a file from an user
    /// </summary>
    /// <param name="id"></param>
    /// <param name="username"></param>
    /// <returns></returns>
    Task<(byte[] content, string contentType, string filename)> GetContent(Guid id, string? username = null);

    /// <summary>
    ///     Get file for a specific user
    /// </summary>
    /// <param name="id">file's id</param>
    /// <param name="username">User's id or null for public</param>
    /// <returns></returns>
    Task<FileData> Get(Guid id, string? username = null);

    /// <summary>
    ///     Get all files for a specific user
    /// </summary>
    /// <param name="username">User's id or null for public</param>
    /// <returns></returns>
    Task<List<FileData>> GetAll(bool retrieveHidden, string? username = null);

    /// <summary>
    ///     Delete a file from an user
    /// </summary>
    /// <param name="id">file id</param>
    /// <param name="username">User's id or null for public</param>
    Task Delete(Guid id, string? username = null);

    /// <summary>
    ///     Toggle the hidden property of a file
    /// </summary>
    /// <param name="id"></param>
    /// <param name="username"></param>
    /// <returns></returns>
    Task ToggleVisibility(Guid id, string? username = null);

    /// <summary>
    ///     Add a file for this user
    /// </summary>
    /// <returns>id of the created file</returns>
    Task<FileData> Add(string filename, string mime, Stream content, string location, bool hidden, string? username = null);
}