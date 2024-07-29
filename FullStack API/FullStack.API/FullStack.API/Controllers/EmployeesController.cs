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

        //visualizar somente um empregado
        [HttpGet]//esse método responderá uma requisição HTTP GET
        [Route("{id:Guid}")]//define uma rota para esse método [Route("api/[controller]")] + [Route("{id:Guid}")]
        public async Task<IActionResult> GetEmployee([FromRoute]Guid id)//FromRoute dizendo que a informação vem da URL
        {      
            //procura o empregado na tabela pela id e armazena as informações na variável
            var employee = await _fullStackDbContext.Employees.FirstOrDefaultAsync(e => e.Id == id);

            //se exister o id
            if (employee != null)
            {
                return Ok(employee);//retorna a informação do empregado como resposta
            }
            else
            {
                return NotFound();//não retorna a informação
            }
                
        }

        //editar somente um empregado
        [HttpPut]//esse método responderá uma requisição HTTP GET
        [Route("{id:Guid}")]//define uma rota para esse método [Route("api/[controller]")] + [Route("{id:Guid}")]

        //o id do parametro vem da URL e o objeto vem do Corpo de solicitação do método HTTP
        public async Task<IActionResult> UpdateEmployee([FromRoute] Guid id,[FromBody] Employee updateEmployeeRequest )
        {
            var employee = await _fullStackDbContext.Employees.FindAsync(id);//encontrado o empregado na tabela pelo id

            if(employee != null)
            {   
                //atualizando as informações do achado na tabela pelo recebido no parâmetro
                employee.Name = updateEmployeeRequest.Name;
                employee.Email = updateEmployeeRequest.Email;
                employee.Phone = updateEmployeeRequest.Phone;
                employee.Salary = updateEmployeeRequest.Salary;
                employee.Department = updateEmployeeRequest.Department;
                // o EF automaticamente rasteia as alterações feitas na entidades vindas do banco de dados
                //salva a alteração
                await _fullStackDbContext.SaveChangesAsync();

                //retorna um ok (200) com o employee como resposta da requisição
                return Ok(employee);
            }
            else
            {
                return NotFound();
            }
        }

        //esse método só é acionado com requisição do metodo http delete
        [HttpDelete]
        [Route("{id:Guid}")]//define uma rota para esse método [Route("api/[controller]")] + [Route("{id:Guid}")]
        //o id do parametro vem da URL
        public async Task<IActionResult> DeleteEmployee([FromRoute] Guid id)//indica que esse id vem do caminho da rota(URL)
        {   
            //procura na tabela o empregado referente ao id do parametro
            var employee = await _fullStackDbContext.Employees.FindAsync(id);

            if(employee != null)
            {   
                //remove esse empregado da tabela
                _fullStackDbContext.Employees.Remove(employee);
                //salva a mudança
                await _fullStackDbContext.SaveChangesAsync();
                //retorna como resposta esse empregado deletado
                return Ok(employee);
            }
            else
            {
                return NotFound();
            }
        }
    }
}
