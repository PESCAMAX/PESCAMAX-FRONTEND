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
  isMobileView: boolean = false;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit() {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  

    this.registerForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      PhoneNumber: ['', Validators.required], // Añadido desde el segundo componente
      Address: ['', Validators.required], // Añadido desde el segundo componente
      FarmName: ['', Validators.required] // Añadido desde el segundo componente
    });

    this.checkScreenSize();
    window.addEventListener('resize', () => this.checkScreenSize());
  }

  ngAfterViewInit() {
    this.initializeOverlayToggle();

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

  initializeOverlayToggle() {
    const signUpContainer = document.getElementById('signUpContainer') as HTMLElement;
    const signInContainer = document.getElementById('signInContainer') as HTMLElement;
    const mobileToggle = document.getElementById('mobileToggle') as HTMLElement;
    const signUpButton = document.getElementById('signUp') as HTMLElement;
    const signInButton = document.getElementById('signIn') as HTMLElement;

    if (mobileToggle) {
      mobileToggle.addEventListener('click', () => this.toggleMobileForm());
    }

    if (signUpButton) {
      signUpButton.addEventListener('click', () => this.showSignUp());
    }

    if (signInButton) {
      signInButton.addEventListener('click', () => this.showSignIn());
    }
  }
  onLogin() {
    if (this.loginForm.valid) {
        this.authService.login(this.loginForm.value).subscribe(
            (response) => {
                if (response.success) {
                    const userId = this.authService.getUserId();
                    if (response.RequirePasswordChange) {
                      this.router.navigate(['/change-password', response.userId]);
                    } else {
                        this.router.navigate(['/home']);
                    }
                } else {
                    this.errorMessage = response.message || 'Error en el inicio de sesión';
                }
            },
            (error) => {
                this.errorMessage = error.message || 'Ocurrió un error durante el inicio de sesión';
            }
        );
    } else {
        this.errorMessage = 'Por favor, complete todos los campos correctamente';
    }
}



onRegister() {
  if (this.registerForm.valid) {
    console.log('Registrando usuario:', this.registerForm.value);
    this.authService.register(this.registerForm.value).subscribe({
      next: (response) => {
        console.log('Registro exitoso', response);
        this.showTemporaryMessage('Registro exitoso. Se ha enviado tu contraseña a tu correo electrónico. Por favor, revisa tu bandeja de entrada e inicia sesión.', false, 10000);
        this.showSignIn(); // Cambiar al formulario de inicio de sesión
      },
      error: (error) => {
        console.error('Error en el registro', error);
        let errorMsg = 'Error en el registro';
        if (error.error instanceof ErrorEvent) {
          errorMsg = `Error: ${error.error.message}`;
        } else {
          errorMsg = `Código de Error: ${error.status}\nMensaje: ${error.message}`;
        }
        this.showTemporaryMessage(errorMsg, true, 10000);
      }
    });
  } else {
    console.log('El formulario de registro es inválido', this.registerForm.errors);
    this.showTemporaryMessage('Por favor, complete todos los campos requeridos correctamente', true, 5000);
  }
}

  private showTemporaryMessage(message: string, isError: boolean, duration: number = 10000) {
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
    const container = document.getElementById('container');
    container?.classList.remove('right-panel-active');
  }

  showSignUp() {
    const container = document.getElementById('container');
    container?.classList.add('right-panel-active');
  }

  updateMobileFormsDisplay(formToShow: 'sign-in' | 'sign-up') {
    const signUpContainer = document.querySelector('.sign-up-container') as HTMLElement;
    const signInContainer = document.querySelector('.sign-in-container') as HTMLElement;

    if (this.isMobileView) {
      if (formToShow === 'sign-up') {
        signUpContainer.style.display = 'block';
        signInContainer.style.display = 'none';
      } else {
        signUpContainer.style.display = 'none';
        signInContainer.style.display = 'block';
      }
    }
  }

  clearMessages() {
    this.successMessage = '';
    this.errorMessage = '';
  }

  checkScreenSize() {
    this.isMobileView = window.innerWidth <= 767;

    if (this.isMobileView) {
      this.showSignIn(); // Muestra siempre el formulario de inicio de sesión en móviles
    }

    const overlayContainerMobile = document.querySelector('.overlay-container-mobile') as HTMLElement;
    if (overlayContainerMobile) {
      overlayContainerMobile.style.display = this.isMobileView ? 'block' : 'none';
    }
  }
   private handleError(error: any, defaultMessage: string) {
    let errorMsg = defaultMessage;
    if (error.error instanceof ErrorEvent) {
      errorMsg = `Error: ${error.error.message}`;
    } else {
      errorMsg = `Código de Error: ${error.status}\nMensaje: ${error.message}`;
    }
    this.showTemporaryMessage(errorMsg, true);
  }


  toggleMobileForm() {
    const signUpContainer = document.getElementById('signUpContainer') as HTMLElement;
    const signInContainer = document.getElementById('signInContainer') as HTMLElement;

    if (signUpContainer && signInContainer) {
      if (signUpContainer.style.display === 'none' || signUpContainer.style.display === '') {
        signUpContainer.style.display = 'block';
        signInContainer.style.display = 'none';
      } else {
        signUpContainer.style.display = 'none';
        signInContainer.style.display = 'block';
      }
    }
  }
}
