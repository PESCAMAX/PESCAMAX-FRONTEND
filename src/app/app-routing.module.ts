import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TablaEspecieComponent } from './features/monitoreo/components/moleculas-monitoreo/tabla-especie/tabla-especie.component';
import { SeleccionarEspecieComponent } from './features/monitoreo/pages/gestion-de-parametros/seleccionar-especie/seleccionar-especie.component';
import { CrearEspecieComponent } from './features/monitoreo/pages/gestion-de-parametros/crear-especie/crear-especie.component';
import { ModificarEspecieComponent } from './features/monitoreo/pages/gestion-de-parametros/modificar-especie/modificar-especie.component';
import { GraficaTemperaturaComponent } from './features/monitoreo/pages/dashboard/grafica-temperatura/grafica-temperatura.component';
import { GraficaTdsComponent } from './features/monitoreo/pages/dashboard/grafica-tds/grafica-tds.component';
import { GraficaPhComponent } from './features/monitoreo/pages/dashboard/grafica-ph/grafica-ph.component';
import { TablaDatosComponent } from './features/monitoreo/pages/dashboard/tabla-datos/tabla-datos.component';
import { AlertasRecientesComponent } from './features/monitoreo/pages/sistema-de-alertas/alertas-recientes/alertas-recientes.component';
import { HistorialDeAlertasComponent } from './features/monitoreo/pages/sistema-de-alertas/historial-de-alertas/historial-de-alertas.component';
import { CardAlertsComponent } from './features/monitoreo/components/moleculas-monitoreo/card-alerts/card-alerts.component';
import { LoginComponent } from './shared/components/molecules/login/login.component';
import { RegisterComponent } from './shared/components/molecules/register/register.component';
import { AppComponent } from './app.component';
import { ForgotPasswordComponent } from './shared/components/molecules/forgot-password/forgot-password.component';
import { ResetPasswordComponent } from './shared/components/molecules/reset-password/reset-password.component';
import { HistorialAlertasComponent } from './features/monitoreo/components/moleculas-monitoreo/historial-alertas/historial-alertas.component';
import { GraficasTemperaturaComponent } from './features/monitoreo/components/moleculas-monitoreo/graficas-temperatura/graficas-temperatura.component';
import { GraficaComponent } from './features/monitoreo/components/moleculas-monitoreo/grafica/grafica.component';
import { ProductosComponent } from './features/tienda/components-tienda/moleculas-tienda/productos/productos.component';
import { DatapickerComponent } from './features/monitoreo/components/atomos-monitoreo/datapicker/datapicker.component';
import { GraficaGeneralComponent } from './features/monitoreo/pages/dashboard/grafica-general/grafica-general.component';
import { InicioComponent } from './features/monitoreo/pages/inicio/inicio.component';
import { AuthGuard } from './core/guards/auth-guard/auth-guard.service';
import { RegisterPageComponent } from './features/monitoreo/pages/home/register-page/register-page.component';
import { LoginPageComponent } from './features/monitoreo/pages/home/login-page/login-page.component';
import { RecuperarPageComponent } from './features/monitoreo/pages/home/recuperar-page/recuperar-page.component';
import { CambiarPageComponent } from './features/monitoreo/pages/home/cambiar-page/cambiar-page.component';
import { ConfiguracionUserComponent } from './features/monitoreo/pages/gestion-de-parametros/configuracion-user/configuracion-user.component';
const routes: Routes = [
  {
    path: 'gestion-de-parametros',
    loadChildren: () => import('./features/monitoreo/pages/gestion-de-parametros/gestion-de-parametros.module').then(m => m.GestionDeParametrosModule)
  },
  {
    path: 'historial/:userId',
    component: HistorialAlertasComponent
  },
  {
    path: 'productos',
    component: ProductosComponent
  },

  {
    path: 'user-config',
    component: ConfiguracionUserComponent
  },
  {
    path: 'data',
    component: DatapickerComponent
  },



  {
    path: 'Inicio',
    component: InicioComponent
  },

  { path: 'crear-especie/:userId', 
    component: CrearEspecieComponent,
     canActivate: [AuthGuard] },

  { path: 'modificar-especie/:userId', 
    component: ModificarEspecieComponent, 
    canActivate: [AuthGuard] },

  { path: 'seleccionar-especie/:userId', component: SeleccionarEspecieComponent, canActivate: [AuthGuard] },

  { path: 'temperatura/:userId', component: GraficaTemperaturaComponent, canActivate: [AuthGuard] },
   
   
  
  {
    path: 'home/:userId',
    component: GraficaGeneralComponent

  },
  
  {
    path: 'grafica-tds/:userId',
    component: GraficaTdsComponent,
    canActivate: [AuthGuard]

  },

  {
    path: 'grafica-ph/:userId',
    component: GraficaPhComponent,
    canActivate: [AuthGuard]

  },
  {
    path: 'tabla-datos/:userId',
    component: TablaDatosComponent,
    canActivate: [AuthGuard]

  },
  {
    path: 'alertas-recientes/:userId',
    component: AlertasRecientesComponent,
    canActivate: [AuthGuard]

  },
  {
    path: 'historial-alertas/:userId',
    component: HistorialDeAlertasComponent,
    canActivate: [AuthGuard]

  },
  {
    path: '',
    component : LoginPageComponent
  },
  {
    path: 'login',
    component : LoginPageComponent
  },
  {
    path: 'register',
    component : RegisterPageComponent
  },
  { path: 'forgot-password', 
    component: RecuperarPageComponent
  },
  { path: 'reset-password',
    component: CambiarPageComponent 
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
