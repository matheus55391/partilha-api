using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Partilha.Api.Models;
using Partilha.Domain.Entities;
using Partilha.Domain.Interfaces;

namespace Partilha.Api.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class UsersController : BaseController
    {
        private readonly IUserRepository _userRepository;

        public UsersController(IUserRepository userRepository)
        {
            _userRepository = userRepository;
        }

        [HttpGet("{userId}/profile")]
        [Authorize]
        public async Task<IActionResult> GetUserProfile(Guid userId)
        {
            return Ok();
        }

        // Outros métodos ainda não implementados
    }
}
