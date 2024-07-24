import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Chart, ChartConfiguration } from 'chart.js/auto';
import { ApiService } from '../../../../features/monitoreo/services/api-form/api.service';
import { AuthService } from '../../../../features/monitoreo/services/api-login/auth.service';

@Component({
  selector: 'app-graph-ph',
  templateUrl: './graph-ph.component.html',
  styleUrls: ['./graph-ph.component.css']
})
export class GraphPhComponent implements OnInit {

onDateRangeSelected($event: { startDate: Date; endDate: Date; }) {
throw new Error('Method not implemented.');
}
  public chart: any;

  public lotes: number[] = [];
  public selectedLote: number | null = null;

  constructor(private apiService: ApiService, private authService: AuthService) {}

  ngOnInit(): void {
    this.loadLotes();
  }

  loadLotes() {
    this.apiService.listarMonitoreo(this.authService.getUserId()).subscribe({
      next: (data) => {
        console.log('Datos recibidos:', data);
        if (data && data.response) {
          this.lotes = [...new Set(data.response.map(item => item.LoteID))];
          console.log('Lotes disponibles:', this.lotes);
          if (this.lotes.length > 0) {
            this.selectedLote = this.lotes[0];
            this.loadDataAndCreateChart();
          }
        } else {
          console.error('La respuesta no tiene el formato esperado:', data);
        }
      },
      error: (error) => console.error('Error al cargar lotes:', error)
    });
  }

  onLoteChange(event: Event) {
    const selectElement = event.target as HTMLSelectElement;
    this.selectedLote = parseInt(selectElement.value, 10);
    this.loadDataAndCreateChart();
  }

  loadDataAndCreateChart() {
    if (this.selectedLote === null) return;

    this.apiService.listarMonitoreo(this.authService.getUserId()).subscribe({
      next: (data) => {
        if (data && data.response) {
          const filteredData = data.response.filter(item => item.LoteID === this.selectedLote);
          console.log('Datos filtrados:', filteredData);
          const phValues = filteredData.map(item => item.PH);
          const fechas = filteredData.map(item => new Date(item.FechaHora).toLocaleString());
          console.log('PH Values:', phValues);
          console.log('Fechas:', fechas);
          this.createChart(fechas, phValues);
        } else {
          console.error('La respuesta no tiene el formato esperado:', data);
        }
      },
      error: (error) => console.error('Error al cargar datos para el gráfico:', error)
    });
  }

  createChart(labels: string[], data: number[]) {
    if (this.chart) {
      this.chart.destroy();
    }

    const chartConfig: ChartConfiguration = {
      type: 'line',
      data: {
        labels: labels,
        datasets: [{
          label: "PH",
          data: data,
          backgroundColor: 'green',
          borderColor: 'green',
          fill: false
        }]
      },
      options: {
        responsive: true,
        aspectRatio: 2.5,
        scales: {
          x: {
            title: {
              display: true,
              text: 'Fecha y Hora'
            }
          },
          y: {
            title: {
              display: true,
              text: 'PH'
            },
            beginAtZero: true
          }
        }
      }
    };

    this.chart 
  }
}