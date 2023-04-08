namespace GSD_List
{
    public class Task
    {
        public int Id { get; set; }
        public string TaskName { get; set; } = string.Empty;
        public string TaskDescription { get; set; } = string.Empty;
        public int StatusId { get; set; }
    }
}
