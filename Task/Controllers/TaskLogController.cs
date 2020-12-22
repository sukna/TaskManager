using System.Linq;
using System;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Cors;

namespace TaskManager.Task.Controllers
{
    using Task.Models;
    using TaskManager.Task.Services.Interface;

    [ApiController]
    [EnableCors("AllowOrigin")]
    [Route("api/[controller]")]
    public class TaskLogController : ControllerBase
    {
        private readonly ITaskLogServices _taskLogServices;

        public TaskLogController(ITaskLogServices taskLogServices)
        {
            _taskLogServices = taskLogServices;
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> Get(long id)
        {
            var response = await _taskLogServices.getById(id);
            return Ok(response);
        }

        [HttpPost]
        public async Task<IActionResult> Post(TaskLog model)
        {
            await _taskLogServices.create(model);
            return Ok();
        }

        [HttpPut]
        public async Task<IActionResult> Put(TaskLog model)
        {
            await _taskLogServices.update(model);
            return Ok();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(long id)
        {
            var res = await _taskLogServices.delete(id);
            return res ? Ok() : BadRequest();
        }
    }
}