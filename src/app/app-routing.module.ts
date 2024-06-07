import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TablaEspecieComponent } from './shared/components/molecules/tabla-especie/tabla-especie.component';
import { SeleccionarEspecieComponent } from './features/monitoreo/pages/gestion-de-parametros/seleccionar-especie/seleccionar-especie.component';
import { CrearEspecieComponent } from './features/monitoreo/pages/gestion-de-parametros/crear-especie/crear-especie.component';
import { ModificarEspecieComponent } from './features/monitoreo/pages/gestion-de-parametros/modificar-especie/modificar-especie.component';

const routes: Routes = [
  {
    path: 'gestion-de-parametros',
    loadChildren: () => import('./features/monitoreo/pages/gestion-de-parametros/gestion-de-parametros.module').then(m => m.GestionDeParametrosModule)
  },
  {
    path: 'crear-especie',
    component: CrearEspecieComponent
  },
  {
    path: 'modificar-especie',
    component: ModificarEspecieComponent
  },
  {
    path: 'seleccionar-especie',
    component: SeleccionarEspecieComponent
  },
  {
    path: '',
    redirectTo: 'Tabla',
    pathMatch: 'full'
  },
  {
    path: '**',
    redirectTo: 'Tabla',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
