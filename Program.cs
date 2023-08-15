using Microsoft.OpenApi.Models;
using netcore_blog;
using netcore_blog.Models;
using netcore_blog.Services;


var builder = WebApplication.CreateBuilder(args);
builder.Services.AddSpaStaticFiles(configuration =>
{
    configuration.RootPath = configStr.rootPath;
});

// Add services to the container.

builder.Services.AddControllersWithViews();
builder.Services.AddHealthChecks();
builder.Services.AddSwaggerGen(config =>
{
    config.SwaggerDoc("v1", new OpenApiInfo() { Title = "Blog API", Version = "v1" });
});
builder.Services.Configure<DevDatabaseSettings>(
    builder.Configuration.GetSection("DevDatabase"));

builder.Services.AddSingleton<PostsService>();
builder.Services.AddHttpContextAccessor();

var app = builder.Build();

app.MapHealthChecks("/healthz");

// Configure the HTTP request pipeline.
if (!app.Environment.IsDevelopment())
{
    // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
    app.UseHsts();
}

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();
app.UseSpaStaticFiles();
app.UseStaticFiles();
app.UseRouting();


app.MapControllerRoute(
    name: "default",
    pattern: "{controller}/{action=Index}/{id?}");

app.MapFallbackToFile("index.html"); ;

app.Run();
