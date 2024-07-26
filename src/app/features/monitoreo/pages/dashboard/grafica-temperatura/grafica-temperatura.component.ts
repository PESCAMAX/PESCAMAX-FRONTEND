import { Component } from '@angular/core';

@Component({
  selector: 'app-grafica-temperatura',
  templateUrl: './grafica-temperatura.component.html',
  styleUrl: './grafica-temperatura.component.css'
})
export class GraficaTemperaturaComponent {
  isMenuOpen: boolean = true;

  onMenuToggle(isOpen: boolean) {
    this.isMenuOpen = isOpen;
  }
}
