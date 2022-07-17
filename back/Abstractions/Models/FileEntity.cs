using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace FileServe.Api.Abstractions.Models;

public class FileEntity
{
    [BsonId]
    [BsonRepresentation(BsonType.ObjectId)]
    public ObjectId Id { get; set; }

    public string Username { get; set; }

    public string Filename { get; set; }

    public string Mime { get; set; }
    public string Location { get; set; }

    public long Size { get; set; }


    [BsonRepresentation(BsonType.ObjectId)]
    public ObjectId IdGridFs { get; set; }

    public bool Hidden { get; set; }
}