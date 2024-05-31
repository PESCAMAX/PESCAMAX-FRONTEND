import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-button-view-more',
  templateUrl: './button-view-more.component.html',
  styleUrls: ['./button-view-more.component.css']
})
export class ButtonViewMoreComponent {
  @Input() label: string = 'View More';
  @Input() type: 'info' | 'danger' | 'warning' = 'warning';

  get alertClasses() {
    return {
      info: this.type === 'info',
      danger: this.type === 'danger',
      warning: this.type === 'warning'
    };
  }
}
