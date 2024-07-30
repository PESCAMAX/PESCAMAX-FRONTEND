import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-button-guardar',
  templateUrl: './button-guardar.component.html',
  styleUrl: './button-guardar.component.css'
})
export class ButtonGuardarComponent {
  @Input() type: 'button' | 'submit' = 'button';
  @Input() texto: string = 'Guardar';
  @Input() color: 'blue' | 'green' = 'blue';
  @Input() customClass: string = '';
  @Output() clickBoton = new EventEmitter<void>();

  onClick() {
    this.clickBoton.emit();
  }

  get buttonClasses(): string {
    const baseClasses = 'font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline';
    const colorClasses = this.color === 'green' 
      ? 'bg-green-500 hover:bg-green-700' 
      : 'bg-[#4295e2] hover:bg-blue-700';
    return `${baseClasses} ${colorClasses} ${this.customClass}`;
  }
}