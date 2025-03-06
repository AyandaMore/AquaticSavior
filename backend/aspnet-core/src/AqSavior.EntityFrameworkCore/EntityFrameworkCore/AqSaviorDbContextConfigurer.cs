using System.Data.Common;
using Microsoft.EntityFrameworkCore;

namespace AqSavior.EntityFrameworkCore
{
    public static class AqSaviorDbContextConfigurer
    {
        public static void Configure(DbContextOptionsBuilder<AqSaviorDbContext> builder, string connectionString)
        {
            builder.UseSqlServer(connectionString);
        }

        public static void Configure(DbContextOptionsBuilder<AqSaviorDbContext> builder, DbConnection connection)
        {
            builder.UseSqlServer(connection);
        }
    }
}
