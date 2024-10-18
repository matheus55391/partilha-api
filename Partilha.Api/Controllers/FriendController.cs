using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Partilha.Api.Models;
using Partilha.Application.Services;
using System.Security.Claims;

namespace Partilha.Api.Controllers;

[ApiController]
[Route("api/friends")]
[Authorize] 
public class FriendController : BaseController
{
    private readonly FriendService _friendService;

    public FriendController(FriendService friendService)
    {
        _friendService = friendService;
    }

    [HttpGet]
    public IActionResult GetFriends()
    {
        FirebaseUser user = this.FirebaseUser!;

        return Ok(); 
    }


    [HttpPost]
    public async Task<IActionResult> AddFriend([FromBody] AddFriendRequest request)
    {
        throw new NotImplementedException();
        var userId = User.FindFirst("user_id")?.Value;

        if (userId == null)
            return Unauthorized("Usuário não autenticado.");

        var result = await _friendService.AddFriendAsync(userId, request.FriendEmail);
        if (!result)
            return BadRequest("Não foi possível adicionar o amigo.");

        return Ok("Amigo adicionado com sucesso.");
    }
}

public class AddFriendRequest
{
    public string FriendEmail { get; set; } = string.Empty;
}
