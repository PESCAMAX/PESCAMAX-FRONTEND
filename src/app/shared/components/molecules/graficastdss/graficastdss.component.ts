import { Component, OnInit } from '@angular/core';
import { Chart } from 'chart.js/auto';
import { ApiService } from '../../../../features/monitoreo/services/api-form/api.service';
import { AuthService } from '../../../../features/monitoreo/services/api-login/auth.service';
@Component({
  selector: 'app-graficastdss',
  templateUrl: './graficastdss.component.html',
  styleUrls: ['./graficastdss.component.css']
})
export class GraficastdssComponent implements OnInit {
  public chart: any;
  public lotes: number[] = [];
  public selectedLote: number | null = null;
  private startDate: Date | null = null;
  private endDate: Date | null = null;
  isMenuOpen: boolean = true;

  constructor(private apiService: ApiService, private AuthService: AuthService) {}

  ngOnInit(): void {
    this.loadLotes();
  }
  onMenuToggle(isOpen: boolean) {
    this.isMenuOpen = isOpen;
  }

  loadLotes() {
    this.apiService.listarMonitoreo(this.AuthService.getUserId()).subscribe( 
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


  onDateRangeSelected(event: { startDate: Date, endDate: Date }): void {
    this.startDate = event.startDate;
    this.endDate = event.endDate;
    this.loadDataAndCreateChart();
  }

  loadDataAndCreateChart() {
    if (this.selectedLote === null) return;

    this.apiService.listarMonitoreo(this.AuthService.getUserId()).subscribe( 
      data => {
        const filteredData = data.response.filter(item => item.LoteID === this.selectedLote);
        const labels = filteredData.map(item => new Date(item.FechaHora).toLocaleDateString());
        const tdsData = filteredData.map(item => item.tds);
        this.createChart(labels, tdsData);
      },
      error => {
        console.error('Error al cargar los datos:', error);
      }
    );
  }

  createChart(labels: string[], tdsData: number[]) {
    if (this.chart) {
      this.chart.destroy();
    }

    this.chart = new Chart("MyChart", {
      type: 'line',
      data: {
        labels: labels,
        datasets: [
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
              text: 'Fecha'
            }
          },
          y: {
            display: true,
            title: {
              display: true,
              text: 'TDS'
            },
            beginAtZero: true
          }
        }
      }
    });
  }
}