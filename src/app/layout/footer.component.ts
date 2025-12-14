import { Component } from '@angular/core';

@Component({
  selector: 'app-footer',
  standalone: true,
  template: `
    <footer class="bg-white border-t border-gray-200 py-4 px-6">
      <div class="flex items-center justify-between text-sm text-gray-600">
        <p>&copy; 2025 DBA System. Todos los derechos reservados.</p>
        <div class="flex space-x-4">
          <a href="#" class="hover:text-gray-900">Ayuda</a>
          <a href="#" class="hover:text-gray-900">Privacidad</a>
          <a href="#" class="hover:text-gray-900">Términos</a>
        </div>
      </div>
    </footer>
  `
})
export class FooterComponent {}
