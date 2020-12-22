using System.Collections.Generic;
using System.Threading.Tasks;
using TaskManager.Task.Models;

namespace TaskManager.Task.Services.Interface
{
    public interface ITaskLogServices
    {
        public Task<TaskLog> getById(long id);

        public Task<bool> delete(long id);

        public Task<TaskLog> update(TaskLog task);

        public Task<TaskLog> create(TaskLog task);
    }
}