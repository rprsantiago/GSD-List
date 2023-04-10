using GSD_List.Data;
using GSD_List.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace GSD_List.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TaskController : ControllerBase
    {
        private readonly DataContext _context;

        public TaskController(DataContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<List<Models.Task>>> GetListTasks()
        {
            return Ok(await _context.Tasks.ToListAsync());
        }

        [HttpPost]
        public async Task<ActionResult<List<Models.Task>>> CreateTask(Models.Task task)
        {
            _context.Tasks.Add(task);
            await _context.SaveChangesAsync();

            return Ok(await _context.Tasks.ToListAsync());
        }

        [HttpPut]
        public async Task<ActionResult<List<Models.Task>>> UpdateTask(Models.Task task)
        {
            var dbTask = await _context.Tasks.FindAsync(task.Id);

            if (dbTask == null)
            {
                return BadRequest("Hero not found");
            }

            dbTask.TaskName = task.TaskName;
            dbTask.TaskDescription = task.TaskDescription;
            dbTask.Active = task.Active;

            await _context.SaveChangesAsync();

            return Ok(await _context.Tasks.ToListAsync());
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult<List<Models.Task>>> DeleteTask(int id)
        {
            var dbTask = await _context.Tasks.FindAsync(id);
            if (dbTask == null)
            {
                return BadRequest("Hero not found");
            }

            _context.Tasks.Remove(dbTask);
            await _context.SaveChangesAsync();

            return Ok(await _context.Tasks.ToListAsync());
        }

    }
}
