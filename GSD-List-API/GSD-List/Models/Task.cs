using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace GSD_List.Models
{
    [Table("tasks")]
    public class Task
    {
        [Key]
        [Column("id")]
        public int Id { get; set; }

        [Column("task_name")]
        public string TaskName { get; set; } = string.Empty;

        [Column("task_description")]
        public string TaskDescription { get; set; } = string.Empty;

        [Column("active")]
        public bool Active { get; set; }
    }
}
