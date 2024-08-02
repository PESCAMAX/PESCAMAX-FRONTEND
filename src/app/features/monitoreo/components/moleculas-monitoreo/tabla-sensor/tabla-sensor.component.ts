import { Component, OnInit, Input } from '@angular/core';
import { ApiService, Monitoreo } from '../../../services/api-form/api.service';
import { AuthService } from '../../../../../core/services/api-login/auth.service';

@Component({
  selector: 'app-tabla-sensor',
  templateUrl: './tabla-sensor.component.html',
  styleUrls: ['./tabla-sensor.component.css']
})
export class TablaSensorComponent implements OnInit {
  @Input() data: any[] = [];
  monitoreoData: Monitoreo[] = [];
  filteredData: Monitoreo[] = [];
  isLoading: boolean = false;

  constructor(private apiService: ApiService, private AuthService: AuthService) {}

  ngOnInit(): void {
    this.cargarDatos();
  }
  ngOnChanges(): void {
    this.filteredData = [...this.data];
  }

  cargarDatos(): void {
    this.isLoading = true;
    this.apiService.listarMonitoreo(this.AuthService.getUserId()).subscribe(
      (response: { response: Monitoreo[] }) => {
        this.monitoreoData = response.response;
        this.actualizarFiltrado();
        this.isLoading = false;
      },
      (error) => {
        console.error('Error al obtener los datos de monitoreo:', error);
        this.isLoading = false;
      }
    );
  }

  actualizarFiltrado(loteSeleccionado: number | null = null): void {
    if (loteSeleccionado) {
      this.filteredData = this.monitoreoData.filter(item => item.LoteID === loteSeleccionado);
    } else {
      this.filteredData = [...this.monitoreoData];
    }
  }

  onLoteSeleccionado(lote: number | null): void {
    this.actualizarFiltrado(lote);
  }
}