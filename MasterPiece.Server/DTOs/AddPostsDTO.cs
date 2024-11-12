namespace MasterPiece.Server.DTOs
{
    public class AddPostsDTO
    {
        public string? StoryContent { get; set; }


        public IFormFile? StoryPhoto { get; set; }

        public string? StoryTitle { get; set; }
    }
}
