using MasterPiece.Server.DTOs;
using MasterPiece.Server.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace MasterPiece.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProjectController : ControllerBase
    {
        private readonly MyDbContext _db;


        public ProjectController(MyDbContext db)
        {
            _db = db;
        }

        [HttpGet("Project/GetAllProjects")]
        public IActionResult GetAllProjects()
        {
            var project = _db.Projects.ToList();
            if (project != null)
            {
                return Ok(project);
            }
            return NoContent();
        }

        [HttpGet("Project/GetProjecteById/{id}")]
        public IActionResult GetProjectById(int id)
        {

            if (id <= 0)
            {
                return BadRequest();

            }

            var project = _db.Projects.Where(p => p.ProjectId == id).FirstOrDefault();

            if (project != null)
            {
                return Ok(project);

            }
            return NotFound();
        }


        [HttpDelete("Project/DeleteProject/{id}")]
        public IActionResult Delete(int id)
        {

            if (id <= 0)
            {
                return BadRequest();
            }
            var project = _db.Projects.FirstOrDefault(p => p.ProjectId == id);
            if (project != null)
            {

                _db.Projects.Remove(project);
                _db.SaveChanges();
                return NoContent();

            }
            return NotFound();

        }

        [HttpPost("Project/CreateProject")]
        public IActionResult CreateProject([FromForm] ProjectDTO request)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest();

            }
            var project = new Project
            {
                ProjectName = request.ProjectName,
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

                project.Image = $"/images/{uniqueFileName}";
            }
            _db.Projects.Add(project);
            _db.SaveChanges();
            return Ok(project);

        }


        [HttpPut("Project/UpdateProject/{id:int}")]
        public IActionResult UpdateProject([FromForm] ProjectDTO response, int id)
        {
            var project = _db.Projects.FirstOrDefault(c => c.ProjectId == id);
            if (project == null) return NotFound();
            project.ProjectName = response.ProjectName;
            project.Description = response.Description;
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

                project.Image = $"/images/{uniqueFileName}";
            }

            _db.Projects.Update(project);
            _db.SaveChanges();
            return Ok(project);
        }
    }
}
