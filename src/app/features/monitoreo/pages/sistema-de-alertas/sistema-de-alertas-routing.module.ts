import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HistorialDeAlertasComponent } from './historial-de-alertas/historial-de-alertas.component';
import { AlertasRecientesComponent } from './alertas-recientes/alertas-recientes.component';

const routes: Routes = [
  { path: 'alertas-recientes', component: AlertasRecientesComponent },
  { path: 'historial-alerta', component: HistorialDeAlertasComponent },
  { path: '', redirectTo: 'alertas-recientes', pathMatch: 'full' } // Ruta por defecto
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SistemaDeAlertasRoutingModule { }
