import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InicioComponent } from './pages/inicio/inicio.component';
import { ButtonGuardarComponent } from './components/atomos-monitoreo/button-guardar/button-guardar.component';
import { ButtonEliminarComponent } from './components/atomos-monitoreo/button-eliminar/button-eliminar.component';
import { ButtonCancelarComponent } from './components/atomos-monitoreo/button-cancelar/button-cancelar.component';



@NgModule({
  declarations: [

  
    InicioComponent,
          ButtonGuardarComponent,
          ButtonEliminarComponent,
          ButtonCancelarComponent
  ],
  imports: [
    CommonModule,
  
  ]
})
export class MonitoreoModule { }
