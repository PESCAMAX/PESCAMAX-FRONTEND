import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GraficaTemperaturaComponent } from './grafica-temperatura/grafica-temperatura.component';
import { GraficaPhComponent } from './grafica-ph/grafica-ph.component';
import { GraficaTdsComponent } from './grafica-tds/grafica-tds.component';
import { TablaDatosComponent } from '../gestion-de-parametros/tabla-datos/tabla-datos.component';

const routes: Routes = [
  { path: 'grafica-temperatura', component: GraficaTemperaturaComponent },
  { path: 'grafica-ph', component: GraficaPhComponent },
  { path: 'grafica-tds', component: GraficaTdsComponent },
  { path: 'tabla-datos', component: TablaDatosComponent },
  { path: '', redirectTo: 'grafica-temperatura', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
