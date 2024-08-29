import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { GlobalAlertService } from '../../../services/alerta-global/global-alert.service';

interface Notification {
  message: string;
  time: Date;
}

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.css']
})
export class NotificationComponent implements OnInit, OnDestroy {
  notifications: Notification[] = [];
  unreadCount = 0;
  showNotifications = false;
  private subscription!: Subscription;

  constructor(private globalAlertService: GlobalAlertService) {}

  ngOnInit() {
    this.loadNotifications();
    this.subscription = this.globalAlertService.alert$.subscribe(message => {
      if (message) {
        this.addNotification(message);
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
      this.saveNotifications();
    }
  }

  private addNotification(message: string) {
    const newNotification: Notification = { message, time: new Date() };
    this.notifications.unshift(newNotification);
    this.unreadCount++;
    this.saveNotifications();
  }

  private loadNotifications() {
    const storedNotifications = localStorage.getItem('notifications');
    const storedUnreadCount = localStorage.getItem('unreadCount');
    if (storedNotifications) {
      this.notifications = JSON.parse(storedNotifications);
    }
    if (storedUnreadCount) {
      this.unreadCount = parseInt(storedUnreadCount, 10);
    }
  }

  private saveNotifications() {
    localStorage.setItem('notifications', JSON.stringify(this.notifications));
    localStorage.setItem('unreadCount', this.unreadCount.toString());
  }

  clearNotifications() {
    this.notifications = [];
    this.unreadCount = 0;
    this.saveNotifications();
  }
}