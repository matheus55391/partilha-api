using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Partilha.Application.Interfaces;
using Partilha.Application.Services;
using Partilha.Data.Repositories;
using Partilha.Data;
using Partilha.Domain.Interfaces;

namespace Partilha.Api
{
    public static class DependencyInjection
    {
        public static IServiceCollection AddDependencyInjection(this IServiceCollection services, IConfiguration configuration)
        {
            // Configuração PostgreSQL
            var connectionString = configuration.GetConnectionString("DefaultConnection");

            services.AddDbContext<AppDbContext>(options => options.UseNpgsql(connectionString));

            //Repositories
            services.AddScoped<IUserRepository, UserRepository>();
            services.AddScoped<IFriendRepository, FriendRepository>();
            services.AddScoped<IFriendRequestRepository, FriendRequestRepository>();

            //Services
            services.AddScoped<IUserService, UserService>();
            services.AddScoped<IFriendService, FriendService>();
            services.AddScoped<ITransactionService, TransactionService>();

            return services;
        }
    }
}
