import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonEnviarComponent } from './components/atoms/button-enviar/button-enviar.component';
import { FlechaDespliegueComponent } from './components/atoms/flecha-despliegue/flecha-despliegue.component';
import { AlertComponent } from './components/organisms/alert/alert.component';
import { ButtonContainerComponent } from './components/molecules/button-container/button-container.component';
import { ButtonViewMoreComponent } from './components/atoms/button-view-more/button-view-more.component';
import { ButtonDismissComponent } from './components/atoms/button-dismiss/button-dismiss.component';

@NgModule({
  declarations: [
    ButtonEnviarComponent,
    FlechaDespliegueComponent,
    AlertComponent,
    ButtonContainerComponent,
    ButtonViewMoreComponent,
    ButtonDismissComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    ButtonEnviarComponent,
    FlechaDespliegueComponent,
    ButtonViewMoreComponent,
    ButtonDismissComponent,
    ButtonContainerComponent,
    AlertComponent
  ]
})
export class SharedModule { }