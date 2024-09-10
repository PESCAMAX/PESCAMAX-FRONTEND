import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { AuthService } from '../../../../core/services/api-login/auth.service';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  obtenerLotes() {
    throw new Error('Method not implemented.');
  }//https://pescamaxbueno-cga7gdg8gcbra2e4.eastus-01.azurewebsites.net
  private baseUrl = 'http://localhost:6754/api';

  constructor(
    private http: HttpClient,
    private authService: AuthService
  ) {}

  private getHeaders(): HttpHeaders {
    const token = localStorage.getItem('token');
    if (!token) {
      throw new Error('Token not found in localStorage');
    }
    return new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });
  }
  public getUserId(): string {
    return this.authService.getUserId();
  }
  private handleError(error: HttpErrorResponse): Observable<never> {
    console.error('Error occurred:', error);
    let errorMsg = 'An unknown error occurred!';
    
    if (error.error instanceof ErrorEvent) {
      // Error del lado del cliente
      errorMsg = `Client-side error: ${error.error.message}`;
    } else if (error.error && typeof error.error === 'object' && 'mensaje' in error.error) {
      // Error del lado del servidor con mensaje específico
      errorMsg = `Server-side error: ${error.status} - ${error.error.mensaje}`;
    } else if (error.status) {
      // Error del lado del servidor con código de estado
      if (error.status === 401) {
        // Manejo específico para errores 401
        errorMsg = 'Unauthorized: Please check your credentials or login again.';
        // Aquí puedes agregar lógica adicional, como redirigir al usuario al login
      } else {
        errorMsg = `Server-side error: ${error.status} - ${error.statusText}`;
      }
    }
    
    return throwError(() => new Error(errorMsg));
  }
  crearEspecie(userId: string, especieData: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/CrearEspecie/Crear/${userId}`, especieData, { headers: this.getHeaders() });
  }
  public listarEspecies(userId: string): Observable<any> {
    const headers = this.getHeaders();
    const url = `${this.baseUrl}/CrearEspecie/Listar/${userId}`;
    return this.http.get(url, { headers }).pipe(
      catchError(this.handleError)
    );
  }
  obtenerMortalidadPorLote(){
    return this.http.get(`${this.baseUrl}/Mortalidad/Obtener`).pipe(
      catchError(this.handleError)
    );
  }

  registrarMortalidad(mortalidad: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/Mortalidad/Registrar`, mortalidad, { headers: this.getHeaders() })
      .pipe(catchError(this.handleError));
  }


  obtenerMortalidadTotal(loteId: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/Mortalidad/ObtenerTotal/${loteId}`).pipe(
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


    getCurrentUser(): Observable<any> {
      return this.http.get(`${this.baseUrl}/Users/current`, { headers: this.getHeaders() })
        .pipe(catchError(this.handleError));
    }
  
    updateUser(user: any): Observable<any> {
      return this.http.put<any>(`${this.baseUrl}/Users/update`, user, { headers: this.getHeaders() })
        .pipe(catchError(this.handleError));
    }
  }
  export interface EspecieLoteDTO {
    LoteId: number;
    EspecieId: number;
    NombreEspecie: string;
  }
  interface User {
    username: string;
    email: string;
    phoneNumber?: string;
    address?: string;
    farmName?: string;
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