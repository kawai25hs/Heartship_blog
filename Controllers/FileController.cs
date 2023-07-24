using netcore_blog.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.IO;

namespace netcore_blog.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class FileController : ControllerBase
    {
        private readonly IWebHostEnvironment hostingEnvironment;
        public FileController(IWebHostEnvironment environment)
        {
            hostingEnvironment = environment;
        }

        [HttpPost]
        [Route("upload")]
        public ActionResult Post([FromForm] FileModel file)
        {
            try
            {
                string path = Path.Combine(hostingEnvironment.WebRootPath, file.FileName);//Directory.GetCurrentDirectory()
                using (Stream stream = new FileStream(path, FileMode.Create))
                {
                    file.FormFile.CopyTo(stream);
                }

                return StatusCode(StatusCodes.Status201Created);
            }
            catch (Exception)
            {
                return StatusCode(StatusCodes.Status500InternalServerError);
            }
        }

        [HttpGet]
        public ActionResult Get()
        {
            return Ok("all good");//StatusCode(StatusCodes.Status200OK);
        }
    }
}
