import { Component } from '@angular/core';
import { AuthService } from '../../../../features/monitoreo/services/api-login/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  username = '';
  password = '';

  constructor(private authService: AuthService, private router: Router) { }

  login() {
    const user = { username: this.username, password: this.password };
    this.authService.login(user).subscribe(
      response => {
        localStorage.setItem('token', response.token);
        this.router.navigate(['/']);
      },
      error => console.error('Error logging in', error)
    );
  }
}

