import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GestionDeParametrosRoutingModule } from './gestion-de-parametros-routing.module';
import { CrearEspecieComponent } from './crear-especie/crear-especie.component';
import { ModificarEspecieComponent } from './modificar-especie/modificar-especie.component';
import { SeleccionarEspecieComponent } from './seleccionar-especie/seleccionar-especie.component';
import { SharedModule } from '../../../../shared/shared.module';
import { ConfiguracionUserComponent } from './configuracion-user/configuracion-user.component';


@NgModule({
  declarations: [
    CrearEspecieComponent,
    ModificarEspecieComponent,
    SeleccionarEspecieComponent,
    ConfiguracionUserComponent
  ],
  imports: [
    CommonModule,
    GestionDeParametrosRoutingModule,
    SharedModule
  ]
})
export class GestionDeParametrosModule { }
