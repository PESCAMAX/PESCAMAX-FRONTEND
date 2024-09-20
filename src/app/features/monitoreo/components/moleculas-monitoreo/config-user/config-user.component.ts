import { Component, OnInit, OnDestroy, HostListener } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ApiService } from '../../../services/api-form/api.service';
import { AlertService } from '../../../services/api-alert/alert.service';
import { AuthService } from '../../../../../core/services/api-login/auth.service';
import { Subscription, timer } from 'rxjs';
import { take } from 'rxjs/operators';

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
      farmName: [''],
      city: ['']
    });
  }

  ngOnInit(): void {
    this.userId = this.authService.getUserId();
    this.loadUserData();
  }

  ngOnDestroy(): void {
    this.dismissAlert();
  }

  @HostListener('document:click')
  @HostListener('document:input')
  onDocumentInteraction() {
    this.dismissAlert();
  }

  loadUserData(): void {
    this.apiService.getCurrentUser().pipe(take(1)).subscribe({
      next: (data: any) => {
        this.originalUserData = {
          phoneNumber: data.phoneNumber || '',
          address: data.address || '',
          farmName: data.farmName || '',
          city: data.city || ''
        };
        this.userForm.patchValue(this.originalUserData);
      },
      error: (error) => {
        console.error('Error loading user data', error);
        this.showError('No se pudo cargar la información del usuario');
      }
    });
  }

  updateUserData(): void {
    const changedData = this.getChangedData();

    if (Object.keys(changedData).length > 0) {
      this.apiService.updateUser(changedData).pipe(take(1)).subscribe({
        next: (response) => {
          console.log('User data updated successfully', response);
          this.showSuccess('Datos actualizados correctamente');
          this.loadUserData(); // Recargar los datos actualizados
        },
        error: (error) => {
          console.error('Error updating user data', error);
          this.showError('No se pudieron actualizar los datos');
        }
      });
    } else {
      this.showSuccess('No se realizaron cambios');
    }
    
    // Limpiar el formulario después de intentar actualizar
    this.clearForm();
  }

  private getChangedData(): any {
    return Object.keys(this.userForm.controls).reduce((acc, key) => {
      const currentValue = this.userForm.get(key)?.value;
      if (currentValue !== this.originalUserData[key] && currentValue !== '') {
        acc[key] = currentValue;
      }
      return acc;
    }, {} as any);
  }

  clearForm(): void {
    this.userForm.reset({
      phoneNumber: '',
      address: '',
      farmName: '',
      city: ''
    });
  }

  showSuccess(message: string): void {
    this.successMessage = message;
    this.setAlertTimeout();
  }

  showError(message: string): void {
    this.errorMessage = message;
    this.setAlertTimeout();
  }

  setAlertTimeout(): void {
    this.dismissAlert();
    this.alertSubscription = timer(3000).pipe(take(1)).subscribe(() => {
      this.dismissAlert();
    });
  }
  colombianCities: string[] = [
    'Arauca', 'Armenia', 'Barranquilla', 'Bogotá', 'Bucaramanga', 'Cali', 'Cartagena', 
    'Cúcuta', 'Florencia', 'Ibagué', 'Leticia', 'Manizales', 'Medellín', 'Mitú', 'Mocoa', 
    'Montería', 'Neiva', 'Pasto', 'Pereira', 'Popayán', 'Puerto Carreño', 'Puerto Inírida', 
    'Quibdó', 'Riohacha', 'San Andrés', 'San José del Guaviare', 'Santa Marta', 'Sincelejo', 
    'Tunja', 'Valledupar', 'Villavicencio', 'Yopal'
  ];
  dismissAlert(): void {
    this.successMessage = '';
    this.errorMessage = '';
    this.alertService.clearAlert();
    if (this.alertSubscription) {
      this.alertSubscription.unsubscribe();
      this.alertSubscription = null;
    }
  }
}