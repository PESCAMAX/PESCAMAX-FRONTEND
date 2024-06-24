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
      nombreEspecie: ['', Validators.required],
      tdsMinimo: ['', [Validators.required, Validators.min(1), this.notEqualValidator('tdsMaximo')]],
      tdsMaximo: ['', [Validators.required, Validators.min(1), this.notEqualValidator('tdsMinimo')]],
      temperaturaMinimo: ['', [Validators.required, Validators.min(1), this.notEqualValidator('temperaturaMaximo')]],
      temperaturaMaximo: ['', [Validators.required, Validators.min(1), this.notEqualValidator('temperaturaMinimo')]],
      phMinimo: ['', [Validators.required, Validators.min(1), this.notEqualValidator('phMaximo')]],
      phMaximo: ['', [Validators.required, Validators.min(1), this.notEqualValidator('phMinimo')]],
    }, { validators: [this.formGroupNotEqualValidator] });
  }

  ngOnInit(): void {}

  onSubmit(): void {
    if (this.especieForm.valid) {
      this.apiService.crearEspecie(this.especieForm.value).subscribe(
        response => {
          this.showSuccess('Especie guardada exitosamente');
          this.especieForm.reset(); // Reinicia el formulario después de guardar
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

  notEqualValidator(otherControlName: string) {
    return (control: AbstractControl): ValidationErrors | null => {
      const formGroup = control.parent as FormGroup;
      if (!formGroup) return null;

      const otherControl = formGroup.controls[otherControlName];
      if (!otherControl) return null;

      const controlValue = control.value;
      const otherControlValue = otherControl.value;

      // Asegurarse de que ambos valores estén presentes antes de realizar la validación
      return (controlValue == null || otherControlValue == null)
        ? null
        : controlValue === otherControlValue
        ? { notEqual: 'Los valores no pueden ser iguales.' }
        : otherControlName === 'tdsMinimo' && controlValue < otherControlValue
        ? { notGreater: 'El TDS máximo no puede ser menor que el TDS mínimo.' }
        : otherControlName === 'temperaturaMinimo' && controlValue < otherControlValue
        ? { notGreater: 'La temperatura máxima no puede ser menor que la temperatura mínima.' }
        : otherControlName === 'phMinimo' && controlValue < otherControlValue
        ? { notGreater: 'El pH máximo no puede ser menor que el pH mínimo.' }
        : null;
    };
  }

  formGroupNotEqualValidator(group: FormGroup): ValidationErrors | null {
    const controls = group.controls;
    for (const name in controls) {
      if (controls.hasOwnProperty(name)) {
        const control = controls[name];
        if (control.errors && (control.errors['notEqual'] || control.errors['notGreater'])) {
          return { notEqualOrGreater: true };
        }
      }
    }
    return null;
  }

  getErrorMessage(controlName: string): string {
    const control = this.especieForm.get(controlName);
    if (control && control.errors) {
      if (control.errors['required']) {
        return 'Este campo es requerido.';
      }
      if (control.errors['notEqual']) {
        return control.errors['notEqual'];
      }
      if (control.errors['notGreater']) {
        return control.errors['notGreater'];
      }
      if (control.errors['min']) {
        return 'El valor debe ser mayor que cero.';
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
