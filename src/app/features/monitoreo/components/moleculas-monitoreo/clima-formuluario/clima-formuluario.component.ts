import { Component, Output, EventEmitter, ViewChild, ElementRef  } from '@angular/core';
import { ClimaService } from '../../../services/clima/clima.service';
import { AuthService } from '../../../../../core/services/api-login/auth.service';
import { forkJoin } from 'rxjs';
@Component({
  selector: 'app-clima-formuluario',
  templateUrl: './clima-formuluario.component.html',
  styleUrls: ['./clima-formuluario.component.css']
})
export class ClimaFormuluarioComponent {
  @ViewChild('listaCiudades') listaCiudades!: ElementRef;

  ciudad: string = '';
  pais: string = 'Co';
  datosClima: any;
  userId: string = '';
  fechaActual: Date = new Date();
  pronostico: any[] = [];
  otrasCiudades: any[] = [];
  tipoPronostico: 'hoy' | 'manana' | 'semana' = 'semana';

  ciudadesColombianas: string[] = [
    'Arauca', 'Armenia', 'Barranquilla', 'Bogotá', 'Bucaramanga', 'Cali', 'Cartagena', 
    'Cúcuta', 'Florencia', 'Ibagué', 'Leticia', 'Manizales', 'Medellín', 'Mitú', 'Mocoa', 
    'Montería', 'Neiva', 'Pasto', 'Pereira', 'Popayán', 'Puerto Carreño', 'Puerto Inírida', 
    'Quibdó', 'Riohacha', 'San Andrés', 'San José del Guaviare', 'Santa Marta', 'Sincelejo', 
    'Tunja', 'Valledupar', 'Villavicencio', 'Yopal'
  ];

  ciudadesPrincipales: string[] = ['Bogotá', 'Medellín', 'Cali', 'Barranquilla', 'Cartagena'];

  @Output() climaObtenido = new EventEmitter<any>();

  constructor(private climaService: ClimaService, private authService: AuthService) {
    this.userId = this.authService.getUserId();
  }

  ngOnInit() {
    this.obtenerClimaCiudadesPrincipales();
  }

  obtenerClimaCiudadesPrincipales() {
    const peticiones = this.ciudadesPrincipales.map(ciudad => this.climaService.obtenerClima(ciudad, this.pais));
    forkJoin(peticiones).subscribe(
      resultados => {
        this.otrasCiudades = resultados.map(datos => ({
          nombre: datos.name,
          clima: datos.weather[0].main,
          temp: Math.round(datos.main.temp - 273.15)
        }));
      },
      error => {
        console.error('Error al obtener el clima de las ciudades principales:', error);
      }
    );
  }

  buscarCiudad(): void {
    if (this.ciudad.trim() !== '') {
      this.obtenerClima();
    } else {
      console.error('Por favor, seleccione una ciudad para buscar.');
    }
  }

  obtenerClima(): void {
    this.climaService.obtenerClima(this.ciudad, this.pais).subscribe(
      datos => {
        this.datosClima = datos;
        console.log('Datos del clima:', this.datosClima);
        this.climaObtenido.emit(this.datosClima);
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
      NombreCiudad: this.datosClima.name,
      TemperaturaActual: this.datosClima.main.temp - 273.15,
      EstadoMeteoro: this.datosClima.weather[0].main,
      Humedad: this.datosClima.main.humidity,
      Nubes: this.datosClima.clouds.all,
      UserId: this.userId
    };

    this.climaService.guardarClima(clima).subscribe(
      respuesta => {
        console.log('Clima guardado:', respuesta);
      },
      error => {
        console.error('Error al guardar el clima:', error);
      }
    );
  }

  generarPronostico(): void {
    // Este método debería actualizarse para usar datos reales del pronóstico de la API
    // Por ahora, mantendremos la generación de datos simulados
    const dias = ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'];
    const iconos = ['☀️', '☁️', '🌤️', '🌧️', '❄️', '⛈️', '🌩️'];
    this.pronostico = [];
    for (let i = 0; i < 7; i++) {
      const fecha = new Date(this.fechaActual);
      fecha.setDate(fecha.getDate() + i);
      this.pronostico.push({
        diaSemana: dias[fecha.getDay()],
        icono: iconos[Math.floor(Math.random() * iconos.length)],
        temperatura: Math.round(Math.random() * 20 + 10)
      });
    }
  }

  obtenerFechaFormateada(): string {
    const opciones: Intl.DateTimeFormatOptions = { weekday: 'long', day: 'numeric', month: 'short', year: 'numeric' };
    return this.fechaActual.toLocaleDateString('es-ES', opciones);
  }

  establecerTipoPronostico(tipo: 'hoy' | 'manana' | 'semana'): void {
    this.tipoPronostico = tipo;
  }

  obtenerPronostico(): any[] {
    switch (this.tipoPronostico) {
      case 'hoy':
        return [this.pronostico[0]];
      case 'manana':
        return [this.pronostico[1]];
      case 'semana':
      default:
        return this.pronostico;
    }
  }

  desplazarCiudades(direccion: 'izquierda' | 'derecha'): void {
    const contenedor = this.listaCiudades.nativeElement;
    const cantidadDesplazamiento = contenedor.clientWidth / 2;
    if (direccion === 'izquierda') {
      contenedor.scrollLeft -= cantidadDesplazamiento;
    } else {
      contenedor.scrollLeft += cantidadDesplazamiento;
    }
  }
}