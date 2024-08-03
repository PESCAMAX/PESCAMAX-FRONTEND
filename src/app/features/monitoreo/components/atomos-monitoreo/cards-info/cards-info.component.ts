import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-cards-info',
  templateUrl: './cards-info.component.html',
  styleUrl: './cards-info.component.css'
})
export class CardsInfoComponent {
  @Input() title: string = '';
  @Input() value: number = 0;
  @Input() trend: 'up' | 'down' | 'none' = 'none';
  @Input() cardClass: string = '';

  get cardColor(): string {
    const colorMap: { [key: string]: string } = {
      'Temperatura': 'border-red-500',
      'TDS': 'border-blue-500',
      'pH': 'border-green-500'
    };
    return colorMap[this.title] || 'border-gray-500';
  }

  get trendIcon(): string {
    switch (this.trend) {
      case 'up':
        return '↑';
      case 'down':
        return '↓';
      default:
        return '→';
    }
  }

  get trendColor(): string {
    switch (this.trend) {
      case 'up':
        return 'text-green-500';
      case 'down':
        return 'text-red-500';
      default:
        return 'text-gray-500';
    }
  }
}