import { Component, OnInit } from '@angular/core';
import { BubbleController, Chart } from 'chart.js/auto';

@Component({
  selector: 'app-graficas',
  templateUrl: './graficas.component.html',
  styleUrl: './graficas.component.css'
})
export class GraficasComponent implements OnInit {
  public Chart: Chart | undefined;

  ngOnInit(): void {
    
    const data = {
      labels: ['Lunes', 'Martes',  'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo'],
      datasets: [
        {
          label: 'Estadísticas',
          data: [70, 100, 80, 50, 40, 34],
          fill: false,
          borderColor: '#ff0000',
          tension: 0.4
        },
        {
          label: 'Estadísticas',
          data: [],
          fill: false,
          borderColor: '##ff0000',
          tension: 0.1
        },
        {
          label: 'Estadísticas',
          data: [0, 2, 1, 0, 6, 10, 0],
          fill: false,
          borderColor: '#ff0000',
          tension: 0.1
        }   
      ]
    };

    const options = {
      scales: {
        x: {
          ticks: {
            font: {
              size: 10 // Tamaño de fuente para las etiquetas del eje x
            }
          }
        },
        y: {
          ticks: {
            font: {
              size: 10 // Tamaño de fuente para las etiquetas del eje y
            }
          }
        }
      },
      plugins: {
        legend: {
          labels: {
            font: {
              size: 16 // Tamaño de fuente para las etiquetas de la leyenda
            }
          }
        }
      }
    };
    
    this.Chart = new Chart("chart", {
      type: 'bar',
      data: data,
      options: options
    })
  }

}
