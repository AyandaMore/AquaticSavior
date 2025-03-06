using Microsoft.EntityFrameworkCore;
using Abp.Zero.EntityFrameworkCore;
using AqSavior.Authorization.Roles;
using AqSavior.Authorization.Users;
using AqSavior.MultiTenancy;
using AqSavior.Domains;

namespace AqSavior.EntityFrameworkCore
{
    public class AqSaviorDbContext : AbpZeroDbContext<Tenant, Role, User, AqSaviorDbContext>
    {
        /* Define a DbSet for each entity of the application */
        public DbSet<PlayerScore> PlayerScores { get; set; }
        
        public AqSaviorDbContext(DbContextOptions<AqSaviorDbContext> options)
            : base(options)
        {
        }
    }
}
