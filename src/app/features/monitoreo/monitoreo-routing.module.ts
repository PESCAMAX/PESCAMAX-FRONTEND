import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CardAlertsComponent } from '../../shared/components/molecules/card-alerts/card-alerts.component';
import { TablaEspecieComponent } from '../../shared/components/molecules/tabla-especie/tabla-especie.component';
import { CrearEspecieComponent } from './pages/gestion-de-parametros/crear-especie/crear-especie.component';
import { ModificarEspecieComponent } from './pages/gestion-de-parametros/modificar-especie/modificar-especie.component';
import { SeleccionarEspecieComponent } from './pages/gestion-de-parametros/seleccionar-especie/seleccionar-especie.component';
const routes: Routes = [
  // {
  //   path: 'cards',
  //   component: CardAlertsComponent
  // },
  // {
  //   path: 'tabla',
  //   component: TablaEspecieComponent
  // },
  // {
  //   path: 'tds',
  //   component: SeleccionarEspecieComponent
  // },
  // { 
  //   path: 'crear-especie',
  //   component: CrearEspecieComponent
  // },
  // {
  //   path: 'modificar-especie', 
  //   component: ModificarEspecieComponent
  // },
  // { 
  //   path: 'seleccionar-especie', 
  //   component: SeleccionarEspecieComponent 
  // }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }


