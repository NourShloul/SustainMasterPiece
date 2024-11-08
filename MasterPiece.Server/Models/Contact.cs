using System;
using System.Collections.Generic;

namespace MasterPiece.Server.Models;

public partial class Contact
{
    public long ContactId { get; set; }

    public string Name { get; set; } = null!;

    public string Email { get; set; } = null!;

    public string Message { get; set; } = null!;

    public DateTime? CreatedAt { get; set; }

    public string? ReplyMessage { get; set; }

    public int? PhoneNum { get; set; }
}
