import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';


import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatNativeDateModule } from '@angular/material/core';

// Componentes
import { ButtonEnviarComponent } from './components/atoms/button-enviar/button-enviar.component';
import { FlechaDespliegueComponent } from './components/atoms/flecha-despliegue/flecha-despliegue.component';
import { TablaEspecieComponent } from './components/molecules/tabla-especie/tabla-especie.component';
import { CardAlertsComponent } from './components/molecules/card-alerts/card-alerts.component';
import { ButtonViewMoreComponent } from './components/atoms/button-view-more/button-view-more.component';
import { ButtonDismissComponent } from './components/atoms/button-dismiss/button-dismiss.component';
import { ButtonContainerComponent } from './components/molecules/button-container/button-container.component';
import { AlertComponent } from './components/organisms/alert/alert.component';
import { MenuLateralComponent } from './components/molecules/menu-lateral/menu-lateral.component';
import { TablaSeleccionarComponent } from './components/molecules/tabla-seleccionar/tabla-seleccionar.component';
import { EspecieFormComponent } from './components/molecules/form-especie/form-especie.component';
import { AlertFormComponent } from './components/organisms/alert-form/alert-form.component';
import { TablaSensorComponent } from './components/molecules/tabla-sensor/tabla-sensor.component';
import { RegisterComponent } from './components/molecules/register/register.component';
import { LoginComponent } from './components/molecules/login/login.component';
import { ForgotPasswordComponent } from './components/molecules/forgot-password/forgot-password.component';
import { ResetPasswordComponent } from './components/molecules/reset-password/reset-password.component';
import { HistorialAlertasComponent } from './components/molecules/historial-alertas/historial-alertas.component';
import { GraficaComponent } from './components/molecules/grafica/grafica.component';
import { GraficastdssComponent } from './components/molecules/graficastdss/graficastdss.component';
import { GraficasTemperaturaComponent } from './components/molecules/graficas-temperatura/graficas-temperatura.component';
import { GraphPhComponent } from './components/molecules/graph-ph/graph-ph.component';


@NgModule({
  declarations: [
    ButtonEnviarComponent,
    FlechaDespliegueComponent,
    TablaEspecieComponent,
    CardAlertsComponent,
    ButtonViewMoreComponent,
    ButtonDismissComponent,
    ButtonContainerComponent,
    AlertComponent,
    MenuLateralComponent,
    TablaSeleccionarComponent,
    EspecieFormComponent,
    AlertFormComponent,
    TablaSensorComponent,
    RegisterComponent,
    LoginComponent,
    ForgotPasswordComponent,
    ResetPasswordComponent, // Asegúrate de que este componente está declarado aquí
    HistorialAlertasComponent// Asegúrate de que este componente está declarado aquí

 

  

  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatNativeDateModule // Asegúrate de importar FormsModule aquí también
  ],
  exports: [
    ButtonEnviarComponent,
    FlechaDespliegueComponent,
    TablaEspecieComponent,
    CardAlertsComponent,
    AlertComponent,
    MenuLateralComponent,
    TablaSeleccionarComponent,
    EspecieFormComponent,
    AlertFormComponent,
    TablaSensorComponent,
    RegisterComponent, // Exporta tus componentes aquí si los necesitas en otros módulos
    LoginComponent,
    HistorialAlertasComponent,
    GraficaComponent,
    GraficastdssComponent,
    GraficasTemperaturaComponent,
    GraphPhComponent
 



  ]
})
export class SharedModule { }
