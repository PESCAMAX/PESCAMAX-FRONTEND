import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-tarjeta-clima',
  templateUrl: './tarjeta-clima.component.html',
  styleUrls: ['./tarjeta-clima.component.css']
})
export class TarjetaClimaComponent implements OnInit {
  @Input() datosClima: any;
  fechaActual: string = '';

  ngOnInit(): void {
    this.fechaActual = new Date().toLocaleDateString();
  }

  get temperaturaActual(): number {
    return this.datosClima?.main?.temp ? this.datosClima.main.temp - 273.15 : 0;
  }

  get nombreCiudad(): string {
    return this.datosClima?.name || '';
  }

  get estadoMeteoro(): string {
    return this.datosClima?.weather?.[0]?.main || '';
  }

  get humedad(): number {
    return this.datosClima?.main?.humidity || 0;
  }

  get nubes(): number {
    return this.datosClima?.clouds?.all || 0;
  }
}