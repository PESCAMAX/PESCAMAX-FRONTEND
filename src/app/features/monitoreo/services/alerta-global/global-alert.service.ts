import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { AlertService } from '../api-alert/alert.service';

@Injectable({
  providedIn: 'root'
})
export class GlobalAlertService {
  getUnreadCount(): number {
    throw new Error('Method not implemented.');
  }
  getStoredNotifications(): { message: string; time: Date; }[] {
    throw new Error('Method not implemented.');
  }
  setUnreadCount(unreadCount: number) {
    throw new Error('Method not implemented.');
  }
  storeNotification(newNotification: { message: string; time: Date; }) {
    throw new Error('Method not implemented.');
  }
  private alertSubject = new BehaviorSubject<string | null>(null);
  alert$ = this.alertSubject.asObservable();

  private lastAlertTime: { [key: string]: number } = {};
alertMessage: any;

  constructor(private alertService: AlertService) {}

  showAlert(type: 'info' | 'danger' | 'warning', title: string, message: string): void {
    const key = `${type}:${title}:${message}`;
    const now = Date.now();

    // Comprueba si ha pasado al menos un minuto desde la última alerta con el mismo contenido
    if (!this.lastAlertTime[key] || now - this.lastAlertTime[key] >= 60000) {
      this.alertService.showAlert(type, title, message);
      this.alertSubject.next(message);
      this.lastAlertTime[key] = now;
    }
  }

  clearAlert(): void {
    this.alertSubject.next(null);
  }
}
