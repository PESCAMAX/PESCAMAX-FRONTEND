import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InicioComponent } from './pages/inicio/inicio.component';
import { BtnLoginRegisterComponent } from './components/atomos-monitoreo/btn-login-register/btn-login-register.component';
import { SharedModule } from '../../shared/shared.module';
@NgModule({
  declarations: [
    InicioComponent,
    BtnLoginRegisterComponent,
    SharedModule
  ],
  imports: [
    CommonModule
  ]
})
export class MonitoreoModule { }