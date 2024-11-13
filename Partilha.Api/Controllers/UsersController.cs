using Ecommerce.API.Models.Dtos;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Partilha.Api.Models;
using Partilha.Application.Interfaces;
using Partilha.Application.Services;
using Partilha.Domain.Entities;
using Partilha.Domain.Interfaces;

namespace Partilha.Api.Controllers
{
    [ApiController]
    [Authorize]
    [Route("[controller]")]
    public class UsersController : BaseController
    {
        private readonly IUserService _userService;

        public UsersController(IUserService userService)
        {
            _userService = userService;
        }

        [HttpGet("{userId}")]
        [AllowAnonymous]
        public async Task<IActionResult> GetUserProfile(Guid userId)
        {
            var user = await _userService.GetUserByIdAsync(userId);
            return Ok(user);
        }

        [HttpGet("firebase/{firebaseid}")]
        [AllowAnonymous]
        public async Task<IActionResult> GetUserFirebaseProfile(string firebaseid)
        {
            var user = await _userService.GetUserByFirebaseIdAsync(firebaseid);
            return Ok(user);
        }


        [HttpGet()]
        public async Task<IActionResult> GetLoggedUser()
        {
            var user = CurrentUser;
            return Ok();
        }

        [HttpPost]
        public async Task<IActionResult> CreateUser([FromBody] UserDto userDto)
        {
            var createdUser = await _userService.CreateUser(userDto, CurrentUser.FirebaseId);
            return new OkObjectResult(createdUser);
        }

        // Outros métodos ainda não implementados
    }
}
