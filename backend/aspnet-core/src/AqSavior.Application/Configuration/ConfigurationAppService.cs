using System.Threading.Tasks;
using Abp.Authorization;
using Abp.Runtime.Session;
using AqSavior.Configuration.Dto;

namespace AqSavior.Configuration
{
    [AbpAuthorize]
    public class ConfigurationAppService : AqSaviorAppServiceBase, IConfigurationAppService
    {
        public async Task ChangeUiTheme(ChangeUiThemeInput input)
        {
            await SettingManager.ChangeSettingForUserAsync(AbpSession.ToUserIdentifier(), AppSettingNames.UiTheme, input.Theme);
        }
    }
}
