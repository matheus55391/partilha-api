using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;
using Partilha.Api.Models;

namespace Partilha.Api.Controllers
{

    public class BaseController : ControllerBase
    {
        protected FirebaseUser? FirebaseUser
        {
            get
            {
                return HttpContext.Items["User"] as FirebaseUser;
            }
        }

    }
}
