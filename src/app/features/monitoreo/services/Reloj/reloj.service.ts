import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class RelojService {
  private esp8266Url = 'http://192.168.50.155'; // Asegúrate de que esta sea la URL correcta

  constructor(private http: HttpClient) {}

  setHours(hours: any): Observable<any> {
    return this.http.post(`${this.esp8266Url}/setHours`, hours)
      .pipe(
        catchError(this.handleError)
      );
  }

  getHours(): Observable<any> {
    return this.http.get(`${this.esp8266Url}/getHours`)
      .pipe(
        catchError(this.handleError)
      );
  }

  private handleError(error: HttpErrorResponse) {
    console.error('An error occurred:', error.message);
    return throwError(error.message || 'Server error');
  }
}