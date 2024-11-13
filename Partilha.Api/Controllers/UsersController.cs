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

        // Outros métodos ainda não implementados
    }
}
