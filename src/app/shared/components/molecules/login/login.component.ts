import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../../features/monitoreo/services/api-login/auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  successMessage: string = '';
  errorMessage: string = '';
  loginForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router // Inyección del servicio Router
  ) {}

  ngOnInit() {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  onLogin() {
    if (this.loginForm.valid) {
      console.log('Intentando iniciar sesión con:', this.loginForm.value);

      // Llamada al servicio de autenticación
      this.authService.login(this.loginForm.value).subscribe(
        response => {
          console.log('Inicio de sesión exitoso', response);

          // Redirigir a la página de Gráfica General
          this.router.navigate(['/home/+ userId']);
        },
        error => {
          console.error('Error en el inicio de sesión', error);
          if (error.error instanceof ErrorEvent) {
            this.errorMessage = `Error: ${error.error.message}`;
          } else {
            this.errorMessage = `Código de Error: ${error.status}\nMensaje: ${error.message}`;
          }
        }
      );
    } else {
      console.log('El formulario es inválido', this.loginForm.errors);
      this.errorMessage = 'Por favor, complete todos los campos requeridos';
    }
  }
}
