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
import { AlertasRecientesComponent } from './features/monitoreo/pages/sistema-de-alertas/alertas-recientes/alertas-recientes.component';
import { HistorialDeAlertasComponent } from './features/monitoreo/pages/sistema-de-alertas/historial-de-alertas/historial-de-alertas.component';
import { CardAlertsComponent } from './shared/components/molecules/card-alerts/card-alerts.component';
import { LoginComponent } from './shared/components/molecules/login/login.component';
import { RegisterComponent } from './shared/components/molecules/register/register.component';
import { AppComponent } from './app.component';
import { ForgotPasswordComponent } from './shared/components/molecules/forgot-password/forgot-password.component';
import { ResetPasswordComponent } from './shared/components/molecules/reset-password/reset-password.component';
import { HistorialAlertasComponent } from './shared/components/molecules/historial-alertas/historial-alertas.component';
import { GraficasTemperaturaComponent } from './shared/components/molecules/graficas-temperatura/graficas-temperatura.component';
import { GraficaComponent } from './shared/components/molecules/grafica/grafica.component';
import { ProductosComponent } from './features/tienda/components-tienda/moleculas-tienda/productos/productos.component';
import { DatapickerComponent } from './shared/components/molecules/datapicker/datapicker.component';
import { GraficaGeneralComponent } from './features/monitoreo/pages/dashboard/grafica-general/grafica-general.component';
import { InicioComponent } from './features/monitoreo/pages/inicio/inicio.component';

const routes: Routes = [
  {
    path: 'gestion-de-parametros',
    loadChildren: () => import('./features/monitoreo/pages/gestion-de-parametros/gestion-de-parametros.module').then(m => m.GestionDeParametrosModule)
  },
  {
    path: 'historial',
    component: HistorialAlertasComponent
  },
  {
    path: 'productos',
    component: ProductosComponent
  },

  {
    path: 'data',
    component: DatapickerComponent
  },



  {
    path: 'Inicio',
    component: InicioComponent
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
    path: 'temperatura',
    component: GraficaTemperaturaComponent

  },
  {
    path: 'home',
    component: GraficaGeneralComponent

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
    component: TablaDatosComponent

  },
  {
    path: 'alertas-recientes',
    component: AlertasRecientesComponent

  },
  {
    path: 'historial-alertas',
    component: HistorialDeAlertasComponent

  },
  {
    path: '',
    component : LoginComponent
  },
  {
    path: 'login',
    component : LoginComponent
  },
  {
    path: 'register',
    component : RegisterComponent
  },
  { path: 'forgot-password', 
    component: ForgotPasswordComponent
  },
  { path: 'reset-password',
    component: ResetPasswordComponent 
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
