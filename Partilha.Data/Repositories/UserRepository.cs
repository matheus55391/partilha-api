using Microsoft.EntityFrameworkCore;
using Partilha.Data;
using Partilha.Domain.Entities;
using Partilha.Domain.Interfaces;
using System;
using System.Threading.Tasks;

namespace Partilha.Data.Repositories
{
    public class UserRepository : IUserRepository
    {
        private readonly AppDbContext _context;

        public UserRepository(AppDbContext context)
        {
            _context = context;
        }

        public async Task<User> GetByIdAsync(Guid id)
        {
            return await _context.Users.FindAsync(id) ?? throw new KeyNotFoundException("User not found.");
        }

        public async Task<User> GetByFirebaseIdAsync(string firebaseId)
        {
            return await _context.Users.SingleAsync(u => u.FirebaseId == firebaseId) ?? throw new KeyNotFoundException("User not found.");
        }

        public async Task AddAsync(User user)
        {
            await _context.Users.AddAsync(user);
            await _context.SaveChangesAsync();
        }
    }
}
