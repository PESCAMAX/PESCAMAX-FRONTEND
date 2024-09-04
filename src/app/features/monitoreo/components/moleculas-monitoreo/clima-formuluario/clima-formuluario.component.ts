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

  @Output() climaObtenido = new EventEmitter<any>();

  constructor(private climaService: ClimaService, private authService: AuthService) {
    this.userId = this.authService.getUserId(); // Obtener el userId real
  }

  obtenerClima(): void {
    this.climaService.obtenerClima(this.ciudad, this.pais).subscribe(
      data => {
        this.climaData = data;
        console.log('Clima data:', this.climaData);
        this.climaObtenido.emit(this.climaData); // Emitir el evento con los datos del clima
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
      TemperaturaActual: this.climaData.main.temp - 273.15, // Convertir de Kelvin a Celsius
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
}