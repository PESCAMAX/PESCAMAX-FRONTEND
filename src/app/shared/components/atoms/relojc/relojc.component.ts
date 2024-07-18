import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
interface HourSelection {
  hour: number;
  am: boolean;
  pm: boolean;
}

@Component({
  selector: 'app-relojc',
  templateUrl: './relojc.component.html',
  styleUrls: ['./relojc.component.css']
})
export class RelojcComponent implements OnInit {
  hours: number[] = Array.from({ length: 12 }, (_, i) => i + 1);
  numHoursOptions: number[] = Array.from({ length: 21 }, (_, i) => i + 4);
  numHoursToMonitor: number = 4;
  modalOpen = false;
  selectedHours: { hour: number, am: boolean, pm: boolean }[] = [];
 
 // Inicialmente null para verificar si se ha ingresado un número
  // Horas del día (de 1 a 12)
  
  constructor(private router: Router) {}

  ngOnInit(): void {
    this.updateMonitoringHours();
  }
  getStyle(index: number) {
    return {
      top: 50 + 40 * Math.sin(-Math.PI / 2 + (index + 1) * Math.PI / 6) + '%',
      left: 50 + 40 * Math.cos(-Math.PI / 2 + (index + 1) * Math.PI / 6) + '%',
      transform: 'translate(-50%, -50%)'
    };
  }


  toggleHour(hour: number, period: 'am' | 'pm') {
    const selectedPeriod = this.selectedHours.filter(h => h[period]);
    
    if (selectedPeriod.length < this.numHoursToMonitor || this.isHourSelected(hour, period)) {
      const hourIndex = this.selectedHours.findIndex(h => h.hour === hour);
      
      if (hourIndex === -1) {
        this.selectedHours.push({ hour, am: period === 'am', pm: period === 'pm' });
      } else {
        this.selectedHours[hourIndex][period] = !this.selectedHours[hourIndex][period];
        
        if (!this.selectedHours[hourIndex].am && !this.selectedHours[hourIndex].pm) {
          this.selectedHours.splice(hourIndex, 1);
        }
      }
    } else {
      alert('No puedes seleccionar más horas de las especificadas.');
    }
  }
  
  isHourSelected(hour: number, period: 'am' | 'pm'): boolean {
    const selectedHour = this.selectedHours.find(h => h.hour === hour);
    return selectedHour ? selectedHour[period] : false;
  }


  updateMonitoringHours(): void {
    this.selectedHours = [];
  }

  formatHour(hourObj: HourSelection): string {
    return `${hourObj.hour}:00`;
  }

  clearSelection(): void {
    this.selectedHours = [];
  }

  saveHours(): void {
    if (this.getTotalSelectedHours() !== this.numHoursToMonitor) {
      alert(`Por favor, seleccione exactamente ${this.numHoursToMonitor} horas en total.`);
      return;
    }

    console.log('Horas guardadas:', this.selectedHours);
    alert('Horas guardadas exitosamente.');
    this.router.navigate(['/alertas-recientes']);
  }

  closeForm(): void {
    this.router.navigate(['/alertas-recientes']);
  }

  getTotalSelectedHours(): number {
    return this.selectedHours.reduce((total, hour) => total + (hour.am ? 1 : 0) + (hour.pm ? 1 : 0), 0);
  }
}