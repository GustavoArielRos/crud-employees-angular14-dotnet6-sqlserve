//importando o HttpClient para fazer requisições HTTP
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
//importando o environment para obter variáveis de configuração(URL base da API)
import { environment } from 'src/environments/environment';
import { Employee } from '../models/employee.model';
//Importando o Observable para trabalhar com operações assíncronas
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmployeesService {

  //pegando a URL base da API que esta no "environment"
  baseApiUrl: string = environment.baseApiUrl;

  //chamando o construtor para esse service receber o HttpClient
  //ele injeta uma instancia HttpClient no serviço(assim eu não preciso criar uma nova instância
  //toda vez que eu for usar o HttpClient)
  constructor(private http: HttpClient) { }

  //método para obter todos os empregados da API
  //retorna um observável lista do tipo Employee
  getAllEmployees(): Observable<Employee[]>  {
    //primeiro faz uma concatenação da URL base com "/api/employees"(api dos empregados [Route("api/[controller]")])
    //depois faz uma requisição "get" dessa URL fornecida
    //essa requisição vai retorna uma resposta no formato de array do tipo Employee
    return this.http.get<Employee[]>(this.baseApiUrl + '/api/employees');
  }

  //método para adicionar um empregado
  //recebe um objeto Employee e retorna um observável do tipo Employee
  addEmployee(addEmployeeRequest: Employee): Observable<Employee> {
    //criando um id vazio padrão, depois ele será automaticamente alterado
    addEmployeeRequest.id = '00000000-0000-0000-0000-000000000000';
    //faz uma requisição http post(criar) para o caminho dessa URL
    //envia um Objeto employee(addEmployeeRequest) no corpo dessa requisição
    return this.http.post<Employee>(this.baseApiUrl + '/api/employees', 
    addEmployeeRequest);
  }

  //método para obter um empregado
  //ele envia um id e retorna um observable que é um objeto do tipo Employee
  getEmployee(id: string): Observable<Employee> {
    //faz uma requisição http get da url
    //retorna um objeto Employee na resposta da requisição
    return this.http.get<Employee>(this.baseApiUrl + '/api/employees/' + id);
  }

  //método para atualizar um empregado
  //envia o id e objeto do tipo Employee
  updateEmployee(id: string, updateEmployeeRequest: Employee): Observable<Employee>{
    //aciona o método http put( editar) para essa URL e envia no corpo o objeto do tipo Employee
    //como resposta dessa requisição retorna um objeto do tipo Employee
    return this.http.put<Employee>(this.baseApiUrl + '/api/employees/' + id, updateEmployeeRequest)
  }

  //método para deletar um empregado
  //envia um id 
  deleteEmployee(id: string): Observable<Employee>{
    //faz uma requisição do método http(delete) nessa URL
    //retorna como resposta um objeto do tipo Employee
    return this.http.delete<Employee>(this.baseApiUrl + '/api/employees/' + id);
  }
}
