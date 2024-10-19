using Microsoft.AspNetCore.Mvc;
using Partilha.Domain.Entities;
using Partilha.Application.Interfaces;
using Partilha.Api.DTOs;
using Microsoft.AspNetCore.Authorization;

namespace Partilha.Api.Controllers;

[ApiController]
[Route("api/auth")]
public class AuthController : BaseController
{
    // Método para testar o token
    [HttpGet("test-token")]
    [Authorize] // Isso requer que o usuário esteja autenticado
    public IActionResult TestToken()
    {
        // Se o token for válido, você pode retornar algum dado ou uma mensagem
        return Ok(new { Message = "Token válido!" });
    }
}
