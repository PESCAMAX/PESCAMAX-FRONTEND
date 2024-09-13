import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-button-confirmar',
  templateUrl: './button-confirmar.component.html',
  styleUrls: ['./button-confirmar.component.css'] // Corregido a 'styleUrls'
})
export class ButtonConfirmarComponent {
  @Input() texto: string = 'Confirmar';
  @Input() customClass: string = '';
  @Output() confirmar = new EventEmitter<void>();

  onClick(): void {
    this.confirmar.emit();
  }

  getClasses(): string {
    const baseClasses = 'inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 sm:ml-1 sm:w-auto sm:text-sm';
    return `${baseClasses} ${this.customClass}`;
  }
}