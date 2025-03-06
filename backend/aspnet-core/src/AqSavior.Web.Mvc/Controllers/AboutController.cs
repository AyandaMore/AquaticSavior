using Microsoft.AspNetCore.Mvc;
using Abp.AspNetCore.Mvc.Authorization;
using AqSavior.Controllers;

namespace AqSavior.Web.Controllers
{
    [AbpMvcAuthorize]
    public class AboutController : AqSaviorControllerBase
    {
        public ActionResult Index()
        {
            return View();
        }
	}
}
