import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-btn-login-register',
  templateUrl: './btn-login-register.component.html',
  styleUrl: './btn-login-register.component.css'
})
export class BtnLoginRegisterComponent {
  @Input() text: string = '';
  @Input() href: string = '';
  @Input() variant: 'login' | 'register' = 'login';
}