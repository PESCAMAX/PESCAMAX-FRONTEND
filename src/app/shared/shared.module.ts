import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';



import { ButtonEnviarComponent } from './components/atoms/button-enviar/button-enviar.component';
import { FlechaDespliegueComponent } from './components/atoms/flecha-despliegue/flecha-despliegue.component';
import { TablaEspecieComponent } from './components/molecules/tabla-especie/tabla-especie.component';
import { CardAlertsComponent } from './components/molecules/card-alerts/card-alerts.component';
import { ButtonViewMoreComponent } from './components/atoms/button-view-more/button-view-more.component';
import { ButtonDismissComponent } from './components/atoms/button-dismiss/button-dismiss.component';
import { ButtonContainerComponent } from './components/molecules/button-container/button-container.component';
import { AlertComponent } from './components/organisms/alert/alert.component';
import { MenuLateralComponent } from './components/molecules/menu-lateral/menu-lateral.component';
import { TablaSeleccionarComponent } from './components/molecules/tabla-seleccionar/tabla-seleccionar.component';
import { FormEspecieComponent } from './components/molecules/form-especie/form-especie.component';
import { DatapickerComponent } from './components/molecules/datapicker/datapicker.component';
import { GraficasComponent } from './components/molecules/graficas/graficas.component';
import { ModificarEspecieComponent } from './components/molecules/modificar-especie/modificar-especie.component';

import { PageNotFontComponent } from '../features/monitoreo/pages/home/page-not-font/PageNotFontComponent';

@NgModule({
  declarations: [
    ButtonEnviarComponent,
    FlechaDespliegueComponent,
    TablaEspecieComponent,
    CardAlertsComponent,
    ButtonViewMoreComponent,
    ButtonDismissComponent,
    ButtonContainerComponent,
    AlertComponent,
    MenuLateralComponent,
    TablaSeleccionarComponent,
    TablaSeleccionarComponent,
    FormEspecieComponent,
    DatapickerComponent,
    GraficasComponent,
    ModificarEspecieComponent,
    PageNotFontComponent
  
  ],
  imports: [
    CommonModule
  ],
  exports: [
    ButtonEnviarComponent,
    FlechaDespliegueComponent,
    TablaEspecieComponent,
    CardAlertsComponent,
    AlertComponent,
    MenuLateralComponent,
    TablaSeleccionarComponent,
    FormEspecieComponent,
    DatapickerComponent,
    GraficasComponent,
    ModificarEspecieComponent,
    PageNotFontComponent

  ]
})
export class SharedModule { }