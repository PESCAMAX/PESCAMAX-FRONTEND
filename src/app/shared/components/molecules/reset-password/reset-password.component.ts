import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../../../features/monitoreo/services/api-login/auth.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {
  email: string = '';
  token: string = '';
  password: string = '';
  successMessage: string = '';
  errorMessage: string = '';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.email = this.route.snapshot.queryParamMap.get('email') || '';
    this.token = this.route.snapshot.queryParamMap.get('token') || '';
  }

  onSubmit() {
    this.authService.resetPassword(this.email, this.token, this.password).subscribe(
      response => {
        this.successMessage = response.message;
        this.errorMessage = ''; // Limpiar cualquier mensaje de error previo
        // Redirigir al usuario a la página de inicio de sesión después de unos segundos
        setTimeout(() => this.router.navigate(['/login']), 3000);
      },
      error => {
        if (error.error && error.error.message) {
          this.errorMessage = error.error.message;
        } else {
          this.errorMessage = 'Error al restablecer la contraseña.';
        }
        this.successMessage = ''; // Limpiar cualquier mensaje de éxito previo
      }
    );
  }
}
