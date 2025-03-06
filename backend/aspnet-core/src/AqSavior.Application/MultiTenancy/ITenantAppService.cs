using Abp.Application.Services;
using AqSavior.MultiTenancy.Dto;

namespace AqSavior.MultiTenancy
{
    public interface ITenantAppService : IAsyncCrudAppService<TenantDto, int, PagedTenantResultRequestDto, CreateTenantDto, TenantDto>
    {
    }
}

