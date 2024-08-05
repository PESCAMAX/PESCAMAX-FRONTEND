import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { ApiService, Monitoreo, Alerta } from '../../../services/api-form/api.service';
import { AuthService } from '../../../../../core/services/api-login/auth.service';

@Component({
  selector: 'app-grafica-general',
  templateUrl: './grafica-general.component.html',
  styleUrls: ['./grafica-general.component.css']
})
export class GraficaGeneralComponent implements OnInit {
  monitoreoData: Monitoreo[] = [];
  monitoreoDataFiltrada: Monitoreo[] = [];
  alertas: Alerta[] = [];
  alertasFiltradas: Alerta[] = [];
  isMenuOpen: boolean = true;
  isLoading: boolean = false;
  selectedLote: number | null = null;
  
  temperaturaValue: number = 0;
  tdsValue: number = 0;
  phValue: number = 0;
  temperaturaTrend: 'up' | 'down' | 'none' = 'none';
  tdsTrend: 'up' | 'down' | 'none' = 'none';
  phTrend: 'up' | 'down' | 'none' = 'none';
  temperaturaTrendValue: string = '';
  tdsTrendValue: string = '';
  phTrendValue: string = '';
  
  ultimoRegistroHora: string = '';
  lote: number | null = null;

  constructor(
    private apiService: ApiService,
    private authService: AuthService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.cargarDatos();
    this.cargarAlertas();
  }

  cargarDatos(): void {
    this.isLoading = true;
    this.apiService.listarMonitoreo(this.authService.getUserId()).subscribe(
      (response: { response: Monitoreo[] }) => {
        this.monitoreoData = response.response;
        this.monitoreoDataFiltrada = [...this.monitoreoData];
        this.calcularTendencias();
        this.isLoading = false;
        this.cdr.detectChanges();
      },
      error => {
        this.isLoading = false;
        console.error('Error al cargar los datos', error);
      }
    );
  }

  cargarAlertas(): void {
    this.apiService.obtenerAlertas().subscribe(
      (alertas: Alerta[]) => {
        this.alertas = alertas;
        this.alertasFiltradas = [...this.alertas];
      },
      error => {
        console.error('Error al cargar las alertas', error);
      }
    );
  }

  onMenuToggle(isOpen: boolean) {
    this.isMenuOpen = isOpen;
  }

  calcularTendencias(): void {
    if (this.monitoreoDataFiltrada.length < 2) {
      this.resetearTendencias();
      return;
    }

    const ultimo = this.monitoreoDataFiltrada[this.monitoreoDataFiltrada.length - 1];
    const penultimo = this.monitoreoDataFiltrada[this.monitoreoDataFiltrada.length - 2];

    this.actualizarTendencia('temperatura', ultimo.Temperatura, penultimo.Temperatura);
    this.actualizarTendencia('tds', ultimo.tds, penultimo.tds);
    this.actualizarTendencia('ph', ultimo.PH, penultimo.PH);

    this.temperaturaValue = ultimo.Temperatura;
    this.tdsValue = ultimo.tds;
    this.phValue = ultimo.PH;
    this.ultimoRegistroHora = new Date(ultimo.FechaHora).toLocaleTimeString();
    this.lote = ultimo.LoteID;
  }

  private actualizarTendencia(tipo: 'temperatura' | 'tds' | 'ph', valorActual: number, valorAnterior: number): void {
    const diferencia = valorActual - valorAnterior;
    const tendencia = diferencia > 0 ? 'up' : diferencia < 0 ? 'down' : 'none';
    const valorAbsoluto = Math.abs(diferencia).toFixed(2);

    switch (tipo) {
      case 'temperatura':
        this.temperaturaTrend = tendencia;
        this.temperaturaTrendValue = `${valorAbsoluto}°C`;
        break;
      case 'tds':
        this.tdsTrend = tendencia;
        this.tdsTrendValue = valorAbsoluto;
        break;
      case 'ph':
        this.phTrend = tendencia;
        this.phTrendValue = valorAbsoluto;
        break;
    }
  }

  private resetearTendencias(): void {
    this.temperaturaTrend = this.tdsTrend = this.phTrend = 'none';
    this.temperaturaTrendValue = this.tdsTrendValue = this.phTrendValue = '';
    this.temperaturaValue = this.tdsValue = this.phValue = 0;
    this.ultimoRegistroHora = '';
    this.lote = null;
  }

  onLoteChange(lote: number | null): void {
    this.selectedLote = lote;
    this.filtrarDatos(lote);
    this.filtrarAlertas(lote);
    this.calcularTendencias();
    this.cdr.detectChanges();
  }

  private filtrarDatos(lote: number | null): void {
    this.monitoreoDataFiltrada = lote === null 
      ? [...this.monitoreoData]
      : this.monitoreoData.filter(data => data.LoteID === lote);
  }

  private filtrarAlertas(lote: number | null): void {
    this.alertasFiltradas = lote === null
      ? [...this.alertas]
      : this.alertas.filter(alerta => alerta.LoteID === lote);
  }
}