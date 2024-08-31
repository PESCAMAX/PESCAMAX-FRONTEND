import { Component, OnInit, OnDestroy, HostListener } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ApiService } from '../../../services/api-form/api.service';
import { AlertService } from '../../../services/api-alert/alert.service';
import { AuthService } from '../../../../../core/services/api-login/auth.service';
import { Subscription, timer } from 'rxjs';

@Component({
  selector: 'app-config-user',
  templateUrl: './config-user.component.html',
  styleUrls: ['./config-user.component.css']
})
export class ConfigUserComponent implements OnInit, OnDestroy {
  userId!: string;
  userForm: FormGroup;
  successMessage: string = '';
  errorMessage: string = '';
  originalUserData: any;
  private alertSubscription: Subscription | null = null;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private apiService: ApiService,
    private alertService: AlertService
  ) {
    this.userForm = this.fb.group({
      phoneNumber: [''],
      address: [''],
      farmName: ['']
    });
  }

  ngOnInit(): void {
    this.userId = this.authService.getUserId();
    this.loadUserData();
  }

  ngOnDestroy(): void {
    if (this.alertSubscription) {
      this.alertSubscription.unsubscribe();
    }
  }

  @HostListener('document:click')
  @HostListener('document:input')
  onDocumentInteraction() {
    this.dismissAlert();
  }

  loadUserData(): void {
    this.apiService.getCurrentUser().subscribe(
      (data: any) => {
        this.originalUserData = {
          phoneNumber: data.phoneNumber || '',
          address: data.address || '',
          farmName: data.farmName || ''
        };
        this.userForm.patchValue(this.originalUserData);
      },
      (error) => {
        console.error('Error loading user data', error);
        this.showError('No se pudo cargar la información del usuario');
      }
    );
  }

  updateUserData(): void {
    const changedData: any = {};
    let hasChanges = false;

    Object.keys(this.userForm.controls).forEach(key => {
      const currentValue = this.userForm.get(key)?.value;
      if (currentValue !== this.originalUserData[key] && currentValue !== '') {
        changedData[key] = currentValue;
        hasChanges = true;
      }
    });

    // Limpiar el formulario inmediatamente después de presionar el botón
    this.clearForm();

    if (hasChanges) {
      this.apiService.updateUser(changedData).subscribe(
        (response) => {
          console.log('User data updated successfully', response);
          this.showSuccess('Datos actualizados correctamente');
          this.loadUserData(); // Recargar los datos actualizados
        },
        (error) => {
          console.error('Error updating user data', error);
          this.showError('No se pudieron actualizar los datos');
        }
      );
    } else {
      this.showSuccess('No se realizaron cambios');
    }
  }

  clearForm(): void {
    this.userForm.reset({
      phoneNumber: '',
      address: '',
      farmName: ''
    });
  }

  showSuccess(message: string): void {
    this.successMessage = message;
    this.errorMessage = '';
    this.alertService.showSuccess(message);
    this.setAlertTimeout();
  }

  showError(message: string): void {
    this.errorMessage = message;
    this.successMessage = '';
    this.alertService.showError(message);
    this.setAlertTimeout();
  }

  setAlertTimeout(): void {
    if (this.alertSubscription) {
      this.alertSubscription.unsubscribe();
    }
    this.alertSubscription = timer(3000).subscribe(() => {
      this.dismissAlert();
    });
  }

  dismissAlert(): void {
    this.successMessage = '';
    this.errorMessage = '';
    this.alertService.clearAlert();
    if (this.alertSubscription) {
      this.alertSubscription.unsubscribe();
    }
  }
}
