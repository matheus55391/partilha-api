using Microsoft.EntityFrameworkCore;
using Partilha.Data;
using Partilha.Domain.Entities;
using Partilha.Domain.Interfaces;

public class FriendshipRepository : IFriendshipRepository
{
    private readonly AppDbContext _context;

    public FriendshipRepository(AppDbContext context)
    {
        _context = context;
    }

    public async Task CreateFriendshipRequestAsync(Guid senderId, Guid receiverId)
    {
        var request = new FriendRequest
        {
            RequestId = Guid.NewGuid(),
            SenderId = senderId,
            ReceiverId = receiverId,
            Status = FriendRequestStatus.Pending
        };

        await _context.FriendRequests.AddAsync(request);
        await _context.SaveChangesAsync();
    }


    public async Task<IEnumerable<Friendship>> GetFriendshipsAsync(Guid userId)
    {
        return await _context.Friendships
            .Where(f => f.UserId1 == userId || f.UserId2 == userId)
            .ToListAsync();
    }

    public async Task<IEnumerable<FriendRequest>> GetReceivedRequestsAsync(Guid userId)
    {
        return await _context.FriendRequests
            .Where(fr => fr.ReceiverId == userId && fr.Status == FriendRequestStatus.Pending)
            .ToListAsync();
    }
}
