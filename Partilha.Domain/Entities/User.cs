using System;
using System.Collections.Generic;

namespace Partilha.Domain.Entities
{
    public class User
    {
        public Guid Id { get; set; }
        public required string FirebaseId { get; set; }
        public required string Name { get; set; }
        public required string Email { get; set; }
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
        public DateTime UpdatedAt { get; set; } = DateTime.UtcNow;
    }
}
