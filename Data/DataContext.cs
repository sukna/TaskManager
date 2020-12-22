using Microsoft.EntityFrameworkCore;

namespace TaskManager.Data
{
    using System;
    using System.Linq;
    using System.Threading;
    using Task.Models;
    using TaskManager.Codes.Model;
    using User.Models;
    public class DataContext : DbContext
    {
        public DataContext(DbContextOptions<DataContext> options) : base(options) { }

        public DbSet<User> Users { get; set; }

        public DbSet<Task> Tasks { get; set; }

        public DbSet<TaskLog> TaskLogs { get; set; }

        public DbSet<TaskStatusCode> TaskStatuses { get; set; }

        public DbSet<TaskPriorityCode> TaskPriorities { get; set; }

        public DbSet<TaskLogTypeCode> TaskLogTypes { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<TaskStatusCode>().HasData(
                new TaskStatusCode() { Id = 1, Name = "Not started" },
                new TaskStatusCode() { Id = 2, Name = "In progress" },
                new TaskStatusCode() { Id = 3, Name = "Complete" }
            );

            modelBuilder.Entity<TaskPriorityCode>().HasData(
                new TaskStatusCode() { Id = 1, Name = "Low" },
                new TaskStatusCode() { Id = 2, Name = "Normal" },
                new TaskStatusCode() { Id = 3, Name = "High" }
            );

            modelBuilder.Entity<TaskLogTypeCode>().HasData(
                new TaskLogTypeCode() { Id = 1, Name = "Coding" },
                new TaskLogTypeCode() { Id = 2, Name = "Brainstorming" },
                new TaskLogTypeCode() { Id = 3, Name = "Work" }
            );

        }

    }
}