using Partilha.Domain.Entities;

namespace Partilha.Domain.Interfaces
{
    public interface IUserRepository
    {
        Task<User?> GetByIdAsync(Guid id);
        Task<User?> GetByFirebaseIdAsync(string firebaseId);
        Task AddAsync(User user);
    }
}
