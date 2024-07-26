import { Component } from '@angular/core';

@Component({
  selector: 'app-grafica-tds',
  templateUrl: './grafica-tds.component.html',
  styleUrl: './grafica-tds.component.css'
})
export class GraficaTdsComponent {
  isMenuOpen: boolean = true;

  onMenuToggle(isOpen: boolean) {
    this.isMenuOpen = isOpen;
  }
}
