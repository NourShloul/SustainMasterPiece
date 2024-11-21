namespace MasterPiece.Server.DTOs
{
    public class SubserviceDTO
    {
        public string Name { get; set; } = null!;

        public string Description { get; set; } = null!;

        public IFormFile? Image { get; set; }

        public long? ServiceId { get; set; }


    }
}
