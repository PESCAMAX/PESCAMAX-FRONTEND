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
  isMobileView: boolean = false;

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

    this.checkViewportSize();
    window.addEventListener('resize', this.checkViewportSize.bind(this));
  }

  ngAfterViewInit() {
    this.updateFormVisibility();
  }

  ngOnDestroy() {
    window.removeEventListener('resize', this.checkViewportSize.bind(this));
  }

  checkViewportSize() {
    this.isMobileView = window.innerWidth < 768;
    this.updateFormVisibility();
  }

  onLogin() {
    if (this.loginForm.valid) {
      this.authService.login(this.loginForm.value).subscribe({
        next: (response) => {
          this.showTemporaryMessage('Inicio de sesión exitoso', false);
          this.router.navigate(['/home', response.userId]);
        },
        error: (error) => this.handleError(error)
      });
    }
  }

  onRegister() {
    if (this.registerForm.valid) {
      this.authService.register(this.registerForm.value).subscribe({
        next: (response) => {
          this.showTemporaryMessage('Registro exitoso. Por favor, inicie sesión.', false);
          this.showSignIn();
        },
        error: (error) => this.handleError(error)
      });
    }
  }

  private handleError(error: any) {
    const errorMsg = error.error instanceof ErrorEvent
      ? `Error: ${error.error.message}`
      : `Código de Error: ${error.status}\nMensaje: ${error.message}`;
    
    this.showTemporaryMessage(errorMsg, true);
  }

  showSignIn() {
    this.isLoginVisible = true;
    this.updateFormVisibility();
  }

  showSignUp() {
    this.isLoginVisible = false;
    this.updateFormVisibility();
  }

  toggleForm() {
    this.isLoginVisible = !this.isLoginVisible;
    this.updateFormVisibility();
  }

  private updateFormVisibility() {
    const container = document.getElementById('container');
    const signInContainer = document.querySelector('.sign-in-container') as HTMLElement;
    const signUpContainer = document.querySelector('.sign-up-container') as HTMLElement;

    if (this.isMobileView) {
      // Mobile view logic
      if (this.isLoginVisible) {
        signInContainer?.classList.add('active');
        signUpContainer?.classList.remove('active');
      } else {
        signInContainer?.classList.remove('active');
        signUpContainer?.classList.add('active');
      }
    } else {
      // Desktop view logic
      if (container) {
        if (this.isLoginVisible) {
          container.classList.remove('right-panel-active');
        } else {
          container.classList.add('right-panel-active');
        }
      }
    }
  }

  private showTemporaryMessage(message: string, isError: boolean, duration: number = 2000) {
    this.successMessage = !isError ? message : '';
    this.errorMessage = isError ? message : '';

    setTimeout(() => this.clearMessages(), duration);
  }

  private clearMessages() {
    this.successMessage = '';
    this.errorMessage = '';
  }
}