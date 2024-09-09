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
  private apiUrl = 'https://pescamaxbueno-cga7gdg8gcbra2e4.eastus-01.azurewebsites.net/api/Auth';
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
          throw new Error('No se recibió la información de autenticación esperada');
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
      throw error;
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
    console.log('Datos enviados al servidor:', user);
    return this.http.post<any>(`${this.apiUrl}/register`, user).pipe(
      catchError(error => {
        console.error('Error en el registro:', error);
        console.error('Error response:', error.error);
        return throwError(() => new Error(error.error?.message || 'Ocurrió un error desconocido'));
      })
    );
  }

  private handleError(error: HttpErrorResponse) {
    let errorMessage = 'An unknown error occurred!';
    if (error.error instanceof ErrorEvent) {
      errorMessage = `Error: ${error.error.message}`;
    } else {
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
      if (error.error) {
        errorMessage += `\nDetails: ${JSON.stringify(error.error)}`;
      }
    }
    console.error(errorMessage);
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