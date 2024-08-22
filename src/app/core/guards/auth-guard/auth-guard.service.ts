import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthService } from '../../services/api-login/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    console.log('AuthGuard: Verificando autenticación');
    if (this.authService.isAuthenticated()) {
      const userId = this.authService.getUserId();
      if (userId) {
        console.log('AuthGuard: Usuario autenticado con ID:', userId);
        return true;
      } else {
        console.error('AuthGuard: Usuario autenticado pero sin userId');
      }
    } else {
      console.log('AuthGuard: Usuario no autenticado');
    }
    this.router.navigate(['/login']);
    return false;
  }
}