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
  getAllEmployees(): Observable<Employee[]>  {
    //primeiro faz uma concatenação da URL base com "/api/employees"(api dos empregados [Route("api/[controller]")])
    //depois faz uma requisição "get" dessa URL fornecida
    //essa requisição vai retorna uma resposta no formato de array do tipo Employee
    return this.http.get<Employee[]>(this.baseApiUrl + '/api/employees');
  }
}
