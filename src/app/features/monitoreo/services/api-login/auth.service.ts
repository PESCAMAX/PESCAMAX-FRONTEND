import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { jwtDecode } from 'jwt-decode';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:6754/api/Auth';  // Cambia el puerto si es necesario

  constructor(private http: HttpClient) { }

  register(user: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/register`, user);
  }

  login(user: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/login`, user).pipe(
      tap((response: any) => {
        if (response.success) {
          localStorage.setItem('token', response.token);
          const decodedToken = jwtDecode<any>(response.token);
          localStorage.setItem('userId', decodedToken.nameid);
        }
      })
    );
  }

  forgotPassword(email: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/forgot-password`, { email });
  }

  resetPassword(email: string, token: string, password: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/reset-password`, { email, token, password });
  }

  getAuthToken(): string | null {
    // Retorna el token de autenticación guardado en localStorage
    return localStorage.getItem('token');
  }

  getUserId(): string | null {
    return localStorage.getItem('userId');
  }}