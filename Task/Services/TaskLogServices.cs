using System;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using TaskManager.Data;
using TaskManager.Task.Models;
using TaskManager.Task.Services.Interface;

namespace TaskManager.Task.Services
{
    public class TaskLogServices : ITaskLogServices
    {
        private readonly DataContext _dataContext;

        public TaskLogServices(DataContext dataContext)
        {
            _dataContext = dataContext;
        }

        public async Task<TaskLog> create(TaskLog task)
        {
            await _dataContext.TaskLogs.AddAsync(task);
            _dataContext.SaveChanges();
            return task;
        }

        public async Task<bool> delete(long id)
        {
            var taskLog = await _dataContext.TaskLogs.FirstOrDefaultAsync(t => t.Id == id);
            if (taskLog != null)
            {
                _dataContext.TaskLogs.Remove(taskLog);
                await _dataContext.SaveChangesAsync();
                return true;
            }
            return false;
        }

        public async Task<TaskLog> getById(long id)
        {
            return await _dataContext.TaskLogs.Where(t => t.Id == id).Include(t => t.TaskLogType).FirstOrDefaultAsync();
        }

        public async Task<TaskLog> update(TaskLog task)
        {
            _dataContext.TaskLogs.Update(task);
            await _dataContext.SaveChangesAsync();
            return task;
        }
    }
}