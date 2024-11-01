using System;

namespace Partilha.Domain.Entities
{
    public enum FriendRequestStatus
    {
        Pending,
        Accepted,
        Rejected
    }

    public class FriendRequest
    {
        public Guid Id { get; set; }
        public Guid SenderId { get; set; }      // ID do usuário que envia a solicitação
        public Guid ReceiverId { get; set; }    // ID do usuário que recebe a solicitação
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow; // Data em que a solicitação foi criada
        public DateTime UpdatedAt { get; set; } = DateTime.UtcNow; // Data da última atualização
        public FriendRequestStatus Status { get; set; } = FriendRequestStatus.Pending; // Status da solicitação

        // Propriedades de navegação
        public User Sender { get; set; }
        public User Receiver { get; set; }
    }
}
