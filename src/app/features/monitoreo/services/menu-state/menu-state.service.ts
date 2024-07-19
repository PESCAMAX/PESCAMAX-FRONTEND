import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MenuStateService {
  private storageKey = 'subMenuVisible';

  getSubMenuVisible(): number | null {
    const storedValue = localStorage.getItem(this.storageKey);
    return storedValue ? JSON.parse(storedValue) : null;
  }

  setSubMenuVisible(index: number | null): void {
    if (index === null) {
      localStorage.removeItem(this.storageKey);
    } else {
      localStorage.setItem(this.storageKey, JSON.stringify(index));
    }
  }
}