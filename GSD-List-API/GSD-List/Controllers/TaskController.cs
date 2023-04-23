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
            var listStatus = await _context.Statuses.ToListAsync();
            var listTasks = await _context.Tasks.ToListAsync();

            //create new object from tasks and add status description property
            var listTasksWithStatus = listTasks.Select(x => new
            {
                x.Id,
                x.TaskName,
                x.TaskDescription,
                x.DateCreated,
                x.DateUpdated,
                x.StatusId,
                StatusDescription = listStatus.Find(y => y.Id == x.StatusId).StatusDescription
            }).ToList();

            listTasksWithStatus.Sort((a, b) => a.StatusId.CompareTo(b.StatusId));

            return Ok(listTasksWithStatus);
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
            dbTask.DateCreated = task.DateCreated;
            dbTask.DateUpdated = task.DateUpdated;
            dbTask.StatusId = task.StatusId;
            

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
