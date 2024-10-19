using Microsoft.AspNetCore.Mvc;
using Partilha.Domain.Entities;
using Partilha.Application.Interfaces;
using Partilha.Api.DTOs;

namespace Partilha.Api.Controllers;

[ApiController]
[Route("api/users")]
public class UsersController : BaseController
{
    private readonly IUserService _userService;

    public UsersController(IUserService userService)
    {
        _userService = userService;
    }

}
