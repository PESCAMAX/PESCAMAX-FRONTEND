import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-relojc',
  templateUrl: './relojc.component.html',
  styleUrls: ['./relojc.component.css']
})
export class RelojcComponent  {
  hours: number[] = Array.from({length: 12}, (_, i) => i + 1);
  selectedHours: number[] = [];
  numHoursToMonitor = length
  Math = Math;
  modalOpen = false;


  ngOnInit() {
    this.updateMonitoringHours();
  }

  getStyle(index: number) {
    return {
      top: 50 + 40 * Math.sin(-Math.PI / 2 + (index + 1) * Math.PI / 6) + '%',
      left: 50 + 40 * Math.cos(-Math.PI / 2 + (index + 1) * Math.PI / 6) + '%',
      transform: 'translate(-50%, -50%)'
    };
  }

  toggleHour(hour: number) {
    const index = this.selectedHours.indexOf(hour);
    if (index > -1) {
      this.selectedHours.splice(index, 1);
    } else if (this.selectedHours.length < this.numHoursToMonitor) {
      this.selectedHours.push(hour);
    }
  }

  updateMonitoringHours() {
    this.selectedHours = [];

}

  // Función para limpiar las horas seleccionadas
  clearSelection() {
    this.selectedHours = [];
  }

  // Función para guardar las horas seleccionadas (simulación de almacenamiento)
  saveHours() {
    if (this.numHoursToMonitor === null || this.numHoursToMonitor < 4 || this.numHoursToMonitor > 24) {
      console.log('Por favor, ingrese un número válido de horas a monitorear.');
      return;
    }

    console.log('Horas seleccionadas:', this.selectedHours);
    // Lógica para guardar this.selectedHours en un servicio o realizar otras acciones necesarias
    this.selectedHours = [];
    this.toggleModal();
  }
  toggleModal() {
    this.modalOpen = !this.modalOpen;
  }

}


