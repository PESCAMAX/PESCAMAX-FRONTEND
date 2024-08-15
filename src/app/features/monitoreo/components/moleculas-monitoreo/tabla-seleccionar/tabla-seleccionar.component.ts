import { Component, OnInit } from '@angular/core';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { Alerta, ApiService, Especie, Monitoreo, EspecieLoteDTO } from '../../../services/api-form/api.service';
import { AlertService } from '../../../services/api-alert/alert.service';
import { AuthService } from '../../../../../core/services/api-login/auth.service';
import { ActivatedRoute } from '@angular/router';
import { UltimoDatoService } from '../../../services/servicio-alerta/ultimo-dato.service';


@Component({
  selector: 'app-tabla-seleccionar',
  templateUrl: './tabla-seleccionar.component.html',
  styleUrls: ['./tabla-seleccionar.component.css']
})
export class TablaSeleccionarComponent implements OnInit, OnDestroy {
  isMenuOpen: boolean = true;
  especies: Especie[] = [];
  lotes: Monitoreo[] = [];
  uniqueLotes: number[] = [];
  selectedLote: { [key: number]: number } = {};
  userId: string;
  especiePorLote: { [loteId: number]: number } = {};

  private monitoreoSubscription: Subscription | undefined;


  constructor(
    private apiService: ApiService,
    private alertService: AlertService,
    private authService: AuthService,
    private route: ActivatedRoute,
    private ultimoDatoService: UltimoDatoService
  ) {
    this.userId = this.authService.getUserId();
    this.monitoreoSubscription = new Subscription();
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.userId = params['userId'] || this.userId;
      this.loadData();
      this.cargarEspeciePorLote();
      this.iniciarMonitoreoAutomatico();
    });
  }

  ngOnDestroy() {
    if (this.monitoreoSubscription) {
      this.monitoreoSubscription.unsubscribe();
      
    }

  }

  onMenuToggle(isOpen: boolean) {
    this.isMenuOpen = isOpen;
  }

  cargarEspeciePorLote() {
    this.apiService.obtenerEspeciePorLote(this.userId).subscribe({
      next: (data: EspecieLoteDTO[]) => {
        this.especiePorLote = data.reduce((acc: { [key: number]: number }, item: EspecieLoteDTO) => {
          acc[item.LoteId] = item.EspecieId;
          return acc;
        }, {});
      },
      error: (error) => console.error('Error al cargar especies por lote:', error)
    });
  }

  loadData() {
    // Load especies
    this.apiService.listarEspecies(this.userId).subscribe({
      next: (especies) => {
        this.especies = especies;
        this.loadMonitoreo();
      },
      error: (error) => console.error('Error al cargar especies:', error)
    });
  }

  loadMonitoreo() {
    this.apiService.listarMonitoreo(this.userId).subscribe({
      next: (response) => {
        if (response && response.response) {
          this.lotes = response.response;
          this.uniqueLotes = [...new Set(this.lotes.map(lote => lote.LoteID))];
        } else {
          console.error('La respuesta no tiene el formato esperado');
        }
      },
      error: (error) => {
        console.error('Error al listar lotes:', error);
      }
    });
  }

  onLoteChange(event: Event, especieId: number): void {
    const selectElement = event.target as HTMLSelectElement;
    this.selectedLote[especieId] = parseInt(selectElement.value, 10);
    console.log(`Lote seleccionado para especie ${especieId}: ${selectElement.value}`);
  }

  guardarSeleccion(especieId: number): void {
    const loteId = this.selectedLote[especieId];

    if (!loteId) {
      this.alertService.showAlert('warning', 'Selección incompleta', 'Seleccione un lote para la especie.');
      return;
    }

    const especie = this.especies.find(e => e.Id === especieId);
    const lotesFiltrados = this.lotes.filter(l => l.LoteID === loteId);
    const ultimoLote = lotesFiltrados.reduce((prev, current) =>
      (new Date(prev.FechaHora) > new Date(current.FechaHora)) ? prev : current
    );

    if (!especie) {
      console.error('No se encontró la especie correspondiente con ID:', especieId);
      this.alertService.showAlert('danger', 'Error de datos', 'No se encontró la especie correspondiente.');
      return;
    }

    if (!ultimoLote) {
      console.error('No se encontró el lote correspondiente con ID:', loteId);
      console.log('Lotes disponibles:', this.lotes);
      this.alertService.showAlert('danger', 'Error de datos', 'No se encontró el lote correspondiente.');
      return;
    }

    const problemas = this.obtenerProblemas(especie, ultimoLote);

    this.apiService.asignarEspecieALote(especieId, loteId, this.userId).subscribe({
      next: () => {
        if (problemas.length > 0) {
          console.log('Problemas detectados:', problemas.join(', '));
          this.crearAlerta(especie, loteId, problemas);
          this.alertService.showAlert('danger', 'Parámetros fuera del rango seguro', problemas.join(', '));
        } else {
          this.alertService.showAlert('info', 'Asignación guardada', 'La especie ha sido asignada al lote correctamente.');
        }
        this.cargarEspeciePorLote();
      },
      error: (error) => {
        console.error('Error al asignar especie a lote:', error);
        this.alertService.showAlert('danger', 'Error', 'No se pudo asignar la especie al lote.');
      }
    });
  }

  obtenerProblemas(especie: Especie, lote: Monitoreo): string[] {
    const problemas = [];

    if (lote.tds < especie.TdsMinimo || lote.tds > especie.TdsMaximo) {
      problemas.push(`TDS está fuera del rango seguro (${especie.TdsMinimo}-${especie.TdsMaximo}). Actual: ${lote.tds}`);
    }

    if (lote.Temperatura < especie.TemperaturaMinimo || lote.Temperatura > especie.TemperaturaMaximo) {
      problemas.push(`Temperatura está fuera del rango seguro (${especie.TemperaturaMinimo}-${especie.TemperaturaMaximo}). Actual: ${lote.Temperatura}`);
    }

    if (lote.PH < especie.PhMinimo || lote.PH > especie.PhMaximo) {
      problemas.push(`pH está fuera del rango seguro (${especie.PhMinimo}-${especie.PhMaximo}). Actual: ${lote.PH}`);
    }

    return problemas;
  }

  crearAlerta(especie: Especie, loteId: number, problemas: string[]): void {
    const alerta: Alerta = {
      EspecieID: especie.Id,
      Nombre: especie.NombreEspecie,
      LoteID: loteId,
      Descripcion: problemas.join(', '),
      UserId: this.userId
    };

    this.apiService.crearAlerta(alerta).subscribe({
      next: (response) => console.log('Alerta creada:', response),
      error: (error) => console.error('Error al crear alerta:', error)
    });
  }

  iniciarMonitoreoAutomatico() {
    this.monitoreoSubscription = this.ultimoDatoService.iniciarMonitoreo(this.userId).subscribe();
  }

}