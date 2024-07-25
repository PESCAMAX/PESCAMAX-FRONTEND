import { Component, OnInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrl: './inicio.component.css'
})
export class InicioComponent implements OnInit, OnDestroy {
  carouselImages: string[] = [
    '/assets/images/alice-mourou-RrvGuqx-bOQ-unsplash.jpg',
    '/assets/images/tifenn-degornet-PpwK032gSao-unsplash.jpg',
    
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