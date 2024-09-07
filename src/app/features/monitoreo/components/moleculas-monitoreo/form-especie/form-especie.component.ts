import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl, ValidationErrors } from '@angular/forms';
import { ApiService } from '../../../services/api-form/api.service';
import { AuthService } from '../../../../../core/services/api-login/auth.service';

@Component({
  selector: 'app-form-especie',
  templateUrl: './form-especie.component.html',
  styleUrls: ['./form-especie.component.css']
})
export class EspecieFormComponent implements OnInit {
  especieForm: FormGroup;
  successMessage: string = '';
  errorMessage: string = '';

  constructor(
    private fb: FormBuilder, 
    private apiService: ApiService,
    private authService: AuthService
  ) {
    this.especieForm = this.fb.group({
      nombreEspecie: ['', [Validators.required, Validators.pattern(/^[a-zA-Z\s]*$/)]],
      tdsMinimo: ['', [Validators.required, this.numberValidator]],
      tdsMaximo: ['', [Validators.required, this.numberValidator]],
      temperaturaMinimo: ['', [Validators.required, this.numberValidator]],
      temperaturaMaximo: ['', [Validators.required, this.numberValidator]],
      phMinimo: ['', [Validators.required, this.numberValidator, Validators.min(0)]],
      phMaximo: ['', [Validators.required, this.numberValidator, Validators.min(0)]],
    }, { validators: [this.minMaxValidator] });
  }

  ngOnInit(): void {}

  onSubmit(): void {
    this.especieForm.updateValueAndValidity();
    if (this.especieForm.valid) {
      const username = this.authService.getUserId();
      if (!username) {
        this.showError('No se pudo obtener el nombre de usuario. Por favor, inicie sesión nuevamente.');
        return;
      }
      this.apiService.crearEspecie(username, this.especieForm.value).subscribe({
        next: (response) => {
          this.showSuccess('Especie guardada exitosamente');
          this.especieForm.reset();
        },
        error: (error) => {
          this.showError(error.message || 'Error al guardar la especie');
        }
      });
    } else {
      this.showError('Revise los datos del formulario. Algunos campos tienen errores.');
      this.validateAllFormFields(this.especieForm);
    }
  }

  showSuccess(message: string): void {
    this.successMessage = message;
    setTimeout(() => {
      this.successMessage = '';
    }, 3000);
  }

  showError(message: string): void {
    this.errorMessage = message;
    setTimeout(() => {
      this.errorMessage = '';
    }, 3000);
  }

  numberValidator(control: AbstractControl): ValidationErrors | null {
    if (isNaN(Number(control.value))) {
      return { notANumber: true };
    }
    return null;
  }

  minMaxValidator(group: FormGroup): ValidationErrors | null {
    const fields = ['tds', 'temperatura', 'ph'];
    let hasError = false;

    fields.forEach(field => {
      const min = parseFloat(group.get(`${field}Minimo`)?.value);
      const max = parseFloat(group.get(`${field}Maximo`)?.value);

      if (min === max) {
        group.get(`${field}Maximo`)?.setErrors({ equal: 'Los valores no pueden ser iguales' });
        hasError = true;
      } else if (max <= min) {
        group.get(`${field}Maximo`)?.setErrors({ minMax: `El ${field} máximo debe ser mayor que el mínimo` });
        hasError = true;
      } else {
        group.get(`${field}Maximo`)?.setErrors(null);
      }
    });

    return hasError ? { minMaxError: true } : null;
  }

  getErrorMessage(controlName: string): string {
    const control = this.especieForm.get(controlName);
    if (control && control.errors) {
      if (control.errors['required']) {
        return 'Este campo es requerido.';
      }
      if (control.errors['min']) {
        return 'El valor debe ser mayor que cero.';
      }
      if (control.errors['pattern']) {
        return 'Solo se permiten letras en este campo.';
      }
      if (control.errors['notANumber']) {
        return 'Este campo solo acepta números.';
      }
      if (control.errors['equal']) {
        return control.errors['equal'];
      }
      if (control.errors['minMax']) {
        return control.errors['minMax'];
      }
    }
    return '';
  }

  validateAllFormFields(formGroup: FormGroup): void {
    Object.keys(formGroup.controls).forEach(field => {
      const control = formGroup.get(field);
      if (control instanceof FormGroup) {
        this.validateAllFormFields(control);
      } else {
        control?.markAsTouched({ onlySelf: true });
        control?.updateValueAndValidity();
      }
    });
  }
}