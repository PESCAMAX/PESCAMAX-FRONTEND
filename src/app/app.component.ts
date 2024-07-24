import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from './features/monitoreo/services/api-form/api.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  especieForm: FormGroup;

  constructor(private fb: FormBuilder, private apiService: ApiService) {
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
      const username = localStorage.getItem('username');
      if (!username) {
        console.error('No se encontró el nombre de usuario');
        return;
      }
      this.apiService.crearEspecie(username, this.especieForm.value).subscribe(
        response => {
          console.log('Especie creada', response);
          // Aquí puedes manejar la respuesta como quieras, como mostrar un mensaje de éxito
        },
        error => {
          console.error('Error al crear la especie', error);
          // Aquí puedes manejar el error, como mostrar un mensaje de error
        }
      );
    }
  }
}