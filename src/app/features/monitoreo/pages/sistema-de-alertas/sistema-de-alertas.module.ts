import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../../../shared/shared.module';
import { SistemaDeAlertasRoutingModule } from './sistema-de-alertas-routing.module';
import { AlertasRecientesComponent } from './alertas-recientes/alertas-recientes.component';
import { HistorialDeAlertasComponent } from './historial-de-alertas/historial-de-alertas.component';

@NgModule({
  declarations: [
    AlertasRecientesComponent,
    HistorialDeAlertasComponent
  ],
  imports: [
    CommonModule,
    SistemaDeAlertasRoutingModule,
    SharedModule
  ]
})
export class SistemaDeAlertasModule { }
