using Partilha.Domain.Entities;
using Partilha.Domain.Interfaces;

namespace Partilha.Application.Services;

public class FriendService
{
    private readonly IUserRepository _userRepository;

    public FriendService(IUserRepository userRepository)
    {
        _userRepository = userRepository;
    }

    public async Task<bool> AddFriendAsync(string userId, string friendEmail)
    {
        var friend = await _userRepository.GetByEmailAsync(friendEmail);
        if (friend == null) return false;

        // Adiciona a lógica para salvar a amizade (simulação)
        Console.WriteLine($"Amizade registrada: {userId} -> {friend.Id}");
        return true;
    }
}
