import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private baseUrl = 'http://localhost:6754'; // URL base de tu backend

  constructor(private http: HttpClient) {}

  // Métodos para Especie
  crearEspecie(data: any): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/CrearEspecie/Crear`, data)
      .pipe(catchError(this.handleError));
  }

  listarEspecies(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/CrearEspecie/Listar`)
      .pipe(catchError(this.handleError));
  }

  eliminarEspecie(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/CrearEspecie/Eliminar/${id}`)
      .pipe(catchError(this.handleError));
  }

  modificarEspecie(especie: Especie): Observable<void> {
    return this.http.put<void>(`${this.baseUrl}/CrearEspecie/Modificar`, especie)
      .pipe(catchError(this.handleError));
  }

  // Métodos para Monitoreo
  listarMonitoreo(): Observable<{ response: any[] }> {
    return this.http.get<{ response: any[] }>(`${this.baseUrl}/api/Monitoreo/Leer`)
      .pipe(catchError(this.handleError));
  }
  // Métodos para Alerta
  crearAlerta(alerta: Alerta): Observable<Alerta> {
    return this.http.post<Alerta>(`${this.baseUrl}/api/Alerta`, alerta)
      .pipe(catchError(this.handleError));
  }

  obtenerAlertas(): Observable<Alerta[]> {
    return this.http.get<Alerta[]>(`${this.baseUrl}/api/Alerta`)
      .pipe(catchError(this.handleError));
  }
  
  // Manejo de errores
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
}

// Interfaces
export interface Monitoreo {
  ID_M: number;
  tds: number;
  Temperatura: number;
  PH: number;
  FechaHora: Date;
  LoteID: number;
}

export interface Especie {
  Id: number;
  NombreEspecie: string;
  TdsMinimo: number;
  TdsMaximo: number;
  TemperaturaMinimo: number;
  TemperaturaMaximo: number;
  PhMinimo: number;
  PhMaximo: number;
}

export interface Alerta {
  Id?: number;
  EspecieID: number;
  Nombre: string;
  LoteID: number;
  Descripcion: string;
  Fecha?: string | Date; // Make sure it can be either string or Date
  Mensaje?: string; // Add this if it's not already there
}