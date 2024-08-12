using Abp.AspNetCore;
using Abp.AspNetCore.TestBase;
using Abp.Modules;
using Abp.Reflection.Extensions;
using AqSavior.EntityFrameworkCore;
using AqSavior.Web.Startup;
using Microsoft.AspNetCore.Mvc.ApplicationParts;

namespace AqSavior.Web.Tests
{
    [DependsOn(
        typeof(AqSaviorWebMvcModule),
        typeof(AbpAspNetCoreTestBaseModule)
    )]
    public class AqSaviorWebTestModule : AbpModule
    {
        public AqSaviorWebTestModule(AqSaviorEntityFrameworkModule abpProjectNameEntityFrameworkModule)
        {
            abpProjectNameEntityFrameworkModule.SkipDbContextRegistration = true;
        } 
        
        public override void PreInitialize()
        {
            Configuration.UnitOfWork.IsTransactional = false; //EF Core InMemory DB does not support transactions.
        }

        public override void Initialize()
        {
            IocManager.RegisterAssemblyByConvention(typeof(AqSaviorWebTestModule).GetAssembly());
        }
        
        public override void PostInitialize()
        {
            IocManager.Resolve<ApplicationPartManager>()
                .AddApplicationPartsIfNotAddedBefore(typeof(AqSaviorWebMvcModule).Assembly);
        }
    }
}