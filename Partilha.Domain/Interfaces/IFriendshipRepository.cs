using Partilha.Domain.Entities;

namespace Partilha.Domain.Interfaces
{
    public interface IFriendshipRepository
    {
        Task CreateFriendshipRequestAsync(Guid senderId, Guid receiverId);
        Task<IEnumerable<Friendship>> GetFriendshipsAsync(Guid userId);
        Task<IEnumerable<FriendRequest>> GetReceivedRequestsAsync(Guid userId);
    }
}
