import { Component } from '@angular/core';

@Component({
  selector: 'app-view-pasword',
  templateUrl: './view-pasword.component.html',
  styleUrl: './view-pasword.component.css'
})
export class ViewPaswordComponent {
  password: string = '';
  isPasswordVisible: boolean = false;

  togglePassword(): void {
    this.isPasswordVisible = !this.isPasswordVisible;
  }
  onLogin(): void {
    // Lógica de inicio de sesión aquí
    console.log('Password:', this.password);
  }
}




