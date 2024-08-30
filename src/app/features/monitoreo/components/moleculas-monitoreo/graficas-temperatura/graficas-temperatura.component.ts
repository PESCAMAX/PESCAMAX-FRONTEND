import { Component, OnInit } from '@angular/core';
import { ApiService, Monitoreo } from '../../../services/api-form/api.service';
import { AuthService } from '../../../../../core/services/api-login/auth.service';
import { ColorType, createChart, IChartApi, LineData, Time } from 'lightweight-charts';

@Component({
  selector: 'app-temperatura',
  templateUrl: './graficas-temperatura.component.html',
  styleUrls: ['./graficas-temperatura.component.css']
})
export class GraficasTemperaturaComponent implements OnInit {
  public chart: IChartApi | null = null;
  public lotes: number[] = [];
  public selectedLote: number | null = null;
  private startDate: Date | null = null;
  private endDate: Date | null = null;
  public loteDropdownOpen: boolean = false;
  monitoreoData: Monitoreo[] = [];
  isMenuOpen: boolean = true;

  constructor(private apiService: ApiService, private authService: AuthService) {}

  ngOnInit(): void {
    this.loadLotes();
  }

  loadLotes() {
    this.apiService.listarMonitoreo(this.authService.getUserId()).subscribe(
      data => {
        this.monitoreoData = data.response;
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
              const itemDate = new Date(item.FechaHora);
              return itemDate >= this.startDate! && itemDate <= this.endDate!;
            });
          }
          if (filteredData.length === 0) {
            console.warn('No hay datos para el rango de fechas seleccionado.');
            return;
          }
          const temperaturaValues = filteredData.map(item => ({
            time: this.dateToChartTime(new Date(item.FechaHora)),
            value: item.Temperatura
          }));
          this.createChart(temperaturaValues);
        } else {
          console.error('La respuesta no tiene el formato esperado:', data);
        }
      },
      error: (error) => console.error('Error al cargar datos para el gráfico:', error)
    });
  }

  dateToChartTime(date: Date): Time {
    return date.getTime() / 1000 as Time;
  }

  createChart(data: LineData[]) {
    if (this.chart) {
      this.chart.remove();
    }
    const chartContainer = document.getElementById('MyChart');
    if (!chartContainer) {
      console.error('No se encontró el elemento con id "MyChart"');
      return;
    }
    
    this.chart = createChart(chartContainer, {
      width: 800,
      height: 400,
      layout: {
        background: { type: ColorType.Solid, color: '#F3F4F6' },
        textColor: '#374151'
      },
      grid: {
        vertLines: {
          color: '#E5E7EB'
        },
        horzLines: {
          color: '#E5E7EB'
        }
      },
      rightPriceScale: {
        borderColor: '#d1d4dc',
        scaleMargins: {
          top: 0.1,
          bottom: 0.1,
        },
      },
      timeScale: {
        borderColor: '#374151',
        timeVisible: true,
        secondsVisible: false
      },
    });
  
    const areaSeries = this.chart.addAreaSeries({
      lineColor: '#FDA172',
      topColor: 'rgba(253, 161, 114, 0.4)',
      bottomColor: 'rgba(253, 161, 114, 0.1)',
      crosshairMarkerVisible: true,
      lastValueVisible: true,
      priceFormat: {
        type: 'price',
        precision: 1,
        minMove: 0.1,
      },
    });
  
    areaSeries.setData(data);
  
    // Ajustar el rango visible
    this.chart.timeScale().fitContent();
  }
}