import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-button-cancelar',
  templateUrl: './button-cancelar.component.html',
  styleUrls: ['./button-cancelar.component.css']
})
export class ButtonCancelarComponent {
  @Input() texto: string = 'Cancelar';
  @Input() estilo: 'blanco' | 'rojo' | 'azul' = 'blanco'; // Añadido 'azul'
  @Input() customClass: string = '';
  @Output() cancelar = new EventEmitter<void>();

  onCancelar() {
    this.cancelar.emit();
  }

  get buttonClasses(): string {
    const baseClasses = 'font-bold py-2 px-4 rounded focus:outline-none transition-all duration-300';
    if (this.estilo === 'rojo') {
      return `${baseClasses} bg-red-500 hover:bg-red-700 text-white ${this.customClass}`;
    } else if (this.estilo === 'azul') {
      return `${baseClasses} text-blue-600 border border-blue-600 hover:border-blue-700 hover:text-blue-700 ${this.customClass}`;
    } else {
      return `${baseClasses} bg-white text-gray-700 border border-gray-300 hover:bg-gray-50 ${this.customClass}`;
    }
  }
}
























