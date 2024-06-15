import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private baseUrl = 'http://localhost:6754'; // URL base de tu backend

  constructor(private http: HttpClient) { }

  crearEspecie(data: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/CrearEspecie/Crear`, data);
  }

  // Aquí puedes añadir otros métodos para interactuar con tu backend
}
