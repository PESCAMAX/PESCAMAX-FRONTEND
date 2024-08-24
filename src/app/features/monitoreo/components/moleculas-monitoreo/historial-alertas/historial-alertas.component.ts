import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../../services/api-form/api.service';
import { AuthService } from '../../../../../core/services/api-login/auth.service';

export interface Alerta {
  Id?: number;
  EspecieID: number;
  Nombre: string;
  LoteID: number;
  Descripcion: string;
  FechaCreacion?: Date; // Asegúrate de que este campo es de tipo Date
  UserId: string;
}

interface AlertState {
  show: boolean;
  type: 'success' | 'danger' | 'warning';
  title: string;
  content: string;
  iconColor: 'red' | 'green';
}

@Component({
  selector: 'app-historial-alertas',
  templateUrl: './historial-alertas.component.html',
  styleUrls: ['./historial-alertas.component.css']
})
export class HistorialAlertasComponent implements OnInit {
  isMenuOpen: boolean = true;
  alertas: Alerta[] = [];
  alertasFiltradas: Alerta[] = [];
  mensajeAlerta: string = '';
  
  alertConfirmAction: (() => void) | null = null;
  alertCancelAction: () => void = () => this.cerrarAlerta();
  
  alertState: AlertState = {
    show: false,
    type: 'warning',
    title: '',
    content: '',
    iconColor: 'red'
  };

  constructor(private apiService: ApiService, private authService: AuthService) {}

  ngOnInit(): void {
    this.cargarAlertas();
  }

  onMenuToggle(isOpen: boolean) {
    this.isMenuOpen = isOpen;
  }

  cargarAlertas(): void {
    if (!this.authService.isAuthenticated()) {
      console.error('Usuario no autenticado');
      return;
    }

    this.apiService.obtenerAlertas().subscribe({
      next: (alertas) => {
        this.alertas = alertas;
        this.alertasFiltradas = alertas;
      },
      error: (error) => {
        console.error('Error al cargar alertas:', error);
        this.mensajeAlerta = 'Error al cargar las alertas. Por favor, intente nuevamente.';
      }
    });
  }

  filtrarPorFecha(fechaInicio: Date, fechaFin: Date): void {
    this.alertasFiltradas = this.alertas.filter(alerta => {
      const fechaAlerta = new Date(alerta.FechaCreacion!);
      const finDelDia = new Date(fechaFin);
      finDelDia.setHours(23, 59, 59, 999);
      return fechaAlerta >= fechaInicio && fechaAlerta <= finDelDia;
    });

    if (this.alertasFiltradas.length === 0) {
      this.mensajeAlerta = "No hay datos disponibles para el rango de fechas seleccionado.";
    } else {
      this.mensajeAlerta = '';
    }
  }

  onDateRangeSelected(event: { startDate: Date, endDate: Date }): void {
    this.filtrarPorFecha(event.startDate, event.endDate);
  }

  eliminarAlerta(id: number): void {
    this.mostrarAlertaConfirmacion(id);
  }

  mostrarAlertaConfirmacion(id: number): void {
    this.alertState = {
      show: true,
      type: 'warning',
      title: 'Confirmar eliminación',
      content: '¿Estás seguro de eliminar la alerta?',
      iconColor: 'red'
    };
    this.alertConfirmAction = () => this.confirmarEliminacion(id);
    this.alertCancelAction = () => this.cancelarEliminacion();
  }

  confirmarEliminacion(id: number): void {
    this.apiService.eliminarAlerta(id).subscribe(
      () => {
        this.cargarAlertas();
        this.mostrarAlerta('success', 'Éxito', 'La alerta fue borrada exitosamente', 'green');
      },
      (error) => {
        console.error('Error al eliminar la alerta:', error);
        this.mostrarAlerta('danger', 'Error', 'Error al eliminar la alerta', 'red');
      }
    );
  }

  cancelarEliminacion(): void {
    this.mostrarAlerta('danger', 'Cancelado', 'Has cancelado la eliminación', 'red');
  }

  mostrarAlerta(type: 'success' | 'danger' | 'warning', title: string, content: string, iconColor: 'red' | 'green'): void {
    this.alertState = {
      show: true,
      type,
      title,
      content,
      iconColor
    };

    setTimeout(() => {
      this.cerrarAlerta();
    }, 1000);
  }

  cerrarAlerta(): void {
    this.alertState.show = false;
  }
}
