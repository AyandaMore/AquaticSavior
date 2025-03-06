using Abp.AspNetCore.Mvc.Controllers;
using Abp.IdentityFramework;
using Microsoft.AspNetCore.Identity;

namespace AqSavior.Controllers
{
    public abstract class AqSaviorControllerBase: AbpController
    {
        protected AqSaviorControllerBase()
        {
            LocalizationSourceName = AqSaviorConsts.LocalizationSourceName;
        }

        protected void CheckErrors(IdentityResult identityResult)
        {
            identityResult.CheckErrors(LocalizationManager);
        }
    }
}
