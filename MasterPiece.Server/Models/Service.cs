using System;
using System.Collections.Generic;

namespace MasterPiece.Server.Models;

public partial class Service
{
    public long ServiceId { get; set; }

    public string Name { get; set; } = null!;

    public string Description { get; set; } = null!;

    public string? Image { get; set; }

    public virtual ICollection<ServiceRequest> ServiceRequests { get; set; } = new List<ServiceRequest>();

    public virtual ICollection<Subservice> Subservices { get; set; } = new List<Subservice>();
}
