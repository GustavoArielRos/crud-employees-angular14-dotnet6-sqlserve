using FullStack.API.Data;
using FullStack.API.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace FullStack.API.Controllers
{   
    
    [ApiController]//dizer ao dotnet que isso é uma API e que ela não vai ter uma view
    [Route("api/[controller]")]//o [controller] vai lançar o nome dele que no caso é "Employees"
    //quando o usuário acessar essa Rota acima, tudo que está aqui poderá ser utilizado
    public class EmployeesController : Controller
    {
        private readonly FullStackDbContext _fullStackDbContext;

        public EmployeesController(FullStackDbContext fullStackDbContext)
        {
            _fullStackDbContext = fullStackDbContext;
        }

        //pegar todos os empregados
        [HttpGet]
        public async Task<IActionResult> GetAllEmployees()
        {
            var employees = await _fullStackDbContext.Employees.ToListAsync();

            //Ok --> é o status 200
            return Ok(employees);
        }

        //adicionar um empregado
        [HttpPost]//post cria e put edita

        public async Task<IActionResult> AddEmployee([FromBody] Employee employeeRequest)
        {
            //FromBody idincia que o "employeeRequest" deve ser lido do corpo de solicitação do método HTTP
            //geralmente vem em formato JSON e com isso ele desserializa ele e cria um objeto Employee
            //com esses dados vindo do corpo

            //GUID --> Global Unique Identifier, gera um valor único em todo o sistema
            employeeRequest.Id = Guid.NewGuid();

            //adicionando o novo empregado no banco de dados
            await _fullStackDbContext.Employees.AddAsync(employeeRequest);

            //salva essa atualização do banco de dados
            await _fullStackDbContext.SaveChangesAsync();

            //retorna uma resposta Ok(200) com a informação desse novo empregado
            return Ok(employeeRequest);
        }
    }
}
