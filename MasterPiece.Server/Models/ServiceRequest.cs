using System;
using System.Collections.Generic;

namespace MasterPiece.Server.Models;

public partial class ServiceRequest
{
    public int RequestId { get; set; }

    public int? UserId { get; set; }

    public long? ServiceId { get; set; }

    public long? SubserviceId { get; set; }

    public string? Status { get; set; }

    public DateTime? SubmittedAt { get; set; }

    public string? Description { get; set; }

    public DateTime? UpdatedAt { get; set; }

    public virtual Service? Service { get; set; }

    public virtual Subservice? Subservice { get; set; }

    public virtual User? User { get; set; }
}
