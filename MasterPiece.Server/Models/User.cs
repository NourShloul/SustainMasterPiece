using System;
using System.Collections.Generic;

namespace MasterPiece.Server.Models;

public partial class User
{
    public int UserId { get; set; }

    public string UserName { get; set; } = null!;

    public string Email { get; set; } = null!;

    public string Password { get; set; } = null!;

    public byte[]? PasswordHash { get; set; }

    public byte[]? PasswordSalt { get; set; }

    public string? Image { get; set; }

    public bool? IsDeleted { get; set; }

    public string? Description { get; set; }

    public string? UserAdderss { get; set; }

    public int? PhoneNum { get; set; }

    public virtual ICollection<ServiceRequest> ServiceRequests { get; set; } = new List<ServiceRequest>();
}
