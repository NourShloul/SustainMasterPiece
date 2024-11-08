namespace MasterPiece.Server.DTOs
{
    public class UserProfileDto
    {
        public string UserName { get; set; } = null!;

        public string Email { get; set; } = null!;

        public int? PhoneNum { get; set; }
        public IFormFile? Image { get; set; }

        public string? Description { get; set; }
        public string? UserAdderss { get; set; }
    }
}
