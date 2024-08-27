import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '../../../services/api-form/api.service';
import { AlertService } from '../../../services/api-alert/alert.service';
import { AuthService } from '../../../../../core/services/api-login/auth.service';

@Component({
  selector: 'app-config-user',
  templateUrl: './config-user.component.html',
  styleUrls: ['./config-user.component.css']
})
export class ConfigUserComponent implements OnInit {
  userId!: string;
  userForm: FormGroup;
  successMessage: string = '';
  errorMessage: string = '';

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private apiService: ApiService,
    private alertService: AlertService
  ) {
    this.userForm = this.fb.group({
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phoneNumber: [''],
      address: [''],
      farmName: ['']
    });
  }

  ngOnInit(): void {
    this.userId = this.authService.getUserId();
    this.loadUserData();
  }

  loadUserData(): void {
    this.apiService.getCurrentUser().subscribe(
      (data: any) => {
        this.userForm.patchValue({
          username: data.userName,
          email: data.email,
          phoneNumber: data.phoneNumber,
          address: data.address,
          farmName: data.farmName
        });
      },
      (error) => {
        console.error('Error loading user data', error);
        this.errorMessage = 'No se pudo cargar la información del usuario';
        this.alertService.showError(this.errorMessage);
      }
    );
  }

  updateUserData(): void {
    if (this.userForm.valid) {
      const userData = {
        id: this.userId,
        userName: this.userForm.get('username')?.value,
        email: this.userForm.get('email')?.value,
        phoneNumber: this.userForm.get('phoneNumber')?.value,
        address: this.userForm.get('address')?.value,
        farmName: this.userForm.get('farmName')?.value
      };

      this.apiService.updateUser(userData).subscribe(
        (response) => {
          console.log('User data updated successfully', response);
          this.successMessage = 'Datos actualizados correctamente';
          this.errorMessage = '';
          this.alertService.showSuccess(this.successMessage);
        },
        (error) => {
          console.error('Error updating user data', error);
          this.errorMessage = 'No se pudieron actualizar los datos';
          this.successMessage = '';
          this.alertService.showError(this.errorMessage);
        }
      );
    }
  }
}