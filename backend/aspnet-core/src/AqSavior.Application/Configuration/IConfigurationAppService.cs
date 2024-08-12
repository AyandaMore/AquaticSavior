using System.Threading.Tasks;
using AqSavior.Configuration.Dto;

namespace AqSavior.Configuration
{
    public interface IConfigurationAppService
    {
        Task ChangeUiTheme(ChangeUiThemeInput input);
    }
}
