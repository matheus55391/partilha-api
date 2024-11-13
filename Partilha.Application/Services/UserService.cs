using Partilha.Domain.Entities;
using Partilha.Domain.Interfaces;
using Partilha.Application.Interfaces;
using System.Threading.Tasks;

namespace Partilha.Application.Services
{
    public class UserService : IUserService
    {
        private readonly IUserRepository _userRepository;

        public UserService(IUserRepository userRepository)
        {
            _userRepository = userRepository;
        }

        public async Task<User> GetUserByFirebaseIdAsync(string firebaseId)
        {
            return await _userRepository.GetByFirebaseIdAsync(firebaseId);
        }
        public async Task<User> GetUserByIdAsync(Guid id)
        {
            return await _userRepository.GetByIdAsync(id);
        }
    }
}
