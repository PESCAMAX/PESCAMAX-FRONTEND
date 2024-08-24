import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { UltimoDatoService } from '../../../services/servicio-alerta/ultimo-dato.service';
import { AuthService } from '../../../../../core/services/api-login/auth.service';
import { ApiService, Monitoreo } from '../../../services/api-form/api.service';

@Component({
  selector: 'app-grafica-temperatura',
  templateUrl: './grafica-temperatura.component.html',
  styleUrls: ['./grafica-temperatura.component.css']
})
export class GraficaTemperaturaComponent implements OnInit, OnDestroy {
  isMenuOpen: boolean = true;
  private monitoreoSubscription: Subscription | undefined;
  private userId: string;

  temperaturaValue: number = 0;
  temperaturaTrend: 'up' | 'down' | 'none' = 'none';
  temperaturaTrendValue: string = '';

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

    this.actualizarTendencia(ultimo.Temperatura, penultimo.Temperatura);
    this.temperaturaValue = ultimo.Temperatura;
  }

  private actualizarTendencia(valorActual: number, valorAnterior: number): void {
    const diferencia = valorActual - valorAnterior;
    this.temperaturaTrend = diferencia > 0 ? 'up' : diferencia < 0 ? 'down' : 'none';
    this.temperaturaTrendValue = `${Math.abs(diferencia).toFixed(2)}°C`;
  }

  private resetearTendencias(): void {
    this.temperaturaTrend = 'none';
    this.temperaturaTrendValue = '';
    this.temperaturaValue = 0;
  }
}