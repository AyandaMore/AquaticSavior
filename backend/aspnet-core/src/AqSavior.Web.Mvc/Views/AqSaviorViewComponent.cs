using Abp.AspNetCore.Mvc.ViewComponents;

namespace AqSavior.Web.Views
{
    public abstract class AqSaviorViewComponent : AbpViewComponent
    {
        protected AqSaviorViewComponent()
        {
            LocalizationSourceName = AqSaviorConsts.LocalizationSourceName;
        }
    }
}
