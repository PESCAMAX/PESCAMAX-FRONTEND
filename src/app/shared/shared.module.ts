import { NgModule } from '@angular/core';
import { ButtonEnviarComponent } from './components/atoms/button-enviar/button-enviar.component';
import { FlechaDespliegueComponent } from './components/atoms/flecha-despliegue/flecha-despliegue.component';
import { TablaEspecieComponent } from './components/molecules/tabla-especie/tabla-especie.component';

@NgModule({
  declarations: [
    ButtonEnviarComponent,
    FlechaDespliegueComponent,
    TablaEspecieComponent
  ],
  exports: [
    ButtonEnviarComponent,
    FlechaDespliegueComponent,
    TablaEspecieComponent
  ]
})
export class SharedModule { }