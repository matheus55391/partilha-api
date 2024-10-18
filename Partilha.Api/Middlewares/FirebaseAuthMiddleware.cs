using FirebaseAdmin;
using FirebaseAdmin.Auth;
using Google.Apis.Auth.OAuth2;
using Microsoft.AspNetCore.Http;
using Partilha.Api.Models;
using System.Security.Claims;
using System.Threading.Tasks;

namespace Partilha.Api.Middlewares
{
    public class FirebaseAuthMiddleware
    {
        private readonly RequestDelegate _next;

        public FirebaseAuthMiddleware(RequestDelegate next)
        {
            _next = next;
        }

        public async Task InvokeAsync(HttpContext context)
        {
            if (context.Request.Headers.TryGetValue("Authorization", out var token))
            {
                var tokenValue = token.ToString().Replace("Bearer ", "");
                try
                {
                    var decodedToken = await FirebaseAuth.DefaultInstance.VerifyIdTokenAsync(tokenValue);
                    var firebaseUser = new FirebaseUser(decodedToken.Uid, decodedToken.Claims["email"]?.ToString() ?? "");
                    context.Items["User"] = firebaseUser;
                }
                catch (FirebaseAuthException ex)
                {
                    context.Response.StatusCode = StatusCodes.Status401Unauthorized; 
                    await context.Response.WriteAsync("Unauthorized: " + ex.Message);
                    return;
                }
            }

            await _next(context);
        }
    }

}
