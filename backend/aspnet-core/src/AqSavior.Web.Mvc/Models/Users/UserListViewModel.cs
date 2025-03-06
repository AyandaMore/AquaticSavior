using System.Collections.Generic;
using AqSavior.Roles.Dto;

namespace AqSavior.Web.Models.Users
{
    public class UserListViewModel
    {
        public IReadOnlyList<RoleDto> Roles { get; set; }
    }
}
