import { Component } from '@angular/core';

@Component({
  selector: 'app-seleccionar-especie',
  templateUrl: './seleccionar-especie.component.html',
  styleUrl: './seleccionar-especie.component.css'
})
export class SeleccionarEspecieComponent {
  isMenuOpen: boolean = true;

  onMenuToggle(isOpen: boolean) {
    this.isMenuOpen = isOpen;
  }

}
