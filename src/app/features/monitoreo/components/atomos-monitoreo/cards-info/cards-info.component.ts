import { Component, Input, OnChanges, SimpleChanges, OnInit } from '@angular/core';
import { ClimaService } from '../../../services/clima/clima.service';
import { AuthService } from '../../../../../core/services/api-login/auth.service';

@Component({
  selector: 'app-cards-info',
  templateUrl: './cards-info.component.html',
  styleUrls: ['./cards-info.component.css']
})
export class CardsInfoComponent implements OnChanges, OnInit {
  @Input() title: string = '';
  @Input() value: number | string = '';
  @Input() trend: 'up' | 'down' | 'none' = 'none';
  @Input() trendValue: string = '';
  @Input() status: 'good' | 'bad' | 'unassigned' = 'unassigned';
  @Input() isTimeCard: boolean = false;
  @Input() selectedLot: string = '';
  @Input() mortalidadPorLote: any[] = [];
  @Input() link: string = ''; // Nueva propiedad para el enlace
  @Input() disableLink: boolean = false; // Nueva propiedad para deshabilitar el enlace
  @Input() nombreCiudad: string = ''; // Nueva propiedad para el nombre de la ciudad
  @Input() estadoMeteoro: string = ''; // Nueva propiedad para el estado meteorológico
  climaData: any;
  previousValue: number | string = '';

  constructor(private climaService: ClimaService, private authService: AuthService) {}

  ngOnInit(): void {
    if (this.title === 'Clima') {
      this.cargarUltimoClima();
    }
  }

  cargarUltimoClima(): void {
    const userId = this.authService.getUserId();
    this.climaService.obtenerUltimoClimaPorUsuario(userId).subscribe(
      data => {
        this.climaData = data;
        this.value = this.climaData?.TemperaturaActual?.toFixed(2) || 0; // Actualizar el valor principal con dos decimales
        console.log('Último clima data:', this.climaData);
      },
      error => {
        console.error('Error al cargar el último clima:', error);
      }
    );
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['value']) {
      this.previousValue = changes['value'].previousValue;
    }
  }

  get temperaturaActual(): number {
    return this.climaData?.TemperaturaActual || 0;
  }

  get humedad(): number {
    return this.climaData?.Humedad || 0;
  }

  get nubes(): number {
    return this.climaData?.Nubes || 0;
  }

  get cardColor(): string {
    if (this.title.toLowerCase().includes('mortalidad')) {
      return 'border-black';
    }
    const colorMap: { [key: string]: string } = {
      'good': 'border-green-500',
      'bad': 'border-red-500',
      'unassigned': 'border-blue-500'
    };
    return colorMap[this.status] || 'border-gray-500';
  }

  get trendIcon(): string {
    if (this.title.toLowerCase().includes('mortalidad')) {
      return '%';
    }
    const iconMap: { [key: string]: string } = {
      'up': '↑',
      'down': '↓',
      'none': ''
    };
    return iconMap[this.trend] || '';
  }

  get trendColor(): string {
    if (this.title.toLowerCase().includes('mortalidad')) {
      return 'text-black';
    }
    const colorMap: { [key: string]: string } = {
      'up': 'text-green-500',
      'down': 'text-red-500',
      'none': 'text-gray-500'
    };
    return colorMap[this.trend] || 'text-gray-500';
  }
}