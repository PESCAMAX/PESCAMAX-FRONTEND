import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private baseUrl = 'http://localhost:6754'; // URL base de tu backend

  constructor(private http: HttpClient) {}

  crearEspecie(data: any): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/CrearEspecie/Crear`, data);
  }

  listarEspecies(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/CrearEspecie/Listar`);
  }

  eliminarEspecie(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/CrearEspecie/Eliminar/${id}`);
  }

  modificarEspecie(id: number, data: any): Observable<any> {
    return this.http.put<any>(`${this.baseUrl}/CrearEspecie/Modificar/${id}`, data);
  }

  listarMonitoreo(): Observable<{ response: any[] }> {
    return this.http.get<{ response: any[] }>(`${this.baseUrl}/api/Monitoreo/Leer`);
  }
}

export interface Monitoreo {
  ID_M: number;
  tds: number;
  temperatura: number;
  ph: number;
  fechaHora: Date;
  loteID: number;
}
