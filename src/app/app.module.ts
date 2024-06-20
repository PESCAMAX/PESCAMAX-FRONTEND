import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SharedModule } from './shared/shared.module'; // Ajusta la ruta según corresponda
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms'; // Importa FormsModule
// Importa tus módulos específicos
import { SistemaDeAlertasModule } from './features/monitoreo/pages/sistema-de-alertas/sistema-de-alertas.module'; // Ajusta la ruta según corresponda
import { DashboardModule } from './features/monitoreo/pages/dashboard/dashboard.module';

@NgModule({
  declarations: [
    AppComponent,
 
    // otros componentes
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SharedModule,
    SistemaDeAlertasModule, // Importa el módulo del sistema de alertas
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule // Importa el módulo del dashboard
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

