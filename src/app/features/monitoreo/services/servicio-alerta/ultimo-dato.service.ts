import { Injectable } from '@angular/core';
import { ApiService,Monitoreo, Especie, Alerta } from '../api-form/api.service';
import { AlertService } from '../api-alert/alert.service';
import { Observable, interval } from 'rxjs';
import { switchMap, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UltimoDatoService {
  private intervalTime = 60000; // 1 minuto

  constructor(
    private apiService: ApiService,
    private alertService: AlertService
  ) { }

  iniciarMonitoreo(userId: string): Observable<void> {
    return interval(this.intervalTime).pipe(
      switchMap(() => this.verificarUltimoDato(userId))
    );
  }

  private verificarUltimoDato(userId: string): Observable<void> {
    return this.apiService.listarMonitoreo(userId).pipe(
      map(response => {
        if (response && response.response) {
          const ultimoLote = this.obtenerUltimoLote(response.response);
          if (ultimoLote) {
            this.verificarParametros(ultimoLote, userId);
          }
        }
      })
    );
  }

  private obtenerUltimoLote(lotes: Monitoreo[]): Monitoreo | null {
    return lotes.reduce((prev, current) =>
      (new Date(prev.FechaHora) > new Date(current.FechaHora)) ? prev : current
    );
  }

  private verificarParametros(lote: Monitoreo, userId: string) {
    this.apiService.obtenerEspeciePorLote(userId).subscribe(especiesLotes => {
      const especieId = especiesLotes.find(el => el.LoteId === lote.LoteID)?.EspecieId;
      if (especieId) {
        this.apiService.listarEspecies(userId).subscribe(especies => {
          const especie = especies.find(e => e.Id === especieId);
          if (especie) {
            const problemas = this.obtenerProblemas(especie, lote);
            if (problemas.length > 0) {
              this.crearAlerta(especie, lote.LoteID, problemas, userId);
              this.alertService.showAlert('danger', 'Parámetros fuera del rango seguro', problemas.join(', '));
            }
          }
        });
      }
    });
  }

  private obtenerProblemas(especie: Especie, lote: Monitoreo): string[] {
    const problemas = [];

    if (lote.tds < especie.TdsMinimo || lote.tds > especie.TdsMaximo) {
      problemas.push(`TDS está fuera del rango seguro (${especie.TdsMinimo}-${especie.TdsMaximo}). Actual: ${lote.tds}`);
    }

    if (lote.Temperatura < especie.TemperaturaMinimo || lote.Temperatura > especie.TemperaturaMaximo) {
      problemas.push(`Temperatura está fuera del rango seguro (${especie.TemperaturaMinimo}-${especie.TemperaturaMaximo}). Actual: ${lote.Temperatura}`);
    }

    if (lote.PH < especie.PhMinimo || lote.PH > especie.PhMaximo) {
      problemas.push(`pH está fuera del rango seguro (${especie.PhMinimo}-${especie.PhMaximo}). Actual: ${lote.PH}`);
    }

    return problemas;
  }

  private crearAlerta(especie: Especie, loteId: number, problemas: string[], userId: string): void {
    const alerta: Alerta = {
      EspecieID: especie.Id,
      Nombre: especie.NombreEspecie,
      LoteID: loteId,
      Descripcion: problemas.join(', '),
      UserId: userId
    };

    this.apiService.crearAlerta(alerta).subscribe({
      next: (response) => console.log('Alerta creada:', response),
      error: (error) => console.error('Error al crear alerta:', error)
    });
  }
}