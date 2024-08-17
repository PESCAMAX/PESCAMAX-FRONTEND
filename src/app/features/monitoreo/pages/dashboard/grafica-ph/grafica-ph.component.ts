// import { Component, OnInit } from '@angular/core';
// import { ApiService, Monitoreo } from '../../../services/api-form/api.service';
// import { AuthService } from '../../../../../core/services/api-login/auth.service';

// @Component({
//   selector: 'app-grafica-ph',
//   templateUrl: './grafica-ph.component.html',
//   styleUrls: ['./grafica-ph.component.css']
// })
// export class GraficaPhComponent implements OnInit {
//   temperaturaValue: number = 0;
//   tdsValue: number = 0;
//   phValue: number = 0;
//   temperaturaTrend: 'up' | 'down' | 'none' = 'none';
//   tdsTrend: 'up' | 'down' | 'none' = 'none';
//   phTrend: 'up' | 'down' | 'none' = 'none';
//   temperaturaTrendValue: string = '';
//   tdsTrendValue: string = '';
//   phTrendValue: string = '';

//   constructor(private apiService: ApiService, private authService: AuthService) {}

//   ngOnInit(): void {
//     this.cargarDatos();
//   }

//   cargarDatos(): void {
//     this.apiService.listarMonitoreo(this.authService.getUserId()).subscribe(
//       (response: { response: Monitoreo[] }) => {
//         const monitoreoData = response.response;
//         this.calcularTendencias(monitoreoData);
//       },
//       error => console.error('Error al cargar los datos', error)
//     );
//   }

//   calcularTendencias(monitoreoData: Monitoreo[]): void {
//     if (monitoreoData.length < 2) {
//       this.resetearTendencias();
//       return;
//     }

//     const ultimo = monitoreoData[monitoreoData.length - 1];
//     const penultimo = monitoreoData[monitoreoData.length - 2];

//     this.actualizarTendencia('temperatura', ultimo.Temperatura, penultimo.Temperatura);
//     this.actualizarTendencia('tds', ultimo.tds, penultimo.tds);
//     this.actualizarTendencia('ph', ultimo.PH, penultimo.PH);

//     this.temperaturaValue = ultimo.Temperatura;
//     this.tdsValue = ultimo.tds;
//     this.phValue = ultimo.PH;
//   }

//   private actualizarTendencia(tipo: 'temperatura' | 'tds' | 'ph', valorActual: number, valorAnterior: number): void {
//     const diferencia = valorActual - valorAnterior;
//     const tendencia = diferencia > 0 ? 'up' : diferencia < 0 ? 'down' : 'none';
//     const valorAbsoluto = Math.abs(diferencia).toFixed(2);

//     switch (tipo) {
//       case 'temperatura':
//         this.temperaturaTrend = tendencia;
//         this.temperaturaTrendValue = `${valorAbsoluto}°C`;
//         break;
//       case 'tds':
//         this.tdsTrend = tendencia;
//         this.tdsTrendValue = valorAbsoluto;
//         break;
//       case 'ph':
//         this.phTrend = tendencia;
//         this.phTrendValue = valorAbsoluto;
//         break;
//     }
//   }

//   private resetearTendencias(): void {
//     this.temperaturaTrend = this.tdsTrend = this.phTrend = 'none';
//     this.temperaturaTrendValue = this.tdsTrendValue = this.phTrendValue = '';
//     this.temperaturaValue = this.tdsValue = this.phValue = 0;
//   }
// }


import { Component, OnInit } from '@angular/core';
import { ApiService, Monitoreo } from '../../../services/api-form/api.service';
import { AuthService } from '../../../../../core/services/api-login/auth.service';

@Component({
  selector: 'app-grafica-ph',
  templateUrl: './grafica-ph.component.html',
  styleUrls: ['./grafica-ph.component.css']
})
export class GraficaPhComponent implements OnInit {
  isMenuOpen: boolean = true;
onMenuToggle(isOpen: boolean) {
  this.isMenuOpen = isOpen;
throw new Error('Method not implemented.');
}

  temperaturaValue: number = 0;
  tdsValue: number = 0;
  phValue: number = 0;
  temperaturaTrend: 'up' | 'down' | 'none' = 'none';
  tdsTrend: 'up' | 'down' | 'none' = 'none';
  phTrend: 'up' | 'down' | 'none' = 'none';
  temperaturaTrendValue: string = '';
  tdsTrendValue: string = '';
  phTrendValue: string = '';
  ultimoRegistroHora: string = '';

  constructor(private apiService: ApiService, private authService: AuthService) {}

  ngOnInit(): void {
    this.cargarDatos();
  }

  cargarDatos(): void {
    this.apiService.listarMonitoreo(this.authService.getUserId()).subscribe(
      (response: { response: Monitoreo[] }) => {
        const monitoreoData = response.response;
        this.calcularTendencias(monitoreoData);
      },
      error => console.error('Error al cargar los datos', error)
    );
  }

  calcularTendencias(monitoreoData: Monitoreo[]): void {
    if (monitoreoData.length < 2) {
      this.resetearTendencias();
      return;
    }

    const ultimo = monitoreoData[monitoreoData.length - 1];
    const penultimo = monitoreoData[monitoreoData.length - 2];

    this.actualizarTendencia('temperatura', ultimo.Temperatura, penultimo.Temperatura);
    this.actualizarTendencia('tds', ultimo.tds, penultimo.tds);
    this.actualizarTendencia('ph', ultimo.PH, penultimo.PH);

    this.temperaturaValue = ultimo.Temperatura;
    this.tdsValue = ultimo.tds;
    this.phValue = ultimo.PH;
    this.ultimoRegistroHora = new Date(ultimo.FechaHora).toLocaleTimeString();
  }

  private actualizarTendencia(tipo: 'temperatura' | 'tds' | 'ph', valorActual: number, valorAnterior: number): void {
    const diferencia = valorActual - valorAnterior;
    const tendencia = diferencia > 0 ? 'up' : diferencia < 0 ? 'down' : 'none';
    const valorAbsoluto = Math.abs(diferencia).toFixed(2);

    switch (tipo) {
      case 'temperatura':
        this.temperaturaTrend = tendencia;
        this.temperaturaTrendValue = `${valorAbsoluto}°C`;
        break;
      case 'tds':
        this.tdsTrend = tendencia;
        this.tdsTrendValue = valorAbsoluto;
        break;
      case 'ph':
        this.phTrend = tendencia;
        this.phTrendValue = valorAbsoluto;
        break;
    }
  }

  private resetearTendencias(): void {
    this.temperaturaTrend = this.tdsTrend = this.phTrend = 'none';
    this.temperaturaTrendValue = this.tdsTrendValue = this.phTrendValue = '';
    this.temperaturaValue = this.tdsValue = this.phValue = 0;
    this.ultimoRegistroHora = '';
  }
  
}
