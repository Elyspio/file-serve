﻿using Core.Interfaces.Repositories;
using Core.Interfaces.Services;
using Core.Models;
using System.Text;

namespace Core.Services;

internal class FileService : IFileService
{
    private const string PublicUser = "public";

    private readonly IFilesRepository repository;

    public FileService(IFilesRepository repository)
    {
        this.repository = repository;
    }

    public async Task<List<FileData>> GetPublicFiles()
    {
        return await GetUserFiles(PublicUser);
    }

    public async Task<FileData> AddPublicFile(string filename, string mime, Stream content, string location)
    {
        return await AddUserFile(PublicUser, filename, mime, content, location);
    }

    public async Task<(byte[], string)> GetPublicFileContent(string id)
    {
        return await GetUserFileContent(PublicUser, id);
    }

    public async Task<string> GetPublicFileContentAsString(string id)
    {
        return await GetUserFileContentAsString(PublicUser, id);
    }


    public async Task<Stream> GetPublicFileContentAsStream(string id)
    {
        return await GetUserFileContentAsStream(PublicUser, id);
    }


    public async Task<FileData> GetPublicFile(string id)
    {
        return await GetUserFile(PublicUser, id);
    }

    public async Task DeletePublicFile(string id)
    {
        await DeleteUserFile(PublicUser, id);
    }

    public async Task<List<FileData>> GetUserFiles(string username)
    {
        return await repository.GetFiles(username);
    }

    public async Task<FileData> AddUserFile(string username, string filename, string mime, Stream content,
        string location)
    {
        return await repository.AddFile(username, filename, mime, content, location);
    }

    public async Task<(byte[], string)> GetUserFileContent(string username, string id)
    {
        var file = await GetUserFile(username, id);
        var content = await repository.GetFileContent(username, id);
        return (content, file.Mime);
    }

    public async Task<string> GetUserFileContentAsString(string username, string id)
    {
        var content = await repository.GetFileContent(username, id);
        return Encoding.Default.GetString(content);
    }

    public async Task<FileData> GetUserFile(string username, string id)
    {
        return await repository.GetFile(username, id);
    }

    public async Task DeleteUserFile(string username, string id)
    {
        await repository.DeleteFile(username, id);
    }

    public async Task<Stream> GetUserFileContentAsStream(string username, string id)
    {
        return await repository.GetFileContentAsStream(username, id);
    }
}