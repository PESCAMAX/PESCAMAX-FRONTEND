import { Component } from '@angular/core';
import { HistorialAlertasComponent } from '../../../../../shared/components/molecules/historial-alertas/historial-alertas.component';

@Component({
  selector: 'app-historial-de-alertas',
  templateUrl: './historial-de-alertas.component.html',
  styleUrl: './historial-de-alertas.component.css'
})
export class HistorialDeAlertasComponent {
  isMenuOpen: boolean = true;

  onMenuToggle(isOpen: boolean) {
    this.isMenuOpen = isOpen;
  }
}
