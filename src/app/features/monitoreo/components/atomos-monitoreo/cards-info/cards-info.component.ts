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
    return this.trend === 'up' ? '↑' : this.trend === 'down' ? '↓' : '';
  }

  get trendColor(): string {
    return this.trend === 'up' ? 'text-green-500' :
           this.trend === 'down' ? 'text-red-500' :
           'text-gray-500';
  }
}