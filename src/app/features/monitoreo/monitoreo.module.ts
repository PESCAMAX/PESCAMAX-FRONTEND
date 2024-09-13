import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InicioComponent } from './pages/inicio/inicio.component';
import { ButtonGuardarComponent } from './components/atomos-monitoreo/button-guardar/button-guardar.component';
import { ButtonEliminarComponent } from './components/atomos-monitoreo/button-eliminar/button-eliminar.component';
import { ButtonCancelarComponent } from './components/atomos-monitoreo/button-cancelar/button-cancelar.component';
import { BtnLoginRegisterComponent } from './components/atomos-monitoreo/btn-login-register/btn-login-register.component';
import { SharedModule } from '../../shared/shared.module';
import { InputsFormComponent } from './components/atomos-monitoreo/inputs-form/inputs-form.component';
import { LotesComponent } from './components/atomos-monitoreo/lotes/lotes.component';
import { ButtonMasrecientesComponent } from './components/atomos-monitoreo/button-masrecientes/button-masrecientes.component';
import { ButtonHorarioAlertasComponent } from './components/atomos-monitoreo/button-horario-alertas/button-horario-alertas.component';
import { FechasMensajesComponent } from './components/atomos-monitoreo/fechas-mensajes/fechas-mensajes.component';
import { GraficaBarrasComponent } from './components/moleculas-monitoreo/grafica-barras/grafica-barras.component';
import { GlobalAlertComponent } from './components/atomos-monitoreo/global-alert/global-alert.component';
import { GlobalAlertaComponent } from './components/moleculas-monitoreo/global-alerta/global-alerta.component';
import { NotificationComponent } from './components/moleculas-monitoreo/notification/notification.component';
import { FormularioMortalidadComponent } from './components/moleculas-monitoreo/formulario-mortalidad/formulario-mortalidad.component';
import { ClimaFormuluarioComponent } from './components/moleculas-monitoreo/clima-formuluario/clima-formuluario.component';
import { CardsClimaComponent } from './components/atomos-monitoreo/cards-clima/cards-clima.component';
import { TarjetaClimaComponent } from './components/moleculas-monitoreo/tarjeta-clima/tarjeta-clima.component';
import { ButtonConfirmarComponent } from './components/atomos-monitoreo/button-confirmar/button-confirmar.component';



@NgModule({
  declarations: [

  
          InicioComponent,
          ButtonGuardarComponent,
          ButtonEliminarComponent,
          ButtonCancelarComponent,
          BtnLoginRegisterComponent,
          SharedModule,
          InputsFormComponent,
          LotesComponent,
          ButtonMasrecientesComponent,
          ButtonHorarioAlertasComponent,
          FechasMensajesComponent,
          GraficaBarrasComponent,
          GlobalAlertComponent,
          GlobalAlertaComponent,
          NotificationComponent,
          FormularioMortalidadComponent,
          ClimaFormuluarioComponent,
          CardsClimaComponent,
          TarjetaClimaComponent,
          ButtonConfirmarComponent
          



  ],
  imports: [
    CommonModule
  ]
})
export class MonitoreoModule { }