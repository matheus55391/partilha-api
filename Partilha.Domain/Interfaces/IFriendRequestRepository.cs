using System.Threading.Tasks;
using Partilha.Domain.Entities;

namespace Partilha.Domain.Interfaces
{
    public interface IFriendRequestRepository
    {
        Task<FriendRequest> GetByIdAsync(Guid id);
        Task<FriendRequest> GetPendingRequestAsync(Guid senderId, Guid receiverId);
        Task AddAsync(FriendRequest friendRequest);
        Task UpdateAsync(FriendRequest friendRequest);
    }
}
