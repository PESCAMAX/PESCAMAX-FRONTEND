// historial-alertas.component.ts
import { Component, OnInit } from '@angular/core';
import { ApiService, Alerta } from '../../../../features/monitoreo/services/api-form/api.service';

@Component({
  selector: 'app-historial-alertas',
  templateUrl: './historial-alertas.component.html',
  styleUrls: ['./historial-alertas.component.css']
})
export class HistorialAlertasComponent implements OnInit {
 
  alertas: Alerta[] = [];
  alertasFiltradas: Alerta[] = [];
  mensajeAlerta: string = '';

  constructor(private apiService: ApiService) {
   

  }

  ngOnInit(): void {
    this.cargarAlertas();
  }

  cargarAlertas(): void {
    this.apiService.obtenerAlertas().subscribe({
      next: (alertas) => {
        this.alertas = alertas;
        this.alertasFiltradas = alertas; // Inicialmente, mostramos todas las alertas
      },
      error: (error) => console.error('Error al cargar alertas:', error)
    });
  }

  filtrarPorFecha(fechaInicio: Date, fechaFin: Date): void {
    this.alertasFiltradas = this.alertas.filter(alerta => {
      const fechaAlerta = new Date(alerta.Fecha!);
      return fechaAlerta >= fechaInicio && fechaAlerta <= fechaFin;
    });

    if (this.alertasFiltradas.length === 0) {
      this.mensajeAlerta = "No hay datos disponibles para el rango de fechas seleccionado.";
    } else {
      this.mensajeAlerta = '';
    }
  }

  onDateRangeSelected(event: {startDate: Date, endDate: Date}): void {
    this.filtrarPorFecha(event.startDate, event.endDate);
  }
}