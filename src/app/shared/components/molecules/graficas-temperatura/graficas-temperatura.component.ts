import { Component, OnInit } from '@angular/core';
import { Chart } from 'chart.js/auto';
import { ApiService } from '../../../../features/monitoreo/services/api-form/api.service';

@Component({
  selector: 'app-temperatura',
  templateUrl: './graficas-temperatura.component.html',
  styleUrls: ['./graficas-temperatura.component.css']
})
export class GraficasTemperaturaComponent implements OnInit {
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
        const labels = filteredData.map(item => new Date(item.FechaHora).toLocaleString());
        const temperaturas = filteredData.map(item => item.Temperatura);
        this.createChart(labels, temperaturas);
      },
      error => {
        console.error('Error al cargar los datos:', error);
      }
    );
  }

  createChart(labels: string[], temperaturas: number[]) {
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
            data: temperaturas,
            backgroundColor: 'pink',
            borderColor: 'pink',
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
              text: 'Temperatura'
            },
            beginAtZero: true
          }
        }
      }
    });
  }
}