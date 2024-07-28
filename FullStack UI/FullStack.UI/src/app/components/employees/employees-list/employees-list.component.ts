import { Component, OnInit } from '@angular/core';
import { Employee } from 'src/app/models/employee.model';
import { EmployeesService } from 'src/app/services/employees.service';

@Component({
  selector: 'app-employees-list',
  templateUrl: './employees-list.component.html',
  styleUrls: ['./employees-list.component.css']
})
export class EmployeesListComponent implements OnInit {

  employees: Employee[] = [];

  //fazendo que logo de cara peguemos todas as configurações do service para serem usadas aqui
  
  constructor(private employeesService: EmployeesService) { }
  ngOnInit(): void {
    this.employeesService.getAllEmployees()
    .subscribe({
      //se der certo
      next: (employees) => {
        
        this.employees = employees;//a resposta do service vai ser armazenada na lista  "employees"
      },
      //se der errado
      error: (response) => {
        console.log(response);//a resposta da requisição vai aparecer no console
      }
    })    
  }
}
