import { Component, OnInit } from '@angular/core';
import { ApiService, Monitoreo } from '../../../services/api-form/api.service';
import { AuthService } from '../../../../../core/services/api-login/auth.service';
import { ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-grafica-general',
  templateUrl: './grafica-general.component.html',
  styleUrls: ['./grafica-general.component.css']
})
export class GraficaGeneralComponent implements OnInit {
  monitoreoData: any[] = [];
  alertasFiltradas: any[] = [];
  monitoreoDataFiltrada: any[] = [];
  isMenuOpen: boolean = true;
  filteredData: Monitoreo[] = [];
  isLoading: boolean = false;
  temperaturaTrend: 'up' | 'down' | 'none' = 'none';
  tdsTrend: 'up' | 'down' | 'none' = 'none';
  phTrend: 'up' | 'down' | 'none' = 'none';

  constructor(private apiService: ApiService, private AuthService: AuthService, private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.cargarDatos();
    this.monitoreoDataFiltrada = [...this.monitoreoData];
  }

  onMenuToggle(isOpen: boolean) {
    this.isMenuOpen = isOpen;
  }

  cargarDatos(): void {
    this.isLoading = true;
    this.apiService.listarMonitoreo(this.AuthService.getUserId()).subscribe(
      (response: { response: Monitoreo[] }) => {
        this.monitoreoData = response.response;
        this.monitoreoDataFiltrada = [...this.monitoreoData];
        this.calcularTendencias();
        this.isLoading = false;
      },
      error => {
        this.isLoading = false;
        console.error('Error al cargar los datos', error);
      }
    );
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
    this.tdsTrend = ultimo.Tds > penultimo.Tds ? 'up' : 'down';
    this.phTrend = ultimo.Ph > penultimo.Ph ? 'up' : 'down';
  }

  onLoteChange(lote: number | null): void {
    if (lote === null) {
      this.monitoreoDataFiltrada = [...this.monitoreoData];
    } else {
      this.monitoreoDataFiltrada = this.monitoreoData.filter(data => data.Lote === lote);
    }
    this.calcularTendencias();
    this.cdr.detectChanges();
  }
}
