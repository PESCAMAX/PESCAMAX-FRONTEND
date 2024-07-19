import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MenuStateService {
  [x: string]: any;
  private subMenuVisible: number | null = null;

  constructor() { }

  getSubMenuVisible(): number | null {
    return this.subMenuVisible;
  }

  setSubMenuVisible(index: number | null): void {
    this.subMenuVisible = index;
  }
}