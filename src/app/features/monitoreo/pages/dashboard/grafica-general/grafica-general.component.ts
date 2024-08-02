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

  temperaturaTrend: 'up' | 'down' | 'none' = 'none';
  tdsTrend: 'up' | 'down' | 'none' = 'none';
  phTrend: 'up' | 'down' | 'none' = 'none';
  temperaturaValue: number = 0;
  tdsValue: number = 0;
  phValue: number = 0;

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
      this.temperaturaTrend = 'none';
      this.tdsTrend = 'none';
      this.phTrend = 'none';
      return;
    }
    const ultimo = this.monitoreoDataFiltrada[this.monitoreoDataFiltrada.length - 1];
    const penultimo = this.monitoreoDataFiltrada[this.monitoreoDataFiltrada.length - 2];
    this.temperaturaTrend = ultimo.Temperatura > penultimo.Temperatura ? 'up' : 'down';
    this.tdsTrend = ultimo.tds > penultimo.tds ? 'up' : 'down';
    this.phTrend = ultimo.PH > penultimo.PH ? 'up' : 'down';
    this.temperaturaValue = ultimo.Temperatura;
    this.tdsValue = ultimo.tds;
    this.phValue = ultimo.PH;
  }

  onLoteChange(lote: number | null): void {
    this.selectedLote = lote;
    if (lote === null) {
      this.monitoreoDataFiltrada = [...this.monitoreoData];
      this.alertasFiltradas = [...this.alertas];
    } else {
      this.monitoreoDataFiltrada = this.monitoreoData.filter(data => data.LoteID === lote);
      this.alertasFiltradas = this.alertas.filter(alerta => alerta.LoteID === lote);
    }
    this.calcularTendencias();
    this.cdr.detectChanges();
  }

  filtrarAlertas(lote: number | null): void {
    if (lote === null) {
      this.alertasFiltradas = [...this.alertas];
    } else {
      this.alertasFiltradas = this.alertas.filter(alerta => alerta.LoteID === lote);
    }
  }
}