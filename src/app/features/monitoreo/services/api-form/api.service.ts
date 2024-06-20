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

  listarEspecies(): Observable<any> {
    return this.http.get(`${this.baseUrl}/CrearEspecie/Listar`);
  }

  eliminarEspecie(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/CrearEspecie/Eliminar/${id}`);
  }

  modificarEspecie(id: number, data: any): Observable<any> {
    return this.http.put(`${this.baseUrl}/CrearEspecie/Modificar/${id}`, data);
  }

  
  listarMonitoreo(): Observable<any> {
    return this.http.get(`${this.baseUrl}/api/Monitoreo/Leer`);
  }
}

export interface Monitoreo {
  ID_M: number;
  tds: Float32Array;
  Temperatura: Float32Array;
  PH: Float32Array;
  FechaHora: Date;
  LoteID: number;
}