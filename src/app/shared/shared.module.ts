import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatNativeDateModule } from '@angular/material/core';

// Componentes
import { ButtonEnviarComponent } from '../features/monitoreo/components/atomos-monitoreo/button-enviar/button-enviar.component';
import { FlechaDespliegueComponent } from '../features/monitoreo/components/atomos-monitoreo/flecha-despliegue/flecha-despliegue.component';
import { TablaEspecieComponent } from '../features/monitoreo/components/moleculas-monitoreo/tabla-especie/tabla-especie.component';
import { CardAlertsComponent } from '../features/monitoreo/components/moleculas-monitoreo/card-alerts/card-alerts.component';
import { ButtonViewMoreComponent } from '../features/monitoreo/components/atomos-monitoreo/button-view-more/button-view-more.component';
import { ButtonDismissComponent } from '../features/monitoreo/components/atomos-monitoreo/button-dismiss/button-dismiss.component';
import { ButtonContainerComponent } from '../features/monitoreo/components/organismos-monitoreo/button-container/button-container.component';
import { AlertComponent } from './components/organisms/alert/alert.component';
import { MenuLateralComponent } from '../features/monitoreo/components/moleculas-monitoreo/menu-lateral/menu-lateral.component';
import { TablaSeleccionarComponent } from '../features/monitoreo/components/moleculas-monitoreo/tabla-seleccionar/tabla-seleccionar.component';
import { EspecieFormComponent } from '../features/monitoreo/components/moleculas-monitoreo/form-especie/form-especie.component';
import { AlertFormComponent } from './components/organisms/alert-form/alert-form.component';
import { TablaSensorComponent } from '../features/monitoreo/components/moleculas-monitoreo/tabla-sensor/tabla-sensor.component';
import { RegisterComponent } from './components/molecules/register/register.component';
import { LoginComponent } from './components/molecules/login/login.component';
import { ForgotPasswordComponent } from './components/molecules/forgot-password/forgot-password.component';
import { ResetPasswordComponent } from './components/molecules/reset-password/reset-password.component';
import { HistorialAlertasComponent } from '../features/monitoreo/components/moleculas-monitoreo/historial-alertas/historial-alertas.component';
import { GraficaComponent } from '../features/monitoreo/components/moleculas-monitoreo/grafica/grafica.component';
import { GraficastdssComponent } from '../features/monitoreo/components/moleculas-monitoreo/graficastdss/graficastdss.component';
import { GraficasTemperaturaComponent } from '../features/monitoreo/components/moleculas-monitoreo/graficas-temperatura/graficas-temperatura.component';
import { GraphPhComponent } from '../features/monitoreo/components/moleculas-monitoreo/graph-ph/graph-ph.component';
import { DatapickerComponent } from '../features/monitoreo/components/atomos-monitoreo/datapicker/datapicker.component';
import { RelojcComponent } from '../features/monitoreo/components/atomos-monitoreo/relojc/relojc.component';
import { InicioComponent } from '../features/monitoreo/pages/inicio/inicio.component';
import { ExitComponent } from '../features/monitoreo/components/atomos-monitoreo/exit/exit.component';
import { ChatbotComponent } from './components/atoms/chatbot/chatbot.component';
import { NavigationComponent } from './components/organisms/navigation/navigation.component';
import { LoginPageComponent } from '../features/monitoreo/pages/home/login-page/login-page.component';
import { RegisterPageComponent } from '../features/monitoreo/pages/home/register-page/register-page.component';
import { RecuperarPageComponent } from '../features/monitoreo/pages/home/recuperar-page/recuperar-page.component';
import { CambiarPageComponent } from '../features/monitoreo/pages/home/cambiar-page/cambiar-page.component';
import { ButtonGuardarComponent } from '../features/monitoreo/components/atomos-monitoreo/button-guardar/button-guardar.component';
import { ButtonEliminarComponent } from '../features/monitoreo/components/atomos-monitoreo/button-eliminar/button-eliminar.component';
import { ButtonCancelarComponent } from '../features/monitoreo/components/atomos-monitoreo/button-cancelar/button-cancelar.component';
import { BtnLoginRegisterComponent } from '../features/monitoreo/components/atomos-monitoreo/btn-login-register/btn-login-register.component';
import { InputsFormComponent } from '../features/monitoreo/components/atomos-monitoreo/inputs-form/inputs-form.component';
import { ButtonHorarioAlertasComponent } from '../features/monitoreo/components/atomos-monitoreo/button-horario-alertas/button-horario-alertas.component';
import { LotesComponent } from '../features/monitoreo/components/atomos-monitoreo/lotes/lotes.component';
import { FechasMensajesComponent } from '../features/monitoreo/components/atomos-monitoreo/fechas-mensajes/fechas-mensajes.component';
import { GraficaBarrasComponent } from '../features/monitoreo/components/moleculas-monitoreo/grafica-barras/grafica-barras.component';
import { GlobalAlertComponent } from '../features/monitoreo/components/atomos-monitoreo/global-alert/global-alert.component';
import { ConfigUserComponent } from '../features/monitoreo/components/moleculas-monitoreo/config-user/config-user.component';
import { ChangePasswordComponent } from './components/molecules/change-password/change-password.component';
import { PasswordChangeComponent } from '../features/monitoreo/pages/home/password-change/password-change.component';
import { GlobalAlertaComponent } from '../features/monitoreo/components/moleculas-monitoreo/global-alerta/global-alerta.component';
import { NotificationComponent } from '../features/monitoreo/components/moleculas-monitoreo/notification/notification.component';
import { FormularioMortalidadComponent } from '../features/monitoreo/components/moleculas-monitoreo/formulario-mortalidad/formulario-mortalidad.component';
import { ClimaFormuluarioComponent } from '../features/monitoreo/components/moleculas-monitoreo/clima-formuluario/clima-formuluario.component';
import { TarjetaClimaComponent } from '../features/monitoreo/components/moleculas-monitoreo/tarjeta-clima/tarjeta-clima.component';
import { CardsClimaComponent } from '../features/monitoreo/components/atomos-monitoreo/cards-clima/cards-clima.component';
import {ButtonConfirmarComponent} from '../features/monitoreo/components/atomos-monitoreo/button-confirmar/button-confirmar.component';
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
    ResetPasswordComponent,
    HistorialAlertasComponent,
    GraficaComponent,
    GraficastdssComponent,
    GraficasTemperaturaComponent,
    GraphPhComponent,
    RelojcComponent,
    DatapickerComponent,
    ExitComponent,
    ChatbotComponent,
    NavigationComponent,
    LoginPageComponent,
    InicioComponent,
    RegisterPageComponent,
    RecuperarPageComponent,
    CambiarPageComponent,
    ButtonGuardarComponent,
    ButtonEliminarComponent,
    ButtonCancelarComponent,
    BtnLoginRegisterComponent,
    InputsFormComponent,
    LotesComponent,
    ButtonHorarioAlertasComponent,
    FechasMensajesComponent,
    GraficaBarrasComponent,
    GlobalAlertComponent,
    ConfigUserComponent,
    ChangePasswordComponent,
    PasswordChangeComponent,
    GlobalAlertaComponent,
    NotificationComponent,
    FormularioMortalidadComponent,
    ClimaFormuluarioComponent,
    TarjetaClimaComponent,
    CardsClimaComponent,
    ButtonConfirmarComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatNativeDateModule
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
    RegisterComponent,
    LoginComponent,
    HistorialAlertasComponent,
    GraficaComponent,
    GraficastdssComponent,
    GraficasTemperaturaComponent,
    GraphPhComponent,
    DatapickerComponent,
    ChatbotComponent,
    ForgotPasswordComponent,
    ResetPasswordComponent,
    LoginPageComponent,
    InicioComponent,
    ChatbotComponent,
    NavigationComponent,
    RegisterPageComponent,
    RecuperarPageComponent,
    CambiarPageComponent,
    BtnLoginRegisterComponent,
    InputsFormComponent,
    LotesComponent,
    FechasMensajesComponent,
    GraficaBarrasComponent,
    GlobalAlertComponent,
    ConfigUserComponent,
    ChangePasswordComponent,
    PasswordChangeComponent,
    GlobalAlertaComponent,
    NotificationComponent,
    FormularioMortalidadComponent,
    ClimaFormuluarioComponent,
    TarjetaClimaComponent,
    CardsClimaComponent,
    ButtonConfirmarComponent


  ]
})
export class SharedModule { }
