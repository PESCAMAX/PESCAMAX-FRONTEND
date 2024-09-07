import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { UltimoDatoService } from '../../../services/servicio-alerta/ultimo-dato.service';
import { AuthService } from '../../../../../core/services/api-login/auth.service';
import { ApiService, Monitoreo } from '../../../services/api-form/api.service';

@Component({
  selector: 'app-grafica-tds',
  templateUrl: './grafica-tds.component.html',
  styleUrls: ['./grafica-tds.component.css']
})
export class GraficaTdsComponent implements OnInit, OnDestroy {
  isMenuOpen: boolean = true;
  private monitoreoSubscription: Subscription | undefined;
  private userId: string;

  tdsValue: number = 0;
  tdsTrend: 'up' | 'down' | 'none' = 'none';
  tdsTrendValue: string = '';

  constructor(
    private ultimoDatoService: UltimoDatoService,
    private authService: AuthService,
    private apiService: ApiService
  ) {
    this.userId = this.authService.getUserId();
  }

  ngOnInit() {
    this.iniciarMonitoreoAutomatico();
    this.cargarDatos();
  }

  ngOnDestroy() {
    if (this.monitoreoSubscription) {
      this.monitoreoSubscription.unsubscribe();
    }
  }

  onMenuToggle(isOpen: boolean) {
    this.isMenuOpen = isOpen;
  }

  iniciarMonitoreoAutomatico() {
    this.monitoreoSubscription = this.ultimoDatoService.iniciarMonitoreo(this.userId).subscribe();
  }

  cargarDatos(): void {
    this.apiService.listarMonitoreo(this.userId).subscribe(
      (response: { response: Monitoreo[] }) => {
        const monitoreoData = response.response;
        this.calcularTendencias(monitoreoData);
      },
      error => console.error('Error al cargar los datos', error)
    );
  }

  calcularTendencias(monitoreoData: Monitoreo[]): void {
    if (monitoreoData.length < 2) {
      this.resetearTendencias();
      return;
    }

    const ultimo = monitoreoData[monitoreoData.length - 1];
    const penultimo = monitoreoData[monitoreoData.length - 2];

    this.actualizarTendencia(ultimo.tds, penultimo.tds);
    this.tdsValue = ultimo.tds;
  }

  private actualizarTendencia(valorActual: number, valorAnterior: number): void {
    const diferencia = valorActual - valorAnterior;
    this.tdsTrend = diferencia > 0 ? 'up' : diferencia < 0 ? 'down' : 'none';
    this.tdsTrendValue = Math.abs(diferencia).toFixed(2);
  }

  private resetearTendencias(): void {
    this.tdsTrend = 'none';
    this.tdsTrendValue = '';
    this.tdsValue = 0;
  }
}
