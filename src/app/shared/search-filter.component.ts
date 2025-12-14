import { Component, input, output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-search-filter',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="flex flex-col md:flex-row gap-4 bg-white rounded-lg shadow-sm p-4">
      <!-- Search Input -->
      <div class="flex-1">
        <div class="relative">
          <span class="material-icons absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
            search
          </span>
          <input 
            type="text"
            [placeholder]="placeholder()"
            [(ngModel)]="searchValue"
            (ngModelChange)="onSearchChange($event)"
            class="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>

      <!-- Filter Button -->
      @if (showFilter()) {
        <button 
          class="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
        >
          <span class="material-icons">filter_list</span>
          <span>Filtros</span>
        </button>
      }
    </div>
  `
})
export class SearchFilterComponent {
  placeholder = input<string>('Buscar...');
  showFilter = input<boolean>(true);
  searchChange = output<string>();

  searchValue = '';

  onSearchChange(value: string) {
    this.searchChange.emit(value);
  }
}
