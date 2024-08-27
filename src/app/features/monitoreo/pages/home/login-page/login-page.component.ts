import { Component, OnInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent implements OnInit, OnDestroy {
  carouselImages: string[] = [
  ];
  activeImageIndex: number = 0;
  carouselInterval: any;

  ngOnInit() {
    this.startCarousel();
  }

  ngOnDestroy() {
    this.stopCarousel();
  }

  startCarousel() {
    this.carouselInterval = setInterval(() => {
      this.activeImageIndex = (this.activeImageIndex + 1) % this.carouselImages.length;
    }, 5000); // Cambia la imagen cada 5 segundos
  }

  stopCarousel() {
    if (this.carouselInterval) {
      clearInterval(this.carouselInterval);
    }
  }
}