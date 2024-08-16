import { Component, HostListener } from '@angular/core';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent {
  isMenuVisible: boolean = false;

  toggleMenu(): void {
    this.isMenuVisible = !this.isMenuVisible;
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
