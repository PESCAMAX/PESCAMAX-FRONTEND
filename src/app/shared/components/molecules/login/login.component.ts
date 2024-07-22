import { Component } from '@angular/core';
import { AuthService } from '../../../../features/monitoreo/services/api-login/auth.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
isPasswordVisible: any;
togglePassword() {
throw new Error('Method not implemented.');
}
  username: string = '';
  password: string = '';
  successMessage: string = '';
  errorMessage: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  onLogin() {
    const user = { username: this.username, password: this.password };
    this.authService.login(user).subscribe(
      (response) => {
        if (response.success) {
          this.successMessage = response.message || 'Login successful!';
          setTimeout(() => {
            this.router.navigate(['/crear-especie']);
          }, 2000);
        } else {
          this.errorMessage = response.message || 'Invalid username or password.';
        }
      },
      (error) => {
        this.errorMessage = 'An error occurred during login.';
      }
    );
  }
}



