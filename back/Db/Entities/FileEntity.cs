using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace Db.Entities;

public class FileEntity
{
    [BsonId]
    [BsonRepresentation(BsonType.ObjectId)]
    public ObjectId Id { get; set; }

    public string Username { get; set; }

    public string Filename { get; set; }

    public string Mime { get; set; }

    [BsonRepresentation(BsonType.ObjectId)]
    public ObjectId IdGridFs { get; set; }
}