import { Component, OnInit } from '@angular/core';
import { Chart } from 'chart.js/auto';
import { ApiService } from '../../../../features/monitoreo/services/api-form/api.service';

@Component({
  selector: 'app-graficastdss',
  templateUrl: './graficastdss.component.html',
  styleUrls: ['./graficastdss.component.css']
})
export class GraficastdssComponent implements OnInit {

  public chart: any;

  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    this.loadDataAndCreateChart();
  }

  loadDataAndCreateChart() {
    this.apiService.listarMonitoreo().subscribe(
      (data) => {
        const labels = data.response.map(item => new Date(item.FechaHora).toLocaleDateString());
        const tdsData = data.response.map(item => item.tds);
        const temperaturaData = data.response.map(item => item.temperatura);
        const phData = data.response.map(item => item.ph);

        this.createChart(labels, tdsData, temperaturaData, phData);
      },
      (error) => {
        console.error('Error loading data', error);
      }
    );
  }

  createChart(labels: string[], tdsData: number[], temperaturaData: number[], phData: number[]) {
    this.chart = new Chart("MyChart", {
      type: 'line',
      data: {
        labels: labels,
        datasets: [
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
          x: {
            display: true,
            title: {
              display: true,
              text: 'Fecha'
            }
          },
          y: {
            display: true,
            title: {
              display: true,
              text: 'Valor'
            }
          }
        }
      }
    });
  }
}
