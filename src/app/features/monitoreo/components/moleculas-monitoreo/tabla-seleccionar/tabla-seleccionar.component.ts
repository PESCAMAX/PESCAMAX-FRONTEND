import { Component, OnInit } from '@angular/core';
import { Alerta,ApiService,Especie,Monitoreo } from '../../../services/api-form/api.service';
import { AlertService } from '../../../services/api-alert/alert.service';
import { AuthService } from '../../../../../core/services/api-login/auth.service';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-tabla-seleccionar',
  templateUrl: './tabla-seleccionar.component.html',
  styleUrls: ['./tabla-seleccionar.component.css']
})
export class TablaSeleccionarComponent implements OnInit {
  isMenuOpen: boolean = true;
  especies: Especie[] = [];
  lotes: Monitoreo[] = [];
  uniqueLotes: number[] = [];
  selectedLote: { [key: number]: number } = {};
  userId: string;

  constructor(
    private apiService: ApiService, 
    private alertService: AlertService,
    private authService: AuthService,
    private route: ActivatedRoute
  ) {
    this.userId = this.authService.getUserId();
  }


  ngOnInit() {
    this.route.params.subscribe(params => {
      this.userId = params['userId'] || this.userId;
      this.loadData();
    });
    
  }

  onMenuToggle(isOpen: boolean) {
    this.isMenuOpen = isOpen;
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
        console.log('Respuesta completa:', response);
        if (response && response.response) {
          this.lotes = response.response;
          this.uniqueLotes = [...new Set(this.lotes.map(lote => lote.LoteID))];
          console.log('Lotes únicos:', this.uniqueLotes);
        } else {
          console.error('La respuesta no tiene el formato esperado');
        }
      },
      error: (error) => {
        console.error('Error al listar lotes:', error);
      }
    });
    

    this.apiService.listarMonitoreo(this.userId).subscribe({
      // ...
    
      next: (response) => {
        console.log('Lotes:', response);
        this.lotes = response.response;
        this.uniqueLotes = [...new Set(this.lotes.map(lote => lote.LoteID))];
        console.log('Lotes únicos:', this.uniqueLotes);
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
      console.error('No se ha seleccionado ningún lote para esta especie.');
      this.alertService.showAlert('warning', 'Selección incompleta', 'Seleccione un lote para la especie.');
      return;
    }
  
    console.log(`Especie ID: ${especieId}, Lote ID: ${loteId}`);
    this.verificarValores(especieId, loteId);
  }
  
  verificarValores(especieId: number, loteId: number): void {
    console.log('Verificando valores para especie ID:', especieId, 'y lote ID:', loteId);
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

    if (problemas.length > 0) {
      console.log('Problemas detectados:', problemas.join(', '));
      this.alertService.showAlert('danger', 'Parámetros fuera del rango seguro', problemas.join(', '));
      
      // Crear alerta
      const alerta: Alerta = {
        EspecieID: especie.Id,
        Nombre: especie.NombreEspecie,
        LoteID: loteId,
        Descripcion: problemas.join(', '),
        UserId: this.userId  // Añadir el userId aquí
      };
      this.apiService.crearAlerta(alerta).subscribe({
        next: (response) => console.log('Alerta creada:', response),
        error: (error) => console.error('Error al crear alerta:', error)
      });
    } else {
      console.log('Todos los parámetros están dentro del rango seguro.');
      this.alertService.showAlert('info', 'Validación exitosa', 'Todos los parámetros están dentro del rango seguro.');
    }
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
}