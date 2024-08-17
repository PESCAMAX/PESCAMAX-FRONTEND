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
      username: ['', Validators.required],
      password: ['', Validators.required]
    });

    this.registerForm = this.fb.group({
      UserName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });

    this.checkScreenSize();
    window.addEventListener('resize', () => this.checkScreenSize());
  }

  ngAfterViewInit() {
    this.initializeOverlayToggle();
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
      this.authService.login(this.loginForm.value).subscribe({
        next: (response) => {
          this.showTemporaryMessage('Inicio de sesión exitoso', false);
          this.router.navigate(['/home', response.userId]);
        },
        error: (error) => {
          this.handleError(error, 'Error en el inicio de sesión');
        }
      });
    } else {
      this.showTemporaryMessage('Por favor, complete todos los campos requeridos', true);
    }
  }

  onRegister() {
    if (this.registerForm.valid) {
      this.authService.register(this.registerForm.value).subscribe({
        next: (response) => {
          this.showTemporaryMessage('Registro exitoso. Por favor, inicie sesión.', false);
          this.showSignIn();
        },
        error: (error) => {
          this.handleError(error, 'Error en el registro');
        }
      });
    } else {
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

  private handleError(error: any, defaultMessage: string) {
    let errorMsg = defaultMessage;
    if (error.error instanceof ErrorEvent) {
      errorMsg = `Error: ${error.error.message}`;
    } else {
      errorMsg = `Código de Error: ${error.status}\nMensaje: ${error.message}`;
    }
    this.showTemporaryMessage(errorMsg, true);
  }

  showSignIn() {
    const container = document.getElementById('container') as HTMLElement;
    if (container) {
      container.classList.remove('right-panel-active');
    }
    
    const signUpContainer = document.getElementById('signUpContainer') as HTMLElement;
    const signInContainer = document.getElementById('signInContainer') as HTMLElement;
    const overlayContainerMobile = document.getElementById('overlayContainerMobile') as HTMLElement;
  
    if (signUpContainer && signInContainer) {
      signUpContainer.style.display = 'none';
      signInContainer.style.display = 'block';
    }
  
    if (overlayContainerMobile) {
      overlayContainerMobile.style.display = this.isMobileView ? 'block' : 'none';
    }
  }

  showSignUp() {
    const container = document.getElementById('container') as HTMLElement;
    if (container) {
      container.classList.add('right-panel-active');
    }
    
    const signUpContainer = document.getElementById('signUpContainer') as HTMLElement;
    const signInContainer = document.getElementById('signInContainer') as HTMLElement;
    const overlayContainerMobile = document.getElementById('overlayContainerMobile') as HTMLElement;
  
    if (signUpContainer && signInContainer) {
      signUpContainer.style.display = 'block';
      signInContainer.style.display = 'none';
    }
  
    if (overlayContainerMobile) {
      overlayContainerMobile.style.display = this.isMobileView ? 'block' : 'none';
    }
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