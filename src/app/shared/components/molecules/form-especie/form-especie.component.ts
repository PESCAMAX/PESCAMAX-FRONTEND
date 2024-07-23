import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl, ValidationErrors } from '@angular/forms';
import { ApiService } from '../../../../features/monitoreo/services/api-form/api.service';

@Component({
  selector: 'app-form-especie',
  templateUrl: './form-especie.component.html',
  styleUrls: ['./form-especie.component.css']
})
export class EspecieFormComponent implements OnInit {
  especieForm: FormGroup;
  successMessage: string = '';
  errorMessage: string = '';

  constructor(private fb: FormBuilder, private apiService: ApiService) {
    this.especieForm = this.fb.group({
      nombreEspecie: ['', [Validators.required, Validators.pattern(/^[a-zA-Z\s]*$/)]],
      tdsMinimo: ['', [Validators.required, Validators.min(1), this.numberValidator]],
      tdsMaximo: ['', [Validators.required, Validators.min(1), this.numberValidator]],
      temperaturaMinimo: ['', [Validators.required, Validators.min(1), this.numberValidator]],
      temperaturaMaximo: ['', [Validators.required, Validators.min(1), this.numberValidator]],
      phMinimo: ['', [Validators.required, Validators.min(0), Validators.max(14), this.numberValidator]],
      phMaximo: ['', [Validators.required, Validators.min(0), Validators.max(14), this.numberValidator]],
    }, { validators: [this.minMaxValidator] });
  }

  ngOnInit(): void {}

  onSubmit(): void {
    this.especieForm.updateValueAndValidity();
    if (this.especieForm.valid) {
      this.apiService.crearEspecie(this.especieForm.value).subscribe(
        response => {
          this.showSuccess('Especie guardada exitosamente');
          this.especieForm.reset();
        },
        error => {
          this.showError(error.error.message || 'Error al guardar la especie');
        }
      );
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
    if (isNaN(control.value)) {
      return { notANumber: true };
    }
    return null;
  }

  minMaxValidator(group: FormGroup): ValidationErrors | null {
    const tdsMin = parseFloat(group.get('tdsMinimo')?.value);
    const tdsMax = parseFloat(group.get('tdsMaximo')?.value);
    const tempMin = parseFloat(group.get('temperaturaMinimo')?.value);
    const tempMax = parseFloat(group.get('temperaturaMaximo')?.value);
    const phMin = parseFloat(group.get('phMinimo')?.value);
    const phMax = parseFloat(group.get('phMaximo')?.value);
    let hasError = false;

  if (tdsMax <= tdsMin) {
    group.get('tdsMaximo')?.setErrors({ minMax: 'El TDS máximo debe ser mayor que el mínimo' });
    hasError = true;
  } else {
    group.get('tdsMaximo')?.setErrors(null);
  }

  if (tempMax <= tempMin) {
    group.get('temperaturaMaximo')?.setErrors({ minMax: 'La temperatura máxima debe ser mayor que la mínima' });
    hasError = true;
  } else {
    group.get('temperaturaMaximo')?.setErrors(null);
  }

  if (phMax <= phMin) {
    group.get('phMaximo')?.setErrors({ minMax: 'El pH máximo debe ser mayor que el mínimo' });
    hasError = true;
  } else {
    group.get('phMaximo')?.setErrors(null);
  }

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
      if (control.errors['max']) {
        return 'El valor debe ser menor o igual a 14.';
      }
      if (control.errors['pattern']) {
        return 'Solo se permiten letras en este campo.';
      }
      if (control.errors['notANumber']) {
        return 'Este campo solo acepta números.';
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