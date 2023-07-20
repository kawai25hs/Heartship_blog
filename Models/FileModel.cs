namespace netcore_blog.Models
{
    public class FileModel
    {
        public required string FileName { get; set; }
        public required IFormFile FormFile {get; set;}
    }
}
