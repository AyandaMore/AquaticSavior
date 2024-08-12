using Abp.AspNetCore.Mvc.Views;
using Abp.Runtime.Session;
using Microsoft.AspNetCore.Mvc.Razor.Internal;

namespace AqSavior.Web.Views
{
    public abstract class AqSaviorRazorPage<TModel> : AbpRazorPage<TModel>
    {
        [RazorInject]
        public IAbpSession AbpSession { get; set; }

        protected AqSaviorRazorPage()
        {
            LocalizationSourceName = AqSaviorConsts.LocalizationSourceName;
        }
    }
}
