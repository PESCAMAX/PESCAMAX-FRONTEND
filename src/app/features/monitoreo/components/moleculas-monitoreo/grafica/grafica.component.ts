import { Component, OnInit, Input } from '@angular/core';
import { Chart } from 'chart.js/auto';
import { ApiService, Alerta, Monitoreo } from '../../../services/api-form/api.service';
import { AuthService } from '../../../../../core/services/api-login/auth.service';

@Component({
  selector: 'app-grafica',
  templateUrl: './grafica.component.html',
  styleUrls: ['./grafica.component.css']
})
export class GraficaComponent implements OnInit {
  @Input() data: any[] = [];
  public chart: any;
  public lotes: number[] = [];
  public selectedLote: number | null = null;
  alertas: Alerta[] = [];
  alertasFiltradas: Alerta[] = [];
  mensajeAlerta: string = '';
  fechaInicio: Date | null = null;
  fechaFin: Date | null = null;
  fechaMasAntigua: Date = new Date();
  fechaActual: Date = new Date();
  isMenuOpen: boolean = true;
  monitoreoData: Monitoreo[] = []; // Asegúrate de definir monitoreoData aquí

  constructor(private apiService: ApiService, private AuthService: AuthService) {
    this.fechaActual.setHours(23, 59, 59, 999);
  }

  onMenuToggle(isOpen: boolean) {
    this.isMenuOpen = isOpen;
  }

  ngOnChanges(): void {
    this.loadDataAndCreateChart();
  }

  ngOnInit(): void {
    this.loadLotes();
    this.cargarAlertas();
    this.obtenerFechaMasAntigua();
  }

  obtenerFechaMasAntigua(): void {
    this.apiService.listarMonitoreo(this.AuthService.getUserId()).subscribe(
      data => {
        if (data.response && data.response.length > 0) {
          this.fechaMasAntigua = new Date(Math.min(...data.response.map(item => new Date(item.FechaHora).getTime())));
        }
      },
      error => {
        console.error('Error al obtener la fecha más antigua:', error);
      }
    );
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
  onLoteChange(lote: number | null): void {
    this.selectedLote = lote;
    this.loadDataAndCreateChart();
    this.filtrarAlertas();
  }

  loadDataAndCreateChart() {
    if (this.data.length === 0) return;

    this.apiService.listarMonitoreo(this.AuthService.getUserId()).subscribe(
      data => {
        let filteredData = data.response.filter(item => item.LoteID === this.selectedLote);
        if (this.fechaInicio && this.fechaFin) {
          filteredData = filteredData.filter(item => {
            const fecha = new Date(item.FechaHora);
            return fecha >= this.fechaInicio! && fecha <= this.fechaFin!;
          });
        }
        const fechas = this.data.map(item => new Date(item.FechaHora).toLocaleString());
        const temperaturas = this.data.map(item => item.Temperatura);
        const phs = this.data.map(item => item.PH);
        const tds = this.data.map(item => item.tds);
        this.createChart(fechas, temperaturas, phs, tds);
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

  cargarAlertas(): void {
    this.apiService.obtenerAlertas().subscribe({
      next: (alertas) => {
        this.alertas = alertas;
        this.filtrarAlertas();
      },
      error: (error) => console.error('Error al cargar alertas:', error)
    });
  }

  filtrarAlertas(): void {
    if (!this.selectedLote && !this.fechaInicio && !this.fechaFin) {
      this.alertasFiltradas = this.alertas;
      return;
    }

    this.alertasFiltradas = this.alertas.filter(alerta => {
      const perteneceLote = this.selectedLote ? alerta.LoteID === this.selectedLote : true;

      let fechaAlerta: Date | null = null;
      if (alerta.FechaCreacion) {
        fechaAlerta = alerta.FechaCreacion instanceof Date ? alerta.FechaCreacion : new Date(alerta.FechaCreacion);
      }

      const estaEnRango = this.fechaInicio && this.fechaFin && fechaAlerta ?
        (fechaAlerta >= this.fechaInicio && fechaAlerta <= this.fechaFin) : true;

      return perteneceLote && estaEnRango;
    });

    if (this.alertasFiltradas.length === 0) {
      this.mensajeAlerta = "No hay datos disponibles para el rango de fechas y lote seleccionado.";
    } else {
      this.mensajeAlerta = '';
    }
  }

  onDateRangeSelected(event: { startDate: Date, endDate: Date }): void {
    this.fechaInicio = event.startDate;
    this.fechaFin = event.endDate;
    this.loadDataAndCreateChart();
    this.filtrarAlertas();
  }

  disableDates = (date: Date): boolean => {
    return date > this.fechaActual || (this.fechaMasAntigua !== null && date < this.fechaMasAntigua);
  };
}