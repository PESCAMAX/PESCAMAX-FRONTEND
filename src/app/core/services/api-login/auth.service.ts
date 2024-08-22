import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError, BehaviorSubject  } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
import { jwtDecode } from 'jwt-decode';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
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
            if (response.UserId) {  // Asegúrate de usar "UserId" si ese es el nombre en el backend
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
    return this.http.post<any>(`${this.apiUrl}/change-password`, { userId, currentPassword, newPassword }).pipe(
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
      return JSON.parse(atob(token.split('.')[1]));
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

  logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
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
      // Error del lado del cliente
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // El backend devolvió un código de respuesta sin éxito
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