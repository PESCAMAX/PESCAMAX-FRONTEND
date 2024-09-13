import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '../../../services/api-form/api.service';
import { AuthService } from '../../../../../core/services/api-login/auth.service';
import { HttpErrorResponse} from '@angular/common/http';
import { Subscription } from 'rxjs';

interface Especie {
  Id: number;
  NombreEspecie: string;
  TdsMinimo: number;
  TdsMaximo: number;
  TemperaturaMinimo: number;
  TemperaturaMaximo: number;
  PhMinimo: number;
  PhMaximo: number;
  Cantidad?: number;
  UserId: string;
}

interface AlertState {
  show: boolean;
  type: 'success' | 'danger' | 'warning';
  title: string;
  content: string;
  iconColor: 'red' | 'green';
}

@Component({
  selector: 'app-tabla-especie',
  templateUrl: './tabla-especie.component.html',
  styleUrls: ['./tabla-especie.component.css']
})
export class TablaEspecieComponent implements OnInit {
  
  isMenuOpen: boolean = false;
  especies: Especie[] = [];
  especiesFiltradas: Especie[] = [];
  searchText: string = '';

  alertConfirmAction: (() => void) | null = null;
  alertCancelAction: () => void = () => this.cerrarAlerta();

  alertState: AlertState = {
    show: false,
    type: 'warning',
    title: '',
    content: '',
    iconColor: 'red'
  };

  especieForm: FormGroup;
  especieSeleccionada: Especie | null = null;

  constructor(private apiService: ApiService, private fb: FormBuilder, private authService: AuthService) {
    this.especieForm = this.fb.group({
      NombreEspecie: ['', Validators.required],
      TdsMinimo: ['', Validators.required],
      TdsMaximo: ['', Validators.required],
      TemperaturaMinimo: ['', Validators.required],
      TemperaturaMaximo: ['', Validators.required],
      PhMinimo: ['', Validators.required],
      PhMaximo: ['', Validators.required],
      Cantidad: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.obtenerEspecies();
  }
  handleConfirm(): void {
    // Lógica para manejar la confirmación
    console.log('Confirmación manejada');
  }

  cerrarModal(): void {
    this.especieSeleccionada = null;
    this.especieForm.reset();
  }

  obtenerEspecies(): void {
    this.apiService.listarEspecies(this.authService.getUserId()).subscribe(
      (response: Especie[]) => { 
        this.especies = response;
        this.filtrarEspecies();
      },
      (error) => {
        console.error('Error al obtener las especies:', error);
        this.mostrarAlerta('danger', 'Error', 'Error al obtener las especies', 'red');
      }
    ) as Subscription;
  }

  filtrarEspecies(): void {
    if (this.searchText) {
      this.especiesFiltradas = this.especies.filter(especie =>
        especie.NombreEspecie.toLowerCase().includes(this.searchText.toLowerCase())
      );
    } else {
      this.especiesFiltradas = this.especies;
    }
  }

  eliminarEspecie(id: number): void {
    this.mostrarAlertaConfirmacion(id);
  }

  mostrarAlertaConfirmacion(id: number): void {
    this.alertState = {
      show: true,
      type: 'warning',
      title: 'Confirmar eliminación',
      content: '¿Estás seguro de eliminar la especie?',
      iconColor: 'red'
    };
    this.alertConfirmAction = () => this.confirmarEliminacion(id);
    this.alertCancelAction = () => this.cancelarEliminacion();
  }

  confirmarEliminacion(id: number): void {
    this.apiService.eliminarEspecie(id).subscribe(
      () => {
        this.obtenerEspecies();
        this.mostrarAlerta('success', 'Éxito', 'La especie fue borrada exitosamente', 'green');
      },
      (error) => {
        console.error('Error al eliminar la especie:', error);
        this.mostrarAlerta('danger', 'Error', 'Error al eliminar la especie', 'red');
      }
    );
  }

  cancelarEliminacion(): void {
    this.mostrarAlerta('danger', 'Cancelado', 'Has cancelado la eliminación', 'red');
  }

  mostrarAlerta(type: 'success' | 'danger' | 'warning', title: string, content: string, iconColor: 'red' | 'green'): void {
    this.alertState = {
      show: true,
      type,
      title,
      content,
      iconColor
    };

    setTimeout(() => {
      this.cerrarAlerta();
    }, 3000);
  }

  cerrarAlerta(): void {
    this.alertState.show = false;
  }

  editarEspecie(especie: Especie) {
    this.especieSeleccionada = especie;
    this.especieForm.patchValue(especie);
  }

  onSubmit(): void {
    if (this.especieForm.valid && this.especieSeleccionada) {
      this.modificarEspecie();
    }
  }

  modificarEspecie(): void {
    if (this.especieSeleccionada) {
      const especieModificada: Especie = {
        ...this.especieSeleccionada,
        ...this.especieForm.value,
        UserId: this.authService.getUserId()
      };
      console.log('Datos de la especie a modificar:', especieModificada);
      this.apiService.modificarEspecie(especieModificada).subscribe(
        () => {
          this.obtenerEspecies();
          this.mostrarAlerta('success', 'Éxito', 'Especie modificada correctamente', 'green');
          this.especieSeleccionada = null;
          this.especieForm.reset();
        },
        (error: HttpErrorResponse) => {
          console.error('Error al modificar la especie:', error);
          let mensajeError = 'Error al modificar la especie';
          if (error.error instanceof ErrorEvent) {
            mensajeError += `: ${error.error.message}`;
          } else {
            mensajeError += `: ${error.status}, ${error.error}`;
          }
          this.mostrarAlerta('danger', 'Error', mensajeError, 'red');
        }
      );
    }
  }

  handleAlertCancel(): void {
    if (this.alertCancelAction) {
      this.alertCancelAction();
    }
  }
}