using Microsoft.EntityFrameworkCore;
using Partilha.Domain.Entities;

namespace Partilha.Data
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }

        public DbSet<User> Users { get; set; } = null!;
        public DbSet<FriendRequest> FriendRequests { get; set; } = null!;
        public DbSet<Friendship> Friendships { get; set; } = null!;

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<User>(entity =>
            {
                entity.ToTable("Users");

                entity.HasKey(u => u.Id); // Chave primária
                entity.Property(u => u.Name).IsRequired().HasMaxLength(100);
                entity.Property(u => u.Email).IsRequired().HasMaxLength(255);
                entity.Property(u => u.FirebaseId).IsRequired().HasMaxLength(255);
                entity.Property(u => u.CreatedAt).HasDefaultValueSql("CURRENT_TIMESTAMP");
                entity.Property(u => u.UpdatedAt).HasDefaultValueSql("CURRENT_TIMESTAMP");

                entity.HasIndex(u => u.Email).IsUnique();
                entity.HasIndex(u => u.FirebaseId).IsUnique();
            });

            // Configuração da entidade FriendRequest
            modelBuilder.Entity<FriendRequest>(entity =>
            {
                entity.ToTable("FriendRequests");

                entity.HasKey(fr => fr.RequestId); // Chave primária
                entity.Property(fr => fr.Status).IsRequired(); // Campo de status
                entity.Property(fr => fr.CreatedAt).HasDefaultValueSql("CURRENT_TIMESTAMP");
                entity.Property(fr => fr.UpdatedAt).HasDefaultValueSql("CURRENT_TIMESTAMP");

                // Relacionamentos
                entity.HasOne<User>() // Usuário que envia o pedido
                    .WithMany() // Não precisamos de navegação em User neste caso
                    .HasForeignKey(fr => fr.SenderId)
                    .OnDelete(DeleteBehavior.Cascade);

                entity.HasOne<User>() // Usuário que recebe o pedido
                    .WithMany() // Não precisamos de navegação em User neste caso
                    .HasForeignKey(fr => fr.ReceiverId)
                    .OnDelete(DeleteBehavior.Cascade);
            });

            // Configuração da entidade Friendship
            modelBuilder.Entity<Friendship>(entity =>
            {
                entity.ToTable("Friendships");

                entity.HasKey(f => f.FriendshipId); // Chave primária
                entity.Property(f => f.CreatedAt).HasDefaultValueSql("CURRENT_TIMESTAMP");

                // Relacionamentos
                entity.HasOne<User>() // Primeiro usuário na amizade
                    .WithMany() // Não precisamos de navegação em User neste caso
                    .HasForeignKey(f => f.UserId1)
                    .OnDelete(DeleteBehavior.Cascade);

                entity.HasOne<User>() // Segundo usuário na amizade
                    .WithMany() // Não precisamos de navegação em User neste caso
                    .HasForeignKey(f => f.UserId2)
                    .OnDelete(DeleteBehavior.Cascade);
            });
        }
    }
}
