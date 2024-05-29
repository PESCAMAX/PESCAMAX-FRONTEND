import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-button-view-more',
  templateUrl: './button-view-more.component.html',
  styleUrl: './button-view-more.component.css'
})
export class ButtonViewMoreComponent {
  @Input() label: string = 'View More';
}
