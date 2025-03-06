using System.Collections.Generic;
using AqSavior.Roles.Dto;

namespace AqSavior.Web.Models.Roles
{
    public class RoleListViewModel
    {
        public IReadOnlyList<PermissionDto> Permissions { get; set; }
    }
}
