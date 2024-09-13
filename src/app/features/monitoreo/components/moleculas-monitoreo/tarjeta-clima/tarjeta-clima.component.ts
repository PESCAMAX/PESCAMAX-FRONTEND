import { Component, Input, OnInit } from '@angular/core';
import { ClimaService } from '../../../services/clima/clima.service';
import { AuthService } from '../../../../../core/services/api-login/auth.service';

@Component({
  selector: 'app-tarjeta-clima',
  templateUrl: './tarjeta-clima.component.html',
  styleUrls: ['./tarjeta-clima.component.css']
})
export class TarjetaClimaComponent implements OnInit {
  @Input() climaData: any;
  currentDate: string = '';

  constructor(private climaService: ClimaService, private authService: AuthService) {}

  ngOnInit(): void {
    this.currentDate = new Date().toLocaleDateString();
    this.cargarUltimoClima();
  }

  cargarUltimoClima(): void {
    const userId = this.authService.getUserId();
    this.climaService.obtenerUltimoClimaPorUsuario(userId).subscribe(
      data => {
        this.climaData = data;
        console.log('Último clima data:', this.climaData);
      },
      error => {
        console.error('Error al cargar el último clima:', error);
      }
    );
  }

  get temperaturaActual(): number {
    return this.climaData?.TemperaturaActual || 0;
  }

  get nombreCiudad(): string {
    return this.climaData?.NombreCiudad || '';
  }

  get estadoMeteoro(): string {
    return this.climaData?.EstadoMeteoro || '';
  }

  get humedad(): number {
    return this.climaData?.Humedad || 0;
  }

  get nubes(): number {
    return this.climaData?.Nubes || 0;
  }
}