using Partilha.Domain.Entities;

namespace Partilha.Domain.Interfaces;

public interface IUserRepository
{
    Task<User?> GetByEmailAsync(string email);
}
