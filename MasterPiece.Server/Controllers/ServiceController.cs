using Azure.Core;
using MasterPiece.Server.DTOs;
using MasterPiece.Server.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace MasterPiece.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ServiceController : ControllerBase
    {
        private readonly MyDbContext _db;


        public ServiceController(MyDbContext db)
        {
            _db = db;
        }

        [HttpGet("Service/GetAllServices")]
        public IActionResult GetAllServices()
        {
            var service = _db.Services.ToList();
            if (service != null)
            {
                return Ok(service);
            }
            return NoContent();
        }

        [HttpGet("Services/GetServiceById/{id}")]
        public IActionResult GetServiceById(int id)
        {

            if (id <= 0)
            {
                return BadRequest();

            }

            var services = _db.Services.Where(p => p.ServiceId == id).FirstOrDefault();

            if (services != null)
            {
                return Ok(services);

            }
            return NotFound();
        }


        [HttpDelete("Services/DeleteService/{id}")]
        public IActionResult Delete(int id)
        {

            if (id <= 0)
            {
                return BadRequest();
            }
            var categories = _db.Services.FirstOrDefault(p => p.ServiceId == id);
            if (categories != null)
            {

                _db.Services.Remove(categories);
                _db.SaveChanges();
                return NoContent();

            }
            return NotFound();

        }

        [HttpPost("Services/CreateService")]
        public IActionResult CreateService([FromForm] ServiceDTO request)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest();

            }
            var service = new Service
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
            _db.Services.Add(service);
            _db.SaveChanges();
            return Ok(service);

        }


        [HttpPut("Services/UpdateService/{id:int}")]
        public IActionResult UpdateService([FromForm] ServiceDTO response, int id)
        {
            var service = _db.Services.FirstOrDefault(c => c.ServiceId == id);
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

            _db.Services.Update(service);
            _db.SaveChanges();
            return Ok(service);
        }
    }
}
