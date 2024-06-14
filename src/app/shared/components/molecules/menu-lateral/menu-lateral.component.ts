import { Component } from '@angular/core';
import { MenuStateService } from '../../../../features/monitoreo/services/menu-state/menu-state.service';

@Component({
  selector: 'app-menu-lateral',
  templateUrl: './menu-lateral.component.html',
  styleUrls: ['./menu-lateral.component.css']
})
export class MenuLateralComponent {
  subMenuVisible: number | null = null;

  constructor(private menuStateService: MenuStateService) {
    this.subMenuVisible = this.menuStateService.getSubMenuVisible();
  }
  
  toggleSubMenu(index: number): void {
    this.subMenuVisible = this.subMenuVisible === index ? null : index;
    this.menuStateService.setSubMenuVisible(this.subMenuVisible);
  }
  
}
