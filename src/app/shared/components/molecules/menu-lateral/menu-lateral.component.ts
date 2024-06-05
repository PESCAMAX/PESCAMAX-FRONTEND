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
    this.subMenuVisible = this.subMenuVisible === index ? null : index;
  }
}