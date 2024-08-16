import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-button-guardar',
  templateUrl: './button-guardar.component.html',
  styleUrls: ['./button-guardar.component.css']
})
export class ButtonGuardarComponent {
  @Input() type: 'button' | 'submit' = 'button';
  @Input() texto: string = 'Guardar';
  @Input() color: 'blue' | 'green' = 'blue';
  @Input() customClass: string = '';
  @Input() fullWidth: boolean = false;
  @Output() clickBoton = new EventEmitter<void>();

  onClick() {
    this.clickBoton.emit();
  }

  get buttonClasses(): string {
    const baseClasses = 'px-4 py-2 text-white rounded-md focus:outline-none';
    const colorClasses = this.color === 'green' 
      ? 'bg-green-500 hover:bg-green-600' 
      : 'bg-blue-500 hover:bg-blue-600';
    const widthClass = this.fullWidth ? 'w-full' : '';
    return `${baseClasses} ${colorClasses} ${widthClass} ${this.customClass}`;
  }
}