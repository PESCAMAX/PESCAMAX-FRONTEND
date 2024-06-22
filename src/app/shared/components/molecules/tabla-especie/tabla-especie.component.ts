import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../../../features/monitoreo/services/api-form/api.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';

interface Especie {
  id: number;
  nombreEspecie: string;
  tdsMinimo: number;
  tdsMaximo: number;
  temperaturaMinimo: number;
  temperaturaMaximo: number;
  phMinimo: number;
  phMaximo: number;
}

@Component({
  selector: 'app-tabla-especie',
  templateUrl: './tabla-especie.component.html',
  styleUrls: ['./tabla-especie.component.css']
})
export class TablaEspecieComponent implements OnInit {
  especies: Especie[] = [];
  especiesFiltradas: Especie[] = [];
  searchText: string = '';

  showAlert: boolean = false;
  alertType: 'success' | 'danger' | 'warning' = 'success';
  alertTitle: string = '';
  alertContent: string = '';
  alertConfirmAction: (() => void) | null = null;
  alertCancelAction: (() => void) | null = null;

  especieForm: FormGroup;
  especieSeleccionada: Especie | null = null;

  constructor(private apiService: ApiService, private fb: FormBuilder) {
    this.especieForm = this.fb.group({
      nombreEspecie: ['', Validators.required],
      tdsMinimo: ['', Validators.required],
      tdsMaximo: ['', Validators.required],
      temperaturaMinimo: ['', Validators.required],
      temperaturaMaximo: ['', Validators.required],
      phMinimo: ['', Validators.required],
      phMaximo: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.obtenerEspecies();
  }

  actualizarEspecies(): void {
    this.obtenerEspecies();
  }

  obtenerEspecies(): void {
    this.apiService.listarEspecies().subscribe(
      (response: Especie[]) => {
        this.especies = response;
        this.filtrarEspecies();
      },
      (error) => {
        console.error('Error al obtener las especies:', error);
        this.mostrarAlerta('danger', 'Error', 'Error al obtener las especies');
      }
    );
  }

  filtrarEspecies(): void {
    if (this.searchText) {
      this.especiesFiltradas = this.especies.filter(especie =>
        especie.nombreEspecie.toLowerCase().includes(this.searchText.toLowerCase())
      );
    } else {
      this.especiesFiltradas = this.especies;
    }
  }

  eliminarEspecie(id: number): void {
    this.mostrarAlertaConfirmacion(id);
  }

  mostrarAlertaConfirmacion(id: number): void {
    this.showAlert = true;
    this.alertType = 'warning';
    this.alertTitle = 'Confirmar eliminación';
    this.alertContent = '¿Estás seguro de que deseas eliminar esta especie?';
    this.alertConfirmAction = () => this.confirmarEliminacion(id);
    this.alertCancelAction = () => this.cancelarEliminacion();
  }

  confirmarEliminacion(id: number): void {
    this.apiService.eliminarEspecie(id).subscribe(
      () => {
        this.obtenerEspecies();
        this.mostrarAlerta('success', 'Éxito', 'Especie eliminada correctamente');
      },
      (error) => {
        console.error('Error al eliminar la especie:', error);
        this.mostrarAlerta('danger', 'Error', 'Error al eliminar la especie');
      }
    );
  }

  cancelarEliminacion(): void {
    this.mostrarAlerta('danger', 'Cancelado', 'La eliminación de la especie ha sido cancelada');
  }

  mostrarAlerta(type: 'success' | 'danger' | 'warning', title: string, content: string): void {
    this.showAlert = true;
    this.alertType = type;
    this.alertTitle = title;
    this.alertContent = content;
    this.alertConfirmAction = null;
    this.alertCancelAction = null;

    setTimeout(() => {
      this.cerrarAlerta();
    }, 5000);
  }

  cerrarAlerta(): void {
    this.showAlert = false;
  }

  editarEspecie(especie: Especie): void {
    this.especieSeleccionada = especie;
    this.especieForm.patchValue(especie);
  }

  onSubmit(): void {
    if (this.especieForm.valid) {
      if (this.especieSeleccionada) {
        this.modificarEspecie();
      } else {
        // Código para crear especie
      }
    }
  }

  modificarEspecie(): void {
    if (this.especieSeleccionada) {
      const especieModificada: Especie = {
        ...this.especieSeleccionada,
        ...this.especieForm.value
      };
      console.log('Datos de la especie a modificar:', especieModificada);
      this.apiService.modificarEspecie(especieModificada).subscribe(
        () => {
          this.obtenerEspecies();
          this.mostrarAlerta('success', 'Éxito', 'Especie modificada correctamente');
          this.especieSeleccionada = null;
          this.especieForm.reset();
        },
        (error: HttpErrorResponse) => {
          console.error('Error al modificar la especie:', error);
          let mensajeError = 'Error al modificar la especie';
          if (error.error instanceof ErrorEvent) {
            // Error del lado del cliente
            mensajeError += `: ${error.error.message}`;
          } else {
            // El backend retornó un código de error
            mensajeError += `: ${error.status}, ${error.error}`;
          }
          this.mostrarAlerta('danger', 'Error', mensajeError);
        }
      );
    }
  }
}
