using Abp.Authorization;
using AqSavior.Authorization.Roles;
using AqSavior.Authorization.Users;

namespace AqSavior.Authorization
{
    public class PermissionChecker : PermissionChecker<Role, User>
    {
        public PermissionChecker(UserManager userManager)
            : base(userManager)
        {
        }
    }
}
