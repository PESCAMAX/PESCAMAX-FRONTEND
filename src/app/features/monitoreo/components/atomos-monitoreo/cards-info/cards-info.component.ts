import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-cards-info',
  templateUrl: './cards-info.component.html',
  styleUrls: ['./cards-info.component.css']
})
export class CardsInfoComponent {
  @Input() title: string = '';
  @Input() value: number | string = '';
  @Input() trend: 'up' | 'down' | 'none' = 'none';
  @Input() trendValue: string = '';

  get cardColor(): string {
    const colorMap: { [key: string]: string } = {
      'Temperatura': 'border-red-500',
      'TDS': 'border-blue-500',
      'pH': 'border-green-500',
      'HORA DEL ULTIMO REGISTRO': 'border-gray-500'
    };
    return colorMap[this.title] || 'border-gray-500';
  }

  get trendIcon(): string {
    return this.trend === 'up' ? '↑' : this.trend === 'down' ? '↓' : '';
  }

  get trendColor(): string {
    return this.trend === 'up' ? 'text-green-500' : 
           this.trend === 'down' ? 'text-red-500' : 
           'text-gray-500';
  }
}