import { Component, Input } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Router, NavigationStart } from '@angular/router';
@Component({
  selector: 'app-alert-form',
  templateUrl: './alert-form.component.html',
  styleUrls: ['./alert-form.component.css']
})
export class AlertFormComponent {
  @Input() successMessage: string = '';
  @Input() errorMessage: string = '';
}
export class AlertService {
  private alertSubject = new BehaviorSubject<any>(null);

  constructor(private router: Router) {
    // Suscribirse a los eventos de navegación
    this.router.events.subscribe(event => {
      if (event instanceof NavigationStart) {
        // Cerrar la alerta al iniciar la navegación
        this.clearAlert();
      }
    });
  }

  getAlert() {
    return this.alertSubject.asObservable();
  }

  setAlert(type: string, label: string, message: string) {
    this.alertSubject.next({ type, label, message });
  }

  clearAlert() {
    this.alertSubject.next(null);
  }
}