import { Component, OnInit, OnDestroy } from '@angular/core';
import { AlertService } from '../../../../features/monitoreo/services/api-alert/alert.service';
import { Router, NavigationStart } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.css']
})
export class AlertComponent implements OnInit, OnDestroy {
  label: string = '';
  type: 'info' | 'danger' | 'warning' = 'warning';
  message: string = '';
  private alertSubscription!: Subscription;
  private routerSubscription!:Subscription; 

  constructor(
    private alertService: AlertService,
    private router: Router,
    
  
  ) {}

  ngOnInit(): void {
    this.alertSubscription = this.alertService.getAlert().subscribe(alert => {
      if (alert) {
        this.type = alert.type;
        this.label = alert.label;
        this.message = alert.message;
      } else {
        this.message = '';
      }
    });

    // Suscribirse a los eventos de navegación
    this.routerSubscription = this.router.events.subscribe(event => {
      if (event instanceof NavigationStart) {
        // Cerrar la alerta al iniciar la navegación
        this.clearAlert();
      }
    });
  }

  ngOnDestroy(): void {
    if (this.alertSubscription) {
      this.alertSubscription.unsubscribe();
    }
    if (this.routerSubscription) {
      this.routerSubscription.unsubscribe();
    }
  }

  get iconPath(): string {
    switch(this.type) {
      case 'danger':
        return 'assets/icons/Logo_pescamax.png';
      case 'warning':
        return 'assets/icons/Logo_pescamax.png';
      case 'info':
      default:
        return 'assets/icons/Logo_pescamax.png';
    }
  }

  onViewMore(): void {
    this.router.navigate(['/historial-alertas']);
    this.clearAlert();
  }

  onDismiss(): void {
    this.clearAlert();
  }

  clearAlert(): void {
    this.message = '';
    this.alertService.clearAlert();
  }

  get alertClasses() {
    return {
      info: this.type === 'info',
      danger: this.type === 'danger',
      warning: this.type === 'warning'
    };
  }
}