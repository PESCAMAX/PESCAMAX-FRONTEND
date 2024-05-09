import { Component } from '@angular/core';

@Component({
  selector: 'app-menu-lateral',
  templateUrl: './menu-lateral.component.html',
  styleUrls: ['./menu-lateral.component.css']
})
export class MenuLateralComponent {
  subMenuVisible: number = -1; // Inicializamos en -1 para indicar que no hay ningún submenú abierto

  constructor() { }

  toggleSubMenu(index: number): void {
    if (this.subMenuVisible === index) {
      // Si el submenú clicado está abierto, lo cerramos
      this.subMenuVisible = -1;
    } else {
      // Si el submenú clicado está cerrado, lo abrimos
      this.subMenuVisible = index;
    }
  }
}
