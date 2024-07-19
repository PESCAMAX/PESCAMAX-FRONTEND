import { Component, OnInit } from '@angular/core';
import { MenuStateService } from '../../../../features/monitoreo/services/menu-state/menu-state.service';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-menu-lateral',
  templateUrl: './menu-lateral.component.html',
  styleUrls: ['./menu-lateral.component.css']
})
export class MenuLateralComponent implements OnInit {
  subMenuVisible: number | null = null;

  constructor(private menuStateService: MenuStateService, private router: Router) {}

  ngOnInit() {
    this.subMenuVisible = this.menuStateService.getSubMenuVisible();

    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(() => {
      this.subMenuVisible = this.menuStateService.getSubMenuVisible();
    });
  }

  toggleSubMenu(index: number): void {
    this.subMenuVisible = this.subMenuVisible === index ? null : index;
    this.menuStateService.setSubMenuVisible(this.subMenuVisible);
  }
}