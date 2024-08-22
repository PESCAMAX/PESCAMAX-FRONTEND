import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { UltimoDatoService } from '../../../services/servicio-alerta/ultimo-dato.service';
import { AuthService } from '../../../../../core/services/api-login/auth.service';

@Component({
  selector: 'app-historial-de-alertas',
  templateUrl: './historial-de-alertas.component.html',
  styleUrls: ['./historial-de-alertas.component.css']  // Corregido "styleUrl" a "styleUrls"
})
export class HistorialDeAlertasComponent implements OnInit, OnDestroy {
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
    this.iniciarMonitoreoAutomatico();
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
