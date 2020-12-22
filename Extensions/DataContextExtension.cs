using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using TaskManager.Data;

namespace TaskManager.Extensions
{
    public static class DataContextExtension
    {
        public static IServiceCollection AddDataContext(this IServiceCollection services, IConfiguration configuration)
        {
            return services.AddDbContext<DataContext>(x => x.UseSqlServer(configuration.GetConnectionString("DefaultDb")));
        }
    }
}