import { Component, OnInit } from '@angular/core';
import { Chart } from 'chart.js/auto';
import { ApiService } from '../../../../features/monitoreo/services/api-form/api.service';// Asegúrate de importar tu servicio

@Component({
  selector: 'app-graph-ph',
  templateUrl: './graph-ph.component.html',
  styleUrls: ['./graph-ph.component.css']
})
export class GraphPhComponent implements OnInit {

  public chart: any;

  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    this.apiService.listarMonitoreo().subscribe(data => {
      const phValues = data.response.map(item => item.ph);
      const fechas = data.response.map(item => item.fechaHora);
      this.createChart(fechas, phValues);
    });
  }

  createChart(labels: string[], data: number[]) {
    this.chart = new Chart("MyChart", {
      type: 'line',
      data: {
        labels: labels,
        datasets: [
          {
            label: "pH",
            data: data,
            backgroundColor: 'green'
          }
        ]
      },
      options: {
        aspectRatio: 2.5
      }
    });
  }
}
