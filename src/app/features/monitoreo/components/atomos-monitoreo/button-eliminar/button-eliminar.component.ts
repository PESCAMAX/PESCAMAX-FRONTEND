import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-button-eliminar',
  templateUrl: './button-eliminar.component.html',
  styleUrls: ['./button-eliminar.component.css']
})
export class ButtonEliminarComponent {
  @Input() id?: number;
  @Input() texto: string = 'Eliminar';
  @Input() customClass: string = '';
  @Output() eliminar = new EventEmitter<number>();

  onEliminar() {
    if (this.id !== undefined) {
      this.eliminar.emit(this.id);
    }
  }
}