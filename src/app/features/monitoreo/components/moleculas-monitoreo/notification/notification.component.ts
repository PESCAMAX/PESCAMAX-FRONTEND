import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { GlobalAlertService} from '../../../services/alerta-global/global-alert.service';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrl: './notification.component.css'
})
export class NotificationComponent implements OnInit, OnDestroy {
  notifications: {message: string, time: Date}[] = [];
  unreadCount = 0;
  showNotifications = false;
  private subscription!: Subscription;

  constructor(private globalAlertService: GlobalAlertService) {}

  ngOnInit() {
    this.subscription = this.globalAlertService.alert$.subscribe(message => {
      if (message) {
        this.notifications.unshift({message, time: new Date()});
        this.unreadCount++;
      }
    });
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  toggleNotifications() {
    this.showNotifications = !this.showNotifications;
    if (this.showNotifications) {
      this.unreadCount = 0;
    }
  }
}