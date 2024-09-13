import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, throwError, BehaviorSubject, of } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
import { jwtDecode } from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  //https://pescamaxbueno-cga7gdg8gcbra2e4.eastus-01.azurewebsites.net
  private apiUrl = 'http://localhost:6754/api/Auth';
  private requirePasswordChangeSubject = new BehaviorSubject<boolean>(false);

  constructor(private http: HttpClient, private router: Router) {}

  login(credentials: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/login`, credentials).pipe(
      tap(response => {
        if (response && response.Token && response.UserId && response.RequirePasswordChange !== undefined) {
          localStorage.setItem('token', response.Token);
          localStorage.setItem('userId', response.UserId);
          this.requirePasswordChangeSubject.next(response.RequirePasswordChange);
          if (response.RequirePasswordChange) {
            if (response.UserId) {
              this.router.navigate(['/change-password', response.UserId]);
            } else {
              console.error('El userId es undefined');
            }
          } else {
            this.router.navigate(['/crear-especie', response.UserId]);
          }
        } else {
          throw new Error('La respuesta del servidor no contiene la información de autenticación esperada');
        }
      }),
      catchError(this.handleError)
    );
  }

  changePassword(currentPassword: string, newPassword: string): Observable<any> {
    const userId = this.getUserId();
    const token = this.getAuthToken();
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });

    return this.http.post<any>(`${this.apiUrl}/change-password`, { userId, currentPassword, newPassword }, { headers }).pipe(
      tap(response => {
        if (response.success) {
          this.setRequirePasswordChange(false);
        }
      }),
      catchError(this.handleError)
    );
  }

  private decodeToken(token: string): any {
    try {
      return jwtDecode(token);
    } catch (error) {
      console.error('Error al decodificar el token:', error);
      throw new Error('El token de autenticación no es válido');
    }
  }

  setRequirePasswordChange(value: boolean) {
    this.requirePasswordChangeSubject.next(value);
  }

  getRequirePasswordChange(): Observable<boolean> {
    return this.requirePasswordChangeSubject.asObservable();
  }

  logout(): Observable<any> {
    return of(null).pipe(
      tap(() => this.handleLogoutSuccess())
    );
  }

  private handleLogoutSuccess(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    this.requirePasswordChangeSubject.next(false);
    this.router.navigate(['/login']);
  }

  isAuthenticated(): boolean {
    const token = localStorage.getItem('token');
    return !!token;
  }

  getUserId(): string {
    return localStorage.getItem('userId') || '';
  }

  register(user: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/register`, user).pipe(
      catchError(this.handleError)
    );
  }

  private handleError(error: HttpErrorResponse) {
    let errorMessage = 'Ha ocurrido un error inesperado. Por favor, inténtelo de nuevo más tarde.';
    
    if (error.error instanceof ErrorEvent) {
      // Error del lado del cliente
      errorMessage = 'Hubo un problema con su conexión. Por favor, verifique su conexión a internet e inténtelo de nuevo.';
    } else {
      // Error del lado del servidor
      switch (error.status) {
        case 400:
          errorMessage = 'Los datos proporcionados no son válidos. Por favor, verifique la información e inténtelo de nuevo.';
          break;
        case 401:
          errorMessage = 'No está autorizado para realizar esta acción. Por favor, inicie sesión nuevamente.';
          this.router.navigate(['/login']);
          break;
        case 403:
          errorMessage = 'No tiene permisos para acceder a este recurso.';
          break;
        case 404:
          errorMessage = 'El recurso solicitado no se encontró. Por favor, verifique la URL e inténtelo de nuevo.';
          break;
        case 409:
          errorMessage = 'Ya existe una cuenta con esta información. Por favor, intente con datos diferentes.';
          break;
        case 500:
          errorMessage = 'Ha ocurrido un error en el servidor. Por favor, inténtelo más tarde o contacte al soporte técnico.';
          break;
      }

      if (error.error && error.error.message) {
        errorMessage = error.error.message;
      }
    }

    console.error('Error en la operación:', error);
    return throwError(() => new Error(errorMessage));
  }

  forgotPassword(email: string): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/forgot-password`, { email }).pipe(
      catchError(this.handleError)
    );
  }

  resetPassword(email: string, token: string, password: string): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/reset-password`, { email, token, password }).pipe(
      catchError(this.handleError)
    );
  }

  getAuthToken(): string | null {
    return localStorage.getItem('token');
  }
}