using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Partilha.Api.Models;
using Partilha.Domain.Entities;
using Partilha.Domain.Interfaces;

namespace Partilha.Api.Controllers
{

    [ApiController]
    [Route("[controller]")]
    public class FriendsController : BaseController
    {
        /**
        private readonly IFriendRepository _friendRepository;
        private readonly IFriendRequestRepository _friendRequestRepository;

        public FriendsController(IFriendRepository friendRepository, IFriendRequestRepository friendRequestRepository)
        {
            _friendRepository = friendRepository;
            _friendRequestRepository = friendRequestRepository;
        }

        **/

        [HttpPost("invitations/send")]
        [Authorize]
        public async Task<IActionResult> SendFriendInvitation()
        {
            // Implementação aqui (caso necessário no futuro)
            return Ok();
        }

        [HttpGet("list")]
        [Authorize]
        public async Task<IActionResult> ListFriends()
        {
            // Implementação aqui (caso necessário no futuro)
            return Ok();
        }

        [HttpGet("invitations/received")]
        [Authorize]
        public async Task<IActionResult> ListReceivedInvitations()
        {
            // Implementação aqui (caso necessário no futuro)
            return Ok();
        }

        [HttpPost("invitations/{id}/accept")]
        [Authorize]
        public async Task<IActionResult> AcceptFriendInvitation(Guid id)
        {
            // Implementação aqui (caso necessário no futuro)
            return Ok();
        }

        [HttpPost("invitations/{id}/decline")]
        [Authorize]
        public async Task<IActionResult> DeclineFriendInvitation(Guid id)
        {
            // Implementação aqui (caso necessário no futuro)
            return Ok();
        }

        [HttpDelete("remove/{friendId}")]
        [Authorize]
        public async Task<IActionResult> RemoveFriend(Guid friendId)
        {
            // Implementação aqui (caso necessário no futuro)
            return Ok();
        }
    }
}
