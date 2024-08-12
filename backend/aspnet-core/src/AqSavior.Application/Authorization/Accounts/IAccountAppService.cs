using System.Threading.Tasks;
using Abp.Application.Services;
using AqSavior.Authorization.Accounts.Dto;

namespace AqSavior.Authorization.Accounts
{
    public interface IAccountAppService : IApplicationService
    {
        Task<IsTenantAvailableOutput> IsTenantAvailable(IsTenantAvailableInput input);

        Task<RegisterOutput> Register(RegisterInput input);
    }
}
