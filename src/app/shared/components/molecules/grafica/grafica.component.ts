import { Component, OnInit } from '@angular/core';
import { Chart } from 'chart.js/auto';
import { ApiService } from '../../../../features/monitoreo/services/api-form/api.service';

@Component({
  selector: 'app-grafica',
  templateUrl: './grafica.component.html',
  styleUrls: ['./grafica.component.css']
})
export class GraficaComponent implements OnInit {
  public chart: any;
  public lotes: number[] = [];
  public selectedLote: number | null = null;

  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    this.loadLotes();
  }

  loadLotes() {
    this.apiService.listarMonitoreo().subscribe(
      data => {
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

  onLoteChange(event: Event) {
    const selectElement = event.target as HTMLSelectElement;
    this.selectedLote = parseInt(selectElement.value, 10);
    this.loadDataAndCreateChart();
  }

  loadDataAndCreateChart() {
    if (this.selectedLote === null) return;

    this.apiService.listarMonitoreo().subscribe(
      data => {
        const filteredData = data.response.filter(item => item.LoteID === this.selectedLote);
        const fechas = filteredData.map(item => new Date(item.FechaHora).toLocaleString());
        const temperaturas = filteredData.map(item => item.Temperatura);
        const phs = filteredData.map(item => item.PH);
        const tdss = filteredData.map(item => item.tds);
        this.createChart(fechas, temperaturas, phs, tdss);
      },
      error => {
        console.error('Error al cargar los datos:', error);
      }
    );
  }

  createChart(labels: string[], tempData: number[], phData: number[], tdsData: number[]) {
    if (this.chart) {
      this.chart.destroy();
    }

    this.chart = new Chart("MyChart", {
      type: 'line',
      data: {
        labels: labels,
        datasets: [
          {
            label: "Temperatura",
            data: tempData,
            backgroundColor: 'red',
            borderColor: 'red',
            fill: false
          },
          {
            label: "pH",
            data: phData,
            backgroundColor: 'green',
            borderColor: 'green',
            fill: false
          },
          {
            label: "TDS",
            data: tdsData,
            backgroundColor: 'blue',
            borderColor: 'blue',
            fill: false
          }
        ]
      },
      options: {
        aspectRatio: 2.5,
        scales: {
          x: {
            display: true,
            title: {
              display: true,
              text: 'Fecha y Hora'
            }
          },
          y: {
            display: true,
            title: {
              display: true,
              text: 'Valores'
            },
            beginAtZero: true
          }
        }
      }
    });
  }
}