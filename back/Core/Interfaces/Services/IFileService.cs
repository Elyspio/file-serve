using Core.Models;

namespace Core.Interfaces.Services;

public interface IFileService
{
    /// <summary>
    ///     Return the list of public files
    /// </summary>
    Task<List<FileData>> GetPublicFiles();

    /// <summary>
    ///     Add a public file
    /// </summary>
    Task<FileData> AddPublicFile(string filename, string mime, Stream content, string location);

    /// <summary>
    ///     Get content as byte array of a public file
    /// </summary>
    /// <param name="id">file id</param>
    Task<(byte[], string)> GetPublicFileContent(string id);

    /// <summary>
    ///     Get content as string (utf8) of a public file
    /// </summary>
    /// <param name="id">file id</param>
    Task<string> GetPublicFileContentAsString(string id);

    /// <summary>
    ///     Get metadata of a public file
    /// </summary>
    /// <param name="id"></param>
    /// <returns></returns>
    Task<FileData> GetPublicFile(string id);

    /// <summary>
    ///     Delete a public file
    /// </summary>
    /// <param name="id"></param>
    /// <returns></returns>
    Task DeletePublicFile(string id);


    /// <summary>
    ///     Return the list of user's files
    /// </summary>
    Task<List<FileData>> GetUserFiles(string username);

    /// <summary>
    ///     Add a file for this user
    /// </summary>
    /// <returns>id of the created file</returns>
    Task<FileData> AddUserFile(string username, string filename, string mime, Stream content, string location);

    /// <summary>
    ///     Get content as byte array of a file from an user
    /// </summary>
    /// <param name="id">file id</param>
    /// <param name="username">user's id</param>
    Task<(byte[], string)> GetUserFileContent(string username, string id);

    /// <summary>
    ///     Get content as string (utf8) of a file from an user
    /// </summary>
    /// <param name="username">user's id</param>
    /// <param name="id">file id</param>
    Task<string> GetUserFileContentAsString(string username, string id);

    /// <summary>
    ///     Get metadata of a file from an user
    /// </summary>
    /// <param name="id">file id</param>
    /// <param name="username">User's id</param>
    /// <returns></returns>
    Task<FileData> GetUserFile(string username, string id);

    /// <summary>
    ///     Delete a file from an user
    /// </summary>
    /// <param name="id">file id</param>
    /// <param name="username">User's id</param>
    Task DeleteUserFile(string username, string id);
}