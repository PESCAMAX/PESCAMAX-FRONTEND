import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-card-alerts',
  templateUrl: './card-alerts.component.html',
  styleUrls: ['./card-alerts.component.css']
})
export class CardAlertsComponent {
  @Input() header: string = '';
  @Input() title: string = '';
  @Input() content: string = '';
  @Input() type: 'success' | 'danger' | 'warning' = 'success';
  @Input() showConfirmButtons: boolean = false;
  @Output() confirm = new EventEmitter<void>();
  @Output() cancel = new EventEmitter<void>();

  onConfirm(): void {
    this.confirm.emit();
  }

  onCancel(): void {
    this.cancel.emit();
  }
}