// menu-lateral.component.ts
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
  isMenuOpen: boolean = false;
  subMenuVisible: number | null = null;
  userId: string = '';

  constructor(
    private menuStateService: MenuStateService,
    private router: Router,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.userId = localStorage.getItem('userId') || '';

    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(() => {
      this.closeMenu();
    });
  }

  toggleMenu(): void {
    this.isMenuOpen = !this.isMenuOpen;
    if (!this.isMenuOpen) {
      this.closeMenu();
    }
  }

  closeMenu(): void {
    this.isMenuOpen = false;
    this.subMenuVisible = null;
    this.menuStateService.closeAllMenus();
  }

  toggleSubMenu(index: number): void {
    if (this.isMenuOpen) {
      this.subMenuVisible = this.subMenuVisible === index ? null : index;
    }
  }
}