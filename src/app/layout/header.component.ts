import { Component, output } from '@angular/core';

@Component({
  selector: 'app-header',
  standalone: true,
  template: `
    <header class="bg-white shadow-sm z-10">
      <div class="flex items-center justify-between px-6 py-4">
        <div class="flex items-center">
          <button 
            (click)="onToggleSidebar()"
            class="text-gray-500 hover:text-gray-700 focus:outline-none lg:hidden"
          >
            <span class="material-icons">menu</span>
          </button>
          
          <h1 class="ml-4 text-xl font-semibold text-gray-800">
            Sistema de Gestión Académica
          </h1>
        </div>

        <div class="flex items-center space-x-4">
          <!-- Notifications -->
          <button class="text-gray-500 hover:text-gray-700 relative">
            <span class="material-icons">notifications</span>
            <span class="absolute top-0 right-0 block h-2 w-2 rounded-full bg-red-500"></span>
          </button>

          <!-- User Menu -->
          <button class="flex items-center space-x-2 text-gray-700 hover:text-gray-900">
            <span class="material-icons">account_circle</span>
            <span class="hidden md:inline">Admin</span>
            <span class="material-icons text-sm">expand_more</span>
          </button>
        </div>
      </div>
    </header>
  `
})
export class HeaderComponent {
  toggleSidebar = output<void>();

  onToggleSidebar() {
    this.toggleSidebar.emit();
  }
}
