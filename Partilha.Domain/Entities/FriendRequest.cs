using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Partilha.Domain.Entities
{
    public class FriendRequest
    {
        public Guid RequestId { get; set; }
        public Guid SenderId { get; set; }
        public Guid ReceiverId { get; set; }
        public FriendRequestStatus Status { get; set; } = FriendRequestStatus.Pending;
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
        public DateTime UpdatedAt { get; set; } = DateTime.UtcNow;
    }

    public enum FriendRequestStatus
    {
        Pending,
        Accepted,
        Rejected
    }
}
