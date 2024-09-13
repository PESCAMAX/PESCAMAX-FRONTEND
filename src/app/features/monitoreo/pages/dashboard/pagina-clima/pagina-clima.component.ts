import { Component, OnInit } from '@angular/core';
import { ClimaService } from '../../../services/clima/clima.service';
import { AuthService } from '../../../../../core/services/api-login/auth.service';

@Component({
  selector: 'app-pagina-clima',
  templateUrl: './pagina-clima.component.html',
  styleUrls: ['./pagina-clima.component.css']
})
export class PaginaClimaComponent implements OnInit {
  climaData: any[] = [];
  currentPage: number = 1;
  pageSize: number = 10;
  totalItems: number = 0;
  userId: string = '';

  constructor(private climaService: ClimaService, private authService: AuthService) {
    this.userId = this.authService.getUserId();
  }

  ngOnInit(): void {
    this.cargarDatosClima();
  }

  cargarDatosClima(): void {
    this.climaService.obtenerClimaPaginado(this.userId, this.currentPage, this.pageSize).subscribe(
      (response: any) => {
        this.climaData = response.items;
        this.totalItems = response.totalItems;
      },
      (error: any) => console.error('Error al cargar los datos del clima', error)
    );
  }
  get totalPages(): number {
    return Math.ceil(this.totalItems / this.pageSize);
  }
  onPageChange(page: number): void {
    this.currentPage = page;
    this.cargarDatosClima();
  }
}