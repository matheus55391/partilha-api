using System;

namespace Partilha.Domain.Entities
{
    public class Friend
    {
        public Guid Id { get; set; }
        public Guid UserId { get; set; }          // ID do usuário que tem o amigo
        public Guid FriendUserId { get; set; }    // ID do amigo

        // Propriedades de navegação, se necessário
        public User User { get; set; }
        public User FriendUser { get; set; }
    }
}
