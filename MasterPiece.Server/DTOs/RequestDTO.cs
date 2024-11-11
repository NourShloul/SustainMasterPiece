namespace MasterPiece.Server.DTOs
{
    public class RequestDTO
    {
        public string? Description { get; set; }

        public string? CompanyName { get; set; }

        public long? Budget { get; set; }

        public List<long?> SubserviceId { get; set; }

        public int? UserId { get; set; }
    }
}
