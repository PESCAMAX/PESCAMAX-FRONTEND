import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { GlobalAlertService } from '../../../services/alerta-global/global-alert.service';

@Component({
  selector: 'app-global-alerta',
  templateUrl: './global-alerta.component.html',
  styleUrls: ['./global-alerta.component.css']
})
export class GlobalAlertaComponent implements OnInit, OnDestroy {
  alertMessage: string | null = null;
  private alertSubscription: Subscription | undefined;

  constructor(private globalAlertService: GlobalAlertService) {}

  ngOnInit() {
    this.subscribeToAlerts();
  }

  ngOnDestroy() {
    if (this.alertSubscription) {
      this.alertSubscription.unsubscribe();
    }
  }

  private subscribeToAlerts() {
    this.alertSubscription = this.globalAlertService.alert$.subscribe(
      message => {
        this.alertMessage = message;
      },
      error => {
        console.error('Error al suscribirse a las alertas:', error);
      }
    );
  }
}
