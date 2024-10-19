using Partilha.Domain.Entities;

namespace Partilha.Domain.Interfaces
{
    public interface IUserRepository
    {
        Task<User?> GetByFirebaseIdAsync(string firebaseId);
        Task<User?> GetByIdAsync(string id);
        Task<User?> GetByEmailAsync(string email);

        Task AddAsync(User user);
    }
}
