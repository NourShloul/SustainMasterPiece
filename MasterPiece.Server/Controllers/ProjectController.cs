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


        [HttpPut("Project/UpdateProject/{id:long}")]
        public IActionResult UpdateProject([FromForm] ProjectDTO response, long id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            // Retrieve the project from the database
            var project = _db.Projects.FirstOrDefault(c => c.ProjectId == id);
            if (project == null)
            {
                return NotFound($"Project with ID {id} not found.");
            }

            // Update project properties
            project.ProjectName = response.ProjectName;
            project.Description = response.Description;

            // Handle image update if a new image is provided
            if (response.Image != null && response.Image.Length > 0)
            {
                // Define uploads folder path
                var uploadsFolder = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot/images");

                // Ensure the uploads folder exists
                if (!Directory.Exists(uploadsFolder))
                {
                    Directory.CreateDirectory(uploadsFolder);
                }

                // Delete the old image file if it exists
                if (!string.IsNullOrEmpty(project.Image))
                {
                    var oldFilePath = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot", project.Image.TrimStart('/'));
                    if (System.IO.File.Exists(oldFilePath))
                    {
                        System.IO.File.Delete(oldFilePath);
                    }
                }

                // Generate a unique filename for the new image
                var uniqueFileName = Guid.NewGuid().ToString() + "" + response.Image.FileName;
                var filePathWwwroot = Path.Combine(uploadsFolder, uniqueFileName);

                // Save the new image
                using (var fileStream = new FileStream(filePathWwwroot, FileMode.Create))
                {
                    response.Image.CopyTo(fileStream);
                }

                // Update the image path in the project entity
                project.Image = $"/images/{uniqueFileName}";
            }

            // Update the project entity in the database
            _db.Projects.Update(project);
            _db.SaveChanges();

            return Ok(project);
        }
    }
}