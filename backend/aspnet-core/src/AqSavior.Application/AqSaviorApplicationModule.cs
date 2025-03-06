using Abp.AutoMapper;
using Abp.Modules;
using Abp.Reflection.Extensions;
using AqSavior.Authorization;

namespace AqSavior
{
    [DependsOn(
        typeof(AqSaviorCoreModule), 
        typeof(AbpAutoMapperModule))]
    public class AqSaviorApplicationModule : AbpModule
    {
        public override void PreInitialize()
        {
            Configuration.Authorization.Providers.Add<AqSaviorAuthorizationProvider>();
        }

        public override void Initialize()
        {
            var thisAssembly = typeof(AqSaviorApplicationModule).GetAssembly();

            IocManager.RegisterAssemblyByConvention(thisAssembly);

            Configuration.Modules.AbpAutoMapper().Configurators.Add(
                // Scan the assembly for classes which inherit from AutoMapper.Profile
                cfg => cfg.AddMaps(thisAssembly)
            );
        }
    }
}
