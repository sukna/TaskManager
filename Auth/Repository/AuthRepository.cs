using System.Linq;
using System.Text;
using System.Security.Cryptography;
using System;
using System.Threading.Tasks;
using TaskManager.Data;
using Microsoft.EntityFrameworkCore;
using TaskManager.Auth.Repository.Interface;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using AutoMapper;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using static Google.Apis.Auth.GoogleJsonWebSignature;

namespace TaskManager.Auth
{
    using User.Models;
    
    public class AuthRepository : IAuthRepository
    {
        private readonly DataContext _dataContext;
        private readonly IMapper _mapper;
        public IConfiguration _configuration { get; }

        public AuthRepository(DataContext dataContext, IConfiguration configuration, IMapper mapper)
        {
            _configuration = configuration;
            _dataContext = dataContext;
            _mapper = mapper;
        }

        public async Task<AppUser> Register(UserRegister user)
        {
            if (await UserExist(user.Email))
            {
                return null;
            }

            var userDb = _mapper.Map<User>(user);

            CreatePassword(user.Password, out byte[] passwordHash, out byte[] passwordSalt);
            userDb.PasswordHash = passwordHash;
            userDb.PasswordSalt = passwordSalt;
            userDb.Id = Guid.NewGuid();

            await _dataContext.Users.AddAsync(userDb);
            await _dataContext.SaveChangesAsync();

            return _mapper.Map<AppUser>(userDb);
        }
        public async Task<AppUser> Login(UserLogin login, bool provider = false)
        {
            var user = await _dataContext.Users.FirstOrDefaultAsync(u => u.Email.ToLower().Equals(login.Email.ToLower()));
            if (user != null)
            {               
                if (provider || VerifyPassword(login.Password, user.PasswordHash, user.PasswordSalt))
                {
                    var claims = new[] {
                    new Claim(JwtRegisteredClaimNames.Sub, _configuration["Auth:Jwt:Subject"]),
                    new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
                    new Claim(JwtRegisteredClaimNames.Iat, DateTime.UtcNow.ToString()),
                    new Claim("Id", user.Id.ToString()),
                    new Claim("FirstName", user.FirstName),
                    new Claim("LastName", user.LastName),
                    new Claim("Email", user.Email)
                   };

                    var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration["Auth:Jwt:Key"]));

                    var signIn = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

                    var token = new JwtSecurityToken(_configuration["Auth:Jwt:Issuer"], _configuration["Auth:Jwt:Audience"], claims, expires: DateTime.UtcNow.AddDays(1), signingCredentials: signIn);
                    
                    var appUser = _mapper.Map<AppUser>(user);
                    appUser.Token = new JwtSecurityTokenHandler().WriteToken(token);

                    return appUser;
                }
            }
            return null;
        }
        public async Task<AppUser> AuthenticateGoogleUserAsync(GoogleUserRequest request)
        {
            Payload payload = await ValidateAsync(request.Token, new ValidationSettings
            {
                Audience = new[] { _configuration["Auth:Google:ClientId"] }
            });

            return await GetOrCreateExternalLoginUser(GoogleUserRequest.PROVIDER, payload.Subject, payload.Email, payload.GivenName, payload.FamilyName);
        }
        private  async Task<User> UserProviderExist(string provider, string key, string email)
        {
            return await _dataContext.Users.FirstOrDefaultAsync(u => u.Provider.ToLower() == provider.ToLower() && u.Key == key && u.Email == email);
        }
        private async Task<bool> UserExist(string email)
        {
            return await _dataContext.Users.AnyAsync(u => u.Email.ToLower() == email.ToLower());
        }
        private async Task<AppUser> GetOrCreateExternalLoginUser(string provider, string key, string email, string firstName, string lastName)
        {
            var user = await UserProviderExist(provider, key, email);
            if (user != null)
            {
                //LOGIN USER
                return await Login(_mapper.Map<UserLogin>(user), true);
            }
            else
            {
                //REGISTER USER
                var userReg = await Register(new UserRegister(){
                    FirstName = firstName,
                    LastName = lastName,
                    Email = email,
                    Provider = provider,
                    Key = key
                });

                //LOGIN USER
                return await Login(_mapper.Map<UserLogin>(userReg), true);
            }
        }
        private void CreatePassword(string passowrd, out byte[] passwordHash, out byte[] passwordSalt)
        {
            if(passowrd != null && passowrd != "")
            {
                using (var hmac = new HMACSHA512())
                {
                    passwordSalt = hmac.Key;
                    passwordHash = hmac.ComputeHash(Encoding.UTF8.GetBytes(passowrd));
                }
            }
            else
            {
                passwordSalt = new byte[0];
                passwordHash = new byte[0];
            }
        }
        private bool VerifyPassword(string password, byte[] passwordHash, byte[] passwordSalt)
        {
            using (var hmac = new HMACSHA512())
            {
                hmac.Key = passwordSalt;
                return hmac.ComputeHash(Encoding.UTF8.GetBytes(password)).SequenceEqual(passwordHash);
            }
        }

    }
}