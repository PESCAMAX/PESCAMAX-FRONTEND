import { Component, Input } from '@angular/core';
import { Alerta } from '../../../services/api-form/api.service';

@Component({
  selector: 'app-fechas-mensajes',
  templateUrl: './fechas-mensajes.component.html',
  styleUrls: ['./fechas-mensajes.component.css']
})
export class FechasMensajesComponent {
  @Input() alertasFiltradas: Alerta[] = [];
}