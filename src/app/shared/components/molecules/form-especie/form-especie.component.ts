import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
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
  especies: any[] = [];
  constructor(private fb: FormBuilder, private apiService: ApiService) {
    this.especieForm = this.fb.group({
      nombreEspecie: ['', Validators.required],
      tdsSeguro: ['', Validators.required],
      tdsPeligroso: ['', Validators.required],
      temperaturaSeguro: ['', Validators.required],
      temperaturaPeligroso: ['', Validators.required],
      phSeguro: ['', Validators.required],
      phPeligroso: ['', Validators.required],
    });
  }

  ngOnInit(): void {}

  onSubmit(): void {
    if (this.especieForm.valid) {
      this.apiService.crearEspecie(this.especieForm.value).subscribe(
        response => {
          this.showSuccess('Especie guardada exitosamente');
        },
        error => {
          this.showError('Error al guardar la especie');
        }
      );
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
}
