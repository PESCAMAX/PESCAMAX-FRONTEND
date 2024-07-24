import { Component } from '@angular/core';

@Component({
  selector: 'app-grafica-general',
  templateUrl: './grafica-general.component.html',
  styleUrl: './grafica-general.component.css'
})
export class GraficaGeneralComponent {
  
}

document.addEventListener('DOMContentLoaded', () => {
  const toggleButton = document.getElementById('toggleButton');
  const toggleIcon = document.getElementById('toggleIcon');
  const menu = document.getElementById('speed-dial-menu-top-right');

  toggleButton?.addEventListener('click', () => {
      const isExpanded = toggleButton.getAttribute('aria-expanded') === 'true';
      toggleButton.setAttribute('aria-expanded', String(!isExpanded));
      menu?.classList.toggle('hidden');
      menu?.classList.toggle('flex');
      
      // Rotate the icon when the menu is expanded
      if (!isExpanded) {
          toggleIcon?.classList.add('rotate-45');
      } else {
          toggleIcon?.classList.remove('rotate-45');
      }


  });
});



