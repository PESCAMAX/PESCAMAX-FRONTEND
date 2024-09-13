import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ClimaService {
  private apiKey = '69b7977f88741ecf29f206de6b797ea1';
  private apiUrl = 'https://api.openweathermap.org/data/2.5/weather';
  private backendUrl = 'http://localhost:6754/api/Clima';
  private userId: string = 'defaultUserId'; // Add a default value or fetch it dynamically
  private climaService: any; // Define the type or import the correct service
  private climaData: any;

  
  constructor(private http: HttpClient) {}

  obtenerClima(ciudad: string, pais: string): Observable<any> {
    return this.http.get(`${this.apiUrl}?q=${ciudad},${pais}&appid=${this.apiKey}`);
  }

  guardarClima(clima: any): Observable<any> {
    return this.http.post(this.backendUrl, clima);
  }

  
  obtenerUltimoClimaPorUsuario(userId: string): Observable<any> {
    return this.http.get<any>(`${this.backendUrl}/ultimo/${userId}`);
  }
  cargarDatosClima(): void {
    console.log('Cargando datos del clima para el usuario:', this.userId);
    this.climaService.obtenerClimaPorUsuario(this.userId).subscribe(
      (response: any) => {
        console.log('Respuesta de la API:', response);
        this.climaData = response;
      },
      (error: any) => console.error('Error al cargar los datos del clima', error)
    );
  }
}