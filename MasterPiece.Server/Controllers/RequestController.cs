using MasterPiece.Server.DTOs;
using MasterPiece.Server.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace MasterPiece.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class RequestController : ControllerBase
    {
        private readonly MyDbContext _db;

        public RequestController(MyDbContext db)
        {
            _db = db;
        }

        // POST: api/ServiceRequests
        [HttpPost("createServiceRequest")]
        public IActionResult CreateServiceRequest([FromForm] RequestDTO request)
        {
            if (request == null || request.SubserviceId == null || !request.SubserviceId.Any())
            {
                return BadRequest("Invalid data.");
            }

            // Iterate over each SubserviceId in the list and create a ServiceRequest
            foreach (var subserviceId in request.SubserviceId)
            {
                var order = new ServiceRequest
                {
                    UserId = request.UserId,
                    Description = request.Description,
                    CompanyName = request.CompanyName,
                    Budget = request.Budget,
                    SubserviceId = subserviceId
                };

                _db.ServiceRequests.Add(order);
            }

            _db.SaveChanges();

            return Ok(request);
        }

        [HttpGet("getServiceRequest")]
        public IActionResult GetServiceRequest()
        {
            var request = _db.ServiceRequests.ToList();
            if (request != null)
            {
                return Ok(request);
            }
            return NoContent();
        }

        [HttpGet("getServiceRequestByUserId/{id}")]
        public IActionResult GetServiceRequestByUserId(int id)
        {
            if (id <= 0)
            {
                return BadRequest();

            }

            var userReq = _db.ServiceRequests.Where(p => p.UserId == id).ToList();

            if (userReq != null)
            {
                return Ok(userReq);

            }
            return NotFound();
        }

    }
}
