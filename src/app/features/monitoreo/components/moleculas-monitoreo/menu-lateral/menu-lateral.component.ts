import { Component, OnInit, Output, EventEmitter, HostListener, Renderer2 } from '@angular/core';
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
  isMobileView: boolean = false;

  constructor(
    private menuStateService: MenuStateService,
    private router: Router,
    private authService: AuthService,
    private renderer: Renderer2
  ) {}

  ngOnInit() {
    this.userId = localStorage.getItem('userId') || '';
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(() => {
      this.checkWindowWidth();
    });
    this.checkWindowWidth();
    this.adjustContentWrapper();
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.checkWindowWidth();
  }

  checkWindowWidth() {
    this.isMobileView = window.innerWidth <= 720;
    if (this.isMobileView) {
      this.isMenuOpen = false;
    } else if (window.innerWidth <= 915) {
      this.isMenuOpen = false;
    } else {
      this.isMenuOpen = true;
    }
    this.menuToggled.emit(this.isMenuOpen);
    this.adjustContentWrapper();
  }

  adjustContentWrapper() {
    const contentWrapper = document.querySelector('.content-wrapper') as HTMLElement;
    if (contentWrapper) {
      if (this.isMenuOpen && !this.isMobileView) {
        contentWrapper.style.marginLeft = '250px';
      } else {
        contentWrapper.style.marginLeft = '0';
      }
    }
  }
  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
    this.menuToggled.emit(this.isMenuOpen);
    this.adjustContentWrapper();
    
    if (this.isMobileView) {
      this.isMenuOpen ? this.disableMainContent() : this.enableMainContent();
    }
  }
  

  openMenu() {
    if (!this.isMenuOpen) {
      this.isMenuOpen = true;
      this.menuToggled.emit(this.isMenuOpen);
      this.adjustContentWrapper();
      if (this.isMobileView) {
        this.disableMainContent();
      }
    }
  }

  closeMenu() {
    if (this.isMenuOpen) {
      this.isMenuOpen = false;
      this.subMenuVisible = null;
      this.menuStateService.closeAllMenus();
      this.adjustContentWrapper();
      if (this.isMobileView) {
        this.enableMainContent();
      }
    }
  }

  toggleSubMenu(index: number) {
    if (!this.isMenuOpen) {
      this.openMenu();
    }
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

  disableMainContent() {
    this.renderer.addClass(document.body, 'menu-open');
  }

  enableMainContent() {
    this.renderer.removeClass(document.body, 'menu-open');
  }
}