using Partilha.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Partilha.Application.Interfaces
{
    public interface IFriendshipService
    {
        Task SendFriendRequestAsync(string senderFirebaseId, string receiverFirebaseId);
        Task<List<Friendship>> GetFriendsAsync(Guid userId);
        Task<List<FriendRequest>> GetPendingRequestsAsync(Guid userId);
    }
}
