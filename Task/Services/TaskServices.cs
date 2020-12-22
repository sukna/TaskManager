using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using TaskManager.Data;
using TaskManager.Task.Services.Interface;

namespace TaskManager.Task.Services
{
    public class TaskServices : ITaskServices
    {
        private readonly DataContext _dataContext;

        public TaskServices(DataContext dataContext)
        {
            _dataContext = dataContext;
        }

        public async Task<Models.Task> create(Models.Task task)
        {
            await _dataContext.Tasks.AddAsync(task);
            _dataContext.SaveChanges();
            return task;
        }

        public async Task<bool> delete(long id)
        {
            var task = await _dataContext.Tasks.FirstOrDefaultAsync(t => t.Id == id);
            if (task != null)
            {
                _dataContext.Tasks.Remove(task);
                await _dataContext.SaveChangesAsync();
                return true;
            }
            return false;
        }

        public async Task<List<Models.Task>> getAll(Guid userId)
        {
            return await _dataContext.Tasks.Where(t => t.UserId == userId)
            .Include(t => t.TaskPriorityCode)
            .Include(t => t.TaskStatusCode).ToListAsync();
        }

        public async Task<Models.Task> getById(long id)
        {
            return await _dataContext.Tasks.Where(t => t.Id == id)
            .Include(t => t.TaskStatusCode)
            .Include(t => t.TaskPriorityCode)
            .Include(t=> t.TaskLogs)
            .ThenInclude(t => t.TaskLogType)
            .FirstOrDefaultAsync();
        }

        public async Task<Models.Task> update(Models.Task task)
        {
            _dataContext.Tasks.Update(task);
            await _dataContext.SaveChangesAsync();
            return task;
        }
    }
}