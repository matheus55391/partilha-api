using Microsoft.AspNetCore.Mvc;
using Partilha.Api.Models;
using Partilha.Domain.Entities;

namespace Partilha.Api.Controllers
{
    public class BaseController : ControllerBase
    {
        protected User CurrentUser
        {
            get
            {
                return HttpContext.Items["User"] as User;
            }
        }
    }
}
