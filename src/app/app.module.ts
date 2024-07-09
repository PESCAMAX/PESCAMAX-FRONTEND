import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SharedModule } from './shared/shared.module'; // Ajusta la ruta según corresponda
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule, FormsModule } from '@angular/forms'; // Importa FormsModule y ReactiveFormsModule
import { JwtModule } from '@auth0/angular-jwt';
// Importa tus módulos específicos
import { SistemaDeAlertasModule } from './features/monitoreo/pages/sistema-de-alertas/sistema-de-alertas.module'; // Ajusta la ruta según corresponda
import { DashboardModule } from './features/monitoreo/pages/dashboard/dashboard.module';
import { HistorialAlertasComponent } from './shared/components/molecules/historial-alertas/historial-alertas.component';
import { TiendaComponent } from './features/tienda/tienda.component';


export function tokenGetter() {
  return localStorage.getItem('token');
}

@NgModule({
  declarations: [
    AppComponent,
    TiendaComponent,
    // otros componentes
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SharedModule,
    SistemaDeAlertasModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
 
    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter,
        allowedDomains: ['localhost:6754'],
        disallowedRoutes: ['http://localhost:6754/api/Auth/register']
      }
    }) // Importa el módulo del dashboard
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
