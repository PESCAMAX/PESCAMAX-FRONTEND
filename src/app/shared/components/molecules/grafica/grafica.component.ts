import { Component, OnInit } from '@angular/core';
import { Chart } from 'chart.js/auto';
import { ApiService } from '../../../../features/monitoreo/services/api-form/api.service'; // Asegúrate de importar tu servicio

@Component({
  selector: 'app-grafica',
  templateUrl: './grafica.component.html',
  styleUrls: ['./grafica.component.css']
})
export class GraficaComponent implements OnInit {

  public chart: any;

  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    this.apiService.listarMonitoreo().subscribe(data => {
      const fechas = data.response.map(item => item.fechaHora);
      const temperaturas = data.response.map(item => item.temperatura);
      const phs = data.response.map(item => item.ph);
      const tdss = data.response.map(item => item.tds); // Actualizamos para TDS
      this.createChart(fechas, temperaturas, phs, tdss);
    });
  }

  createChart(labels: string[], tempData: number[], phData: number[], tdsData: number[]) {
    this.chart = new Chart("MyChart", {
      type: 'line',
      data: {
        labels: labels,
        datasets: [
          {
            label: "Temperatura",
            data: tempData,
            backgroundColor: 'red',
            borderColor: 'red',
            fill: false
          },
          {
            label: "pH",
            data: phData,
            backgroundColor: 'green',
            borderColor: 'green',
            fill: false
          },
          {
            label: "TDS",
            data: tdsData,
            backgroundColor: 'blue',
            borderColor: 'blue',
            fill: false
          }
        ]
      },
      options: {
        aspectRatio: 2.5,
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    });
  }
}
