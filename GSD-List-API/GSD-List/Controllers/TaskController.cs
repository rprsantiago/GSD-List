using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace GSD_List.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TaskController : ControllerBase
    {
        [HttpGet]
        public async Task<ActionResult<List<Task>>> GetListTasks()
        {
            return new List<Task>
            {
                new Task { Id = 1, TaskName = "Task 1", TaskDescription = "Description 1" }
            };
        }
    }
}
