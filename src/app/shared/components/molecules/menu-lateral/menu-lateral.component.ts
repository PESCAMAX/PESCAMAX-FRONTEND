import { Component } from '@angular/core';

@Component({
  selector: 'app-menu-lateral',
  templateUrl: './menu-lateral.component.html',
  styleUrl: './menu-lateral.component.css'
})
export class MenuLateralComponent {
  subMenuVisible: number | null = null; // Inicializamos en null para indicar que no hay ningún submenú abierto

  constructor() { }

  toggleSubMenu(index: number): void {
    if (this.subMenuVisible === index) {
      // Si el submenú clicado está abierto, lo cerramos
      this.subMenuVisible = null;
    } else {
      // Si el submenú clicado está cerrado, lo abrimos
      this.subMenuVisible = index;
    }
  }
}
