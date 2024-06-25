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
  Password = '';
  successMessage = '';
  errorMessage = '';

  constructor(private authService: AuthService, private router: Router) { }

  register() {
    const user = { Username: this.Username, Email: this.Email, Password: this.Password };
    this.authService.register(user).subscribe(
      response => {
        this.successMessage = 'User registered successfully';
        this.errorMessage = '';
        console.log('User registered successfully', response);
        // Redirigir al usuario al login después del registro exitoso
        this.router.navigate(['/login']);
      },
      error => {
        this.errorMessage = 'Error registering user';
        this.successMessage = '';
        console.error('Error registering user', error);
      }
    );
  }
}
