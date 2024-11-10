namespace MasterPiece.Server.DTOs
{
    public class ServiceDTO
    {
        public string Name { get; set; } = null!;

        public string Description { get; set; } = null!;

        public IFormFile? Image { get; set; }
    }
}
