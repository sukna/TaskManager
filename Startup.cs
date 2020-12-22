using AutoMapper;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using TaskManager.Auth.Extensions;
using TaskManager.Codes.Services;
using TaskManager.Codes.Services.Interfaces;
using TaskManager.Extensions;
using TaskManager.Middlewares;
using TaskManager.Task.Services;
using TaskManager.Task.Services.Interface;


namespace TaskManager
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddDataContext(Configuration);
            services.AddAutoMapper(typeof(Startup));
            
            services.AddScoped<ICodesServices, CodesServices>();
            services.AddScoped<ITaskServices, TaskServices>();
            services.AddScoped<ITaskLogServices, TaskLogServices>();

            services.AddCors(c =>
            {
                c.AddPolicy("AllowOrigin", options => options.AllowAnyOrigin().AllowAnyHeader().AllowAnyMethod());
            });

            services.AddControllers()
           .AddNewtonsoftJson(options =>
                options.SerializerSettings.ReferenceLoopHandling = Newtonsoft.Json.ReferenceLoopHandling.Ignore
            );
            
            services.AddJWTAuthToken(Configuration);
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            app.UseRouting();

            app.UseCors(
                options => options.AllowAnyOrigin()
            );

            app.UseAuthentication();

            app.UseAuthorization();

            app.UseMiddleware<ExceptionHandlerMiddleware>();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
            });
        }
    }
}
