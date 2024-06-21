// src/app/shared/components/molecules/tabla-seleccionar/tabla-seleccionar.component.ts
import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../../../features/monitoreo/services/api-form/api.service';
import { AlertService } from '../../organisms/alert/alert.service';
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
    this.apiService.listarEspecies().subscribe(response => {
      console.log('Especies:', response);
      this.especies = response;
    }, error => {
      console.error('Error al listar especies:', error);
    });

    this.apiService.listarMonitoreo().subscribe(response => {
      console.log('Lotes:', response);
      this.lotes = response.response;
    }, error => {
      console.error('Error al listar lotes:', error);
    });
  }

  onLoteChange(event: Event, especieId: string): void {
    const selectElement = event.target as HTMLSelectElement;
    this.selectedLote[especieId] = selectElement.value;
  }

  guardarSeleccion(especieId: string): void {
    const loteId = this.selectedLote[especieId];
    console.log(`Especie ID: ${especieId}, Lote ID: ${loteId}`);
    this.verificarValores(especieId, loteId);
  }

  verificarValores(especieId: string, loteId: string): void {
    const especie = this.especies.find(e => e.id === especieId);
    const lote = this.lotes.find(l => l.ID_M === parseInt(loteId));

    if (especie && lote) {
      const problemas = [];

      if (lote.tds < especie.tdsMinimo || lote.tds > especie.tdsMaximo) {
        problemas.push(`TDS está fuera del rango seguro (${especie.tdsMinimo}-${especie.tdsMaximo})`);
      }

      if (lote.Temperatura < especie.temperaturaMinimo || lote.Temperatura > especie.temperaturaMaximo) {
        problemas.push(`Temperatura está fuera del rango seguro (${especie.temperaturaMinimo}-${especie.temperaturaMaximo})`);
      }

      if (lote.PH < especie.phMinimo || lote.PH > especie.phMaximo) {
        problemas.push(`pH está fuera del rango seguro (${especie.phMinimo}-${especie.phMaximo})`);
      }

      if (problemas.length > 0) {
        this.alertService.showAlert('danger', 'Parámetros fuera del rango seguro', problemas.join(', '));
      }
    }
  }
}
