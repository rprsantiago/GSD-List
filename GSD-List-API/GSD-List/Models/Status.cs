using System.ComponentModel.DataAnnotations;
using Microsoft.Extensions.Hosting;
using System.ComponentModel.DataAnnotations.Schema;

namespace GSD_List.Models
{
    [Table("ct_status")]
    public class Status
    {
        [Key]
        [Column("id")]
        public int Id { get; set; }

        [Column("description")]
        public string StatusDescription { get; set; } = string.Empty;

        [Column("active")]
        public bool Active { get; set; }

    }
}
