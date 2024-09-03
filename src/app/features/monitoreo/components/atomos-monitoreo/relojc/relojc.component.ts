import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RelojService } from '../../../services/Reloj/reloj.service';
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
  selectedHours: HourSelection[] = [];

  constructor(private router: Router, private relojService: RelojService) {}

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

  getArrowEndX(hour: number): number {
    return Math.cos(-Math.PI / 2 + hour * Math.PI / 6) * 0.5;
  }

  getArrowEndY(hour: number): number {
    return Math.sin(-Math.PI / 2 + hour * Math.PI / 6) * 0.5;
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

  toggleHourCheckbox(hour: number, period: 'am' | 'pm', event: Event) {
    const isChecked = (event.target as HTMLInputElement).checked;
    const hourIndex = this.selectedHours.findIndex(h => h.hour === hour);

    if (hourIndex === -1) {
      this.selectedHours.push({ hour, am: period === 'am' && isChecked, pm: period === 'pm' && isChecked });
    } else {
      this.selectedHours[hourIndex][period] = isChecked;

      if (!this.selectedHours[hourIndex].am && !this.selectedHours[hourIndex].pm) {
        this.selectedHours.splice(hourIndex, 1);
      }
    }
  }

  isHourSelected(hour: number, period: 'am' | 'pm'): boolean {
    const selectedHour = this.selectedHours.find(h => h.hour === hour);
    return selectedHour ? selectedHour[period] : false;
  }

  updateMonitoringHours(): void {
    console.log('Número de horas a monitorear actualizado:', this.numHoursToMonitor);
    this.selectedHours = [];
  }

  formatHour(hourObj: HourSelection): string {
    return `${hourObj.hour}:00`;
  }

  clearSelection(): void {
    this.selectedHours = [];
  }

  getTotalSelectedHours(): number {
    return this.selectedHours.reduce((total, hour) => total + (hour.am ? 1 : 0) + (hour.pm ? 1 : 0), 0);
  }

  saveHours(): void {
    const totalSelectedHours = this.getTotalSelectedHours();
    console.log('Total de horas seleccionadas:', totalSelectedHours);
    console.log('Número de horas a monitorear:', this.numHoursToMonitor);

    if (totalSelectedHours === this.numHoursToMonitor) {
      console.log('Horas guardadas:', this.selectedHours);
      
      // Format the hours data as expected by the ESP8266
      const formattedHours = this.selectedHours.flatMap(hour => {
        const result = [];
        if (hour.am) result.push({ hour: hour.hour, period: 'AM' });
        if (hour.pm) result.push({ hour: hour.hour, period: 'PM' });
        return result;
      });

      const hoursData = { hours: formattedHours };
      
      this.relojService.setHours(hoursData).subscribe(
        response => {
          console.log('Horas enviadas al ESP8266:', response);
          alert('Horas guardadas exitosamente.');
          this.router.navigate(['/alertas-recientes']);
        },
        error => {
          console.error('Error al enviar las horas al ESP8266:', error);
          alert('Error al guardar las horas. Por favor, intente de nuevo.');
        }
      );
    } else {
      alert(`Por favor, seleccione exactamente ${this.numHoursToMonitor} horas en total. Actualmente tiene ${totalSelectedHours} horas seleccionadas.`);
    }
  }
}