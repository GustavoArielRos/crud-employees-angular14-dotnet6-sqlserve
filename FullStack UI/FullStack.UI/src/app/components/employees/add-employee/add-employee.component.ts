import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Employee } from 'src/app/models/employee.model';
import { EmployeesService } from 'src/app/services/employees.service';

@Component({
  selector: 'app-add-employee',
  templateUrl: './add-employee.component.html',
  styleUrls: ['./add-employee.component.css']
})
export class AddEmployeeComponent implements OnInit {

  //Inicializa um objeto do tipo Employee
  addEmployeeRequest: Employee = {
    id: '',
    name: '',
    email: '',
    phone: 0,
    salary: 0,
    department: '',
  };

  //Quando essa classe se inicia, ela faz injeção de dois serviços "EmployeesService" e "Router"
  constructor(private employeeService: EmployeesService, private router: Router ) { }

  ngOnInit(): void {
  }

  //método para adicionar um empregado
  addEmployee(){
    //vai chamar o método do service(POST) que recebe como parâmetro um objeto do tipo Employee
    this.employeeService.addEmployee(this.addEmployeeRequest)
    .subscribe({//subscribe serve para manipular dados recebidos de forma assíncrona
      //quando a requisição é bem sucedida
      next: (employee) => {
        //navega para a rota "employees"
        this.router.navigate(['employees']);
      }
    });
  }
}
