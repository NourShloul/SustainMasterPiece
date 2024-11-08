using System;
using System.Collections.Generic;

namespace MasterPiece.Server.Models;

public partial class Subservice
{
    public long SubserviceId { get; set; }

    public long? ServiceId { get; set; }

    public string Name { get; set; } = null!;

    public string Description { get; set; } = null!;

    public string? Image { get; set; }

    public virtual Service? Service { get; set; }

    public virtual ICollection<ServiceRequest> ServiceRequests { get; set; } = new List<ServiceRequest>();
}
