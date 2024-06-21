import { Component } from '@angular/core';
import { AuthService } from '../../../../features/monitoreo/services/api-login/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  username = '';
  email = '';
  password = '';

  successMessage = '';
  errorMessage = '';

  constructor(private authService: AuthService) { }

  register() {
    const user = { username: this.username, email: this.email, password: this.password };
    this.authService.register(user).subscribe(
      response => {
        this.successMessage = 'User registered successfully';
        this.errorMessage = '';
      },
      error => {
        this.successMessage = '';
        this.errorMessage = 'Error registering user. Please try again.';
        console.error('Error registering user', error);
      }
    );
  }
}
