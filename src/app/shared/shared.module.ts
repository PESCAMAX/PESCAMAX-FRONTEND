import { NgModule } from '@angular/core';
import { ButtonEnviarComponent } from './components/atoms/button-enviar/button-enviar.component';
import { FlechaDespliegueComponent } from './components/atoms/flecha-despliegue/flecha-despliegue.component';
import { TablaEspecieComponent } from './components/molecules/tabla-especie/tabla-especie.component';
import { CardAlertsComponent } from './components/molecules/card-alerts/card-alerts.component';

@NgModule({
  declarations: [
    ButtonEnviarComponent,
    FlechaDespliegueComponent,
    TablaEspecieComponent,
    CardAlertsComponent
  ],
  exports: [
    ButtonEnviarComponent,
    FlechaDespliegueComponent,
    TablaEspecieComponent,
    CardAlertsComponent
  ]
})
export class SharedModule { }