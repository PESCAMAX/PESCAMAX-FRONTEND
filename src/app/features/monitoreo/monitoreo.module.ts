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
import { CardsComponent } from './components/cards/cards.component';
import { GraficaComponent } from './components/moleculas-monitoreo/grafica/grafica.component';




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
          CardsComponent,
          GraficaComponent,


  ],
  imports: [
    CommonModule
  ]
})
export class MonitoreoModule { }