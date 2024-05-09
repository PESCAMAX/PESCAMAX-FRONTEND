import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MenuLateralComponent } from './Intranet/Intranet_components/menu-lateral/menu-lateral.component';
import { ContenidoPrincipalComponent } from './Intranet/Intranet_components/contenido-principal/contenido-principal.component';

@NgModule({
  declarations: [
    AppComponent,
    MenuLateralComponent,
    ContenidoPrincipalComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
