// src/app/shared/components/organisms/alert/alert.component.ts
import { Component, OnInit } from '@angular/core';
import { AlertService } from './alert.service';

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
      this.type = alert.type;
      this.label = alert.label;
      this.message = alert.message;
    });
  }

  onViewMore(): void {
    // Logic for view more
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
