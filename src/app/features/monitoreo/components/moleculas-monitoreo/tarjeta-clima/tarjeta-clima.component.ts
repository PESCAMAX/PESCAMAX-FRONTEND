import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-tarjeta-clima',
  templateUrl: './tarjeta-clima.component.html',
  styleUrls: ['./tarjeta-clima.component.css']
})
export class TarjetaClimaComponent implements OnInit {
  @Input() climaData: any;
  currentDate: string = '';


  ngOnInit(): void {
    this.currentDate = new Date().toLocaleDateString();
  }

  get temperaturaActual(): number {
    return this.climaData?.main?.temp ? this.climaData.main.temp - 273.15 : 0;
  }

  get nombreCiudad(): string {
    return this.climaData?.name || '';
  }

  get estadoMeteoro(): string {
    return this.climaData?.weather?.[0]?.main || '';
  }

  get humedad(): number {
    return this.climaData?.main?.humidity || 0;
  }

  get nubes(): number {
    return this.climaData?.clouds?.all || 0;
  }
}