import { Component } from '@angular/core';
import { AuthService } from '../../../../features/monitoreo/services/api-login/auth.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent {
  email: string = '';
  successMessage: string = '';
  errorMessage: string = '';

  constructor(private authService: AuthService) { }

  onSubmit() {
    this.authService.forgotPassword(this.email).subscribe(
      response => {
        // Si la respuesta tiene un mensaje de éxito, mostrarlo
        if (response && response.message) {
          this.successMessage = response.message;
          this.errorMessage = ''; // Limpiar cualquier mensaje de error previo
        }
      },
      error => {
        // Manejar errores de la solicitud HTTP
        if (error.error && error.error.message) {
          this.errorMessage = error.error.message;
        } else {
          this.errorMessage = 'Error al enviar el correo de restablecimiento de contraseña.';
        }
        this.successMessage = ''; // Limpiar cualquier mensaje de éxito previo
      }
    );
  }
}
