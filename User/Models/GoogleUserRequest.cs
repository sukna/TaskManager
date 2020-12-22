using System.ComponentModel.DataAnnotations;

namespace TaskManager.User.Models
{
    public class GoogleUserRequest
    {
        [Required]
        public string Token { get; set; }
        public const string PROVIDER = "google";
    }
}