using System;
using System.Collections.Generic;

namespace TaskManager.User.Models
{
    using Task.Models;

    public class User
    {
        public Guid Id { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Email { get; set; }
        public byte[] PasswordHash { get; set; }
        public byte[] PasswordSalt { get; set; }
        public string TelephoneNumber { get; set; }
        public string Provider { get; set; }
        public string Key { get; set; }


        public List<Task> Tasks { get; set; }
    }
}