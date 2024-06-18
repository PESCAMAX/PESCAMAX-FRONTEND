import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TablaEspecieComponent } from './shared/components/molecules/tabla-especie/tabla-especie.component';
import { SeleccionarEspecieComponent } from './features/monitoreo/pages/gestion-de-parametros/seleccionar-especie/seleccionar-especie.component';
import { CrearEspecieComponent } from './features/monitoreo/pages/gestion-de-parametros/crear-especie/crear-especie.component';
import { ModificarEspecieComponent } from './features/monitoreo/pages/gestion-de-parametros/modificar-especie/modificar-especie.component';
import { GraficaTemperaturaComponent } from './features/monitoreo/pages/dashboard/grafica-temperatura/grafica-temperatura.component';
import { GraficaTdsComponent } from './features/monitoreo/pages/dashboard/grafica-tds/grafica-tds.component';
import { GraficaPhComponent } from './features/monitoreo/pages/dashboard/grafica-ph/grafica-ph.component';
import { TablaDatosComponent } from './features/monitoreo/pages/dashboard/tabla-datos/tabla-datos.component';


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
    path: 'grafica-temperatura',
    component: GraficaTemperaturaComponent

  },
  
  {
    path: 'grafica-tds',
    component: GraficaTdsComponent

  },
  {
    path: 'grafica-ph',
    component: GraficaPhComponent

  },
  {
    path: 'tabla-datos',
    component: TablaEspecieComponent

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
