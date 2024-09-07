import { Component, OnInit, AfterViewInit, OnDestroy } from '@angular/core';
import { createChart, IChartApi, ColorType, Time, LineData } from 'lightweight-charts';
import { ApiService, Monitoreo } from '../../../services/api-form/api.service';
import { AuthService } from '../../../../../core/services/api-login/auth.service';

@Component({
  selector: 'app-graph-ph',
  templateUrl: './graph-ph.component.html',
  styleUrls: ['./graph-ph.component.css']
})
export class GraphPhComponent implements OnInit, AfterViewInit, OnDestroy {
  public chart: IChartApi | null = null;
  public lotes: number[] = [];
  public selectedLote: number | null = null;
  public loteDropdownOpen: boolean = false;
  private startDate: Date | null = null;
  private endDate: Date | null = null;
  monitoreoData: Monitoreo[] = [];
  private resizeObserver: ResizeObserver | null = null;
  private updateInterval: any;

  constructor(private apiService: ApiService, private authService: AuthService) {}

  ngOnInit(): void {
    this.loadLotes();
    this.startDataUpdates();
  }

  ngAfterViewInit() {
    this.setupResizeListener();
  }

  ngOnDestroy() {
    this.cleanupResizeListener();
    if (this.updateInterval) {
      clearInterval(this.updateInterval);
    }
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
              return fecha >= this.startDate! && fecha <= this.endDate!;
            });
          }
          const phValues = filteredData.map(item => ({
            time: this.dateToChartTime(new Date(item.FechaHora)),
            value: item.PH
          }));
          this.createChart(phValues);
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

    const chartOptions = {
      width: chartContainer.clientWidth,
      height: chartContainer.clientHeight,
      layout: {
        background: { type: ColorType.Solid, color: '#F3F4F6' },
        textColor: '#333'
      },
      grid: {
        vertLines: { color: '#E5E7EB' },
        horzLines: { color: '#E5E7EB' }
      },
      rightPriceScale: { visible: false },
      leftPriceScale: {
        visible: true,
        borderColor: '#2B2B43',
        scaleMargins: { top: 0.1, bottom: 0.1 },
      },
      timeScale: {
        borderColor: '#2B2B43',
        timeVisible: true,
        secondsVisible: false
      },
    };

    this.chart = createChart(chartContainer, chartOptions);

    const areaSeries = this.chart.addAreaSeries({
      lineColor: '#B39DDB',
      topColor: 'rgba(179, 157, 219, 0.4)',
      bottomColor: 'rgba(179, 157, 219, 0.1)',
      lineWidth: 2,
      priceLineVisible: false,
      crosshairMarkerVisible: true,
      lastValueVisible: false,
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

  private setupResizeListener() {
    const chartContainer = document.getElementById('MyChart');
    if (chartContainer) {
      this.resizeObserver = new ResizeObserver(entries => {
        for (let entry of entries) {
          const { width, height } = entry.contentRect;
          this.chart?.applyOptions({ width, height });
        }
      });
      this.resizeObserver.observe(chartContainer);
    }
  }

  private cleanupResizeListener() {
    if (this.resizeObserver) {
      this.resizeObserver.disconnect();
    }
  }

  startDataUpdates() {
    this.updateInterval = setInterval(() => {
      this.loadDataAndCreateChart();
    }); // Actualiza cada 5 segundos
  }
}