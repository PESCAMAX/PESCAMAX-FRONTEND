import { Component, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { ApiService, Monitoreo, Alerta, Especie } from '../../../services/api-form/api.service';
import { AuthService } from '../../../../../core/services/api-login/auth.service';
import { GlobalAlertService } from '../../../services/alerta-global/global-alert.service';
import { interval, Subscription } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { UltimoDatoService } from '../../../services/servicio-alerta/ultimo-dato.service';
import { Subscriber } from 'rxjs';

interface MonitoreoItem {
  title: string;
  loteId: number;
  fecha: string;
  descripcion: string;
  showDetails: boolean;
}

@Component({
  selector: 'app-grafica-general',
  templateUrl: './grafica-general.component.html',
  styleUrls: ['./grafica-general.component.css']
})
export class GraficaGeneralComponent implements OnInit, OnDestroy {
  private monitoreoSubscription: Subscription | undefined;
  private userId: string;
  monitoreoData: Monitoreo[] = [];
  monitoreoDataFiltrada: Monitoreo[] = [];
  alertas: Alerta[] = [];
  alertasFiltradas: Alerta[] = [];
  isMenuOpen: boolean = true;
  isLoading: boolean = false;
  selectedLote: number | null = null;
  private updateSubscription: Subscription | null = null;
  private alertSubscription: Subscription | null = null;
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
  penultimoRegistroHora: string = '';
  lote: number | null = null;
  mortalidadValue: number = 0;
  mortalidadTrend: 'up' | 'down' | 'none' = 'none';
  mortalidadTrendValue: string = '';
  mortalidadStatus: 'good' | 'bad' | 'unassigned' = 'unassigned';
  totalPeces: number = 1000; // Suponiendo que tienes el total de peces
  mortalidadData: any[] = []; // 
  temperaturaStatus: 'good' | 'bad' | 'unassigned' = 'unassigned';
  tdsStatus: 'good' | 'bad' | 'unassigned' = 'unassigned';
  phStatus: 'good' | 'bad' | 'unassigned' = 'unassigned';

  private especies: Especie[] = [];

  // Nueva propiedad para los items de monitoreo
  monitoreoItems: MonitoreoItem[] = [];

  constructor(
    private apiService: ApiService,
    private authService: AuthService,
    private cdr: ChangeDetectorRef,
    public globalAlertService: GlobalAlertService,
    private ultimoDatoService: UltimoDatoService,
    
  ) {
    this.userId = this.authService.getUserId();
  }

  ngOnInit(): void {
    this.cargarDatos();
    this.cargarAlertas();
    this.cargarEspecies();
    this.startAutoUpdate();
    this.subscribeToAlerts();
    this.iniciarMonitoreoAutomatico();

  }

  ngOnDestroy(): void {
    this.monitoreoSubscription?.unsubscribe();
    this.updateSubscription?.unsubscribe();
    this.alertSubscription?.unsubscribe();
  }
  private obtenerMortalidadTotal(loteId: number): void {
    this.apiService.obtenerMortalidadTotal(loteId).subscribe(
      data => {
        const totalMuertos = data.totalMortalidad;
        this.mortalidadValue = (totalMuertos / this.totalPeces) * 100;
        this.mortalidadTrend = this.mortalidadValue > 5 ? 'up' : 'down'; // Ejemplo de lógica para la tendencia
        this.mortalidadTrendValue = `${this.mortalidadValue.toFixed(2)}%`;
        this.mortalidadStatus = this.mortalidadValue > 5 ? 'bad' : 'good'; // Ejemplo de lógica para el estado
      },
      error => {
        console.error('Error al obtener la mortalidad total:', error);
      }
    );
  }

  iniciarMonitoreoAutomatico() {
    this.monitoreoSubscription = this.ultimoDatoService.iniciarMonitoreo(this.userId).subscribe();
  }

  subscribeToAlerts(): void {
    this.alertSubscription = this.globalAlertService.alert$.subscribe(
      message => {
        if (message) {
          console.log('Nueva alerta:', message);
        }
      }
    );
  }

  startAutoUpdate(): void {
    this.updateSubscription = interval(5000).pipe(
      switchMap(() => this.apiService.listarMonitoreo(this.authService.getUserId()))
    ).subscribe(
      (response: { response: Monitoreo[] }) => {
        this.monitoreoData = response.response;
        this.filtrarDatos(this.selectedLote);
        this.calcularTendencias();
        this.actualizarMonitoreoItems();
        this.cdr.detectChanges();
      },
      error => console.error('Error al actualizar datos:', error)
    );
  }

  cargarDatos(): void {
    this.isLoading = true;
    this.apiService.listarMonitoreo(this.authService.getUserId()).subscribe(
      (response: { response: Monitoreo[] }) => {
        this.monitoreoData = response.response;
        this.monitoreoDataFiltrada = [...this.monitoreoData];
        this.calcularTendencias();
        this.actualizarMonitoreoItems();
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

  cargarEspecies(): void {
    this.apiService.listarEspecies(this.authService.getUserId()).subscribe(
      (especies: Especie[]) => {
        this.especies = especies;
        this.calcularEstados();
      },
      error => console.error('Error al cargar especies:', error)
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
    this.penultimoRegistroHora = new Date(penultimo.FechaHora).toLocaleTimeString();

    this.lote = ultimo.LoteID;

    this.calcularEstados();
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
    this.penultimoRegistroHora = '';
    this.lote = null;
    this.resetearEstados();
  }

  calcularEstados(): void {
        if (this.monitoreoDataFiltrada.length === 0 || this.especies.length === 0) {
      this.resetearEstados();
      return;
    }

    const ultimoMonitoreo = this.monitoreoDataFiltrada[this.monitoreoDataFiltrada.length - 1];
    const alertaCorrespondiente = this.alertas.find(alerta => alerta.LoteID === ultimoMonitoreo.LoteID);

    if (!alertaCorrespondiente) {
      this.resetearEstados();
      return;
    }

    const especieAsociada = this.especies.find(e => e.Id === alertaCorrespondiente.EspecieID);

    if (!especieAsociada) {
      this.resetearEstados();
      return;
    }

    this.temperaturaStatus = this.determinarEstado(ultimoMonitoreo.Temperatura, especieAsociada.TemperaturaMinimo, especieAsociada.TemperaturaMaximo);
    this.tdsStatus = this.determinarEstado(ultimoMonitoreo.tds, especieAsociada.TdsMinimo, especieAsociada.TdsMaximo);
    this.phStatus = this.determinarEstado(ultimoMonitoreo.PH, especieAsociada.PhMinimo, especieAsociada.PhMaximo);
  }

  private determinarEstado(valor: number, min: number, max: number): 'good' | 'bad' | 'unassigned' {
    return valor >= min && valor <= max ? 'good' : 'bad';
  }

  private resetearEstados(): void {
    this.temperaturaStatus = this.tdsStatus = this.phStatus = 'unassigned';
  }

  onLoteChange(lote: number | null): void {
    this.selectedLote = lote;
    this.filtrarDatos(lote);
    if (lote !== null) {
      this.obtenerMortalidadTotal(lote);
    }
  }
  private filtrarDatos(lote: number | null): void {
    if (lote === null) {
      this.monitoreoDataFiltrada = [...this.monitoreoData];
      this.alertasFiltradas = [...this.alertas];
    } else {
      this.monitoreoDataFiltrada = this.monitoreoData.filter(item => item.LoteID === lote);
      this.alertasFiltradas = this.alertas.filter(alerta => alerta.LoteID === lote);
    }
  }

  private actualizarMonitoreoItems(): void {
    this.monitoreoItems = this.monitoreoDataFiltrada.map(item => ({
      title: `Lote ${item.LoteID}`,
      loteId: item.LoteID,
      fecha: new Date(item.FechaHora).toLocaleString(),  // Convertir Date a string
      descripcion: `Temperatura: ${item.Temperatura}°C, TDS: ${item.tds}, pH: ${item.PH}`,
      showDetails: false
    }));
}


  toggleDetails(item: MonitoreoItem): void {
    item.showDetails = !item.showDetails;
  }
}
