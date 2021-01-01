using System.Text;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.IdentityModel.Tokens;
using Microsoft.OpenApi.Models;

namespace API.Extensions
{
    public static class AddSwaggerExtension
    {
        public static IServiceCollection AddSwaggerServices(this IServiceCollection services, IConfiguration config) {
                services.AddSwaggerGen(swagger => {
                swagger.SwaggerDoc("v1", new OpenApiInfo{
                    Title = "DatingApp API",
                    Description = "Dating App API version 1.0",
                    Version = "1.0"
                });               
            });           
            return services;
        }
    }
}