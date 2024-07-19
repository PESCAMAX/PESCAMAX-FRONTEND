import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AlertService {
  private alertSubject = new BehaviorSubject<AlertMessage | null>(null);

  showAlert(type: 'info' | 'danger' | 'warning', label: string, message: string): void {
    this.alertSubject.next({ type, label, message });
  }

  getAlert(): Observable<AlertMessage | null> {
    return this.alertSubject.asObservable();
  }

  clearAlert(): void {
    this.alertSubject.next(null);
  }
}

interface AlertMessage {
  type: 'info' | 'danger' | 'warning';
  label: string;
  message: string;
}