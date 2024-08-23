import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-configuracion-user',
  templateUrl: './configuracion-user.component.html',
  styleUrls: ['./configuracion-user.component.css']
})
export class ConfiguracionUserComponent implements OnInit {
  userId!: string;
  isMenuOpen: boolean = true;

  constructor(private route: ActivatedRoute) {}
  
  onMenuToggle(isOpen: boolean) {
    this.isMenuOpen = isOpen;
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.userId = params.get('userId') || '';
    });
  }
}