import { Component, OnInit, Output, EventEmitter } from '@angular/core';
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
  @Output() menuToggled = new EventEmitter<boolean>();
  isMenuOpen: boolean = true;
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

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
    this.menuToggled.emit(this.isMenuOpen);
  }

  closeMenu() {
    this.isMenuOpen = false;
    this.subMenuVisible = null;
    this.menuStateService.closeAllMenus();
  }

  toggleSubMenu(index: number) {
    if (this.isMenuOpen) {
      this.subMenuVisible = this.subMenuVisible === index ? null : index;
    }
  }

  openMenuFromLogo() {
    if (!this.isMenuOpen) {
      this.toggleMenu();
    }
  }
}