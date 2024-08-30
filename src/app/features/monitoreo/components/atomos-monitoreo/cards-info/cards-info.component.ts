import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-cards-info',
  templateUrl: './cards-info.component.html',
  styleUrls: ['./cards-info.component.css']
})
export class CardsInfoComponent implements OnChanges {
  @Input() title: string = '';
  @Input() value: number | string = '';
  @Input() trend: 'up' | 'down' | 'none' = 'none';
  @Input() trendValue: string = '';
  @Input() status: 'good' | 'bad' | 'unassigned' = 'unassigned';
  @Input() isTimeCard: boolean = false;
  @Input() selectedLot: string = ''; // Agregar esta línea
  @Input() mortalidadPorLote: any[] = []; // Agregar esta línea para los datos de mortalidad

  previousValue: number | string = '';

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['value']) {
      this.previousValue = changes['value'].previousValue;
    }
  }

  get cardColor(): string {
    const colorMap: { [key: string]: string } = {
      'good': 'border-green-500',
      'bad': 'border-red-500',
      'unassigned': 'border-blue-500'
    };
    return colorMap[this.status] || 'border-gray-500';
  }

  get trendIcon(): string {
    const iconMap: { [key: string]: string } = {
      'up': '↑',
      'down': '↓',
      'none': ''
    };
    return iconMap[this.trend] || '';
  }

  get trendColor(): string {
    const colorMap: { [key: string]: string } = {
      'up': 'text-green-500',
      'down': 'text-red-500',
      'none': 'text-gray-500'
    };
    return colorMap[this.trend] || 'text-gray-500';
  }
}