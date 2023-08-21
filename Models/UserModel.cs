using MongoDB.Bson.Serialization.Attributes;
using MongoDB.Bson;
using System.Security.Principal;

namespace netcore_blog.Models
{
    public class UserModel
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string? Id { get; set; }

        public string username { get; set; } = null!;

        public string password { get; set; } = null!;

    }
}
