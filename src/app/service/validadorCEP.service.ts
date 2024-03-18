import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { environment } from "../../environments/environment";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class ValidadorCEPService {
  baseUrl = environment.baseUrl;
  empresas: any;

  constructor(private httpClient: HttpClient) {}

  buscarEnderecoPorCep(cep: string): Observable<any> {
    const url = `https://viacep.com.br/ws/${cep}/json/`;
  
    return this.httpClient.get(url);
  }
}
