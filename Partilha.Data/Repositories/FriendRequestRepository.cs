using Microsoft.EntityFrameworkCore;
using Partilha.Data;
using Partilha.Domain.Entities;
using Partilha.Domain.Interfaces;
using System;
using System.Threading.Tasks;

namespace Partilha.Data.Repositories
{
    public class FriendRequestRepository : IFriendRequestRepository
    {
        private readonly AppDbContext _context;

        public FriendRequestRepository(AppDbContext context)
        {
            _context = context;
        }

        public async Task<FriendRequest> GetByIdAsync(Guid id)
        {
            return await _context.FriendRequests.FindAsync(id) ?? throw new KeyNotFoundException("Friend request not found.");
        }

        public async Task<FriendRequest> GetPendingRequestAsync(Guid senderId, Guid receiverId)
        {
            return await _context.FriendRequests
                .SingleOrDefaultAsync(fr => fr.SenderId == senderId && fr.ReceiverId == receiverId && fr.Status == FriendRequestStatus.Pending)
                ?? throw new KeyNotFoundException("Pending friend request not found.");
        }

        public async Task AddAsync(FriendRequest friendRequest)
        {
            await _context.FriendRequests.AddAsync(friendRequest);
            await _context.SaveChangesAsync();
        }

        public async Task UpdateAsync(FriendRequest friendRequest)
        {
            _context.FriendRequests.Update(friendRequest);
            await _context.SaveChangesAsync();
        }
    }
}
