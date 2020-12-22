using System;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using TaskManager.Auth.Repository.Interface;
using Microsoft.AspNetCore.Cors;
using TaskManager.User.Models;

namespace TaskManager.Controllers
{
    using AutoMapper;
    using User.Models;

    [ApiController]
    [EnableCors("AllowOrigin")]
    [Route("api/[controller]")]
    public class AuthController : ControllerBase
    {
        private readonly IAuthRepository _authRepository;
        private readonly IMapper _mapper;

        public AuthController(IAuthRepository authRepository, IMapper mapper)
        {
            _authRepository = authRepository;
            _mapper = mapper;
        }

        [HttpPost("google-auth")]
        public async Task<IActionResult> GoogleAuthenticate(GoogleUserRequest request)
        {
            if (!ModelState.IsValid)
                return BadRequest();

            return Ok(await _authRepository.AuthenticateGoogleUserAsync(request));
        }

        [HttpPost("Register")]
        public async Task<IActionResult> Register(UserRegister model)
        {
            var response = await _authRepository.Register(model);
            if (response == null)
            {
                return BadRequest(new { message = "Email already used!" });
            }
            return Ok(response);
        }

        [HttpPost("Login")]
        public async Task<IActionResult> Login(UserLogin model)
        {
            if(!ModelState.IsValid)
                return BadRequest();

            var response = await _authRepository.Login(model);
            return response != null ? Ok(response) : BadRequest(new { message = "User not found." });
        }
    }
}