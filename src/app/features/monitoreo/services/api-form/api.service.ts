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

  listarMonitoreo(): Observable<{ response: any[] }> {
    return this.http.get<{ response: any[] }>(`${this.baseUrl}/api/Monitoreo/Leer`)
      .pipe(catchError(this.handleError));
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
}

export interface Monitoreo {
  ID_M: number;
  tds: number;
  temperatura: number;
  ph: number;
  fechaHora: Date;
  loteID: number;
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