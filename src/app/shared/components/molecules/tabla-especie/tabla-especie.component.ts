import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ApiService } from '../../../../features/monitoreo/services/api-form/api.service';

interface Especie {
  id: any;
  nombreEspecie: string;
  tdsseguro: Int32Array;
  tdspeligroso: number;
  temperaturaseguro: Float64Array;
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

  constructor(private http: HttpClient, private apiService: ApiService) {}

  ngOnInit(): void {
    this.obtenerEspecies();
  }
  actualizarEspecies(): void {
    this.obtenerEspecies();
  }
  
  obtenerEspecies(): void {
    this.http.get<any>('http://localhost:6754/CrearEspecie/Listar').subscribe(
      (response) => {
        // Convertir las cadenas a números
        response.forEach((especie: any) => {
            especie.tdsseguro = especie.tdsseguro !== null && especie.tdsseguro !== '' ? parseFloat(especie.tdsseguro) : 0;
            especie.tdspeligroso = especie.tdspeligroso !== null && especie.tdspeligroso !== '' ? parseFloat(especie.tdspeligroso) : 0;
            especie.temperaturaseguro = especie.temperaturaseguro !== null && especie.temperaturaseguro !== '' ? parseFloat(especie.temperaturaseguro) : 0;
            especie.temperaturapeligroso = especie.temperaturapeligroso !== null && especie.temperaturapeligroso !== '' ? parseFloat(especie.temperaturapeligroso) : 0;
            especie.phseguro = especie.phseguro !== null && especie.phseguro !== '' ? parseFloat(especie.phseguro) : 0;
            especie.phpeligroso = especie.phpeligroso !== null && especie.phpeligroso !== '' ? parseFloat(especie.phpeligroso) : 0;
          });
    
        this.especies = response; // Suponiendo que la respuesta de tu API es un array de especies
        this.filtrarEspecies(); // Filtra las especies una vez que se obtienen
      },
      (error) => {
        console.error('Error al obtener las especies:', error);
      }
    );
  }

  filtrarEspecies(): void {
    // Implementa la lógica para filtrar las especies según el valor de searchText
    if (this.searchText) {
      this.especiesFiltradas = this.especies.filter(especie =>
        especie.nombreEspecie.toLowerCase().includes(this.searchText.toLowerCase())
      );
    } else {
      this.especiesFiltradas = this.especies;
    }
  }

  eliminarEspecie(id: number): void {
    this.http.delete(`http://localhost:6754/CrearEspecie/Eliminar/${id}`).subscribe(
      () => {
        console.log('Especie eliminada correctamente');
        this.obtenerEspecies(); // Vuelve a cargar las especies después de eliminar una
      },
      (error) => {
        console.error('Error al eliminar la especie:', error);
      }
    );
  }

  editarEspecie(especie: Especie): void {
    this.http.put(`http://localhost:6754/CrearEspecie/Modificar/${especie.id}`, especie).subscribe(
      () => {
        console.log('Especie modificada correctamente');
        // Puedes actualizar la lista de especies o realizar otras acciones después de editar
      },
      (error) => {
        console.error('Error al modificar la especie:', error);
      }
    );
  }
  
}
