using Microsoft.EntityFrameworkCore;

namespace GSD_List.Data
{
    public class DataContext : DbContext
    {
        public DataContext(DbContextOptions<DataContext> options) : base(options) { }
        public DbSet<Task> Tasks => Set<Task>();
    }
}
