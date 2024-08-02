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
      'Temperatura': 'bg-red-100 border-red-500',
      'TDS': 'bg-blue-100 border-blue-500',
      'pH': 'bg-green-100 border-green-500'
    };
    return colorMap[this.title] || 'bg-gray-100 border-gray-500';
  }
}