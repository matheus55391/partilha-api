using System;
using System.Collections.Generic;

namespace Partilha.Domain.Entities
{
    public class User
    {
        public Guid Id { get; set; }
        public string FirebaseId { get; set; }
        public string Name { get; set; }
        public string Email { get; set; }
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
        public DateTime UpdatedAt { get; set; } = DateTime.UtcNow;

        public User(string name, string email, string firebaseId)
        {
            FirebaseId = firebaseId;
            Name = name;
            Email = email;
        }
    }
}
