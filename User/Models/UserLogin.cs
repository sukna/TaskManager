using System.ComponentModel.DataAnnotations;

namespace TaskManager.User.Models
{
    public class UserLogin
    {
        [Required]
        public string Email { get; set; }
        
        [Required]
        public string Password { get; set; }
    }
}