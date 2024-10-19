using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Partilha.Domain.Entities
{
    public class Friendship
    {
        public Guid FriendshipId { get; set; }
        public Guid UserId1 { get; set; }
        public Guid UserId2 { get; set; }
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    }
}
