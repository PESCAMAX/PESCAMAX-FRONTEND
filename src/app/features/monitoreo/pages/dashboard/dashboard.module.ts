import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { SharedModule } from '../../../../shared/shared.module';
import { GraficaTemperaturaComponent } from './grafica-temperatura/grafica-temperatura.component';
import { GraficaPhComponent } from './grafica-ph/grafica-ph.component';
import { GraficaTdsComponent } from './grafica-tds/grafica-tds.component';
import { TablaDatosComponent } from '../gestion-de-parametros/tabla-datos/tabla-datos.component';
import { GraficaGeneralComponent } from './grafica-general/grafica-general.component';
import { CardsInfoComponent } from '../../components/atomos-monitoreo/cards-info/cards-info.component';
@NgModule({
  declarations: [
    GraficaTemperaturaComponent,
    GraficaTdsComponent,
    GraficaPhComponent,
    TablaDatosComponent,
    GraficaGeneralComponent,
    CardsInfoComponent
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    SharedModule
  ],
  exports: [
    GraficaTemperaturaComponent,
    GraficaTdsComponent,
    GraficaPhComponent,
    TablaDatosComponent,
    CardsInfoComponent
  ]
})
export class DashboardModule { }