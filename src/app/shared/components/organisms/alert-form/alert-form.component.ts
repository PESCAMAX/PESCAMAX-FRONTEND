import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-alert-form',
  templateUrl: './alert-form.component.html',
  styleUrls: ['./alert-form.component.css']
})
export class AlertFormComponent {
  @Input() successMessage: string = '';
  @Input() errorMessage: string = '';
}
