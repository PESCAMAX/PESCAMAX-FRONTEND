import { Component, OnInit } from '@angular/core';
import { Chart } from 'chart.js/auto';
import { ApiService } from '../../../../features/monitoreo/services/api-form/api.service';

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

  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    this.loadLotes();
  }

  loadLotes() {
    this.apiService.listarMonitoreo().subscribe(data => {
      this.lotes = [...new Set(data.response.map(item => item.LoteID))];
      if (this.lotes.length > 0) {
        this.selectedLote = this.lotes[0];
        this.loadDataAndCreateChart();
      }
    });
  }

  onLoteChange(event: Event) {
    const selectElement = event.target as HTMLSelectElement;
    this.selectedLote = parseInt(selectElement.value, 10);
    this.loadDataAndCreateChart();
  }

  loadDataAndCreateChart() {
    if (this.selectedLote === null) return;

    this.apiService.listarMonitoreo().subscribe(data => {
      const filteredData = data.response.filter(item => item.LoteID === this.selectedLote);
      const phValues = filteredData.map(item => item.PH);
      const fechas = filteredData.map(item => new Date(item.FechaHora).toLocaleString());
      this.createChart(fechas, phValues);
    });
  }

  createChart(labels: string[], data: number[]) {
    if (this.chart) {
      this.chart.destroy();
    }

    this.chart = new Chart("MyChart", {
      type: 'line',
      data: {
        labels: labels,
        datasets: [
          {
            label: "PH",
            data: data,
            backgroundColor: 'green',
            borderColor: 'green',
            fill: false
          }
        ]
      },
      options: {
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
    });
  }
}