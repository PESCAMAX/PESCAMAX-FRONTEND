import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../../../core/services/api-login/auth.service';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit {
  changePasswordForm: FormGroup;
  userId!: string;
  errorMessage: string = '';
  successMessage: string = '';

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.changePasswordForm = this.fb.group({
      currentPassword: ['', Validators.required],
      newPassword: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required]
    }, { validator: this.passwordMatchValidator });
  }

  ngOnInit() {
    this.userId = this.authService.getUserId();
    if (!this.userId) {
      this.router.navigate(['/login']);
    }
  }

  passwordMatchValidator(g: FormGroup) {
    const newPassword = g.get('newPassword');
    const confirmPassword = g.get('confirmPassword');
    return newPassword && confirmPassword && newPassword.value === confirmPassword.value
      ? null : { 'mismatch': true };
  }

  onSubmit() {
    if (this.changePasswordForm.valid) {
      const { currentPassword, newPassword } = this.changePasswordForm.value;
      this.authService.changePassword(currentPassword, newPassword).subscribe(
        () => {
          this.successMessage = 'Password changed successfully!';
          this.router.navigate(['/crear-especie', this.userId]);
        },
        (error) => {
          console.error('Error changing password:', error);
          this.errorMessage = 'Error changing password. Please try again.';
        }
      );
    }
  }
}