import { Component } from '@angular/core';
import { MenuStateService } from '../../../../features/monitoreo/services/menu-state/menu-state.service';
import { Router, NavigationStart } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
@Component({
  selector: 'app-menu-lateral',
  templateUrl: './menu-lateral.component.html',
  styleUrls: ['./menu-lateral.component.css']
})

export class MenuLateralComponent {
  subMenuVisible: number | null = null;

  constructor(private menuStateService: MenuStateService, private router: Router) {
    this.subMenuVisible = this.menuStateService.getSubMenuVisible();

    // Suscribirse al evento de navegación
    this.router.events.subscribe(event => {
      if (event instanceof NavigationStart) {
        // No cerrar el submenú al cambiar de dirección
      } else {
        this.subMenuVisible = null;
      }
    });
  }

  toggleSubMenu(index: number): void {
    this.subMenuVisible = this.subMenuVisible === index ? null : index;
    this.menuStateService.setSubMenuVisible(this.subMenuVisible);
  }
}