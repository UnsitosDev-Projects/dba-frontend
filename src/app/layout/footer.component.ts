import { Component } from '@angular/core';

@Component({
  selector: 'app-footer',
  standalone: true,
  template: `
    <footer class="bg-white border-t border-gray-200 py-4 px-6">
      <div class="flex items-center justify-between text-sm text-gray-600">
        <p>&copy; Unsitos Dev.</p>
        <div class="flex space-x-4">
          <a href="#" class="hover:text-gray-900">Eleazar Jarquín Ramos</a>
          <a href="#" class="hover:text-gray-900">Hugo Nicolas Aragón M.</a>
          <a href="#" class="hover:text-gray-900">Manuel Alejandro Pinacho H.</a>
          <a href="#" class="hover:text-gray-900">Daniel Bernardino Reyes N.</a>
        </div>
      </div>
    </footer>
  `
})
export class FooterComponent {}
