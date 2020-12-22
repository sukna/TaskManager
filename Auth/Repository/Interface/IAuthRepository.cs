using System.Threading.Tasks;

namespace TaskManager.Auth.Repository.Interface
{
    using User.Models;

    public interface IAuthRepository
    {
        Task<AppUser> Register(UserRegister user);
        Task<AppUser> Login(UserLogin user, bool provider = false);
        Task<AppUser> AuthenticateGoogleUserAsync(GoogleUserRequest request);
    }
}