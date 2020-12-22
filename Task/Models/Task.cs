using System.Threading.Tasks;
using System;
namespace TaskManager.Task.Models
{
    using System.Collections.Generic;
    using TaskManager.Codes.Model;
    using User.Models;

    public class Task
    {
        public long Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public string Note { get; set; }
        public DateTime? StartDate { get; set; }
        public DateTime? EndDate { get; set; }

        //User who created task
        public Guid UserId { get; set; }
        public User User { get; set; }

        //Task logs
        public List<TaskLog> TaskLogs { get; set; }

        //Task status
        public long? TaskStatusCodeId { get; set; }
        public TaskStatusCode TaskStatusCode { get; set; }

        //Task priority
        public long? TaskPriorityCodeId { get; set; }
        public TaskPriorityCode TaskPriorityCode { get; set; }
    }
}