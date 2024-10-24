using Microsoft.EntityFrameworkCore;
using Partilha.Data;
using Partilha.Domain.Entities;
using Partilha.Domain.Interfaces;

public class UserRepository : IUserRepository
{
    private readonly AppDbContext _context;

    public UserRepository(AppDbContext context)
    {
        _context = context;
    }

    public async Task<User?> GetByFirebaseIdAsync(string firebaseId)
    {
        User? user = await _context.Users.FirstOrDefaultAsync(u => u.FirebaseId == firebaseId);
        return user;
    }

    public async Task<User?> GetByEmailAsync(string email)
    {
        return await _context.Users.FirstOrDefaultAsync(u => u.Email == email);
    }

    public async Task<User?> GetByIdAsync(string id)
    {
        Guid guid = Guid.Parse(id);
        return await _context.Users.FirstOrDefaultAsync(u => u.Id == guid);
    }

    public async Task AddAsync(User newUser)
    {
        await _context.Users.AddAsync(newUser);
        await _context.SaveChangesAsync();
    }
}
