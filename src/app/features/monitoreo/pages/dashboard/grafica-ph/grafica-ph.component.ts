// grafica-ph.component.ts
import { Component, OnInit } from '@angular/core';
import * as pbi from 'powerbi-client';

@Component({
  selector: 'app-grafica-ph',
  templateUrl: './grafica-ph.component.html',
  styleUrls: ['./grafica-ph.component.css']
})
export class GraficaPhComponent {
  isMenuOpen: boolean = true;

  onMenuToggle(isOpen: boolean) {
    this.isMenuOpen = isOpen;
  }

}