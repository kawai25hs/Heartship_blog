using MongoDB.Driver;
using netcore_blog.Models;
using Microsoft.Extensions.Options;

namespace netcore_blog.Services
{
    public class UserService
    {
        private readonly IMongoCollection<UserModel> _userCollection;

        public UserService(
            IOptions<DevDatabaseSettings> BlogDatabaseSettings)
        {
            var mongoClient = new MongoClient(
                BlogDatabaseSettings.Value.ConnectionString);

            var mongoDatabase = mongoClient.GetDatabase(
                BlogDatabaseSettings.Value.DatabaseName);

            _userCollection = mongoDatabase.GetCollection<UserModel>(
                BlogDatabaseSettings.Value.UserCollectionName);
        }

        public async Task Register(UserModel theUser)
        {
            theUser.password = BCrypt.Net.BCrypt.HashPassword(theUser.password);
            bool res = _userCollection.Find(x => x.username == theUser.username).Any();

            if (!res)
            {
                await _userCollection.InsertOneAsync(theUser);
            }
        }

        public bool Login(UserModel theUser)
        {
            bool isValid = false;
            var fields = Builders<UserModel>.Projection.Include("password").Exclude("_id");
            var res = _userCollection.Find(x => x.username == theUser.username);

            if (res.Any())
            {
                var password = res.Project(u => u.password ).First();
                isValid = BCrypt.Net.BCrypt.Verify(theUser.password, password);
            }

            return isValid;
        }

        public async Task RemoveAsync(string id) =>
            await _userCollection.DeleteOneAsync(x => x.Id == id);

    }
}
