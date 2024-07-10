import { Component, OnInit } from '@angular/core';
import { Alerta, ApiService, Especie, Monitoreo } from '../../../../features/monitoreo/services/api-form/api.service';
import { AlertService } from '../../../../features/monitoreo/services/api-alert/alert.service';

@Component({
  selector: 'app-tabla-seleccionar',
  templateUrl: './tabla-seleccionar.component.html',
  styleUrls: ['./tabla-seleccionar.component.css']
})
export class TablaSeleccionarComponent implements OnInit {
  especies: Especie[] = [];
  lotes: Monitoreo[] = [];
  selectedLote: { [key: number]: number } = {};

  constructor(private apiService: ApiService, private alertService: AlertService) {}

  ngOnInit(): void {
    this.apiService.listarEspecies().subscribe({
      next: (response) => {
        console.log('Especies:', response);
        this.especies = response;
      },
      error: (error) => {
        console.error('Error al listar especies:', error);
      }
    });

    this.apiService.listarMonitoreo().subscribe({
      next: (response) => {
        console.log('Lotes:', response);
        this.lotes = response.response;
        console.log('Lotes después de asignar:', this.lotes);
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
    const lote = this.lotes.find(l => l.ID_M === loteId);
  
    if (!especie) {
      console.error('No se encontró la especie correspondiente con ID:', especieId);
      this.alertService.showAlert('danger', 'Error de datos', 'No se encontró la especie correspondiente.');
      return;
    }
  
    if (!lote) {
      console.error('No se encontró el lote correspondiente con ID:', loteId);
      console.log('Lotes disponibles:', this.lotes);
      this.alertService.showAlert('danger', 'Error de datos', 'No se encontró el lote correspondiente.');
      return;
    }
  
    const problemas = this.obtenerProblemas(especie, lote);

    if (problemas.length > 0) {
      console.log('Problemas detectados:', problemas.join(', '));
      this.alertService.showAlert('danger', 'Parámetros fuera del rango seguro', problemas.join(', '));
      
      // Crear alerta
      const alerta: Alerta = {
        EspecieID: especie.Id,
        Nombre: especie.NombreEspecie,
        LoteID: loteId,
        Descripcion: problemas.join(', ')
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
  
    // Validación de TDS
    if (lote.tds < especie.TdsMinimo || lote.tds > especie.TdsMaximo) {
      problemas.push(`TDS está fuera del rango seguro (${especie.TdsMinimo}-${especie.TdsMaximo}). Actual: ${lote.tds}`);
    }
  
    // Validación de Temperatura
    if (lote.Temperatura < especie.TemperaturaMinimo || lote.Temperatura > especie.TemperaturaMaximo) {
      problemas.push(`Temperatura está fuera del rango seguro (${especie.TemperaturaMinimo}-${especie.TemperaturaMaximo}). Actual: ${lote.Temperatura}`);
    }
  
    // Validación de pH
    if (lote.PH < especie.PhMinimo || lote.PH > especie.PhMaximo) {
      problemas.push(`pH está fuera del rango seguro (${especie.PhMinimo}-${especie.PhMaximo}). Actual: ${lote.PH}`);
    }
  
    return problemas;
  }
}