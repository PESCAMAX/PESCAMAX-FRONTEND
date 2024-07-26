import { Component } from '@angular/core';

@Component({
  selector: 'app-modificar-especie',
  templateUrl: './modificar-especie.component.html',
  styleUrl: './modificar-especie.component.css'
})
export class ModificarEspecieComponent {
  isMenuOpen: boolean = true;

  onMenuToggle(isOpen: boolean) {
    this.isMenuOpen = isOpen;
  }
}
