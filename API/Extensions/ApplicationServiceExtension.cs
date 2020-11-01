using API.Data;
using API.Interfaces;
using API.Services;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

namespace API.Extensions
{
    public static class ApplicationServiceExtension
    {
        public static IServiceCollection AddApplictionServices(this IServiceCollection services, IConfiguration config)
        {
            services.AddScoped<ITokenService, TokenService>();
            services.AddEntityFrameworkSqlite().AddDbContext<DataContext>(options =>
                       {
                           options.UseSqlite(config.GetConnectionString("DefaultConnection"));
                       });
            return services;
        }
    }
}