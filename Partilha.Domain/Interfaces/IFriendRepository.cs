using System.Threading.Tasks;
using Partilha.Domain.Entities;

namespace Partilha.Domain.Interfaces
{
    public interface IFriendRepository
    {
        Task AddAsync(Friend friend);
    }
}
