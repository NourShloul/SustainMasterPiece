using MasterPiece.Server.DTOs;
using MasterPiece.Server.Models;
using MasterPiece.Server.Service;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace MasterPiece.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class RequestController : ControllerBase
    {
        private readonly MyDbContext _db;
        private readonly EmailServices _emailServices;
        public RequestController(MyDbContext db , EmailServices emailServices)
        {
            _db = db;
            _emailServices = emailServices;
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


            // send Email

            var requestId = _db.Users.Where(x => x.UserId == request.UserId).FirstOrDefault();

            string approvalSubject = "Congratulations ..!!";
            string approvalBody = $@"
                   <p>Dear {requestId.UserName},</p>
                   <p>Thank you for using our service. </p>
                   <p> We Just want you to know that your application approved </p>
                   <br>
                   <p>Best Regards,</p>
                   <p>The Admin</p>
               ";

            // هوووون لازم يكون في الايميل
            _emailServices.SendEmailRAsync(requestId.Email, approvalSubject, approvalBody);

            return Ok(request);
        }

        [HttpGet("getServiceRequest")]
        public IActionResult GetServiceRequest()
        {
            var orders = _db.ServiceRequests
                   .Include(cr => cr.User)
                   .Include(cr => cr.Subservice)
                   .ThenInclude(s => s.Service) 
                   .AsEnumerable() 
                   .Select((cr, index) => new
                   {
                       userid = cr.UserId, 
                       OrderNumber = index + 1,
                       Requestid = cr.RequestId, 
                       Firstname = cr.User.UserName, 
                       Subservicename = cr.Subservice.Name, 
                       ServiceName = cr.Subservice.Service.Name, 
                       Companyname = cr.CompanyName, 
                       submittedAt = cr.SubmittedAt, 
                       status = cr.Status, 
                       budget = cr.Budget ,
                       description = cr.Description
                   })
                   .ToList();

            return Ok(orders);
        }


        [HttpGet("getServiceRequestByUserId/{id}")]
        public IActionResult GetServiceRequestByUserId(int id)
        {
            if (id <= 0)
            {
                return BadRequest();

            }

            var userReq = _db.ServiceRequests.Where(p => p.UserId == id).Include(cr => cr.User)
                   .Include(cr => cr.Subservice)
                   .ThenInclude(s => s.Service)
                   .AsEnumerable()
                   .Select((cr, index) => new
                   {
                       userid = cr.UserId,
                       OrderNumber = index + 1,
                       Requestid = cr.RequestId,
                       Firstname = cr.User.UserName,
                       Subservicename = cr.Subservice.Name,
                       ServiceName = cr.Subservice.Service.Name,
                       Companyname = cr.CompanyName,
                       submittedAt = cr.SubmittedAt,
                       status = cr.Status,
                       budget = cr.Budget,
                       description = cr.Description
                   })
                   .ToList();

            if (userReq != null)
            {
                return Ok(userReq);

            }
            return NotFound();
        }

        [HttpPut("editorder/{id}")]
        public IActionResult editorder(int id, StatusDTO DTO)
        {
            var edit = _db.ServiceRequests.Where(x => x.RequestId == id).FirstOrDefault();
            edit.Status = DTO.Status;
            _db.ServiceRequests.Update(edit);
            _db.SaveChanges();
            return Ok();
        }

    }
}
