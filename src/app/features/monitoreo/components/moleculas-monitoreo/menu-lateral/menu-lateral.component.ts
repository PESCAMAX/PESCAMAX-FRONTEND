import { Component, OnInit, Output, EventEmitter, HostListener } from '@angular/core';
import { MenuStateService } from '../../../services/menu-state/menu-state.service';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';
import { AuthService } from '../../../../../core/services/api-login/auth.service';

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
  isUserMenuVisible: boolean = false;

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

  openMenu() {
    if (!this.isMenuOpen) {
      this.isMenuOpen = true;
      this.menuToggled.emit(this.isMenuOpen);
    }
  }

  closeMenu() {
    this.isMenuOpen = false;
    this.subMenuVisible = null;
    this.menuStateService.closeAllMenus();
  }

  toggleSubMenu(index: number) {
    this.openMenu(); // Asegúrate de que el menú esté abierto
    this.subMenuVisible = this.subMenuVisible === index ? null : index;
  }

  toggleUserMenu() {
    this.isUserMenuVisible = !this.isUserMenuVisible;
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent) {
    const userIcon = document.querySelector('img[alt="Perfil"]');
    const dropdownMenu = document.querySelector('.absolute.right-4.top-16');
    if (userIcon && dropdownMenu &&
        !userIcon.contains(event.target as Node) &&
        !dropdownMenu.contains(event.target as Node)) {
      this.isUserMenuVisible = false;
    }
  }
}