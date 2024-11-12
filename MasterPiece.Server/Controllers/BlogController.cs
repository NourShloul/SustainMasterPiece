using MasterPiece.Server.DTOs;
using MasterPiece.Server.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace MasterPiece.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BlogController : ControllerBase
    {
        private readonly MyDbContext _db;

        public BlogController(MyDbContext db)
        {
            _db = db;
        }

        [HttpGet("GetAllPosts")]
        public IActionResult GetAllPosts()
        {
            var posts = _db.Posts
                .Where(w => w.IsAccept == true)
                .OrderByDescending(w => w.StoryDate)
                .Select(s => new
                {
                    s.PostId,

                    s.StoryTitle,
                    s.StoryContent,
                    s.StoryDate,
                    s.StoryPhoto,
                    User = new
                    {
                        s.User.UserId,
                        s.User.UserName,
                    },
                    likesCount = s.Likes.Where(l => l.Flag == true).Count(),

                    Commentcount = s.Comments.Count(),
                }).ToList();

            return Ok(posts);
        }

        [HttpPost("AddPosts/{userID}")]
        public async Task<IActionResult> AddPosts(int userID, [FromForm] AddPostsDTO addpost)
        {
            if (addpost.StoryPhoto != null && addpost.StoryPhoto.Length > 0)
            {
                var uploadsFolder = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot/images");

                try
                {

                    if (!Directory.Exists(uploadsFolder))
                    {
                        Directory.CreateDirectory(uploadsFolder);
                    }

                    var uniqueFileName = Guid.NewGuid().ToString() + "_" + addpost.StoryPhoto.FileName;
                    var filePathWwwroot = Path.Combine(uploadsFolder, uniqueFileName);


                    using (var fileStream = new FileStream(filePathWwwroot, FileMode.Create))
                    {
                        await addpost.StoryPhoto.CopyToAsync(fileStream);
                    }


                    var newPost = new Post
                    {
                        UserId = userID,
                        StoryPhoto = $"/images/{uniqueFileName}",
                        StoryContent = addpost.StoryContent,
                        StoryDate = System.DateTime.Now,
                        StoryTitle = addpost.StoryTitle,
                    };


                    _db.Posts.Add(newPost);
                    await _db.SaveChangesAsync();

                    return Ok(newPost);
                }
                catch (Exception ex)
                {

                    return StatusCode(500, "An error occurred while processing your request.");
                }
            }


            return BadRequest("Invalid data or missing image.");
        }
        [HttpPut("UpdatePostById/{id}")]
        public IActionResult UpdatePostById(int id, [FromForm] AddPostsDTO addpost)
        {
            if (id <= 0)
            {
                return BadRequest("The ID cannot be zero or negative.");
            }

            var postupdate = _db.Posts.FirstOrDefault(x => x.PostId == id);
            if (postupdate == null)
            {
                return NotFound("No Post found with the specified ID.");
            }

            try
            {
                if (addpost.StoryPhoto != null && addpost.StoryPhoto.Length > 0)
                {
                    var uploadsFolder = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot/images");


                    if (!Directory.Exists(uploadsFolder))
                    {
                        Directory.CreateDirectory(uploadsFolder);
                    }

                    var uniqueFileName = Guid.NewGuid().ToString() + "_" + addpost.StoryPhoto.FileName;
                    var filePathWwwroot = Path.Combine(uploadsFolder, uniqueFileName);


                    using (var fileStream = new FileStream(filePathWwwroot, FileMode.Create))
                    {
                        addpost.StoryPhoto.CopyTo(fileStream);
                    }


                    postupdate.StoryPhoto = $"/images/{uniqueFileName}";
                }


                postupdate.StoryContent = addpost.StoryContent ?? postupdate.StoryContent;
                postupdate.StoryTitle = addpost.StoryTitle ?? postupdate.StoryTitle;



                 _db.SaveChanges();

                return Ok(postupdate);
            }
            catch (Exception ex)
            {

                return StatusCode(500, "An error occurred while processing your request.");
            }
        }
        [HttpDelete("DeletePost/{id}")]
        public IActionResult DeletePostId(int id)
        {
            var post = _db.Posts.Find(id);
            if (post == null)
            {
                return NotFound();
            }

            // First, delete the related likes
            var likes = _db.Likes.Where(l => l.PostId == id).ToList();
            _db.Likes.RemoveRange(likes);

            // Then, delete related comments
            var comments = _db.Comments.Where(c => c.PostId == id).ToList();

            // Delete replies associated with the comments
            foreach (var comment in comments)
            {
                var replies = _db.Replies.Where(r => r.CommentId == comment.CommentId).ToList();
                _db.Replies.RemoveRange(replies);
            }

            _db.Comments.RemoveRange(comments);

            // Finally, delete the post
            _db.Posts.Remove(post);
            _db.SaveChanges();

            return Ok();
        }



        [HttpGet("PostDetailsById/{postid}")]
        public IActionResult GetPostDetailsById(int postid)
        {
            if (postid <= 0)
            {
                return BadRequest("The ID cannot be zero or negative.");
            }
            var postdetails = _db.Posts
                .Where(x => x.PostId == postid)
                .Select(s => new
                {
                    s.PostId,
                    s.StoryTitle,
                    s.StoryContent,
                    s.StoryDate,
                    s.StoryPhoto,
                    User = new
                    {
                        s.User.UserId,
                        s.User.UserName,
                    }
                }).ToList();
            if (postdetails == null)
            {
                return NotFound("No Post found with the specified ID.");
            }
            return Ok(postdetails);
        }

        /////////////////////////// Admin Accept Post ///////////////////////////////

        [HttpPut("AcceptPostById/{postid}")]
        public IActionResult AcceptPostById(int postid)
        {
            if (postid <= 0)
            {
                return BadRequest("The ID cannot be zero or negative.");
            }
            var post = _db.Posts.FirstOrDefault(x => x.PostId == postid);
            if (post == null)
            {
                return NotFound("No Post found with the specified ID.");
            }
            post.IsAccept = true;

            _db.Posts.Update(post);
            _db.SaveChanges();
            return Ok(post);
        }
        [HttpGet("GetAllAcceptedPost")]
        public IActionResult GetAllAcceptedPost()
        {
            var posts = _db.Posts
                            .Where(x => x.IsAccept == true)
                            .OrderByDescending(w => w.StoryDate)
                            .Select(s => new
                            {
                                s.PostId,
                                s.StoryTitle,
                                s.StoryContent,
                                s.StoryDate,
                                s.StoryPhoto,
                                User = new
                                {
                                    s.User.UserName,
                                }
                            }).ToList();
            return Ok(posts);

        }


        [HttpGet("postnotaccepted")]
        public IActionResult postnotaccept()
        {
            var notaccept = _db.Posts.Where(x => x.IsAccept != true).OrderByDescending(w => w.StoryDate).Select(s => new
            {
                s.PostId,
                s.StoryTitle,
                s.StoryContent,
                s.StoryDate,
                s.StoryPhoto,
                User = new
                {
                    s.User.UserName,
                }
            }).ToArray();
            return Ok(notaccept);
        }

        [HttpGet("GetAllComment/{postid}")]
        public IActionResult GetAllComment(int postid)
        {
            var comments = _db.Comments
                .Where(w => w.PostId == postid)
                .OrderByDescending(g => g.CreateDate)
                .Select(s => new
                {
                    s.CommentId,
                    s.UserId,
                    s.Content,
                    s.CreateDate,
                    User = new
                    {
                        s.User.UserName,
                        s.User.Image
                    }
                }
                ).ToList();
            return Ok(comments);
        }
        [HttpPost("AddComment/{postid}")]
        public IActionResult GetComment(int postid, [FromForm] AddCommentDTO addCommentDTO)
        {
            if (postid <= 0)
            {
                return BadRequest("The ID cannot be zero or negative.");
            }

            if (addCommentDTO == null)
            {
                return BadRequest("Invalid data or null data");
            }
            var comments = new Comment
            {
                PostId = postid,
                UserId = addCommentDTO.UserId,
                CreateDate = System.DateTime.Now,
                Content = addCommentDTO.Content
            };
            _db.Comments.Add(comments);
            _db.SaveChanges();
            return Ok(comments);
        }
        [HttpGet("GetAllReplyByCommentId/{commentId}")]
        public IActionResult GetAllReplyByCommentId(int commentId)
        {
            if (commentId <= 0)
            {
                return BadRequest("The ID cannot be zero or negative.");
            }
            var allreplay = _db.Replies
                .Where(x => x.CommentId == commentId)
                .Select(x => new
                {
                    x.User.UserName,
                    x.User.Image,
                    x.CreateDate,
                    x.Content,
                }
                ).ToList();

            if (allreplay == null)
            {
                return NotFound("there is no replay");
            }

            return Ok(allreplay);
        }

        [HttpPost("ReplayOnComment")]
        public IActionResult ReplayOnComment([FromForm] ReplayOnCommentDTO replayOnCommentDTO)
        {
            if (replayOnCommentDTO == null)
            {
                return BadRequest("Invalid data or null data");
            }
            var replay = new Reply
            {
                CommentId = replayOnCommentDTO.CommentId,
                UserId = replayOnCommentDTO.UserId,
                CreateDate = System.DateTime.Now,
                Content = replayOnCommentDTO.Content,

            };

            _db.Replies.Add(replay);
            _db.SaveChanges();
            return Ok(replay);
        }
        // POST: api/likes
        [HttpPost("addLike")]
        public IActionResult LikePost([FromBody] LikeDto likeDto)
        {
            // Check if the like already exists
            var existingLike = _db.Likes
                .FirstOrDefault(l => l.PostId == likeDto.PostId && l.UserId == likeDto.UserId);

            if (existingLike != null)
            {
                // Toggle the like flag (like/unlike)
                existingLike.Flag = !existingLike.Flag;
                _db.SaveChanges();
                return Ok(existingLike);
            }
            else
            {
                // Add a new like
                var like = new Like
                {
                    PostId = likeDto.PostId,
                    UserId = likeDto.UserId,
                    Flag = true
                };
                _db.Likes.Add(like);
                _db.SaveChanges();
                return Ok(like);
            }
        }

        // GET: api/likes/{postId}
        [HttpGet("countLikes/{postId}")]
        public IActionResult GetLikesForPost(int postId)
        {
            var likeCount = _db.Likes
                .Where(l => l.PostId == postId && l.Flag == true)
                .Count();

            return Ok(likeCount);
        }

    }
}
