using FullStack.API.Models;
using Microsoft.EntityFrameworkCore;

namespace FullStack.API.Data
{
    public class FullStackDbContext: DbContext
    {
        public FullStackDbContext(DbContextOptions options) : base(options)
        {

        }

        //criando a tabela chamada "Employees"
        public DbSet<Employee> Employees { get; set; }
    }
}
