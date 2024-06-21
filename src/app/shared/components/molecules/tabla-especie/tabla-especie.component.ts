import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../../../features/monitoreo/services/api-form/api.service';

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

  constructor(private apiService: ApiService) {}

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
}
