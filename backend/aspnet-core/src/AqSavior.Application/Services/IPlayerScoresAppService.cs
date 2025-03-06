using Abp.Application.Services;
using AqSavior.Services.Dtos;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AqSavior.Services
{
    public interface IPlayerScoresAppService : IApplicationService
    {
        Task<PlayerScoreDto> GetPlayerScoreById(Guid id);
        Task<List<PlayerScoreDto>> GetAllPlayerScores();
        Task<PlayerScoreDto> CreatePlayerScore(PlayerScoreDto input);
        Task<PlayerScoreDto> UpdatePlayerScore(PlayerScoreDto input);
        Task DeletePlayerScore(Guid id);
    }
}
