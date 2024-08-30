import { Component } from '@angular/core';

@Component({
  selector: 'app-tabla-datos',
  templateUrl: './tabla-datos.component.html',
  styleUrl: './tabla-datos.component.css'
})
export class TablaDatosComponent {
  isMenuOpen: boolean = true;

  onMenuToggle(isOpen: boolean) {
    this.isMenuOpen = isOpen;
  }
}
