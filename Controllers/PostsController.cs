using Microsoft.AspNetCore.Mvc;
using netcore_blog.Models;
using netcore_blog.Services;

namespace netcore_blog.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class PostsController : ControllerBase
    {
        private readonly PostsService _postsService;

        public PostsController(PostsService postsService) =>
            _postsService = postsService;

        [HttpGet]
        public async Task<List<PostsModel>> Get() =>
            await _postsService.GetAsync();

        [HttpGet("{id:length(24)}")]
        public async Task<ActionResult<PostsModel>> Get(string id)
        {
            var book = await _postsService.GetAsync(id);

            if (book is null)
            {
                return NotFound();
            }

            return book;
        }

        [HttpPost]
        public async Task<IActionResult> Post(PostsModel newBook)
        {
            await _postsService.CreateAsync(newBook);

            return CreatedAtAction(nameof(Get), new { id = newBook.Id }, newBook);
        }

        [HttpPut("{id:length(24)}")]
        public async Task<IActionResult> Update(string id, PostsModel updatedBook)
        {
            var book = await _postsService.GetAsync(id);

            if (book is null)
            {
                return NotFound();
            }

            updatedBook.Id = book.Id;

            await _postsService.UpdateAsync(id, updatedBook);

            return NoContent();
        }

        [HttpDelete("{id:length(24)}")]
        public async Task<IActionResult> Delete(string id)
        {
            var book = await _postsService.GetAsync(id);

            if (book is null)
            {
                return NotFound();
            }

            await _postsService.RemoveAsync(id);

            return NoContent();
        }
    }
}
