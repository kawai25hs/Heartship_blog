using MongoDB.Bson.Serialization.Attributes;
using MongoDB.Bson;

namespace netcore_blog.Models
{
    public class PostsModel
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string? Id { get; set; }

        public string subject { get; set; } = null!;

        public string category { get; set; } = null!;

        public string content { get; set; } = null!;

        public string description { get; set; } = null!;

        public string thumbnail { get; set; } = null!;

        public bool isFeatured { get; set; }

        public string createdBy { get; set; } = null!;

        public string createDate { get; set; } = null!;
    }
}
