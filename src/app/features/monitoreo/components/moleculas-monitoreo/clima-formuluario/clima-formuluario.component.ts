import { Component, Output, EventEmitter } from '@angular/core';
import { ClimaService } from '../../../services/clima/clima.service';
import { AuthService } from '../../../../../core/services/api-login/auth.service';

@Component({
  selector: 'app-clima-formuluario',
  templateUrl: './clima-formuluario.component.html',
  styleUrls: ['./clima-formuluario.component.css']
})
export class ClimaFormuluarioComponent {
  ciudad: string = '';
  pais: string = 'Co';
  climaData: any;
  userId: string = '';
  currentDate: Date = new Date();
  forecast: any[] = [];
  otherCities: any[] = [
    { name: 'Rawaheng', weather: 'Mostly Sunny', temp: 20 },
  ];

  @Output() climaObtenido = new EventEmitter<any>();

  constructor(private climaService: ClimaService, private authService: AuthService) {
    this.userId = this.authService.getUserId();
  }

  buscarCiudad(): void {
    if (this.ciudad.trim() !== '') {
      this.obtenerClima();
    } else {
      console.error('Por favor, ingrese una ciudad para buscar.');
    }
  }

  obtenerClima(): void {
    this.climaService.obtenerClima(this.ciudad, this.pais).subscribe(
      data => {
        this.climaData = data;
        console.log('Clima data:', this.climaData);
        this.climaObtenido.emit(this.climaData);
        this.generarPronostico();
        this.guardarClima();
      },
      error => {
        console.error('Error al obtener el clima:', error);
      }
    );
  }

  guardarClima(): void {
    const clima = {
      NombreCiudad: this.climaData.name,
      TemperaturaActual: this.climaData.main.temp - 273.15,
      EstadoMeteoro: this.climaData.weather[0].main,
      Humedad: this.climaData.main.humidity,
      Nubes: this.climaData.clouds.all,
      UserId: this.userId
    };

    this.climaService.guardarClima(clima).subscribe(
      response => {
        console.log('Clima guardado:', response);
      },
      error => {
        console.error('Error al guardar el clima:', error);
      }
    );
  }

  generarPronostico(): void {
    // This is a mock function. In a real scenario, you would get this data from an API
    const dias = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
    const iconos = ['☀️', '☁️', '🌤️', '❄️', '☀️'];
    this.forecast = [];
    for (let i = 0; i < 5; i++) {
      const fecha = new Date(this.currentDate);
      fecha.setDate(fecha.getDate() + i);
      this.forecast.push({
        weekday: dias[fecha.getDay()],
        icon: iconos[i],
        temperature: Math.round(Math.random() * 20 + 10)
      });
    }
  }

  getFormattedDate(): string {
    const options: Intl.DateTimeFormatOptions = { weekday: 'long', day: 'numeric', month: 'short', year: 'numeric' };
    return this.currentDate.toLocaleDateString('en-US', options);
  }
}