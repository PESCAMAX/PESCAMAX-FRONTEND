import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
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

  constructor(private http: HttpClient, private router: Router) {}

  login(credentials: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, credentials).pipe(
      tap((response: any) => {
        if (response && response.token) {
          localStorage.setItem('token', response.token);
          localStorage.setItem('userId', response.userId);
          
          // Navigate to crear-especie with userId instead of username
          this.router.navigate(['/crear-especie', response.userId]);
        }
      }),
      catchError(error => {
        console.error('Error en el inicio de sesión:', error);
        return throwError(() => new Error(error.error?.message || 'Ocurrió un error desconocido'));
      })
    );
  }

  register(user: any): Observable<any> {
    console.log('Datos enviados al servidor:', user);
    return this.http.post(`${this.apiUrl}/register`, user).pipe(
      catchError(this.handleError)
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
    return this.http.post(`${this.apiUrl}/forgot-password`, { email });
  }

  resetPassword(email: string, token: string, password: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/reset-password`, { email, token, password });
  }

  getAuthToken(): string | null {
    return localStorage.getItem('token');
  }

  logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    this.router.navigate(['/login']);
  }

  isAuthenticated(): boolean {
    const token = this.getAuthToken();
    if (!token) return false;

    const decodedToken = jwtDecode<any>(token);
    const currentTime = Date.now() / 1000;
    return decodedToken.exp > currentTime;
  }

  getUserId(): string {
    return localStorage.getItem('userId') || '';
  }
}