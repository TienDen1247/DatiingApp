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
                // swagger.AddSecurityDefinition("Authentication", 
                // new OpenApiSecurityScheme{
                //     Name = "Authorization",
                //     Type = SecuritySchemeType.ApiKey,
                //     Description = "JWT Authorization header using the bearer schema",
                //     In = ParameterLocation.Header,
                //     BearerFormat = "JWT",
                // });
                // swagger.AddSecurityRequirement(new OpenApiSecurityRequirement {
                //     {
                //         new OpenApiSecurityScheme{
                //             Reference = new OpenApiReference {
                //                 Type = ReferenceType.SecurityScheme,
                //                 Id = "Bearer"
                //             }
                //         },
                //         new string[] {}
                //     }
                // });
            });

            // services.AddAuthentication(option => {
            //     option.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme; 
            //     option.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
            // }).AddJwtBearer(options => {
            //     options.TokenValidationParameters = new TokenValidationParameters{
            //         ValidateIssuer = true,
            //         ValidateAudience = true,
            //         ValidateLifetime = false,
            //         ValidateIssuerSigningKey = true,
            //        ValidIssuer = Configuration["Jwt:Issuer"],  
            //         ValidAudience = Configuration["Jwt:Issuer"],  
            //         IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(Configuration["Jwt:Key"])) //Configuration["JwtToken:SecretKey"]  
            //     };
            // });

            return services;
        }
    }
}