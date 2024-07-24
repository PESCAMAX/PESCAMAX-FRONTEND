import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SharedModule } from './shared/shared.module';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { JwtModule } from '@auth0/angular-jwt';
import { SistemaDeAlertasModule } from './features/monitoreo/pages/sistema-de-alertas/sistema-de-alertas.module';
import { DashboardModule } from './features/monitoreo/pages/dashboard/dashboard.module';
import { AuthGuard } from './features/monitoreo/services/auth-guard/auth-guard.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
export function tokenGetter() {
  return localStorage.getItem('token');
}

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SharedModule,
    SistemaDeAlertasModule,
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    DashboardModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter,
        allowedDomains: ['localhost:6754'],
        disallowedRoutes: ['http://localhost:6754/api/Auth/register']
      }
    })
  ],
  providers: [AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }