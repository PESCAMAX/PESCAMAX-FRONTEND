import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-pagina-clima',
  templateUrl: './pagina-clima.component.html',
  styleUrl: './pagina-clima.component.css'
})
export class PaginaClimaComponent {
  isMenuOpen: boolean = false;

  constructor() {}

  ngOnInit(): void {
    // TODO
    
  }
  onMenuToggle(isOpen: boolean) {
    this.isMenuOpen = isOpen;
  }

}
