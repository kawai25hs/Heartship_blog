namespace netcore_blog.Models
{
    public class DevDatabaseSettings
    {
        public string ConnectionString { get; set; } = null!;

        public string DatabaseName { get; set; } = null!;

        public string PostsCollectionName { get; set; } = null!;

        public string UserCollectionName { get; set; } = null!;
    }
}
