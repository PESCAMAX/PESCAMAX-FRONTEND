import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MonitoreoRoutingModule } from './monitoreo-routing.module';
import { TdsComponent } from './components/tds/tds.component';


@NgModule({
  declarations: [
    TdsComponent
  ],
  imports: [
    CommonModule,
    MonitoreoRoutingModule
  ]
})
export class MonitoreoModule { }
