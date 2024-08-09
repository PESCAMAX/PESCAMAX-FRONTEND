import { Component, OnInit } from '@angular/core';
import { Chart } from 'chart.js/auto';
import { ApiService,Monitoreo } from '../../../services/api-form/api.service';
import { AuthService } from '../../../../../core/services/api-login/auth.service';
@Component({
  selector: 'app-temperatura',
  templateUrl: './graficas-temperatura.component.html',
  styleUrls: ['./graficas-temperatura.component.css']
})
export class GraficasTemperaturaComponent implements OnInit {

  public chart: any;
  public lotes: number[] = [];
  public selectedLote: number | null = null;
  private startDate: Date | null = null;
  private endDate: Date | null = null;
  public loteDropdownOpen: boolean = false; 
  monitoreoData: Monitoreo[] = []; 
  isMenuOpen: boolean = true;

  constructor(private apiService: ApiService, private AuthService:AuthService) {}

  ngOnInit(): void {
    this.loadLotes();
  }
  loadLotes() {
    this.apiService.listarMonitoreo(this.AuthService.getUserId()).subscribe(
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

    this.apiService.listarMonitoreo(this.AuthService.getUserId()).subscribe( 
      data => {
        let filteredData = data.response.filter(item => item.LoteID === this.selectedLote);

        if (this.startDate && this.endDate) {
          filteredData = filteredData.filter(item => {
            const itemDate = new Date(item.FechaHora);
            return itemDate >= this.startDate! && itemDate <= this.endDate!;
          });
        }

        const labels = filteredData.map(item => new Date(item.FechaHora).toLocaleString());
        const temperaturas = filteredData.map(item => item.Temperatura);

        // Asegurarse de que hay datos para mostrar
        if (labels.length === 0) {
          console.warn('No hay datos para el rango de fechas seleccionado.');
        }

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


