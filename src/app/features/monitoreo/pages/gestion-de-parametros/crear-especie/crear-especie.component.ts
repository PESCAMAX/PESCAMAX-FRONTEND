import { Component } from '@angular/core';

@Component({
  selector: 'app-crear-especie',
  templateUrl: './crear-especie.component.html',
  styleUrl: './crear-especie.component.css'
})
export class CrearEspecieComponent {
  isMenuOpen: boolean = true;

  onMenuToggle(isOpen: boolean) {
    this.isMenuOpen = isOpen;
  }
}
