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

  constructor(private alertService: AlertService) {}

  ngOnInit(): void {
    this.alertService.getAlert().subscribe(alert => {
      if (alert) {
        this.type = alert.type;
        this.label = alert.label;
        this.message = alert.message;
      }
    });
  }


  onViewMore(): void {
    // Redirigir al historial de alertas

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
