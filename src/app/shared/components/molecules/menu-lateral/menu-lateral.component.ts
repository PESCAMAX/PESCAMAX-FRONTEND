import { Component, OnInit } from '@angular/core';
import { MenuStateService } from '../../../../features/monitoreo/services/menu-state/menu-state.service';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';
import { AuthService } from '../../../../features/monitoreo/services/api-login/auth.service';

@Component({
  selector: 'app-menu-lateral',
  templateUrl: './menu-lateral.component.html',
  styleUrls: ['./menu-lateral.component.css']
})
export class MenuLateralComponent implements OnInit {
  subMenuVisible: number | null = null;
  userId: string = ''; // Inicializa con un string vacío

  constructor(
    private menuStateService: MenuStateService,
    private router: Router,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.subMenuVisible = this.menuStateService.getSubMenuVisible();
    const storedUserId = localStorage.getItem('userId');
    this.userId = storedUserId ? storedUserId : ''; // Asigna un string vacío si es null

    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(() => {
      this.subMenuVisible = this.menuStateService.getSubMenuVisible();
    });
  }

  toggleSubMenu(index: number): void {
    this.subMenuVisible = this.subMenuVisible === index ? null : index;
    this.menuStateService.setSubMenuVisible(this.subMenuVisible);
  }
}