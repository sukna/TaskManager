using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using TaskManager.Codes.Model;
using TaskManager.Codes.Services.Interfaces;
using TaskManager.Data;

namespace TaskManager.Codes.Services
{
    public class CodesServices : ICodesServices
    {
        public DataContext _dataContext { get; }
        public CodesServices(DataContext dataContext)
        {
            _dataContext = dataContext;
        }

        public async Task<List<TaskLogTypeCode>> GetTaskLogTypes() => await _dataContext.TaskLogTypes.ToListAsync();

        public async Task<List<TaskPriorityCode>> GetTaskPriorities() => await _dataContext.TaskPriorities.ToListAsync();

        public async Task<List<TaskStatusCode>> GetTaskStatuses() => await _dataContext.TaskStatuses.ToListAsync();
    }
}