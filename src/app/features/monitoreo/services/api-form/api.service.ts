import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { AuthService } from '../api-login/auth.service';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private baseUrl = 'http://localhost:6754/api'; // Asegúrate de que la URL base sea correcta

  constructor(private http: HttpClient, private authService: AuthService) {}

  private getUserId(): string | null {
    return this.authService.getUserId(); // Get the UserId from the AuthService
  }

  private getHeaders(): HttpHeaders {
    const token = this.authService.getAuthToken();
    return new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });
  }

  private handleError(error: HttpErrorResponse): Observable<never> {
    console.error('Error occurred:', error);
    let errorMsg = 'An unknown error occurred!';
    if (error.error instanceof ErrorEvent) {
      errorMsg = `Client-side error: ${error.error.message}`;
    } else if (error.status) {
      errorMsg = `Server-side error: ${error.status} - ${error.error}`;
      if (error.status === 500) {
        errorMsg = 'Internal server error. Please try again later.';
      }
    }
    return throwError(errorMsg);
  }

  crearEspecie(data: any): Observable<any> {
    const userId = this.getUserId();
    if (!userId) {
      console.error('UserId not available');
      return throwError('UserId not available');
    }
    data.UserId = userId;
    return this.http.post<any>(`${this.baseUrl}/CrearEspecie/Crear`, data, { headers: this.getHeaders() })
      .pipe(catchError(this.handleError));
  }

  listarEspecies(): Observable<Especie[]> {
    const userId = this.getUserId();
    console.log('UserId being sent:', userId);
    if (!userId) {
      console.error('UserId not available');
      return throwError('UserId not available');
    }
    return this.http.get<Especie[]>(`${this.baseUrl}/CrearEspecie/Listar`, {
      headers: this.getHeaders()
    }).pipe(
      tap((response: Especie[]) => console.log('Response from listarEspecies:', response)),
      catchError(this.handleError)
    );
  }

  modificarEspecie(especie: any): Observable<any> {
    return this.http.put<any>(`${this.baseUrl}/CrearEspecie/Modificar/${especie.Id}`, especie, { headers: this.getHeaders() })
      .pipe(catchError(this.handleError));
  }

  eliminarEspecie(id: number): Observable<any> {
    return this.http.delete<any>(`${this.baseUrl}/CrearEspecie/Eliminar/${id}`, { headers: this.getHeaders() })
      .pipe(catchError(this.handleError));
  }

  listarMonitoreo(): Observable<{ response: any[] }> {
    const userId = this.getUserId();
    return this.http.get<{ response: any[] }>(`${this.baseUrl}/Monitoreo/Leer?UserId=${userId}`)
      .pipe(catchError(this.handleError));
  }

  crearAlerta(alerta: Alerta): Observable<Alerta> {
    alerta.UserId = this.getUserId() || undefined;
    return this.http.post<Alerta>(`${this.baseUrl}/Alerta`, alerta, { headers: this.getHeaders() })
      .pipe(catchError(this.handleError));
  }

  obtenerAlertas(): Observable<Alerta[]> {
    const userId = this.getUserId();
    return this.http.get<Alerta[]>(`${this.baseUrl}/Alerta?UserId=${userId}`, { headers: this.getHeaders() })
      .pipe(catchError(this.handleError));
  }
}

export interface Monitoreo {
  ID_M: number;
  tds: number;
  Temperatura: number;
  PH: number;
  FechaHora: Date;
  LoteID: number;
  UserId?: string; // Added UserId
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
  UserId?: string; // Added UserId
}

export interface Alerta {
  Id?: number;
  EspecieID: number;
  Nombre: string;
  LoteID: number;
  Descripcion: string;
  Fecha?: Date;
  UserId?: string; // Added UserId
}