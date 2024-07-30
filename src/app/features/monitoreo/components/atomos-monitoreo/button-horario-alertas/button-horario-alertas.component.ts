import { Component, Input, Output, EventEmitter } from '@angular/core';


@Component({
  selector: 'app-button-horario-alertas',
  templateUrl: './button-horario-alertas.component.html',
  styleUrl: './button-horario-alertas.component.css'
})
export class ButtonHorarioAlertasComponent {
  @Input() texto: string = 'DEFINIR HORARIO DE ALERTA';
  @Input() customClass: string = '';
  @Output() clickBoton = new EventEmitter<void>();

  onClick() {
    this.clickBoton.emit();
  }

  get buttonClasses(): string {
    const baseClasses = 'text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800';
    return `${baseClasses} ${this.customClass}`;
  }
}
