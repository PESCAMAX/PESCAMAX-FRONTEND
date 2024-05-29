import { Component } from '@angular/core';

@Component({
  selector: 'app-flecha-despliegue',
  templateUrl: './flecha-despliegue.component.html',
  styleUrl: './flecha-despliegue.component.css'
})
export class FlechaDespliegueComponent {
  arrowImage: string = 'assets/icons/icons8-flecha-ampliar-16.png'; // Imagen inicial de la flecha

  toggleArrow() {
    this.arrowImage = this.arrowImage === 'assets/icons/icons8-flecha-ampliar-16.png' 
      ? 'assets/icons/icons8-flecha-contraer-16.png' 
      : 'assets/icons/icons8-flecha-ampliar-16.png';
  }
}
