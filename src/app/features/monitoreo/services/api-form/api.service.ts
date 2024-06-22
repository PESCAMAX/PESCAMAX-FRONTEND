// src/app/features/monitoreo/services/api-form/api.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';

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

  modificarEspecie(especie: Especie): Observable<void> {
    return this.http.put<void>(`${this.baseUrl}/CrearEspecie/Modificar`, especie)
      .pipe(
        catchError(this.handleError)
      );
    }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // Error del lado del cliente o de red.
      console.error('Ocurrió un error:', error.error.message);
    } else {
      // El backend retornó un código de respuesta sin éxito.
      console.error(
        `Backend retornó código ${error.status}, ` +
        `body was: ${error.error}`);
    }
    // Retorna un observable con un mensaje de error orientado al usuario
    return throwError('Algo malo sucedió; por favor, inténtalo de nuevo más tarde.');
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

 export interface Especie {
  id: number;
  nombreEspecie: string;
  tdsMinimo: number;
  tdsMaximo: number;
  temperaturaMinimo: number;
  temperaturaMaximo: number;
  phMinimo: number;
  phMaximo: number;
}