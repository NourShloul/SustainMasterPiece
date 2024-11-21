using MasterPiece.Server.DTOs;
using MasterPiece.Server.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;

namespace MasterPiece.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly MyDbContext _db;

        public UserController(MyDbContext db)
        {
            _db = db;
        }
        [HttpGet("getAllUser")]
        public IActionResult GetAllUser()
        {
            var user = _db.Users.ToList();
            return Ok(user);
        }

        [HttpGet("getUserByID/{id}")]
        public IActionResult GetUserByID(int id)
        {

            var user = _db.Users.Where(a => a.UserId == id).FirstOrDefault();
            return Ok(user);

        }

        [HttpPost("Register")]
        public IActionResult SignUp([FromForm] UserDTORequiest user)
        {
            var existingUser = _db.Users.FirstOrDefault(a => a.Email == user.Email);
            if (existingUser != null)
            {
                return BadRequest("There is a user registered with this email.");
            }

            // Hash the password
            byte[] passwordSalt;
            var passwordHash = HashPassword(user.Password, out passwordSalt);

            var newUser = new User
            {
                Email = user.Email,
                UserName = user.UserName,
                Password = user.Password,
                PasswordHash = passwordHash,
                PasswordSalt = passwordSalt
            };

            _db.Users.Add(newUser);
            _db.SaveChanges();

            return Ok(new { message = "User added successfully" });
        }

        [HttpPost("Login")]
        public IActionResult Login([FromForm] UserDToLogin user)
        {
            var existingUser = _db.Users.FirstOrDefault(a => a.Email == user.Email);

            if (existingUser == null)
            {
                return BadRequest("Invalid email or password.");
            }

            // Validate the password
            var passwordHash = HashPasswordWithSalt(user.Password, existingUser.PasswordSalt);
            if (!passwordHash.SequenceEqual(existingUser.PasswordHash))
            {
                return BadRequest("Invalid email or password.");
            }

            return Ok(new { UserId = existingUser.UserId, message = "Login successful" });
        }
        [HttpPut("EditUserProfile/{id}")]
        public IActionResult EditProfile(int id, [FromForm] UserProfileDto userProfileDto)
        {
            var user = _db.Users.Where(p => p.UserId == id).FirstOrDefault();

            if (user == null)
            {
                return NotFound($"User with ID {id} not found.");
            }

            // Handle image upload
            if (userProfileDto.Image != null && userProfileDto.Image.Length > 0)
            {
                var uploadsFolder = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot/images");

                if (!Directory.Exists(uploadsFolder))
                {
                    Directory.CreateDirectory(uploadsFolder);
                }

                var uniqueFileName = Guid.NewGuid().ToString() + "_" + userProfileDto.Image.FileName;
                var filePathWwwroot = Path.Combine(uploadsFolder, uniqueFileName);

                using (var fileStream = new FileStream(filePathWwwroot, FileMode.Create))
                {
                    userProfileDto.Image.CopyTo(fileStream);
                }

                user.Image = $"/images/{uniqueFileName}";
            }

            if (!string.IsNullOrEmpty(userProfileDto.UserName))
            {
                user.UserName = userProfileDto.UserName;
            }
            if (userProfileDto.PhoneNum != 0)  // Assuming 0 is used to signify no valid phone number
            {
                user.PhoneNum = userProfileDto.PhoneNum;
            }
            if (!string.IsNullOrEmpty(userProfileDto.Description))
            {
                user.Description = userProfileDto.Description;
            }
            if (!string.IsNullOrEmpty(userProfileDto.UserAdderss))
            {
                user.UserAdderss = userProfileDto.UserAdderss;
            }

            // Save changes to the database
            _db.Users.Update(user);
            _db.SaveChanges();

            return Ok(new { message = "Profile updated successfully" });
        }

        [HttpPost("LoginAdmin")]
        public IActionResult Login([FromForm] UserAdminDTO user)
        {
            var existingUser = _db.Admins.Where(a => a.Email == user.Email && a.Password == user.Password).FirstOrDefault();

            if (existingUser == null)
            {
                return BadRequest("Invalid email or password.");
            }

            return Ok(new { UserId = existingUser.AdminId, message = "Login successful" , Email = existingUser.Email });
        }

        private byte[] HashPassword(string password, out byte[] salt)
        {
            using (var hmac = new System.Security.Cryptography.HMACSHA512())
            {
                salt = hmac.Key;
                return hmac.ComputeHash(System.Text.Encoding.UTF8.GetBytes(password));
            }
        }


        private byte[] HashPasswordWithSalt(string password, byte[] salt)
        {
            using (var hmac = new System.Security.Cryptography.HMACSHA512(salt))
            {
                return hmac.ComputeHash(System.Text.Encoding.UTF8.GetBytes(password));
            }
        }

    }
}
