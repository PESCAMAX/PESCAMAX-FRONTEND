import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TiendaRoutingModule } from './tienda-routing.module';
import { ProductosComponent } from './components-tienda/moleculas-tienda/productos/productos.component';
import { NavBarComponent } from './components-tienda/moleculas-tienda/nav-bar/nav-bar.component';


@NgModule({
  declarations: [
    ProductosComponent,
    NavBarComponent
  ],
  imports: [
    CommonModule,
    TiendaRoutingModule
  ]
})
export class TiendaModule { }
