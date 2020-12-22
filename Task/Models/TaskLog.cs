using System;
namespace TaskManager.Task.Models
{
    using TaskManager.Codes.Model;

    public class TaskLog
    {
        public long Id { get; set; }
        public TimeSpan Time { get; set; }
        public string Comment { get; set; }

        //Task
        public long TaskId { get; set; }

        public Task Task { get; set; }

        //Log type
        public long TaskLogTypeId { get; set; }
        public TaskLogTypeCode TaskLogType { get; set; }
    }
}