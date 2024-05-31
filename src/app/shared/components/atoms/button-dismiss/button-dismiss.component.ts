import { Component, Input } from '@angular/core';
const getStyles = (...args: string[]) => ['button', ...args].filter(Boolean)
@Component({
  selector: 'app-button-dismiss',
  templateUrl: './button-dismiss.component.html',
  styleUrls: ['./button-dismiss.component.css']
})
export class ButtonDismissComponent {
  @Input() label: string = 'Dismiss';
  @Input() type: 'info' | 'danger' | 'warning' = 'warning';

  public get alertClasses(): string[]{
    return getStyles(this.type)
  }
}
