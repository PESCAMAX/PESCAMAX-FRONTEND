import { Component, Input } from '@angular/core';
const getStyles = (...args: string[]) => ['button', ...args].filter(Boolean)
@Component({
  selector: 'app-button-view-more',
  templateUrl: './button-view-more.component.html',
  styleUrls: ['./button-view-more.component.css']
})
export class ButtonViewMoreComponent {
  @Input() label: string = 'View More';
  @Input() type: 'info' | 'danger' | 'warning' = 'warning';

  public get alertClasses(): string[]{
    return getStyles(this.type)
  }
}
