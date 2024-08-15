import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CrearEspecieComponent } from './crear-especie/crear-especie.component';
import { ModificarEspecieComponent } from './modificar-especie/modificar-especie.component';
import { SeleccionarEspecieComponent } from './seleccionar-especie/seleccionar-especie.component';
import { ConfiguracionUserComponent } from './configuracion-user/configuracion-user.component';

const routes: Routes = [
  { path: 'crear-especie/:userId', component: CrearEspecieComponent },
  { path: 'modificar-especie/:userId', component: ModificarEspecieComponent },
  { path: 'seleccionar-especie/:userId', component: SeleccionarEspecieComponent },
  { path: '', redirectTo: 'seleccionar-especie', pathMatch: 'full' },
  { path: 'user-config/:userId', component: ConfiguracionUserComponent },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GestionDeParametrosRoutingModule { }
