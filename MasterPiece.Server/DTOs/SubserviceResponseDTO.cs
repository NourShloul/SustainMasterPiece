namespace MasterPiece.Server.DTOs
{
    public class SubserviceResponseDTO
    {
        public long SubserviceId { get; set; }
        public long? ServiceId { get; set; }
        public string Name { get; set; } = null!;
        public string Description { get; set; } = null!;
        public IFormFile? Image { get; set; }
    }
}
