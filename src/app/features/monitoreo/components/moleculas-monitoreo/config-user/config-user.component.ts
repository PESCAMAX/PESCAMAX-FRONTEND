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
    if (this.userId) {
      this.loadUserData();
    } else {
      this.errorMessage = 'No se pudo obtener el ID del usuario';
    }
  }

  loadUserData(): void {
    this.apiService.getCurrentUser().subscribe(
      (data: any) => {
        console.log('Datos recibidos del servidor:', data); // Para depuración
        this.userForm.patchValue({
          username: data.userName || '',
          email: data.email || '',
          phoneNumber: data.phoneNumber || '',
          address: data.address || '',
          farmName: data.farmName || ''
        });
      },
      (error) => {
        console.error('Error loading user data', error);
        this.errorMessage = 'No se pudo cargar la información del usuario';
        this.alertService.showAlert('danger', 'Error', this.errorMessage);
      }
    );
  }

  updateUserData(): void {
    if (this.userForm.valid) {
      const userData = { ...this.userForm.value, id: this.userId };
      this.apiService.updateUser(userData).subscribe(
        (response) => {
          console.log('User data updated successfully', response);
          this.successMessage = 'Datos actualizados correctamente';
          this.errorMessage = '';
          this.alertService.showAlert('info', 'Éxito', this.successMessage);
        },
        (error) => {
          console.error('Error updating user data', error);
          this.errorMessage = 'No se pudieron actualizar los datos';
          this.successMessage = '';
          this.alertService.showAlert('danger', 'Error', this.errorMessage);
        }
      );
    } else {
      this.errorMessage = 'Por favor, complete todos los campos requeridos correctamente';
      this.alertService.showAlert('warning', 'Advertencia', this.errorMessage);
    }
  }

  onMenuToggle(isOpen: boolean) {
    // Lógica para manejar el menú (si es necesario)
  }
}