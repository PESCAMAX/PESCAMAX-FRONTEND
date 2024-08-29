import { Component, OnInit, OnDestroy, HostListener } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
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
      phoneNumber: ['', Validators.required],
      address: ['', Validators.required],
      farmName: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.userId = this.authService.getUserId();
    this.loadUserData();
  }

  ngOnDestroy(): void {
    this.clearAlertTimeout();
  }

  @HostListener('document:click')
  @HostListener('document:keydown')
  onInteraction() {
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

    if (hasChanges) {
      changedData.id = this.userId;

      this.apiService.updateUser(changedData).subscribe(
        (response) => {
          console.log('User data updated successfully', response);
          this.showSuccess('Datos actualizados correctamente');
          this.loadUserData();
        },
        (error) => {
          console.error('Error updating user data', error);
          this.showError('No se pudieron actualizar los datos');
        }
      );
    } else {
      this.showError('No se han realizado cambios');
    }
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
    this.clearAlertTimeout();
    this.alertSubscription = timer(2000).subscribe(() => {
      this.dismissAlert();
    });
  }

  dismissAlert(): void {
    this.successMessage = '';
    this.errorMessage = '';
    this.alertService.clearAlert();
    this.clearAlertTimeout();
  }

  private clearAlertTimeout(): void {
    if (this.alertSubscription) {
      this.alertSubscription.unsubscribe();
      this.alertSubscription = null;
    }
  }
}
