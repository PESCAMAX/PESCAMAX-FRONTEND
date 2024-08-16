import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { AuthService } from '../../../../core/services/api-login/auth.service';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private baseUrl = 'http://localhost:6754/api';

  constructor(
    private http: HttpClient,
    private authService: AuthService
  ) {}

  private getHeaders(): HttpHeaders {
    const token = localStorage.getItem('token');
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
    } else if (error.error && typeof error.error === 'object' && 'mensaje' in error.error) {
      errorMsg = `Server-side error: ${error.status} - ${error.error.mensaje}`;
    } else if (error.status) {
      errorMsg = `Server-side error: ${error.status} - ${error.statusText}`;
    }
    return throwError(() => new Error(errorMsg));
  }
  crearEspecie(userId: string, especieData: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/CrearEspecie/Crear/${userId}`, especieData, { headers: this.getHeaders() });
  }
  listarEspecies(userId: string): Observable<Especie[]> {
    return this.http.get<Especie[]>(`${this.baseUrl}/CrearEspecie/Listar/${userId}`).pipe(
      catchError(this.handleError)
    );
  }
  modificarEspecie(especie: Especie): Observable<any> {
    const url = `${this.baseUrl}/CrearEspecie/Modificar/${especie.UserId}`;
    return this.http.put(url, especie, { headers: this.getHeaders() })
      .pipe(catchError(this.handleError));
  }

  eliminarEspecie(id: number): Observable<any> {
    return this.http.delete<any>(`${this.baseUrl}/CrearEspecie/Eliminar/${id}`, { headers: this.getHeaders() })
      .pipe(catchError(this.handleError));
  }

  listarMonitoreo(userId: string): Observable<{ response: Monitoreo[] }> {
    return this.http.get<{ response: Monitoreo[] }>(`${this.baseUrl}/Monitoreo/Leer/${userId || ''}`, { headers: this.getHeaders() })
      .pipe(
        tap(response => console.log('Datos de monitoreo recibidos:', response)),
        catchError(this.handleError)
      );
  }

  crearAlerta(alerta: Alerta): Observable<Alerta> {
    return this.http.post<Alerta>(`${this.baseUrl}/Alerta`, alerta, { headers: this.getHeaders() })
      .pipe(catchError(this.handleError));
  }

  obtenerAlertas(): Observable<Alerta[]> {
    return this.http.get<Alerta[]>(`${this.baseUrl}/Alerta`, { headers: this.getHeaders() })
      .pipe(
        tap(alertas => console.log('Alertas recibidas:', alertas)),
        catchError(this.handleError)
      );
  }

  
    asignarEspecieALote(especieId: number, loteId: number, userId: string): Observable<any> {
      return this.http.post(`${this.baseUrl}/EspecieLote/Asignar`, { EspecieId: especieId, LoteId: loteId, UserId: userId }, { headers: this.getHeaders() })
        .pipe(catchError(this.handleError));
    }
  
    obtenerEspeciePorLote(userId: string): Observable<EspecieLoteDTO[]> {
      return this.http.get<EspecieLoteDTO[]>(`${this.baseUrl}/EspecieLote/Obtener/${userId}`);
    }


    getCurrentUser(userId: string): Observable<any> {
      return this.http.get<any>(`${this.baseUrl}/users/${userId}`);
    }
  
    updateUser(user: any): Observable<any> {
      return this.http.put<any>(`${this.baseUrl}/users/${user.id}`, user);
    }
  }

  

  export interface EspecieLoteDTO {
    LoteId: number;
    EspecieId: number;
    NombreEspecie: string;
  }
export interface Monitoreo {
  ID_M: number;
  tds: number;
  Temperatura: number;
  PH: number;
  FechaHora: Date;
  LoteID: number;
  userId: string;
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
  UserId: string;  // Cambiado de userId a UserId
}

export interface Alerta {
  Id?: number;
  EspecieID: number;
  Nombre: string;
  LoteID: number;
  Descripcion: string;
  FechaCreacion?: Date; // Asegúrate de que este campo es de tipo Date
  UserId: string;
}
