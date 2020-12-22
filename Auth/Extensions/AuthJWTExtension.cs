using System.Text;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.IdentityModel.Tokens;
using TaskManager.Auth.Repository.Interface;

namespace TaskManager.Auth.Extensions
{
    public static class AuthJWTExtension
    {
        public static IServiceCollection AddJWTAuthToken(this IServiceCollection services, IConfiguration configuration)
        {
            services.AddScoped<IAuthRepository, AuthRepository>();

            services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
            .AddJwtBearer(options =>
            {
                options.RequireHttpsMetadata = false;
                options.SaveToken = true;
                options.TokenValidationParameters = new TokenValidationParameters()
                {
                    //Nema potrebe za refresh tokena
                    ValidateLifetime = false,

                    ValidateIssuer = true,
                    ValidIssuer = configuration["Auth:Jwt:Issuer"],
                    ValidateAudience = true,
                    ValidAudience = configuration["Auth:Jwt:Audience"],
                    IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(configuration["Auth:Jwt:Key"]))
                };

            })
            .AddGoogleOpenIdConnect(options =>
               {
                   options.ClientId = configuration["Auth:Google:ClientId"];
                   options.ClientSecret = configuration["Auth:Google:ClientSecret"];
               });

            return services;
        }
    }
}