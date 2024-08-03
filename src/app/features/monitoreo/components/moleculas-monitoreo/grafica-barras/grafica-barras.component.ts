import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import { Chart, ChartConfiguration, ChartTypeRegistry } from 'chart.js/auto';
import { Monitoreo } from '../../../services/api-form/api.service';

@Component({
  selector: 'app-grafica-barras',
  templateUrl: './grafica-barras.component.html',
  styleUrl: './grafica-barras.component.css'
})
export class GraficaBarrasComponent implements OnInit, OnChanges {
  @Input() data: Monitoreo[] = [];
  @Input() selectedLote: number | null = null;
  chart: Chart | undefined;

  ngOnInit() {
    this.createChart();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['data'] || changes['selectedLote']) {
      if (this.chart) {
        this.chart.destroy();
      }
      this.createChart();
    }
  }

  createChart() {
    const chartData = this.processData();

    const config: ChartConfiguration<'bar'> = {
      type: 'bar',
      data: chartData,
      options: {
        responsive: true,
        plugins: {
          legend: {
            position: 'top',
          },
          title: {
            display: true,
            text: 'Valores Mínimos y Máximos Diarios'
          }
        },
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    };

    const ctx = document.getElementById('myChart') as HTMLCanvasElement;
    this.chart = new Chart(ctx, config);
  }

  processData() {
    let filteredData = this.data;
    if (this.selectedLote !== null) {
      filteredData = this.data.filter(item => item.LoteID === this.selectedLote);
    }

    const dailyData: { [key: string]: { temp: number[], ph: number[], tds: number[] } } = {};

    filteredData.forEach(item => {
      const date = new Date(item.FechaHora).toISOString().split('T')[0];
      if (!dailyData[date]) {
        dailyData[date] = { temp: [], ph: [], tds: [] };
      }
      dailyData[date].temp.push(item.Temperatura);
      dailyData[date].ph.push(item.PH);
      dailyData[date].tds.push(item.tds);
    });

    const labels = Object.keys(dailyData).sort();
    const tempData = labels.map(date => {
      const temps = dailyData[date].temp;
      return [Math.min(...temps), Math.max(...temps)] as [number, number];
    });
    const phData = labels.map(date => {
      const phs = dailyData[date].ph;
      return [Math.min(...phs), Math.max(...phs)] as [number, number];
    });
    const tdsData = labels.map(date => {
      const tdss = dailyData[date].tds;
      return [Math.min(...tdss), Math.max(...tdss)] as [number, number];
    });

    return {
      labels: labels,
      datasets: [
        {
          label: 'Temperatura',
          data: tempData,
          backgroundColor: 'rgba(255, 99, 132, 0.5)',
        },
        {
          label: 'pH',
          data: phData,
          backgroundColor: 'rgba(54, 162, 235, 0.5)',
        },
        {
          label: 'TDS',
          data: tdsData,
          backgroundColor: 'rgba(75, 192, 192, 0.5)',
        }
      ]
    };
  }
}