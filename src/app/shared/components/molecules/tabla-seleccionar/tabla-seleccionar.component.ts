import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../../../features/monitoreo/services/api-form/api.service';

@Component({
  selector: 'app-tabla-seleccionar',
  templateUrl: './tabla-seleccionar.component.html',
  styleUrls: ['./tabla-seleccionar.component.css']
})
export class TablaSeleccionarComponent implements OnInit {
  especies: any[] = [];
  lotes: any[] = [];
  selectedLote: { [key: string]: string } = {};

  constructor(private apiService: ApiService) {}

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
  }
}
