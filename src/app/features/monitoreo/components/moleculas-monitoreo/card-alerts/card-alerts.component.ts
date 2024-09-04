import { Component } from '@angular/core';
import { ApiService } from '../../../services/api-form/api.service';

@Component({
  selector: 'app-card-alerts',
  templateUrl: './card-alerts.component.html',
  styleUrls: ['./card-alerts.component.css']
})
export class CardAlertsComponent {
  isMenuOpen: boolean = true;
  modalOpen = false;
  numHoursToMonitor: number | null = null; // Inicialmente null para verificar si se ha ingresado un número
  hours: number[] = Array.from({ length: 12 }, (_, i) => i + 1); // Horas del día (de 1 a 12)
  selectedHours: number[] = []; // Horas seleccionadas
  mortalidadPorLote: any[] = [];

  constructor(private apiService: ApiService) {}
  // Función para mostrar u ocultar el modal
  
  ngOnInit() {
    this.obtenerMortalidadPorLote();
  }
  
  toggleModal() {
    this.modalOpen = !this.modalOpen;
  }
  onMenuToggle(isOpen: boolean) {
    this.isMenuOpen = isOpen;
  }


  obtenerMortalidadPorLote(){
  
      this.apiService.obtenerMortalidadPorLote().subscribe(
        (response: any) => {
          console.log('Mortalidad por lote:', response);
          this.mortalidadPorLote = response;
        },
        (error: any) => {
          console.error('Error al obtener mortalidad por lote:', error);
        }
      );
    }
  // Función para agregar o quitar horas seleccionadas
  toggleHour(hour: number) {
    if (!this.isClockEnabled()) {
      console.log('El reloj está deshabilitado. Por favor, ingrese el número de horas a monitorear.');
      return;
    }

    if (this.selectedHours.includes(hour)) {
      this.selectedHours = this.selectedHours.filter(h => h !== hour);
    } else {
      if (this.selectedHours.length < this.numHoursToMonitor!) {
        this.selectedHours.push(hour);
      } else {
        console.log('Se ha alcanzado el límite máximo de horas seleccionadas.');
      }
    }
  }

  
  // Función para limpiar las horas seleccionadas
  clearSelection() {
    this.selectedHours = [];
  }

  // Función para guardar las horas seleccionadas (simulación de almacenamiento)
  aveHours() {
    if (this.numHoursToMonitor === null || this.numHoursToMonitor < 4 || this.numHoursToMonitor > 24) {
      console.log('Por favor, ingrese un número válido de horas a monitorear.');
      return;
    }

    const hoursToSend = this.selectedHours.map(hour => ({
      hour: hour,
      am: hour < 12,
      pm: hour >= 12
    }));

    this.apiService.setHours({ hours: hoursToSend }).subscribe(
      response => {
        console.log('Horas guardadas exitosamente:', response);
        this.selectedHours = [];
        this.toggleModal();
      },
      error => {
        console.error('Error al guardar las horas:', error);
      }
    );
  }


  // Función para obtener estilos dinámicos para las horas en el reloj
  getStyle(index: number) {
    return {
      top: 50 + 40 * Math.sin(-Math.PI / 2 + (index + 1) * Math.PI / 6) + '%',
      left: 50 + 40 * Math.cos(-Math.PI / 2 + (index + 1) * Math.PI / 6) + '%',
      transform: 'translate(-50%, -50%)'
    };
  }

  // Función para formatear las horas en formato AM/PM
  formatHour(hour: number) {
    if (hour === 12) {
      return '12:00 pm';
    } else if (hour < 12) {
      return `${hour}:00 am`;
    } else {      
      return `${hour - 12}:00 pm`;
    }

  }

  // Función para verificar si el reloj está habilitado
  isClockEnabled() {
    return this.hours == null;
  }
}
