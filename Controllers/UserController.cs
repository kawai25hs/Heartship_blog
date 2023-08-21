using Microsoft.AspNetCore.Mvc;
using netcore_blog.Models;
using netcore_blog.Services;

namespace netcore_blog.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class UserController : ControllerBase
    {
        private readonly UserService _userService;
        public UserController(UserService userService) =>
            _userService = userService;

        [HttpPost]
        [Route("Register")]
        public async Task<IActionResult> Register(UserModel newUser)
        {
            await _userService.Register(newUser);

            return StatusCode(201);
        }

        [HttpPost]
        [Route("Login")]
        public IActionResult Login(UserModel user)
        {
            bool succeed = _userService.Login(user);

            if (succeed)
            {
                return Ok();
            }
            else
            {
                return Unauthorized("Username or password is incorrect!");
            }
        }
    }
}
