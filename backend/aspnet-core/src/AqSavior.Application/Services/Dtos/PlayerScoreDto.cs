using Abp.Application.Services.Dto;
using Abp.AutoMapper;
using AqSavior.Domains;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AqSavior.Services.Dtos
{
    [AutoMap(typeof(PlayerScore))]
    public class PlayerScoreDto : EntityDto<Guid>
    {
        public string PlayerName { get; set; }

        public int Score { get; set; }
    }
}
