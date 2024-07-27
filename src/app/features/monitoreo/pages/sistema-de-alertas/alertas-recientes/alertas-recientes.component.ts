import { Component } from '@angular/core';

@Component({
  selector: 'app-alertas-recientes',
  templateUrl: './alertas-recientes.component.html',
  styleUrl: './alertas-recientes.component.css'
})
export class AlertasRecientesComponent {
  isMenuOpen: boolean = true;

  onMenuToggle(isOpen: boolean) {
    this.isMenuOpen = isOpen;
  }
}
