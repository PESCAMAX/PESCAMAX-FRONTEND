import { Component, AfterViewInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../../../features/monitoreo/services/api-login/auth.service';
import { Router } from '@angular/router';



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  encapsulation: ViewEncapsulation.None // Asegúrate de importar esto desde @angular/core
})
export class LoginComponent implements AfterViewInit {
  loginForm!: FormGroup;
  registerForm!: FormGroup;

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
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  ngAfterViewInit() {
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
      this.authService.login(this.loginForm.value).subscribe(
        response => {
          this.router.navigate(['/home']);
        },
        error => {
          console.error('Error en el inicio de sesión', error);
        }
      );
    } else {
      console.log('El formulario de inicio de sesión es inválido');
    }
  }

  onRegister() {
    if (this.registerForm.valid) {
      // Implementa la lógica para el registro de usuario
      console.log('Registrando usuario:', this.registerForm.value);
    } else {
      console.log('El formulario de registro es inválido');
    }
  }

  showSignIn() {
    const container = document.getElementById('container');
    container?.classList.remove('right-panel-active');
  }

  showSignUp() {
    const container = document.getElementById('container');
    container?.classList.add('right-panel-active');
  }
}


// import { Component, AfterViewInit, ViewEncapsulation } from '@angular/core';
// import { FormBuilder, FormGroup, Validators } from '@angular/forms';
// import { AuthService } from '../../../../features/monitoreo/services/api-login/auth.service';
// import { Router } from '@angular/router';

// @Component({
//   selector: 'app-login',
//   templateUrl: './login.component.html',
//   styleUrls: ['./login.component.css'],
//   encapsulation: ViewEncapsulation.None
// })
// export class LoginComponent implements AfterViewInit {
//   loginForm!: FormGroup;
//   registerForm!: FormGroup;

//   constructor(
//     private fb: FormBuilder,
//     private authService: AuthService,
//     private router: Router
//   ) {}

//   ngOnInit() {
//     this.loginForm = this.fb.group({
//       email: ['', [Validators.required, Validators.email]],
//       password: ['', Validators.required]
//     });

//     this.registerForm = this.fb.group({
//       name: ['', Validators.required],
//       email: ['', [Validators.required, Validators.email]],
//       password: ['', Validators.required]
//     });
//   }

//   ngAfterViewInit() {
//     const container = document.getElementById('container');
//     const overlayBtn = document.getElementById('overlayBtn');

//     if (overlayBtn) {
//       overlayBtn.addEventListener('click', () => {
//         container?.classList.toggle('right-panel-active');
//         overlayBtn.classList.remove('btnScaled');
//         window.requestAnimationFrame(() => {
//           overlayBtn.classList.add('btnScaled');
//         });
//       });
//     }
//   }

//   onLogin() {
//     if (this.loginForm.valid) {
//       this.authService.login(this.loginForm.value).subscribe(
//         response => {
//           this.router.navigate(['/home']);
//         },
//         error => {
//           console.error('Error en el inicio de sesión', error);
//         }
//       );
//     } else {
//       console.log('El formulario de inicio de sesión es inválido');
//     }
//   }

//   onRegister() {
//     if (this.registerForm.valid) {
//       // Implementa la lógica para el registro de usuario
//       console.log('Registrando usuario:', this.registerForm.value);
//     } else {
//       console.log('El formulario de registro es inválido');
//     }
//   }

//   showSignIn() {
//     const container = document.getElementById('container');
//     container?.classList.remove('right-panel-active');
//   }

//   showSignUp() {
//     const container = document.getElementById('container');
//     container?.classList.add('right-panel-active');
//   }
// }








// import { Component, OnInit } from '@angular/core';
// import { FormBuilder, FormGroup, Validators } from '@angular/forms';
// import { AuthService } from '../../../../features/monitoreo/services/api-login/auth.service';
// import { Router } from '@angular/router';

// @Component({
//   selector: 'app-login',
//   templateUrl: './login.component.html',
//   styleUrls: ['./login.component.css']
// })
// export class LoginComponent implements OnInit {
//   loginForm!: FormGroup;
//   registerForm!: FormGroup;

//   constructor(
//     private fb: FormBuilder,
//     private authService: AuthService,
//     private router: Router
//   ) {}

//   ngOnInit() {
//     this.loginForm = this.fb.group({
//       email: ['', [Validators.required, Validators.email]],
//       password: ['', Validators.required]
//     });

//     this.registerForm = this.fb.group({
//       name: ['', Validators.required],
//       email: ['', [Validators.required, Validators.email]],
//       password: ['', Validators.required]
//     });
//   }

//   onLogin() {
//     if (this.loginForm.valid) {
//       this.authService.login(this.loginForm.value).subscribe(
//         response => {
//           this.router.navigate(['/home']);
//         },
//         error => {
//           console.error('Error en el inicio de sesión', error);
//         }
//       );
//     } else {
//       console.log('El formulario de inicio de sesión es inválido');
//     }
//   }

//   onRegister() {
//     if (this.registerForm.valid) {
//       // Implementa la lógica para el registro de usuario
//       console.log('Registrando usuario:', this.registerForm.value);
//     } else {
//       console.log('El formulario de registro es inválido');
//     }
//   }

//   showSignIn() {
//     document.getElementById('container')?.classList.remove('right-panel-active');
//   }

//   showSignUp() {
//     document.getElementById('container')?.classList.add('right-panel-active');
//   }
// }





// import { Component, OnInit } from '@angular/core';
// import { AuthService } from '../../../../features/monitoreo/services/api-login/auth.service';
// import { FormBuilder, FormGroup, Validators } from '@angular/forms';
// import { Router } from '@angular/router';

// @Component({
//   selector: 'app-login',
//   templateUrl: './login.component.html',
//   styleUrls: ['./login.component.css']
// })
// export class LoginComponent implements  OnInit {

//   successMessage: string = '';
//   errorMessage: string = '';
//   loginForm!: FormGroup;

//   constructor(
//     private fb: FormBuilder,
//     private authService: AuthService,
//     private router: Router // Inyección del servicio Router
//   ) {}

//   ngOnInit() {
//     this.loginForm = this.fb.group({
//       username: ['', Validators.required],
//       password: ['', Validators.required]
//     });
//   }

//   onLogin() {
//     if (this.loginForm.valid) {
//       console.log('Intentando iniciar sesión con:', this.loginForm.value);

//       // Llamada al servicio de autenticación
//       this.authService.login(this.loginForm.value).subscribe(
//         response => {
//           console.log('Inicio de sesión exitoso', response);

//           // Redirigir a la página de Gráfica General
//           this.router.navigate(['/home/+ userId']);
//         },
//         error => {
//           console.error('Error en el inicio de sesión', error);
//           if (error.error instanceof ErrorEvent) {
//             this.errorMessage = Error: ${error.error.message};
//           } else {
//             this.errorMessage = Código de Error: ${error.status}\nMensaje: ${error.message};
//           }
//         }
//       );
//     } else {
//       console.log('El formulario es inválido', this.loginForm.errors);
//       this.errorMessage = 'Por favor, complete todos los campos requeridos';
//     }
//   }
// }











































// @Component({
//   selector: 'app-login',
//   templateUrl: './login.component.html',
//   styleUrls: ['./login.component.css'],
//   encapsulation: ViewEncapsulation.None
// })
// export class LoginComponent implements AfterViewInit {
//   ngAfterViewInit() {
//     const container = document.getElementById('container');
//     const overlayBtn = document.getElementById('overlayBtn');

//     overlayBtn?.addEventListener('click', () => {
//       container?.classList.toggle('right-panel-active');
//       overlayBtn.classList.remove('btnScaled');
//       window.requestAnimationFrame(() => {
//         overlayBtn.classList.add('btnScaled');
//       });
//     });
//   }
// }
