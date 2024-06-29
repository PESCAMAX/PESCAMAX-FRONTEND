import { Component, OnInit } from '@angular/core';

import { Chart } from 'chart.js/auto';

@Component({
  selector: 'app-graficas-temperatura',
  templateUrl: './graficas-temperatura.component.html',
  styleUrl: './graficas-temperatura.component.css'
})
export class GraficasTemperaturaComponent implements OnInit {


  
  public chart: any;

  ngOnInit(): void {
    this.createChart();
  }


  createChart(){
  
    this.chart = new Chart("MyChart", {
      type: 'line', //this denotes tha type of chart

      data: {// values on X-Axis
        labels: ['2022-05-10', 
                 '2022-05-11', 
                 '2022-05-12',
                 '2022-05-13',
								 '2022-05-14',
                 '2022-05-15', 
                 '2022-05-16',
                 '2022-05-17', 
                 '2024-06-27',
                 
                ], 
	       datasets: [
          {
            label: "Sales",
            data: ['467','576', '572', '79', '92','574', '573', '576'],
            backgroundColor: 'pink'
          },
          {
            label: "Profit",
            data: ['542', '542', '536', '327', '17','0.00', '538', '541'],
            backgroundColor: 'black'
          },
          {
            label: "Profit",
            data: ['542', '542', '536', '327', '17','0.00', '538', '541'],
            backgroundColor: 'blue'
          },
          {
            label: "Sales",
            data: ['467','576', '572', '79', '92','574', '573', '576'],
            backgroundColor: 'yellow'
          }
        ]
      },
      options: {
        aspectRatio:2.5
      }
      
    });
  }
}
