using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Abp.Modules;
using Abp.Reflection.Extensions;
using AqSavior.Configuration;

namespace AqSavior.Web.Host.Startup
{
    [DependsOn(
       typeof(AqSaviorWebCoreModule))]
    public class AqSaviorWebHostModule: AbpModule
    {
        private readonly IWebHostEnvironment _env;
        private readonly IConfigurationRoot _appConfiguration;

        public AqSaviorWebHostModule(IWebHostEnvironment env)
        {
            _env = env;
            _appConfiguration = env.GetAppConfiguration();
        }

        public override void Initialize()
        {
            IocManager.RegisterAssemblyByConvention(typeof(AqSaviorWebHostModule).GetAssembly());
        }
    }
}
