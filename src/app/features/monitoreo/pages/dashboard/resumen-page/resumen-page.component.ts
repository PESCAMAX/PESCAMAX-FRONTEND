import { Component } from '@angular/core';

@Component({
  selector: 'app-resumen-page',
  templateUrl: './resumen-page.component.html',
  styleUrl: './resumen-page.component.css'
})
export class ResumenPageComponent {
  isMenuOpen: boolean = true;
  onMenuToggle(isOpen: boolean) {
    this.isMenuOpen = isOpen;}
}
