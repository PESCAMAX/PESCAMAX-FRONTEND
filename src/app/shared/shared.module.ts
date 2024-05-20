import { NgModule } from '@angular/core';
import { ButtonEnviarComponent } from './components/atoms/button-enviar/button-enviar.component';

@NgModule({
  declarations: [
    ButtonEnviarComponent
  ],
  exports: [
    ButtonEnviarComponent
  ]
})
export class SharedModule { }