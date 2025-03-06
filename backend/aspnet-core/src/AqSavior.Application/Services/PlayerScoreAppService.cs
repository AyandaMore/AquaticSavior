using Abp.Domain.Repositories;
using AqSavior.Domains;
using AqSavior.Services.Dtos;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AqSavior.Services
{
    public class PlayerScoreAppService : AqSaviorAppServiceBase, IPlayerScoresAppService
    {
        private readonly IRepository<PlayerScore, Guid> _playerScoreRepository;

        public PlayerScoreAppService(IRepository<PlayerScore, Guid> playerScoreRepository)
        {
            _playerScoreRepository = playerScoreRepository;
        }
        public async Task<PlayerScoreDto> CreatePlayerScore(PlayerScoreDto input)
        {
            var playerScore = ObjectMapper.Map<PlayerScore>(input);
            playerScore = await _playerScoreRepository.InsertAsync(playerScore);
            await CurrentUnitOfWork.SaveChangesAsync();
            return ObjectMapper.Map<PlayerScoreDto>(playerScore);
        }

        public async Task DeletePlayerScore(Guid id)
        {
            await _playerScoreRepository.DeleteAsync(id);
        }

        public async Task<List<PlayerScoreDto>> GetAllPlayerScores()
        {
            var playerScores = await _playerScoreRepository.GetAllListAsync();
            return ObjectMapper.Map<List<PlayerScoreDto>>(playerScores);
        }

        public async Task<PlayerScoreDto> GetPlayerScoreById(Guid id)
        {
            var playerScore = await _playerScoreRepository.GetAsync(id);
            return ObjectMapper.Map<PlayerScoreDto>(playerScore);
        }

        public async Task<PlayerScoreDto> UpdatePlayerScore(PlayerScoreDto input)
        {
            var playerScore = await _playerScoreRepository.GetAsync(input.Id);
            ObjectMapper.Map(input, playerScore);
            playerScore = await _playerScoreRepository.UpdateAsync(playerScore);
            return ObjectMapper.Map<PlayerScoreDto>(playerScore);
        }
    }
}
