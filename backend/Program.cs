using Cookbook.DataAccess;
using Cookbook.Extensions;

var builder = WebApplication.CreateBuilder(args);

builder.Logging.AddSimpleConsole(options =>
{
  options.TimestampFormat = "[HH:mm:ss] ";
});

builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen(options =>
{
  options.SupportNonNullableReferenceTypes();
});

builder.Services.AddCors(options =>
{
  options.AddPolicy("dev", policy =>
  {
    policy.WithOrigins("http://192.168.0.164:5173")
      .AllowAnyMethod()
      .AllowAnyHeader()
      .AllowCredentials();
  });
});

builder.Services
  .AddDbContext<CookbookContext>()
  .AddScopedSingleImplementationServices();

var app = builder.Build();

if (app.Environment.IsDevelopment())
{
  app.UseSwagger();
  app.UseSwaggerUI();
}

// app.UseHttpsRedirection();

if (app.Environment.IsDevelopment())
{
  app.UseCors("dev");
}

app.AddAllEndpoints().Run();