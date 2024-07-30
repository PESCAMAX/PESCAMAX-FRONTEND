import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-button-cancelar',
  templateUrl: './button-cancelar.component.html',
  styleUrls: ['./button-cancelar.component.css']
})
export class ButtonCancelarComponent {
  @Input() texto: string = 'Cancelar';
  @Input() estilo: 'blanco' | 'rojo' = 'blanco';
  @Input() customClass: string = '';
  @Output() cancelar = new EventEmitter<void>();

  onCancelar() {
    this.cancelar.emit();
  }

  get buttonClasses(): string {
    const baseClasses = 'font-bold py-2 px-4 rounded focus:outline-none';
    if (this.estilo === 'rojo') {
      return `${baseClasses} bg-red-500 hover:bg-red-700 text-white ${this.customClass}`;
    } else {
      return `${baseClasses} bg-white text-gray-700 border border-gray-300 hover:bg-gray-50 ${this.customClass}`;
    }
  }
}