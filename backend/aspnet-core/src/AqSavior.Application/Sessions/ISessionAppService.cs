using System.Threading.Tasks;
using Abp.Application.Services;
using AqSavior.Sessions.Dto;

namespace AqSavior.Sessions
{
    public interface ISessionAppService : IApplicationService
    {
        Task<GetCurrentLoginInformationsOutput> GetCurrentLoginInformations();
    }
}
