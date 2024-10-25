using Partilha.Application.Interfaces;
using Partilha.Domain.Entities;
using Partilha.Domain.Interfaces;

namespace Partilha.Application.Services
{
    public class FriendshipService : IFriendshipService
    {
        private readonly IFriendshipRepository _friendshipRepository;
        private readonly IUserService _userService;

        public FriendshipService(IFriendshipRepository friendshipRepository, IUserService userService)
        {
            _friendshipRepository = friendshipRepository;
            _userService = userService;
        }

        public async Task SendFriendRequestAsync(string senderFirebaseId, string receiverFirebaseId)
        {
            //retorna os 2 usuarios pelo firebaseId
            User? senderUser = await _userService.GetUserByFirebaseIdAsync(senderFirebaseId);
            User? receiverUser = await _userService.GetUserByFirebaseIdAsync(receiverFirebaseId);
            if(senderUser == null || receiverUser == null)
            {
                throw new Exception("User not found");
            }
            //verificar se os 2 usuarios ja estao na lista de amigos
            List<Friendship> friends = await GetFriendsAsync(senderUser.Id);
            foreach(Friendship friendship in friends)
            {
                if(friendship.UserId2 == receiverUser.Id)
                {
                    throw new Exception("Already friends");
                }
            }

            //verifica se já existe uma solicitaro de amizade
            List<FriendRequest> requests = await GetPendingRequestsAsync(senderUser.Id);
            foreach(FriendRequest request in requests)
            {
                if(
                    (request.SenderId == senderUser.Id && request.ReceiverId == receiverUser.Id) || 
                    (request.SenderId == receiverUser.Id && request.ReceiverId == senderUser.Id))
                {
                    throw new Exception("Already requested");
                }
            }
            //regrista a friend request
            await _friendshipRepository.CreateFriendshipRequestAsync(senderUser.Id, receiverUser.Id);
        }


        public async Task<List<Friendship>> GetFriendsAsync(Guid userId)
        {
            return (List<Friendship>)await _friendshipRepository.GetFriendshipsAsync(userId);
        }

        public async Task<List<FriendRequest>> GetPendingRequestsAsync(Guid userId)
        {
            return (List<FriendRequest>)await _friendshipRepository.GetReceivedRequestsAsync(userId);
        }
    }
}
