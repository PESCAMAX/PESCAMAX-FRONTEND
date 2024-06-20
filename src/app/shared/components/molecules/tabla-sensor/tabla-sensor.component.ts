// src/app/shared/components/molecules/tabla-sensor/tabla-sensor.component.ts
import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../../../features/monitoreo/services/api-form/api.service';

@Component({
  selector: 'app-tabla-sensor',
  templateUrl: './tabla-sensor.component.html',
  styleUrls: ['./tabla-sensor.component.css']
})
export class TablaSensorComponent implements OnInit {
  monitoreoData: any[] = [];

  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    this.apiService.listarMonitoreo().subscribe(
      (response: any) => {
        console.log(response); // Añade este log para depurar
        if (response.mensaje === 'ok') {
          this.monitoreoData = response.response;
        } else {
          console.error('Error al obtener los datos de monitoreo:', response.mensaje);
        }
      },
      (error) => {
        console.error('Error al obtener los datos de monitoreo:', error);
      }
    );
  }
}
