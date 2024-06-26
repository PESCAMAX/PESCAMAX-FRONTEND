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

  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    this.cargarAlertas();
  }

  cargarAlertas(): void {
    this.apiService.obtenerAlertas().subscribe({
      next: (alertas) => {
        this.alertas = alertas;
      },
      error: (error) => console.error('Error al cargar alertas:', error)
    });
  }
}