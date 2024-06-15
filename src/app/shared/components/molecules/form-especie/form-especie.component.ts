import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '../../../../features/monitoreo/services/api-form/api.service';

@Component({
  selector: 'app-form-especie',
  templateUrl: './form-especie.component.html',
  styleUrls: ['./form-especie.component.css']
})
export class FormEspecieComponent implements OnInit {
  especieForm!: FormGroup;

  constructor(private fb: FormBuilder, private apiService: ApiService) { }

  ngOnInit(): void {
    this.especieForm = this.fb.group({
      nombreEspecie: ['', Validators.required],
      tdsSeguro: ['', Validators.required],
      tdsPeligroso: ['', Validators.required],
      temperaturaSeguro: ['', Validators.required],
      temperaturaPeligroso: ['', Validators.required],
      phSeguro: ['', Validators.required],
      phPeligroso: ['', Validators.required]
    });
  }

  onSubmit(): void {
    if (this.especieForm.valid) {
      this.apiService.crearEspecie(this.especieForm.value).subscribe(
        response => {
          console.log('Especie creada', response);
        },
        error => {
          console.error('Error al crear la especie', error);
        }
      );
    }
  }
}
