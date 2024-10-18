using FirebaseAdmin;
using Google.Apis.Auth.OAuth2;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using Partilha.Application.Services;
using Partilha.Data;
using Partilha.Data.Repositories;
using Partilha.Domain.Interfaces;
using System.Text.Json;
using Partilha.Api.Middlewares;

// Lê o arquivo JSON para obter o project_id
var json = File.ReadAllText("firebase-service-account.json");
var jsonDoc = JsonDocument.Parse(json);
var Firebase_ProjectId = jsonDoc.RootElement.GetProperty("project_id").GetString();

var builder = WebApplication.CreateBuilder(args);

// Configuração Firebase
FirebaseApp.Create(new AppOptions
{
    Credential = GoogleCredential.FromFile("firebase-service-account.json")
});

// Configuração PostgreSQL
var connectionString = builder.Configuration.GetConnectionString("DefaultConnection");
builder.Services.AddDbContext<AppDbContext>(options =>
    options.UseNpgsql(connectionString));

// Adiciona repositórios e serviços
builder.Services.AddScoped<IUserRepository, UserRepository>();
builder.Services.AddScoped<FriendService>();


// Configuração do JWT
builder.Services
    .AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
    .AddJwtBearer(options =>
    {
        options.Authority = $"https://securetoken.google.com/{Firebase_ProjectId}";
        options.TokenValidationParameters = new TokenValidationParameters
        {
            ValidateIssuer = true,
            ValidIssuer = $"https://securetoken.google.com/{Firebase_ProjectId}",
            ValidateAudience = true,
            ValidAudience = $"{Firebase_ProjectId}",
            ValidateLifetime = true
        };
    });

builder.Services.AddAuthorization();

// Adiciona serviços de controle
builder.Services.AddControllers();


// Add services to the container.
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseAuthentication();
app.UseMiddleware<FirebaseAuthMiddleware>();
app.UseAuthorization();

app.MapControllers();
app.Run();