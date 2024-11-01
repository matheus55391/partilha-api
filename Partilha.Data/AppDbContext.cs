using Microsoft.EntityFrameworkCore;
using Partilha.Domain.Entities;
using Partilha.Data.Mappings;

namespace Partilha.Data
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }

        public DbSet<User> Users { get; set; } = null!;
        public DbSet<FriendRequest> FriendRequests { get; set; } = null!;
        public DbSet<Friend> Friendships { get; set; } = null!;

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.ApplyConfiguration(new UserMap());
            modelBuilder.ApplyConfiguration(new FriendRequestMap());
            modelBuilder.ApplyConfiguration(new FriendMap());
        }
    }
}
