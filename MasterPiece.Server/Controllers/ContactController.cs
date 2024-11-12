using MasterPiece.Server.DTOs;
using MasterPiece.Server.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace MasterPiece.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ContactController : ControllerBase
    {
        private readonly MyDbContext _db;

        public ContactController(MyDbContext db)
        {
            _db = db;
        }

        [HttpGet("GetAllContacts")]
        public IActionResult GetAllContacts()
        {
            var Con = _db.Contacts.ToList();
            return Ok(Con);
        }




        [HttpGet("GetByDesc")]
        public IActionResult GetContact()
        {
            var contacts = _db.Contacts
                .OrderByDescending(c => c.CreatedAt)
                .ToList();

            var formattedContacts = contacts.Select(c => new
            {
                c.Message,
                c.ContactId,
                c.Name,
                c.Email,
                c.PhoneNum,
                CreatedAt = c.CreatedAt.HasValue
                    ? c.CreatedAt.Value.ToString("yyyy-MM-dd HH:mm")
                    : "N/A"
            }).ToList();

            return Ok(formattedContacts);
        }

        [HttpPost("AddContact")]
        public IActionResult AddMessage([FromForm] ContactDTO request)
        {
            var newContact = new Contact
            {
                Name = request.Name,
                Email = request.Email,
                Message = request.Message,
                PhoneNum = request.PhoneNum,
            };
            _db.Contacts.Add(newContact);
            _db.SaveChanges();
            return Ok(new { message = "Contact added successfully" });
        }


        [HttpDelete("DeleteContact/{id}")]
        public IActionResult DeleteContact(int id)
        {
            if (id <= 0)
            {
                return BadRequest("No Contact For This ID");
            }

            var contact = _db.Contacts.FirstOrDefault(u => u.ContactId == id);
            if (contact == null)
            {
                return NotFound();
            }
            _db.Contacts.Remove(contact);
            _db.SaveChanges();
            return Ok();
        }
    }
}
