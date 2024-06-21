import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.css']
})
export class AlertComponent {
  @Input() label: string = '';
  @Input() type: 'info' | 'danger' | 'warning' = 'warning';
  @Input() message: string = '';

  @Output() viewMore = new EventEmitter<void>();
  @Output() dismiss = new EventEmitter<void>();

  get alertClasses() {
    return {
      info: this.type === 'info',
      danger: this.type === 'danger',
      warning: this.type === 'warning'
    };
  }

  onViewMore(): void {
    this.viewMore.emit();
  }

  onDismiss(): void {
    this.dismiss.emit();
  }
}
