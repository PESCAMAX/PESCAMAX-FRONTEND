import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-flecha-despliegue',
  templateUrl: './flecha-despliegue.component.html',
  styleUrl: './flecha-despliegue.component.css'
})
export class FlechaDespliegueComponent {
  @Input() desplegado: boolean = false;

  get arrowImage(): string {
    return this.desplegado 
      ? 'assets/icons/icons8-flecha-contraer-16.png'
      : 'assets/icons/icons8-flecha-ampliar-16.png';
  }
}
