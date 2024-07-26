import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import * as d3 from 'd3';
import { ApiService } from '../../../../features/monitoreo/services/api-form/api.service';
import { AuthService } from '../../../../features/monitoreo/services/api-login/auth.service';

@Component({
  selector: 'app-graph-ph',
  templateUrl: './graph-ph.component.html',
  styleUrls: ['./graph-ph.component.css']
})
export class GraphPhComponent implements OnInit {
  public lotes: number[] = [];
  public selectedLote: number | null = null;
  private startDate: Date | null = null;
  private endDate: Date | null = null;
  isMenuOpen: boolean = true;

  @ViewChild('chartContainer', { static: true }) chartContainer!: ElementRef;

  constructor(private apiService: ApiService, private authService: AuthService) {}

  ngOnInit(): void {
    this.loadLotes();
  }

  loadLotes() {
    this.apiService.listarMonitoreo(this.authService.getUserId()).subscribe({
      next: (data) => {
        console.log('Datos recibidos:', data);
        if (data && data.response) {
          this.lotes = [...new Set(data.response.map(item => item.LoteID))];
          console.log('Lotes disponibles:', this.lotes);
          if (this.lotes.length > 0) {
            this.selectedLote = this.lotes[0];
            this.loadDataAndCreateChart();
          }
        } else {
          console.error('La respuesta no tiene el formato esperado:', data);
        }
      },
      error: (error) => console.error('Error al cargar lotes:', error)
    });
  }

  onLoteChange(event: Event) {
    const selectElement = event.target as HTMLSelectElement;
    this.selectedLote = parseInt(selectElement.value, 10);
    this.loadDataAndCreateChart();
  }

  onDateRangeSelected(event: { startDate: Date, endDate: Date }): void {
    this.startDate = event.startDate;
    this.endDate = event.endDate;
    this.loadDataAndCreateChart();
  }

  onMenuToggle(isOpen: boolean) {
    this.isMenuOpen = isOpen;
  }

  loadDataAndCreateChart() {
    if (this.selectedLote === null) return;

    this.apiService.listarMonitoreo(this.authService.getUserId()).subscribe({
      next: (data) => {
        if (data && data.response) {
          const filteredData = data.response.filter(item => item.LoteID === this.selectedLote);
          console.log('Datos filtrados:', filteredData);
          const phValues = filteredData.map(item => item.PH);
          const fechas = filteredData.map(item => new Date(item.FechaHora).toLocaleString());
          console.log('PH Values:', phValues);
          console.log('Fechas:', fechas);
          this.createChart(fechas, phValues);
        } else {
          console.error('La respuesta no tiene el formato esperado:', data);
        }
      },
      error: (error) => console.error('Error al cargar datos para el gráfico:', error)
    });
  }

  createChart(labels: string[], data: number[]) {
    const element = this.chartContainer.nativeElement;
    d3.select(element).selectAll('*').remove(); // Limpiar el contenedor del gráfico

    const width = 928;
    const height = 600;
    const marginTop = 10;
    const marginRight = 20;
    const marginBottom = 30;
    const marginLeft = 40;

    const svg = d3.select(element)
      .append('svg')
      .attr('width', width)
      .attr('height', height)
      .attr('viewBox', `0 0 ${width} ${height}`)
      .attr('style', 'max-width: 100%; height: auto;');

    const x = d3.scaleTime()
      .domain(d3.extent(labels, d => new Date(d)) as [Date, Date])
      .rangeRound([marginLeft, width - marginRight]);

    const y = d3.scaleLog()
      .domain(d3.extent(data) as [number, number])
      .rangeRound([height - marginBottom - 20, marginTop]);

    const line = d3.line<number>()
      .defined((d: number, i: number) => !isNaN(new Date(labels[i]).getTime()) && !isNaN(d))
      .x((d: number, i: number) => x(new Date(labels[i])) as number)
      .y((d: number) => y(d) as number);

    svg.append('g')
      .attr('transform', `translate(0,${height - marginBottom})`)
      .call(d3.axisBottom(x).ticks(width / 80))
      .call(g => g.select('.domain').remove());

    svg.append('g')
      .attr('transform', `translate(${marginLeft},0)`)
      .call(d3.axisLeft(y).tickValues(d3.ticks(...(y.domain() as [number, number]), 10)).tickFormat(d3.format('~')))
      .call(g => g.select('.domain').remove())
      .call(g => g.selectAll('.tick line').clone()
          .attr('x2', width - marginLeft - marginRight)
          .attr('stroke-opacity', 0.1))
      .call(g => g.select('.tick:last-of-type text').clone()
          .attr('x', 3)
          .attr('text-anchor', 'start')
          .attr('font-weight', 'bold')
          .text('↑ Daily close ($)'));

    svg.append('g')
      .attr('fill', 'none')
      .attr('stroke-width', 1.5)
      .attr('stroke-linejoin', 'round')
      .attr('stroke-linecap', 'round')
      .selectAll('path')
      .data([data])
      .enter().append('path')
      .attr('stroke', 'green')
      .attr('d', line);
  }
}
