import { Component, HostListener } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../../core/services/api-login/auth.service';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent {
  isMenuVisible: boolean = false;
  userId: string; // Declare userId

  constructor(
    private authService: AuthService,
    private router: Router,  ) {
    this.userId = this.authService.getUserId(); // Retrieve the userId
  }

  toggleMenu(): void {
    this.isMenuVisible = !this.isMenuVisible;
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/user-config']);
  }

  @HostListener('document:click', ['$event'])
  onClick(event: Event): void {
    const target = event.target as HTMLElement;
    const userIcon = document.querySelector('.user-icon');
    const dropdownMenu = document.querySelector('.dropdown-menu');

    if (userIcon && dropdownMenu && !userIcon.contains(target) && !dropdownMenu.contains(target)) {
      this.isMenuVisible = false;
    }
  }
}
