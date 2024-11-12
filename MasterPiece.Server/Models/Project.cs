using System;
using System.Collections.Generic;

namespace MasterPiece.Server.Models;

public partial class Project
{
    public long ProjectId { get; set; }

    public string ProjectName { get; set; } = null!;

    public string Description { get; set; } = null!;

    public string? Image { get; set; }
}
