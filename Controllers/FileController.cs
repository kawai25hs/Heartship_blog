using netcore_blog.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.IO;
using Microsoft.AspNetCore.Http.Extensions;

namespace netcore_blog.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class FileController : ControllerBase
    {
        private readonly IWebHostEnvironment hostingEnvironment;
        private readonly IHttpContextAccessor _httpContextAccessor;

        public FileController(IWebHostEnvironment environment, IHttpContextAccessor httpContextAccessor)
        {
            hostingEnvironment = environment;
            _httpContextAccessor = httpContextAccessor;
        }

        [HttpPost]
        [Route("upload")]
        public ActionResult Post([FromForm] FileModel file)
        {
            try
            {
                var request = _httpContextAccessor.HttpContext?.Request;
                var baseURL = $"{request.Scheme}://{request.Host}/";
                string uploadFolder = "uploaded/";
                var now = DateTime.Now.ToString("yyyyMMdd_HH_mm_ss");
                string fileName = file.FileName.Substring(0, file.FileName.LastIndexOf(".")) + "_" + now + file.FileName.Substring(file.FileName.LastIndexOf("."));

                string path = Path.Combine(hostingEnvironment.WebRootPath, uploadFolder, fileName);
                using (Stream stream = new FileStream(path, FileMode.Create))
                {
                    file.FormFile.CopyTo(stream);
                }

                return Ok(baseURL + uploadFolder + fileName);
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
