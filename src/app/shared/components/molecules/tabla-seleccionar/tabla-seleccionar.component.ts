import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../../../features/monitoreo/services/api-form/api.service';
import { AlertService } from '../../../../features/monitoreo/services/api-alert/alert.service';

@Component({
  selector: 'app-tabla-seleccionar',
  templateUrl: './tabla-seleccionar.component.html',
  styleUrls: ['./tabla-seleccionar.component.css']
})
export class TablaSeleccionarComponent implements OnInit {
  especies: any[] = [];
  lotes: any[] = [];
  selectedLote: { [key: string]: string } = {};

  constructor(private apiService: ApiService, private alertService: AlertService) {}

  ngOnInit(): void {
    this.apiService.listarEspecies().subscribe({
      next: (response) => {
        console.log('Especies:', response);  // Verifica aquí los datos de las especies
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

  onLoteChange(event: Event, especieId: string): void {
    const selectElement = event.target as HTMLSelectElement;
    this.selectedLote[especieId] = selectElement.value;
    console.log(`Lote seleccionado para especie ${especieId}: ${selectElement.value}`);
  }

  guardarSeleccion(especieId: string): void {
    const loteId = this.selectedLote[especieId];
  
    if (!loteId) {
      console.error('No se ha seleccionado ningún lote para esta especie.');
      this.alertService.showAlert('warning', 'Selección incompleta', 'Seleccione un lote para la especie.');
      return;
    }
  
    console.log(`Especie ID: ${especieId}, Lote ID: ${loteId}`);
    this.verificarValores(especieId, loteId);
  }
  verificarValores(especieId: string, loteId: string): void {
    console.log('Verificando valores para especie ID:', especieId, 'y lote ID:', loteId);
    const especie = this.especies.find(e => e.id === parseInt(especieId, 10));
    const lote = this.lotes.find(l => l.iD_M.toString() === loteId);
  
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
    } else {
      console.log('Todos los parámetros están dentro del rango seguro.');
      this.alertService.showAlert('info', 'Validación exitosa', 'Todos los parámetros están dentro del rango seguro.');
    }
  }
  

  obtenerProblemas(especie: any, lote: any): string[] {
    const problemas = [];
  
    if (lote.tds < especie.tdsMinimo || lote.tds > especie.tdsMaximo) {
      problemas.push(`TDS está fuera del rango seguro (${especie.tdsMinimo}-${especie.tdsMaximo}). Actual: ${lote.tds}`);
    }
  
    if (lote.temperatura < especie.temperaturaMinimo || lote.temperatura > especie.temperaturaMaximo) {
      problemas.push(`Temperatura está fuera del rango seguro (${especie.temperaturaMinimo}-${especie.temperaturaMaximo}). Actual: ${lote.temperatura}`);
    }
  
    if (lote.ph < especie.phMinimo || lote.ph > especie.phMaximo) {
      problemas.push(`pH está fuera del rango seguro (${especie.phMinimo}-${especie.phMaximo}). Actual: ${lote.ph}`);
    }
  
    return problemas;
  }
}
