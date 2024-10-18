using Microsoft.EntityFrameworkCore;
using Partilha.Domain.Entities;
using Partilha.Domain.Interfaces;

namespace Partilha.Data.Repositories;

public class UserRepository : IUserRepository
{
    private readonly AppDbContext _context;

    public UserRepository(AppDbContext context)
    {
        _context = context;
    }

    public async Task<User?> GetByEmailAsync(string email)
    {
        return await _context.Users.FirstOrDefaultAsync(u => u.Email == email);
    }
}
