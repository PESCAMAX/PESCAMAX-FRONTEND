import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CrearEspecieComponent } from './crear-especie/crear-especie.component';
import { ModificarEspecieComponent } from './modificar-especie/modificar-especie.component';
import { SeleccionarEspecieComponent } from './seleccionar-especie/seleccionar-especie.component';

const routes: Routes = [
  { path: 'crear-especie', component: CrearEspecieComponent },
  { path: 'modificar-especie', component: ModificarEspecieComponent },
  { path: 'seleccionar-especie', component: SeleccionarEspecieComponent },
  { path: '', redirectTo: 'seleccionar-especie', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GestionDeParametrosRoutingModule { }
