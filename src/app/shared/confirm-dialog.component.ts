import { Component, input, output } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-confirm-dialog',
  standalone: true,
  imports: [CommonModule],
  template: `
    @if (isOpen()) {
      <div class="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
        <div class="bg-white rounded-lg shadow-xl max-w-md w-full mx-4 overflow-hidden">
          <!-- Header -->
          <div class="bg-red-600 px-6 py-4">
            <div class="flex items-center space-x-3">
              <span class="material-icons text-white text-3xl">warning</span>
              <h3 class="text-lg font-semibold text-white">{{ title() }}</h3>
            </div>
          </div>

          <!-- Content -->
          <div class="px-6 py-4">
            <p class="text-gray-700">{{ message() }}</p>
          </div>

          <!-- Actions -->
          <div class="bg-gray-50 px-6 py-4 flex justify-end space-x-3">
            <button 
              (click)="onCancel()"
              class="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-100 transition-colors"
            >
              Cancelar
            </button>
            <button 
              (click)="onConfirm()"
              class="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
            >
              Confirmar
            </button>
          </div>
        </div>
      </div>
    }
  `
})
export class ConfirmDialogComponent {
  isOpen = input<boolean>(false);
  title = input<string>('Confirmar acción');
  message = input<string>('¿Está seguro de realizar esta acción?');
  
  confirm = output<void>();
  cancel = output<void>();

  onConfirm() {
    this.confirm.emit();
  }

  onCancel() {
    this.cancel.emit();
  }
}
