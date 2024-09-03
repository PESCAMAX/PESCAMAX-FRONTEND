import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ClimaService {
  private apiKey = '69b7977f88741ecf29f206de6b797ea1';
  private apiUrl = 'https://api.openweathermap.org/data/2.5/weather';
  private backendUrl = 'http://localhost:6754/api/Clima/';

  constructor(private http: HttpClient) {}

  obtenerClima(ciudad: string, pais: string): Observable<any> {
    return this.http.get(`${this.apiUrl}?q=${ciudad},${pais}&appid=${this.apiKey}`);
  }

  guardarClima(clima: any): Observable<any> {
    return this.http.post(this.backendUrl, clima);
  }
}