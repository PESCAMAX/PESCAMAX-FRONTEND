import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MenuStateService {
  private mainMenuKey = 'mainMenuOpen';
  private subMenuKey = 'subMenuVisible';

  getMainMenuOpen(): boolean {
    return JSON.parse(localStorage.getItem(this.mainMenuKey) || 'false');
  }

  setMainMenuOpen(isOpen: boolean): void {
    localStorage.setItem(this.mainMenuKey, JSON.stringify(isOpen));
  }

  getSubMenuVisible(): number | null {
    const storedValue = localStorage.getItem(this.subMenuKey);
    return storedValue ? JSON.parse(storedValue) : null;
  }

  setSubMenuVisible(index: number | null): void {
    if (index === null) {
      localStorage.removeItem(this.subMenuKey);
    } else {
      localStorage.setItem(this.subMenuKey, JSON.stringify(index));
    }
  }

  closeAllMenus(): void {
    this.setMainMenuOpen(false);
    this.setSubMenuVisible(null);
  }
}