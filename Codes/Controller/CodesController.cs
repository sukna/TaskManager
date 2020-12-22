using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using TaskManager.Codes.Services.Interfaces;

namespace TaskManager.Codes.Controller
{
    [Authorize]
    [ApiController]
    [EnableCors("AllowOrigin")]
    [Route("api/[controller]")]
    public class CodesController : ControllerBase
    {
        public ICodesServices _codesServices { get; }
        public CodesController(ICodesServices codesServices)
        {
            _codesServices = codesServices;
        }

        [HttpGet("task-statuses")]
        public async Task<IActionResult> TaskStatuses()
        {
            var res = await _codesServices.GetTaskStatuses();
            return Ok(res);
        }

        [HttpGet("task-priorities")]
        public async Task<IActionResult> TaskPriorities()
        {
            var res = await _codesServices.GetTaskPriorities();
            return Ok(res);
        }

        [HttpGet("tasklog-types")]
        public async Task<IActionResult> TaskLogTypes()
        {
            var res = await _codesServices.GetTaskLogTypes();
            return Ok(res);
        }

    }
}