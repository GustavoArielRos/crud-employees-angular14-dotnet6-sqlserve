import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Employee } from 'src/app/models/employee.model';
import { EmployeesService } from 'src/app/services/employees.service';

@Component({
  selector: 'app-edit-employee',
  templateUrl: './edit-employee.component.html',
  styleUrls: ['./edit-employee.component.css']
})
export class EditEmployeeComponent implements OnInit {

  //define um objeto do tipo Employee com seus atributos
  employeeDetails: Employee = {
    id: '',
    name: '',
    email: '',
    phone: 0,
    salary: 0,
    department: '',
  };

  //injeção de dependencia do "ActivatedRoute" e do "EmployeesService"
  constructor(private route: ActivatedRoute, private employeeService: EmployeesService,private router: Router) 
  { }

  //quando o componente é inicializado esse método é rodado
  ngOnInit(): void {
    //o paramMap é emitido sempre que há uma mudança nos parâmetros da rota
    this.route.paramMap.subscribe({
      //a função next é chamada sempre quando a novos parâmetros de rota(URL)
      next: (params) => {
        //ele pega o 'id' do parametro de rota(URL)(pega o id da URL)
        const id = params.get('id');

        //se o id possui um valor
        if(id){
          //aciona o método do service passando para ele o id
          this.employeeService.getEmployee(id)
          .subscribe({
            //caso a resposta do service estiver ok
            next: (response) => {
              //adiciono a resposta no objeto criado
              this.employeeDetails = response;
            }
          });
        }
      } 
    })
  }

  updateEmployee() {
    //chama o método criado no service e coloca como parâmetros o id e o objeto do tipo Employee
    this.employeeService.updateEmployee(this.employeeDetails.id, this.employeeDetails)
    .subscribe({//como esse método do service gera uma requisição http, logo ela terá uma resposta
      next: (reponse) => {
        //perceba que mesmo tendo uma resposta eu não utilizo ela aqui
        //eu apenas faço o caminho da url para "employees"
        this.router.navigate(['employees']);

      }
    })
  }

  //metodo deletar que receba uma string
  deleteEmployee(id: string){
    //aciona o método delete do service enviando para ele o id 
    this.employeeService.deleteEmployee(id)
    .subscribe({//requisição sempre recebe uma respsota
      next: (response) => {
        //perceba que mesmo tendo uma resposta eu não utilizo ela aqui
        //eu apenas faço o caminho da url para "employees"
        this.router.navigate(['employees']);
      }
    })
  }

}
