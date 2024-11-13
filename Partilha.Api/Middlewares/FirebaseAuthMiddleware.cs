using FirebaseAdmin.Auth;
using Microsoft.AspNetCore.Http;
using Partilha.Api.Models;
using Partilha.Application.Interfaces;
using Partilha.Domain.Entities;
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

        public async Task InvokeAsync(HttpContext context, IUserService _userService)
        {
            if (!context.Request.Headers.TryGetValue("Authorization", out var token))
            {
                await _next(context);
                return;
            }

            var tokenValue = ExtractToken(token);
            if (string.IsNullOrEmpty(tokenValue))
            {
                await _next(context);
                return;
            }

            var firebaseUser = await AuthenticateTokenAsync(tokenValue);
            if (firebaseUser == null)
            {
                await RespondUnauthorizedAsync(context, "Unauthorized: Invalid or expired token.");
                return;
            }

            var user = await _userService.GetUserByFirebaseIdAsync(firebaseUser.Id);
            if (user == null)
            {
                await RespondUnauthorizedAsync(context, "Unauthorized: User not found.");
                return;
            }

            context.Items["User"] = user;
            await _next(context);
        }

        private static string ExtractToken(string token) => token.Replace("Bearer ", string.Empty).Trim();

        private async Task<FirebaseUser?> AuthenticateTokenAsync(string tokenValue)
        {
            try
            {
                var decodedToken = await FirebaseAuth.DefaultInstance.VerifyIdTokenAsync(tokenValue);
                var email = decodedToken.Claims.TryGetValue("email", out var emailClaim) ? emailClaim.ToString() : string.Empty;

                return new FirebaseUser(decodedToken.Uid, email);
            }
            catch (FirebaseAuthException)
            {
                return null;
            }
        }


        private static async Task RespondUnauthorizedAsync(HttpContext context, string message)
        {
            context.Response.StatusCode = StatusCodes.Status401Unauthorized;
            await context.Response.WriteAsJsonAsync(message);
        }
    }
}
