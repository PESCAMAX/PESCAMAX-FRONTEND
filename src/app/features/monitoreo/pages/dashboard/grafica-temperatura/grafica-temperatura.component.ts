import { Component } from '@angular/core';
import { Subscription } from 'rxjs';
import { UltimoDatoService } from '../../../services/servicio-alerta/ultimo-dato.service';
import { AuthService } from '../../../../../core/services/api-login/auth.service';

@Component({
  selector: 'app-grafica-temperatura',
  templateUrl: './grafica-temperatura.component.html',
  styleUrl: './grafica-temperatura.component.css'
})
export class GraficaTemperaturaComponent {
  isMenuOpen: boolean = true;
  private monitoreoSubscription: Subscription | undefined;
  private userId: string;

  constructor(
    private ultimoDatoService: UltimoDatoService,
    private authService: AuthService
  ) {
    this.userId = this.authService.getUserId();
  }

  ngOnInit() {
    this.iniciarMonitoreoAutomatico();//falta
  }

  ngOnDestroy() {
    if (this.monitoreoSubscription) {
      this.monitoreoSubscription.unsubscribe();
    }
  }

  onMenuToggle(isOpen: boolean) {
    this.isMenuOpen = isOpen;
  }

  iniciarMonitoreoAutomatico() {
    this.monitoreoSubscription = this.ultimoDatoService.iniciarMonitoreo(this.userId).subscribe();
  }
}
