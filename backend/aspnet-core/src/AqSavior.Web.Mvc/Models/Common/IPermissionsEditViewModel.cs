using System.Collections.Generic;
using AqSavior.Roles.Dto;

namespace AqSavior.Web.Models.Common
{
    public interface IPermissionsEditViewModel
    {
        List<FlatPermissionDto> Permissions { get; set; }
    }
}