using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Partilha.Domain.Entities;

namespace Partilha.Data.Mappings
{
    public class UserMap : IEntityTypeConfiguration<User>
    {
        public void Configure(EntityTypeBuilder<User> builder)
        {
            builder.ToTable("Users");

            builder.HasKey(u => u.Id); // Chave primária
            builder.Property(u => u.Name).IsRequired().HasMaxLength(100);
            builder.Property(u => u.Email).IsRequired().HasMaxLength(255);
            builder.Property(u => u.FirebaseId).IsRequired().HasMaxLength(255);
            builder.Property(u => u.CreatedAt).HasDefaultValueSql("CURRENT_TIMESTAMP");
            builder.Property(u => u.UpdatedAt).HasDefaultValueSql("CURRENT_TIMESTAMP");

            builder.HasIndex(u => u.Email).IsUnique();
            builder.HasIndex(u => u.FirebaseId).IsUnique();
        }
    }
}
