// src/app/shared/components/organisms/alert/alert.service.ts
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AlertService {
  private alertSubject = new Subject<any>();

  getAlert() {
    return this.alertSubject.asObservable();
  }

  showAlert(type: 'info' | 'danger' | 'warning', label: string, message: string) {
    this.alertSubject.next({ type, label, message });
  }
}
