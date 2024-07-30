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
  selectedHours: HourSelection[] = [];

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
      // Aquí es donde guardamos los datos
      console.log('Horas guardadas:', this.selectedHours);
      
      // Aquí deberías llamar a tu servicio para guardar los datos
      // Por ejemplo:
      // this.horasService.guardarHoras(this.selectedHours).subscribe(
      //   response => {
      //     console.log('Respuesta del servidor:', response);
      //     alert('Horas guardadas exitosamente.');
      //     this.router.navigate(['/alertas-recientes']);
      //   },
      //   error => {
      //     console.error('Error al guardar las horas:', error);
      //     alert('Hubo un error al guardar las horas. Por favor, intente de nuevo.');
      //   }
      // );
  
      // Por ahora, solo simularemos el guardado
      alert('Horas guardadas exitosamente.');
      this.router.navigate(['/alertas-recientes']);
    } else {
      alert(`Por favor, seleccione exactamente ${this.numHoursToMonitor} horas en total. Actualmente tiene ${totalSelectedHours} horas seleccionadas.`);
    }
  }
}
