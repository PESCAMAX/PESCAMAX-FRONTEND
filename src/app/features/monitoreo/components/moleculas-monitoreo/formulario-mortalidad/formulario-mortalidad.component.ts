import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../../services/api-form/api.service';
import { Router } from '@angular/router';
import { AlertService } from '../../../services/api-alert/alert.service';

@Component({
  selector: 'app-formulario-mortalidad',
  templateUrl: './formulario-mortalidad.component.html',
  styleUrls: ['./formulario-mortalidad.component.css']
})
export class FormularioMortalidadComponent implements OnInit {
  mortalidad: any = {
    loteId: null,
    cantidadMuertos: null
  };
  successMessage: string = '';
  errorMessage: string = '';
  lotes: number[] = [];

  constructor(
    private apiService: ApiService,
    private router: Router,
    private alertService: AlertService
  ) {}

  ngOnInit() {
    this.cargarLotes();
  }

  cargarLotes() {
    this.apiService.listarMonitoreo(this.apiService.getUserId()).subscribe({
      next: (data) => {
        if (data && data.response) {
          this.lotes = [...new Set(data.response.map(item => item.LoteID))];
        }
      },
      error: (error) => {
        console.error('Error al cargar los lotes:', error);
      }
    });
  }

  validarLote() {
    if (this.mortalidad.loteId !== null) {
      if (this.mortalidad.loteId < 0) {
        this.errorMessage = 'El lote no puede ser negativo.';
        this.successMessage = '';
      } else if (!this.lotes.includes(this.mortalidad.loteId)) {
        this.errorMessage = 'El lote ingresado no existe.';
        this.successMessage = '';
      } else {
        this.errorMessage = '';
      }
    }
  }

  onSubmit() {
    if (this.validarFormulario()) {
      this.apiService.registrarMortalidad(this.mortalidad).subscribe({
        next: (response: any) => {
          console.log('Mortalidad registrada:', response);
          this.successMessage = 'Mortalidad registrada exitosamente.';
          this.errorMessage = '';
          setTimeout(() => {
            // Limpiar los campos del formulario
            this.mortalidad = {
              loteId: null,
              cantidadMuertos: null
            };
            this.successMessage = '';
            this.router.navigate(['/exito']);
          }, 3000); // Alerta de éxito dura 3 segundos
        },
        error: (error: any) => {
          console.error('Error al registrar mortalidad:', error);
          this.errorMessage = 'Error al registrar mortalidad.';
          this.successMessage = '';
          setTimeout(() => {
            this.errorMessage = '';
          }, 2000); // Alerta de error dura 2 segundos
        }
      });
    }
  }

  validarFormulario(): boolean {
    this.validarLote();
    if (this.errorMessage) {
      return false;
    }
    
    if (!this.validarCantidadMuertos()) {
      return false;
    }
    
    return true;
  }

  validarCantidadMuertos(): boolean {
    if (isNaN(this.mortalidad.cantidadMuertos) || this.mortalidad.cantidadMuertos < 0) {
      this.errorMessage = 'La cantidad de muertos debe ser un número positivo.';
      this.successMessage = '';
      return false;
    }
    return true;
  }
}
