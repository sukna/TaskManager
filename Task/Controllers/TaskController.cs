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
    public class TaskController : ControllerBase
    {
        private readonly ITaskServices _taskServices;

        public TaskController(ITaskServices taskServices)
        {
            _taskServices = taskServices;
        }

        [HttpGet("get-all")]
        public async Task<IActionResult> GetAll()
        {
            Guid userId = Guid.Parse(User.Claims.FirstOrDefault(c => c.Type.ToString() == "Id").Value);
            var response = await _taskServices.getAll(userId);
            return Ok(response);
        }

        [HttpGet("get-by-id/{id}")]
        public async Task<IActionResult> GetById(long id)
        {
            var response = await _taskServices.getById(id);
            return Ok(response);
        }

        [HttpPost]
        public async Task<IActionResult> Post(Task model)
        {
            Guid userId = Guid.Parse(User.Claims.FirstOrDefault(c => c.Type.ToString() == "Id").Value);
            model.UserId = userId;
            await _taskServices.create(model);
            return Ok();
        }

        [HttpPut]
        public async Task<IActionResult> Put(Task model)
        {
            Guid userId = Guid.Parse(User.Claims.FirstOrDefault(c => c.Type.ToString() == "Id").Value);
            model.UserId = userId;
            await _taskServices.update(model);
            return Ok();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(long id)
        {
            var res = await _taskServices.delete(id);
            return res ? Ok() : BadRequest();
        }
    }
}