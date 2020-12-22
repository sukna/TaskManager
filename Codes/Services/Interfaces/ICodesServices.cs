using System.Collections.Generic;
using System.Threading.Tasks;
using TaskManager.Codes.Model;

namespace TaskManager.Codes.Services.Interfaces
{
    public interface ICodesServices
    {
        Task<List<TaskLogTypeCode>> GetTaskLogTypes();
        Task<List<TaskPriorityCode>> GetTaskPriorities();
        Task<List<TaskStatusCode>> GetTaskStatuses();
    }
}