import { Component, OnInit } from '@angular/core';
import { AlertService } from '../../../../features/monitoreo/services/api-alert/alert.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.css']
})
export class AlertComponent implements OnInit {
  label: string = '';
  type: 'info' | 'danger' | 'warning' = 'warning';
  message: string = '';

    constructor(
    private alertService: AlertService,
    private router: Router // Añade el Router aquí
  ) {}

  ngOnInit(): void {
    this.alertService.getAlert().subscribe(alert => {
      if (alert) {
        this.type = alert.type;
        this.label = alert.label;
        this.message = alert.message;
      }
    });
  }

  get iconPath(): string {
    switch(this.type) {
      case 'danger':
        return 'assets/icons/Logo_pescamax.png';
      case 'warning':
        return 'assets/icons/Logo_pescamax.png';
      case 'info':
      default:
        return 'assets/icons/Logo_pescamax.png';
    }
  }

  onViewMore(): void {
    // Redirigir al historial de alertas
    this.router.navigate(['/historial-alertas']);
  }

  onDismiss(): void {
    this.message = '';
  }
  

  get alertClasses() {
    return {
      info: this.type === 'info',
      danger: this.type === 'danger',
      warning: this.type === 'warning'
    };
  }
}