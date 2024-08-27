import { Component, AfterViewInit, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../../../core/services/api-login/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class LoginComponent implements OnInit, AfterViewInit {
  loginForm!: FormGroup;
  registerForm!: FormGroup;
  successMessage: string = '';
  errorMessage: string = '';
  isLoginVisible: boolean = true;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit() {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });

    this.registerForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      PhoneNumber: ['', Validators.required],
      Address: ['', Validators.required],
      FarmName: ['', Validators.required]
    });
  }

  ngAfterViewInit() {
    this.updateFormVisibility();
    const container = document.getElementById('container');
    const overlayBtn = document.getElementById('overlayBtn');
    if (overlayBtn) {
      overlayBtn.addEventListener('click', () => {
        container?.classList.toggle('right-panel-active');
        overlayBtn.classList.remove('btnScaled');
        window.requestAnimationFrame(() => {
          overlayBtn.classList.add('btnScaled');
        });
      });
    }
  }

  onLogin() {
    if (this.loginForm.valid) {
      console.log('Intentando iniciar sesión con:', this.loginForm.value);
      this.authService.login(this.loginForm.value).subscribe({
        next: (response) => {
          console.log('Inicio de sesión exitoso', response);
          this.showTemporaryMessage('Inicio de sesión exitoso', false);
          this.router.navigate(['/home', response.userId]);
        },
        error: (error) => {
          console.error('Error en el inicio de sesión', error);
          let errorMsg = 'Error en el inicio de sesión';
          if (error.error instanceof ErrorEvent) {
            errorMsg = `Error: ${error.error.message}`;
          } else {
            errorMsg = `Código de Error: ${error.status}\nMensaje: ${error.message}`;
          }
          this.showTemporaryMessage(errorMsg, true);
        }
      });
    } else {
      console.log('El formulario es inválido', this.loginForm.errors);
      this.showTemporaryMessage('Por favor, complete todos los campos requeridos', true);
    }
  }
  
  onRegister() {
    if (this.registerForm.valid) {
      console.log('Registrando usuario:', this.registerForm.value);
      this.authService.register(this.registerForm.value).subscribe({
        next: (response) => {
          console.log('Registro exitoso', response);
          this.showTemporaryMessage('Registro exitoso. Por favor, inicie sesión.', false);
          this.showSignIn();
        },
        error: (error) => {
          console.error('Error en el registro', error);
          let errorMsg = 'Error en el registro';
          if (error.error instanceof ErrorEvent) {
            errorMsg = `Error: ${error.error.message}`;
          } else {
            errorMsg = `Código de Error: ${error.status}\nMensaje: ${error.message}`;
          }
          this.showTemporaryMessage(errorMsg, true);
        }
      });
    } else {
      console.log('El formulario de registro es inválido', this.registerForm.errors);
      this.showTemporaryMessage('Por favor, complete todos los campos requeridos correctamente', true);
    }
  }

  private showTemporaryMessage(message: string, isError: boolean, duration: number = 2000) {
    if (isError) {
      this.errorMessage = message;
      this.successMessage = '';
    } else {
      this.successMessage = message;
      this.errorMessage = '';
    }
  
    setTimeout(() => {
      this.clearMessages();
    }, duration);
  }

  showSignIn() {
    this.isLoginVisible = true;
    this.updateFormVisibility();
  }

  showSignUp() {
    this.isLoginVisible = false;
    this.updateFormVisibility();
  }

  clearMessages() {
    this.successMessage = '';
    this.errorMessage = '';
  }

  toggleForm() {
    this.isLoginVisible = !this.isLoginVisible;
    this.updateFormVisibility();
  }
  private updateFormVisibility() {
    const signInContainer = document.querySelector('.sign-in-container') as HTMLElement;
    const signUpContainer = document.querySelector('.sign-up-container') as HTMLElement;
    const container = document.getElementById('container');

    if (this.isLoginVisible) {
      signInContainer?.classList.add('active');
      signUpContainer?.classList.remove('active');
      container?.classList.remove('right-panel-active');
    } else {
      signInContainer?.classList.remove('active');
      signUpContainer?.classList.add('active');
      container?.classList.add('right-panel-active');
    }
  }
}