import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Monitoreo } from '../../../services/api-form/api.service';

@Component({
  selector: 'app-lotes',
  templateUrl: './lotes.component.html',
  styleUrls: ['./lotes.component.css']
})
export class LotesComponent {
  @Input() monitoreoData: Monitoreo[] = [];
  @Output() loteSeleccionado = new EventEmitter<number | null>();
  
  lotes: number[] = [];

  ngOnChanges(): void {
    this.extraerLotes();
  }

  extraerLotes(): void {
    this.lotes = [...new Set(this.monitoreoData.map(item => item.LoteID))];
  }

  filtrarPorLote(event: Event): void {
    const selectElement = event.target as HTMLSelectElement;
    const lote = Number(selectElement.value);
    this.loteSeleccionado.emit(lote || null);
  }
}
