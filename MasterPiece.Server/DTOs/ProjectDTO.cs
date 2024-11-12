namespace MasterPiece.Server.DTOs
{
    public class ProjectDTO
    {
        public string ProjectName { get; set; } = null!;

        public string Description { get; set; } = null!;

        public IFormFile? Image { get; set; }
    }
}
