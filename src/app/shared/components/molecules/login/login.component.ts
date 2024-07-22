import { Component } from '@angular/core';
import { AuthService } from '../../../../features/monitoreo/services/api-login/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  username: string = '';
  password: string = '';
  successMessage: string = '';
  errorMessage: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  onLogin() {
    // Limpiar mensajes anteriores
    this.successMessage = '';
    this.errorMessage = '';

    const user = { username: this.username, password: this.password };
    this.authService.login(user).subscribe(
      (response) => {
        if (response.success) {
          this.successMessage = response.message || '¡Inicio de sesión exitoso!';
          setTimeout(() => {
            this.successMessage = ''; // Limpiar el mensaje de éxito
            this.router.navigate(['/crear-especie']);
          }, 2000);
        } else {
          this.errorMessage = response.message || 'Nombre de usuario o contraseña inválidos.';
        }
      },
      (error) => {
        this.errorMessage = 'Ocurrió un error durante el inicio de sesión.';
      }
    );
  }
}
