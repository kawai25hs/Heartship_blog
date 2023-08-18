using Microsoft.Extensions.Options;
using MongoDB.Driver;
using netcore_blog.Models;

namespace netcore_blog.Services
{
    public class PostsService
    {
        private readonly IMongoCollection<PostsModel> _postsCollection;

        public PostsService(
            IOptions<DevDatabaseSettings> BlogDatabaseSettings)
        {
            var mongoClient = new MongoClient(
                BlogDatabaseSettings.Value.ConnectionString);

            var mongoDatabase = mongoClient.GetDatabase(
                BlogDatabaseSettings.Value.DatabaseName);

            _postsCollection = mongoDatabase.GetCollection<PostsModel>(
                BlogDatabaseSettings.Value.PostsCollectionName);
        }

        public async Task<List<PostsModel>> GetAsync() =>
            await _postsCollection.Find(_ => true).ToListAsync();

        public async Task<PostsModel?> GetAsync(string id) =>
            await _postsCollection.Find(x => x.Id == id).FirstOrDefaultAsync();

        public async Task<List<PostsModel>> GetFeaturedPostAsync() =>
            await _postsCollection.Find(x => x.isFeatured == true).ToListAsync();

        public async Task CreateAsync(PostsModel newBook) =>
            await _postsCollection.InsertOneAsync(newBook);

        public async Task UpdateAsync(string id, PostsModel updatedBook) =>
            await _postsCollection.ReplaceOneAsync(x => x.Id == id, updatedBook);

        public async Task RemoveAsync(string id) =>
            await _postsCollection.DeleteOneAsync(x => x.Id == id);
    }
}
