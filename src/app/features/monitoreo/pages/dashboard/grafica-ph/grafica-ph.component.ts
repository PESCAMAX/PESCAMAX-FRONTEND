// grafica-ph.component.ts
import { Component, OnInit } from '@angular/core';
import * as pbi from 'powerbi-client';

@Component({
  selector: 'app-grafica-ph',
  templateUrl: './grafica-ph.component.html',
  styleUrls: ['./grafica-ph.component.css']
})
export class GraficaPhComponent implements OnInit {
  embedUrl: string = 'https://app.powerbi.com/reportEmbed?reportId=YOUR_REPORT_ID'; // Reemplaza con tu embed URL
  accessToken: string = 'YOUR_ACCESS_TOKEN'; // Reemplaza con tu access token

  constructor() {}

  ngOnInit() {
    this.embedPowerBIReport();
  }

  embedPowerBIReport() {
    const embedConfiguration: pbi.IEmbedConfiguration = {
      type: 'report',
      id: 'YOUR_REPORT_ID', // Reemplaza con el ID de tu informe
      embedUrl: this.embedUrl,
      accessToken: this.accessToken,
      tokenType: pbi.models.TokenType.Embed,
      settings: {
        filterPaneEnabled: false,
        navContentPaneEnabled: false
      }
    };

    const reportContainer = document.getElementById('reportContainer');
    if (reportContainer) {
      const powerbiService = new pbi.service.Service(
        pbi.factories.hpmFactory,
        pbi.factories.wpmpFactory,
        pbi.factories.routerFactory
      );

      powerbiService.embed(reportContainer, embedConfiguration);
    } else {
      console.error('No se pudo encontrar el contenedor del informe');
    }
  }
}

