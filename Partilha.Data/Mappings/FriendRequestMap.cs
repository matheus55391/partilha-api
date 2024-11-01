using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Partilha.Domain.Entities;

namespace Partilha.Data.Mappings
{
    public class FriendRequestMap : IEntityTypeConfiguration<FriendRequest>
    {
        public void Configure(EntityTypeBuilder<FriendRequest> builder)
        {
            builder.ToTable("FriendRequests");

            builder.HasKey(fr => fr.Id); // Chave primária
            builder.Property(fr => fr.CreatedAt).HasDefaultValueSql("CURRENT_TIMESTAMP");
            builder.Property(fr => fr.UpdatedAt).HasDefaultValueSql("CURRENT_TIMESTAMP");
            builder.Property(fr => fr.Status).IsRequired(); // Campo de status

            // Relacionamentos
            builder.HasOne(fr => fr.Sender)
                .WithMany()
                .HasForeignKey(fr => fr.SenderId)
                .OnDelete(DeleteBehavior.Cascade);

            builder.HasOne(fr => fr.Receiver)
                .WithMany()
                .HasForeignKey(fr => fr.ReceiverId)
                .OnDelete(DeleteBehavior.Cascade);
        }
    }
}
