using Abp.Domain.Entities;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AqSavior.Domains
{
    public class PlayerScore : Entity<Guid>
    {

        [MaxLength(100)]
        public virtual string PlayerName { get; set; }

        public virtual int Score { get; set; }

    }
}
