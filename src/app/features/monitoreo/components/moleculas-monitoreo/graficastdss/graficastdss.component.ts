import { Component, OnInit } from '@angular/core';
import { ApiService, Monitoreo } from '../../../services/api-form/api.service';
import { AuthService } from '../../../../../core/services/api-login/auth.service';
import { ColorType, createChart, IChartApi, LineData, Time } from 'lightweight-charts';

@Component({
  selector: 'app-graficastdss',
  templateUrl: './graficastdss.component.html',
  styleUrls: ['./graficastdss.component.css']
})
export class GraficastdssComponent implements OnInit {
  public chart: IChartApi | null = null;
  public lotes: number[] = [];
  public selectedLote: number | null = null;
  public loteDropdownOpen: boolean = false;
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
              const fecha = new Date(item.FechaHora);
              return this.startDate && this.endDate && fecha >= this.startDate && fecha <= this.endDate;
            });
          }
          const tdsValues = filteredData.map(item => ({
            time: this.dateToChartTime(new Date(item.FechaHora)),
            value: item.tds
          }));
          this.createChart(tdsValues);
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

      height: 400,
      layout: {
        background: { type: ColorType.Solid, color: '#F3F4F6' },
        textColor: '#333'
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
        borderColor: '#2B2B43',
        scaleMargins: {
          top: 0.1,
          bottom: 0.1,
        },
      },
      timeScale: {
        borderColor: '#2B2B43',
        timeVisible: true,
        secondsVisible: false
      },
    });

    const areaSeries = this.chart.addAreaSeries({
      lineColor: '#4DD0E1',
      topColor: 'rgba(77, 208, 225, 0.4)',
      bottomColor: 'rgba(77, 208, 225, 0.1)',

      priceLineVisible: true,
      lastValueVisible: true,
      priceFormat: {
        type: 'price',
        precision: 2,
        minMove: 0.01,
      },
    });

    areaSeries.setData(data);

    // Ajustar el rango visible
    this.chart.timeScale().fitContent();
  }
}
