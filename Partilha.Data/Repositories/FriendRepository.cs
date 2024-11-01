using Partilha.Data;
using Partilha.Domain.Entities;
using Partilha.Domain.Interfaces;
using System.Threading.Tasks;

namespace Partilha.Data.Repositories
{
    public class FriendRepository : IFriendRepository
    {
        private readonly AppDbContext _context;

        public FriendRepository(AppDbContext context)
        {
            _context = context;
        }

        public async Task AddAsync(Friend friend)
        {
            await _context.Friendships.AddAsync(friend);
            await _context.SaveChangesAsync();
        }
    }
}
