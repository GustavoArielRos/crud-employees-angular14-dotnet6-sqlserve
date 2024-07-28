using FullStack.API.Data;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

//injeção de dependencia, isso ajuda o FullStackDbContext possa ser injetado em outras partes da aplicação
//com isso voce pode ter uma instancia do contexto de banco de dados onde voce precisar(controlador,serviços) sem
//precisar criar uma nova instancia manualmente
builder.Services.AddDbContext<FullStackDbContext>(options =>
   options.UseSqlServer(builder.Configuration.GetConnectionString("FullStackConnectionString"))
);


var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

//habilitando o CORS
app.UseCors(policy => policy.AllowAnyHeader().AllowAnyMethod().AllowAnyOrigin());

app.UseAuthorization();

app.MapControllers();

app.Run();
