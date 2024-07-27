import { Component } from '@angular/core';
import { AuthService } from '../../../../features/monitoreo/services/api-login/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  Username = '';
  Email = '';
  Phone = '';
  Password = '';
  ConfirmPassword = '';
  successMessage = '';
  errorMessage = '';

  constructor(private authService: AuthService, private router: Router) { }

  register() {
    if (this.Password !== this.ConfirmPassword) {
      this.errorMessage = 'Las contraseñas no coinciden';
      return;
    }

    const user = {
      Username: this.Username,
      Email: this.Email,
      Phone: this.Phone,
      Password: this.Password
    };

    this.authService.register(user).subscribe(
      response => {
        this.successMessage = 'Usuario registrado exitosamente';
        this.errorMessage = '';
        console.log('Usuario registrado exitosamente', response);
        setTimeout(() => {
          this.router.navigate(['/login']);
        }, 2000);
      },
      error => {
        console.error('Error completo:', error);
        console.error('Estado del error:', error.status);
        console.error('Cuerpo del error:', error.error);

        if (error.status === 400 || error.status === 409) {
          if (error.error && typeof error.error === 'string') {
            if (error.error.includes('correo electrónico ya está registrado') && error.error.includes('usuario ya existe')) {
              this.errorMessage = 'El nombre de usuario y el correo electrónico ya están registrados.';
            } else if (error.error.includes('correo electrónico ya está registrado')) {
              this.errorMessage = 'Este correo electrónico ya está registrado. Por favor, use otro o inicie sesión.';
            } else if (error.error.includes('usuario ya existe')) {
              this.errorMessage = 'Este nombre de usuario ya existe. Por favor, elija otro.';
            } else {
              this.errorMessage = error.error;
            }
          } else if (error.error && error.error.message) {
            if (error.error.message.includes('correo electrónico ya está registrado') && error.error.message.includes('usuario ya existe')) {
              this.errorMessage = 'El nombre de usuario y el correo electrónico ya están registrados.';
            } else if (error.error.message.includes('correo electrónico ya está registrado')) {
              this.errorMessage = 'Este correo electrónico ya está registrado. Por favor, use otro o inicie sesión.';
            } else if (error.error.message.includes('usuario ya existe')) {
              this.errorMessage = 'Este nombre de usuario ya existe. Por favor, elija otro.';
            } else {
              this.errorMessage = error.error.message;
            }
          } else {
            this.errorMessage = 'Error al registrar usuario. El usuario o correo electrónico puede ya existir.';
          }
        } else {
          this.errorMessage = 'Error al registrar usuario. Por favor, intente de nuevo.';
        }
        this.successMessage = '';
      }
    );
  }

  clearMessages() {
    this.errorMessage = '';
    this.successMessage = '';
  }
}
