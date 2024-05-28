import { NgModule } from '@angular/core';
import { ButtonEnviarComponent } from './components/atoms/button-enviar/button-enviar.component';
import { FlechaDespliegueComponent } from './components/atoms/flecha-despliegue/flecha-despliegue.component';

@NgModule({
  declarations: [
    ButtonEnviarComponent,
    FlechaDespliegueComponent
  ],
  exports: [
    ButtonEnviarComponent,
    FlechaDespliegueComponent
  ]
})
export class SharedModule { }