import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../../../features/monitoreo/services/api-form/api.service';

interface Especie {
  id: number;
  nombreEspecie: string;
  tdsseguro: number;
  tdspeligroso: number;
  temperaturaseguro: number;
  temperaturapeligroso: number;
  phseguro: number;
  phpeligroso: number;
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
        this.especies = response.map(especie => ({
          id: especie.id,
          nombreEspecie: especie.nombreEspecie,
          tdsseguro: especie.tdsseguro !== undefined && especie.tdsseguro !== null ? parseFloat(especie.tdsseguro.toString()) : 0,
          tdspeligroso: especie.tdspeligroso !== undefined && especie.tdspeligroso !== null ? parseFloat(especie.tdspeligroso.toString()) : 0,
          temperaturaseguro: especie.temperaturaseguro !== undefined && especie.temperaturaseguro !== null ? parseFloat(especie.temperaturaseguro.toString()) : 0,
          temperaturapeligroso: especie.temperaturapeligroso !== undefined && especie.temperaturapeligroso !== null ? parseFloat(especie.temperaturapeligroso.toString()) : 0,
          phseguro: especie.phseguro !== undefined && especie.phseguro !== null ? parseFloat(especie.phseguro.toString()) : 0,
          phpeligroso: especie.phpeligroso !== undefined && especie.phpeligroso !== null ? parseFloat(especie.phpeligroso.toString()) : 0,
        }));
        this.filtrarEspecies(); // Filtra las especies una vez que se obtienen
      },
      (error) => {
        console.error('Error al obtener las especies:', error);
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
    this.apiService.eliminarEspecie(id).subscribe(
      () => {
        console.log('Especie eliminada correctamente');
        this.obtenerEspecies(); // Vuelve a cargar las especies después de eliminar una
        alert('Especie eliminada correctamente'); // Alerta de éxito
      },
      (error) => {
        console.error('Error al eliminar la especie:', error);
        alert('Error al eliminar la especie'); // Alerta de error
      }
    );
  }

  editarEspecie(especie: Especie): void {
    this.apiService.modificarEspecie(especie.id, especie).subscribe(
      () => {
        console.log('Especie modificada correctamente');
        alert('Especie modificada correctamente'); // Alerta de éxito
        this.obtenerEspecies(); // Vuelve a cargar las especies después de modificar una
      },
      (error) => {
        console.error('Error al modificar la especie:', error);
        alert('Error al modificar la especie'); // Alerta de error
      }
    );
  }
}
