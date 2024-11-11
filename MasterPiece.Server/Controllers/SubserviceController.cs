using MasterPiece.Server.DTOs;
using MasterPiece.Server.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace MasterPiece.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class SubserviceController : ControllerBase
    {
        private readonly MyDbContext _db;


        public SubserviceController(MyDbContext db)
        {
            _db = db;
        }

        [HttpGet("Subservice/GetAllSubservices")]
        public IActionResult GetAllSubservices()
        {
            var service = _db.Subservices.ToList();
            if (service != null)
            {
                return Ok(service);
            }
            return NoContent();
        }

        [HttpGet("Subervices/GetSubserviceById/{id}")]
        public IActionResult GetSubserviceById(int id)
        {

            if (id <= 0)
            {
                return BadRequest();

            }

            var services = _db.Subservices.Where(p => p.SubserviceId == id).FirstOrDefault();

            if (services != null)
            {
                return Ok(services);

            }
            return NotFound();
        }
        [HttpGet("Subervices/GetSubserviceByServiceId/{id}")]
        public IActionResult GetSubserviceByServiceId(int id)
        {

            if (id <= 0)
            {
                return BadRequest();

            }

            var services = _db.Subservices.Where(p => p.ServiceId == id).ToList();

            if (services != null)
            {
                return Ok(services);

            }
            return NotFound();
        }


        [HttpDelete("Subservices/DeleteSubservice/{id}")]
        public IActionResult Delete(int id)
        {

            if (id <= 0)
            {
                return BadRequest();
            }
            var categories = _db.Subservices.FirstOrDefault(p => p.SubserviceId == id);
            if (categories != null)
            {

                _db.Subservices.Remove(categories);
                _db.SaveChanges();
                return NoContent();

            }
            return NotFound();

        }

        [HttpPost("Subservices/CreateSubservice")]
        public IActionResult CreateSubservice([FromForm] SubserviceDTO request)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest();

            }
            var service = new Subservice
            {
                Name = request.Name,
                Description = request.Description
            };
            // Handle image upload
            if (request.Image != null && request.Image.Length > 0)
            {
                var uploadsFolder = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot/images");

                if (!Directory.Exists(uploadsFolder))
                {
                    Directory.CreateDirectory(uploadsFolder);
                }

                var uniqueFileName = Guid.NewGuid().ToString() + "_" + request.Image.FileName;
                var filePathWwwroot = Path.Combine(uploadsFolder, uniqueFileName);

                using (var fileStream = new FileStream(filePathWwwroot, FileMode.Create))
                {
                    request.Image.CopyTo(fileStream);
                }

                service.Image = $"/images/{uniqueFileName}";
            }
            _db.Subservices.Add(service);
            _db.SaveChanges();
            return Ok(service);

        }


        [HttpPut("Subservices/UpdateSubservice/{id:int}")]
        public IActionResult UpdateService([FromForm] SubserviceDTO response, int id)
        {
            var service = _db.Subservices.FirstOrDefault(c => c.SubserviceId == id);
            if (service == null) return NotFound();
            service.Name = response.Name;
            service.Description = response.Description;
            if (response.Image != null && response.Image.Length > 0)
            {
                var uploadsFolder = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot/images");

                if (!Directory.Exists(uploadsFolder))
                {
                    Directory.CreateDirectory(uploadsFolder);
                }

                var uniqueFileName = Guid.NewGuid().ToString() + "_" + response.Image.FileName;
                var filePathWwwroot = Path.Combine(uploadsFolder, uniqueFileName);

                using (var fileStream = new FileStream(filePathWwwroot, FileMode.Create))
                {
                    response.Image.CopyTo(fileStream);
                }

                service.Image = $"/images/{uniqueFileName}";
            }

            _db.Subservices.Update(service);
            _db.SaveChanges();
            return Ok(service);
        }
    }
}
