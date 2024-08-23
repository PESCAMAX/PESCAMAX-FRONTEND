import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-recuperar-page',
  templateUrl: './recuperar-page.component.html',
  styleUrls: ['./recuperar-page.component.css']
})
export class RecuperarPageComponent implements OnInit {
  ngOnInit() {
    this.showFirstImage();
    this.startSlideshow();
  }

  showFirstImage() {
    const images = [
      '.../../../../../../assets/images/contra1.png',
      '../../../../../../assets/images/contra4.png ',
      '.../../../../../../assets/images/contra3.png'
    ];

    const backgroundElement = document.getElementById('background');

    // Mostrar la primera imagen inmediatamente
    backgroundElement!.style.backgroundImage = `url(${images[0]})`;
  }

  startSlideshow() {
    const images = [
   '.../../../../../../assets/images/contra1.png',
      '../../../../../../assets/images/contra4.png ',
      '.../../../../../../assets/images/contra3.png'
    ];

    let currentIndex = 1; // Empezamos desde la segunda imagen
    const backgroundElement = document.getElementById('background');

    setInterval(() => {
      // Aplicar el desenfoque antes del cambio de imagen
      backgroundElement!.classList.add('blur');
      
      setTimeout(() => {
        // Cambiar la imagen de fondo
        backgroundElement!.style.backgroundImage = `url(${images[currentIndex]})`;
        currentIndex = (currentIndex + 1) % images.length;

        // Esperar un momento y luego eliminar el desenfoque
        setTimeout(() => {
          backgroundElement!.classList.remove('blur');
        }, 1000); // Tiempo igual al de la transición del desenfoque

      }, 1000); // Tiempo de desenfoque antes de cambiar la imagen

    }, 6000); // Cambiar imagen cada 6 segundos (incluyendo tiempo de transición)
  }
}
