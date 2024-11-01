using Partilha.Domain.Entities;
using System.Threading.Tasks;

namespace Partilha.Application.Interfaces
{
    public interface IUserService
    {
        Task<User> GetUserByFirebaseIdAsync(string firebaseId);
    }
}
