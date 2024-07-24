// src/app/shared/components/molecules/tabla-sensor/tabla-sensor.component.ts
import { Component, OnInit } from '@angular/core';
import { ApiService, Monitoreo } from '../../../../features/monitoreo/services/api-form/api.service';
import { AuthService } from '../../../../features/monitoreo/services/api-login/auth.service';
@Component({
  selector: 'app-tabla-sensor',
  templateUrl: './tabla-sensor.component.html',
  styleUrls: ['./tabla-sensor.component.css']
})
export class TablaSensorComponent implements OnInit {
  monitoreoData: Monitoreo[] = [];
  filteredData: Monitoreo[] = [];
  lotes: number[] = [];
  loteSeleccionado: number | null = null;

  constructor(private apiService: ApiService, private AuthService:AuthService) {}

  ngOnInit(): void {
    this.cargarDatos();
  }

  cargarDatos(): void {
    console.log('Cargando datos de monitoreo...');
    this.apiService.listarMonitoreo(this.AuthService.getUserId()).subscribe( 
      (response: { response: Monitoreo[] }) => {
        console.log('Respuesta completa:', response);
        this.monitoreoData = response.response;
        console.log('Datos de monitoreo asignados:', this.monitoreoData);
        this.filteredData = [...this.monitoreoData];
        this.extraerLotes();
      },
      (error) => {
        console.error('Error al obtener los datos de monitoreo:', error);
      }
    );
  }
  extraerLotes(): void {
    this.lotes = [...new Set(this.monitoreoData.map(item => item.LoteID))];
  }

  filtrarTodos(): void {
    this.filteredData = [...this.monitoreoData];
    this.loteSeleccionado = null;
  }

  filtrarMasRecientes(): void {
    this.filteredData = [...this.monitoreoData]
      .sort((a, b) => new Date(b.FechaHora).getTime() - new Date(a.FechaHora).getTime())
      .slice(0, 10); // Muestra los 10 más recientes
    this.loteSeleccionado = null;
  }

  filtrarPorLote(event: Event): void {
    const selectElement = event.target as HTMLSelectElement;
    const lote = Number(selectElement.value);
    if (lote) {
      this.loteSeleccionado = lote;
      this.filteredData = this.monitoreoData.filter(item => item.LoteID === lote);
    } else {
      this.filtrarTodos(); // Si no se selecciona un lote, muestra todos
    }
  }
}