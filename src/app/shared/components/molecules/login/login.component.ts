import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../../features/monitoreo/services/api-login/auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  successMessage: string = '';
  errorMessage: string = '';
  loginForm!: FormGroup; // Utilizando el operador de aserción de tipo

  constructor(
    private fb: FormBuilder,
    private authService: AuthService
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
      this.authService.login(this.loginForm.value).subscribe(
        response => {
          console.log('Inicio de sesión exitoso', response);
          // El servicio de autenticación manejará la navegación
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
    }
  }
}
