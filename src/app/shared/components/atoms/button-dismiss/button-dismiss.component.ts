import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-button-dismiss',
  templateUrl: './button-dismiss.component.html',
  styleUrls: ['./button-dismiss.component.css']
})
export class ButtonDismissComponent {
  @Input() label: string = 'Dismiss';
  @Input() type: 'info' | 'danger' | 'warning' = 'warning';

  get alertClasses() {
    return {
      info: this.type === 'info',
      danger: this.type === 'danger',
      warning: this.type === 'warning'
    };
  }
}
