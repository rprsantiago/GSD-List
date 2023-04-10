using GSD_List.Models;
using Microsoft.EntityFrameworkCore;

namespace GSD_List.Data
{
    public class DataContext : DbContext
    {
        public DataContext(DbContextOptions<DataContext> options) : base(options) { }
        public DbSet<Models.Task> Tasks => Set<Models.Task>();
    }
}
