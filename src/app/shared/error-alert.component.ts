import { Component, input, output } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-error-alert',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="bg-red-50 border border-red-200 rounded-lg p-4 mb-4">
      <div class="flex items-center justify-between">
        <div class="flex items-center space-x-3">
          <span class="material-icons text-red-600">error</span>
          <div>
            <h3 class="text-sm font-medium text-red-800">{{ title() }}</h3>
            <p class="text-sm text-red-700 mt-1">{{ message() }}</p>
          </div>
        </div>
        <button 
          (click)="onClose()"
          class="text-red-600 hover:text-red-800"
        >
          <span class="material-icons">close</span>
        </button>
      </div>
    </div>
  `
})
export class ErrorAlertComponent {
  title = input<string>('Error');
  message = input<string>('Ha ocurrido un error');
  close = output<void>();

  onClose() {
    this.close.emit();
  }
}
