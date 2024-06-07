import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { GraficaTemperaturaComponent } from './grafica-temperatura/grafica-temperatura.component';
import { GraficaTdsComponent } from './grafica-tds/grafica-tds.component';
import { GraficaPhComponent } from './grafica-ph/grafica-ph.component';
import { TablaDatosComponent } from './tabla-datos/tabla-datos.component';


@NgModule({
  declarations: [
    GraficaTemperaturaComponent,
    GraficaTdsComponent,
    GraficaPhComponent,
    TablaDatosComponent
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule
  ]
})
export class DashboardModule { }
