import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CardAlertsComponent } from '../../shared/components/molecules/card-alerts/card-alerts.component';
import { TablaEspecieComponent } from '../../shared/components/molecules/tabla-especie/tabla-especie.component';
const routes: Routes = [
  {
    path: 'cards',
    component: CardAlertsComponent
  },
  {
    path: 'tabla',
    component: TablaEspecieComponent
  },
  {
    path: 'tds',
    component: TablaEspecieComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }


