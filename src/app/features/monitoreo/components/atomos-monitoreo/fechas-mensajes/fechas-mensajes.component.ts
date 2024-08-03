import { Component, Input, OnInit } from '@angular/core';
import { ApiService, Alerta } from '../../../services/api-form/api.service';
import { AuthService } from '../../../../../core/services/api-login/auth.service';

@Component({
  selector: 'app-fechas-mensajes',
  templateUrl: './fechas-mensajes.component.html',
  styleUrls: ['./fechas-mensajes.component.css']
})
export class FechasMensajesComponent implements OnInit {
  @Input() alertasFiltradas: Alerta[] = [];
  isMenuOpen: boolean = true;
  mensajeAlerta: string = '';

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
        this.alertasFiltradas = alertas;
      },
      error: (error) => {
        console.error('Error al cargar alertas:', error);
        this.mensajeAlerta = 'Error al cargar las alertas. Por favor, intente nuevamente.';
      }
    });
  }

  onDateRangeSelected(event: { startDate: Date, endDate: Date }): void {
    this.filtrarPorFecha(event.startDate, event.endDate);
  }

  filtrarPorFecha(fechaInicio: Date, fechaFin: Date): void {
    this.alertasFiltradas = this.alertasFiltradas.filter(alerta => {
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
}