import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TiendaRoutingModule } from './tienda-routing.module';
import { ProductosComponent } from './components-tienda/moleculas-tienda/productos/productos.component';


@NgModule({
  declarations: [
    ProductosComponent
  ],
  imports: [
    CommonModule,
    TiendaRoutingModule
  ]
})
export class TiendaModule { }
