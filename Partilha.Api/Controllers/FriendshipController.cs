using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Partilha.Api.DTOs;
using Partilha.Application.Interfaces;
using Partilha.Application.Services;
using Partilha.Domain.Entities;
using System;
using System.Threading.Tasks;

namespace Partilha.Api.Controllers
{
    [ApiController]
    [Route("api/friendship")]
    public class FriendshipController : BaseController
    {
        private readonly IFriendshipService _friendshipService;

        public FriendshipController(IFriendshipService friendshipService)
        {
            _friendshipService = friendshipService;
        }

        // Enviar pedido de amizade
        [HttpPost("send-request")]
        [Authorize]
        public async Task<IActionResult> SendFriendRequest([FromBody] FriendshipRequestDto data)
        {
            try
            {
                string firebaseId = FirebaseUser!.Id;
                await _friendshipService.SendFriendRequestAsync(firebaseId, data.ReceiverId);
                return Ok("Sent friend request successfully.");
            }
            catch (InvalidOperationException ex)
            {
                return BadRequest(ex.Message);
            }
        }

        // Listar amigos
        [HttpGet("friends/{userId}")]
        public async Task<IActionResult> GetFriends(Guid userId)
        {
            var friends = await _friendshipService.GetFriendsAsync(userId);
            return Ok(friends);
        }

        // Listar pedidos de amizade pendentes
        [HttpGet("pending-requests/{userId}")]
        public async Task<IActionResult> GetPendingRequests(Guid userId)
        {
            var requests = await _friendshipService.GetPendingRequestsAsync(userId);
            return Ok(requests);
        }

    }
}
