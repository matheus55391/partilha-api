using Partilha.Application.Interfaces;
using Partilha.Domain.Interfaces;

namespace Partilha.Application.Services
{
    public class FriendService : IFriendService
    {
        private readonly IFriendRepository _friendRepository;

        public FriendService(IFriendRepository userRepository)
        {
            _friendRepository = userRepository;
        }
        // Implementação dos métodos
    }
}
