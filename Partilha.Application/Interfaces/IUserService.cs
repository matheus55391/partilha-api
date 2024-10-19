using Partilha.Domain.Entities;

namespace Partilha.Application.Interfaces
{
    public interface IUserService
    {
        Task<User?> GetUserByFirebaseIdAsync(string firebaseId);
        Task<User?> GetUserByIdAsync(string userId);
        Task<User?> GetUserByEmailAsync(string userId);

        Task CreateUserAsync(User user);
    }
}
