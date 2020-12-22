using System;
using System.Collections.Generic;
using System.Threading.Tasks;
namespace TaskManager.Task.Services.Interface
{
    public interface ITaskServices
    {
        public Task<List<Models.Task>> getAll(Guid userId);

        public Task<Models.Task> getById(long id);

        public Task<bool> delete(long id);

        public Task<Models.Task> update(Models.Task task);

        public Task<Models.Task> create(Models.Task task);
    }
}