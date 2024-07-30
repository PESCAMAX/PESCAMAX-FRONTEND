import { Component, OnInit } from '@angular/core';
import { Chart, ChartConfiguration } from 'chart.js/auto';
import { ApiService,Monitoreo } from '../../../services/api-form/api.service';
import { AuthService } from '../../../../../core/services/api-login/auth.service';

@Component({
  selector: 'app-graph-ph',
  templateUrl: './graph-ph.component.html',
  styleUrls: ['./graph-ph.component.css']
})
export class GraphPhComponent implements OnInit {
  public chart: Chart | null = null;
  public lotes: number[] = [];
  public selectedLote: number | null = null;
  public loteDropdownOpen: boolean = false; // Nueva variable
  private startDate: Date | null = null;
  private endDate: Date | null = null;
  monitoreoData: Monitoreo[] = []; 

  constructor(private apiService: ApiService, private authService: AuthService) {}

  ngOnInit(): void {
    this.loadLotes();
  }

  loadLotes() {
    this.apiService.listarMonitoreo(this.authService.getUserId()).subscribe(
      data => {
        this.monitoreoData = data.response; // Asigna los datos a monitoreoData
        this.lotes = [...new Set(data.response.map(item => item.LoteID))];
        if (this.lotes.length > 0) {
          this.selectedLote = this.lotes[0];
          this.loadDataAndCreateChart();
        }
      },
      error => {
        console.error('Error al cargar los lotes:', error);
      }
    );
  }


  toggleDropdown() {
    this.loteDropdownOpen = !this.loteDropdownOpen;
  }


  onLoteChange(lote: number | null): void {
    this.selectedLote = lote;
    this.loadDataAndCreateChart();
   
  }
  onDateRangeSelected(event: { startDate: Date, endDate: Date }): void {
    this.startDate = event.startDate;
    this.endDate = event.endDate;
    this.loadDataAndCreateChart();
  }

  loadDataAndCreateChart() {
    if (this.selectedLote === null) return;

    this.apiService.listarMonitoreo(this.authService.getUserId()).subscribe({
      next: (data) => {
        if (data && data.response) {
          let filteredData = data.response.filter(item => item.LoteID === this.selectedLote);
          if (this.startDate && this.endDate) {
            filteredData = filteredData.filter(item => {
              const fecha = new Date(item.FechaHora);
              return this.startDate && this.endDate && fecha >= this.startDate && fecha <= this.endDate;
            });
          }
          const phValues = filteredData.map(item => item.PH);
          const fechas = filteredData.map(item => new Date(item.FechaHora).toLocaleString());
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

    const canvas = document.getElementById('MyChart') as HTMLCanvasElement;
    if (canvas) {
      this.chart = new Chart(canvas, chartConfig);
    } else {
      console.error('No se encontró el elemento canvas con id "MyChart"');
    }
  }
}
