using Db.Configs;
using Microsoft.Extensions.Configuration;
using MongoDB.Driver;

namespace Db.Repositories.Internal;

public class MongoContext
{
    public MongoContext(IConfiguration configuration)
    {
        var conf = new DbConfig();
        configuration.GetSection(DbConfig.Section).Bind(conf);

        var client = new MongoClient($"mongodb://{conf.Username}:{conf.Password}@{conf.Host}:{conf.Port}");
        MongoDatabase = client.GetDatabase(conf.Database);
    }

    /// <summary>
    ///     Récupération de la IMongoDatabase
    /// </summary>
    /// <returns></returns>
    public IMongoDatabase MongoDatabase { get; }
}