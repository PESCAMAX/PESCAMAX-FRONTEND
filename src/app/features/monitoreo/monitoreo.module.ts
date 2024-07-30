import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InicioComponent } from './pages/inicio/inicio.component';
import { ButtonGuardarComponent } from './components/atomos-monitoreo/button-guardar/button-guardar.component';



@NgModule({
  declarations: [

  
    InicioComponent,
          ButtonGuardarComponent
  ],
  imports: [
    CommonModule,
  
  ]
})
export class MonitoreoModule { }
