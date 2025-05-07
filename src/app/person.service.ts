import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PersonService {
  private apiUrl = 'http://localhost:5672/pessoas';
  constructor(private http: HttpClient) {}

  enviarPessoa(dados: any): Observable<any> {
    return this.http.post(this.apiUrl, dados);
  }
}
