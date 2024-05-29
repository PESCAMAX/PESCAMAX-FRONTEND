import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-button-dismiss',
  templateUrl: './button-dismiss.component.html',
  styleUrls: ['./button-dismiss.component.css']
})
export class ButtonDismissComponent {
  @Input() label: string = 'Dismiss';
}
