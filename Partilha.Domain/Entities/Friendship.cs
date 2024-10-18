namespace Partilha.Domain.Entities;

public class Friendship
{
    public int Id { get; set; }
    public Guid UserId { get; set; }
    public Guid FriendId { get; set; }
    public DateTime CreatedAt { get; set; }
}
