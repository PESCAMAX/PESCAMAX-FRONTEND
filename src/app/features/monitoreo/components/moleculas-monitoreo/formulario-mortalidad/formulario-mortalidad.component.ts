import { Component } from '@angular/core';
import { ApiService } from '../../../services/api-form/api.service';
import { Router } from '@angular/router';
import { AlertService } from '../../../services/api-alert/alert.service'; // Asegúrate de importar el servicio de alerta

@Component({
  selector: 'app-formulario-mortalidad',
  templateUrl: './formulario-mortalidad.component.html',
  styleUrls: ['./formulario-mortalidad.component.css']
})
export class FormularioMortalidadComponent {
  mortalidad: any = {}; // Asegúrate de definir el tipo adecuado para mortalidad

  constructor(private apiService: ApiService, private router: Router, private alertService: AlertService) {}

  onSubmit() {
    this.apiService.registrarMortalidad(this.mortalidad).subscribe(
      response => {
        console.log('Mortalidad registrada:', response);
        // Mostrar mensaje de éxito
        this.alertService.showSuccess('Mortalidad registrada exitosamente.');
        // Redirigir a la ruta de éxito
        this.router.navigate(['/exito']); // Actualiza la ruta según tu estructura de proyecto
      },
      error => {
        console.error('Error al registrar mortalidad:', error);
        // Mostrar mensaje de error
        this.alertService.showError('Error al registrar mortalidad.');
      }
    );
  }
}