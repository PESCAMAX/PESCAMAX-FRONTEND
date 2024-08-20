import { Component, OnInit } from '@angular/core';
import { GlobalAlertService } from '../../../services/alerta-global/global-alert.service';

@Component({
  selector: 'app-global-alert',
  templateUrl: './global-alert.component.html',
  styleUrls: ['./global-alert.component.css']
})
export class GlobalAlertComponent implements OnInit {
  alertMessage: any;

  constructor(private globalAlertService: GlobalAlertService) {}

  ngOnInit(): void {
    this.globalAlertService.alert$.subscribe(alert => {
      this.alertMessage = alert;
    });
  }

  closeAlert(): void {
    this.globalAlertService.clearAlert();
  }
}
