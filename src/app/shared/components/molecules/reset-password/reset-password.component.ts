import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../../../features/monitoreo/services/api-login/auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {
  resetPasswordForm: FormGroup;
  token: string | null = null;
  email: string | null = null;

  constructor(
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.resetPasswordForm = this.fb.group({
      email: [{ value: '', disabled: true }, [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.token = params['token'];
      this.email = params['email'];
      console.log("Token:", this.token);
      console.log("Email:", this.email);
      this.resetPasswordForm.get('email')?.setValue(this.email);
    });
  }

  onSubmit(): void {
    if (this.resetPasswordForm.valid && this.token && this.email) {
      const password = this.resetPasswordForm.get('password')?.value;
      const confirmPassword = this.resetPasswordForm.get('confirmPassword')?.value;

      if (password !== confirmPassword) {
        alert("Las contraseñas no coinciden.");
        return;
      }

      console.log("Enviando solicitud de restablecimiento de contraseña con token:", this.token);

      this.authService.resetPassword(this.email, this.token, password).subscribe(
        response => {
          alert("Contraseña restablecida exitosamente.");
          this.router.navigate(['/login']);
        },
        error => {
          alert("Error al restablecer la contraseña.");
          console.error(error);
        }
      );
    } else {
      alert("Por favor complete el formulario correctamente.");
    }
  }
}
