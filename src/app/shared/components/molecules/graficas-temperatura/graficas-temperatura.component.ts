import { Component, OnInit } from '@angular/core';
import { Chart } from 'chart.js/auto';
import { ApiService } from '../../../../features/monitoreo/services/api-form/api.service';// Importar el servicio

@Component({
  selector: 'app-grafica-temperatura',
  templateUrl: './graficas-temperatura.component.html',
  styleUrls: ['./graficas-temperatura.component.css']
})
export class GraficasTemperaturaComponent implements OnInit {

  public chart: any;

  constructor(private apiService: ApiService) {} // Inyectar el servicio

  ngOnInit(): void {
    this.apiService.listarMonitoreo().subscribe(data => {
      const labels = data.response.map(item => item.fechaHora);
      const temperaturas = data.response.map(item => item.temperatura);
      this.createChart(labels, temperaturas);
    });
  }

  createChart(labels: string[], temperaturas: number[]) {
    this.chart = new Chart("MyChart", {
      type: 'line', //this denotes the type of chart
      data: {
        labels: labels,
        datasets: [
          {
            label: "Temperatura",
            data: temperaturas,
            backgroundColor: 'pink'
          }
        ]
      },
      options: {
        aspectRatio: 2.5
      }
    });
  }
}
