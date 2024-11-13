using Partilha.Domain.Entities;
using Partilha.Domain.Interfaces;
using Partilha.Application.Interfaces;
using System.Threading.Tasks;
using Ecommerce.API.Models.Dtos;

namespace Partilha.Application.Services
{
    public class UserService : IUserService
    {
        private readonly IUserRepository _userRepository;

        public UserService(IUserRepository userRepository)
        {
            _userRepository = userRepository;
        }

        public async Task<User?> GetUserByFirebaseIdAsync(string firebaseId)
        {
            return await _userRepository.GetByFirebaseIdAsync(firebaseId);
        }
        public async Task<User?> GetUserByIdAsync(Guid id)
        {
            return await _userRepository.GetByIdAsync(id);
        }
        public async Task<User> CreateUser(UserDto userDto, string firebaseUid)
        {
            var existUser = _userRepository.GetByFirebaseIdAsync(firebaseUid);
            if (existUser != null)
                throw new Exception("User already exists");

            var newUser = new CreateUser(userDto, firebaseUid);

            await _userRepository.AddAsync(newUser);

            return newUser;
        }
    }
}
