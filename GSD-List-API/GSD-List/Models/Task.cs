using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Runtime.InteropServices.JavaScript;

namespace GSD_List.Models
{
    [Table("task")]
    public class Task
    {
        [Key]
        [Column("id")]
        public int Id { get; set; }

        [Column("task_name")]
        public string TaskName { get; set; } = string.Empty;

        [Column("task_description")]
        public string TaskDescription { get; set; } = string.Empty;


        [Column("date_created")]
        public DateTime DateCreated { get; set; }

        [Column("date_updated")]
        public DateTime DateUpdated { get; set; }


        [ForeignKey("status_id")]
        [Column("status_id")]
        public int StatusId { get; set; }

    }
}
