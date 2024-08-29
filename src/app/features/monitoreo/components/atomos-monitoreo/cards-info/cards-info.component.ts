import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { AuthService } from '../../../../../core/services/api-login/auth.service';
import { Router } from '@angular/router';

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
  @Input() selectedLote: number | null = null;

  previousValue: number | string = '';

  constructor(
    public authService: AuthService,
    private router: Router
  ) {}

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

  onViewReport(): void {
    let route = '';
    switch(this.title.toLowerCase()) {
      case 'temperatura':
        route = '/temperatura';
        break;
      case 'tds':
        route = '/grafica-tds';
        break;
      case 'ph':
        route = '/grafica-ph';
        break;
      default:
        console.error('Invalid title for report');
        return;
    }

    if (this.selectedLote !== null) {
      this.router.navigate([route], { queryParams: { lote: this.selectedLote } });
    } else {
      this.router.navigate([route]);
    }
  }
}