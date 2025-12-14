import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ProfessorService } from '../../services/professor.service';

@Component({
  selector: 'app-profesor-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  template: `
    <div class="max-w-3xl mx-auto space-y-6">
      <!-- Header -->
      <div class="bg-white rounded-lg shadow-sm p-6">
        <div class="flex items-center space-x-4">
          <button 
            (click)="goBack()"
            class="text-gray-600 hover:text-gray-800"
          >
            <span class="material-icons">arrow_back</span>
          </button>
          <div>
            <h1 class="text-3xl font-bold text-gray-800">Nuevo Profesor</h1>
            <p class="text-gray-600 mt-2">Completa la información del profesor</p>
          </div>
        </div>
      </div>

      <!-- Form -->
      <form [formGroup]="professorForm" (ngSubmit)="onSubmit()" class="bg-white rounded-lg shadow-sm p-6 space-y-6">
        <!-- Nombres -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">
              Nombre *
            </label>
            <input 
              type="text"
              formControlName="firstName"
              class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Nombre"
            />
            @if (professorForm.get('firstName')?.invalid && professorForm.get('firstName')?.touched) {
              <p class="mt-1 text-sm text-red-600">El nombre es requerido</p>
            }
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">
              Apellido *
            </label>
            <input 
              type="text"
              formControlName="lastName"
              class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Apellido"
            />
            @if (professorForm.get('lastName')?.invalid && professorForm.get('lastName')?.touched) {
              <p class="mt-1 text-sm text-red-600">El apellido es requerido</p>
            }
          </div>
        </div>

        <!-- Email y Teléfono -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">
              Email *
            </label>
            <input 
              type="email"
              formControlName="email"
              class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="email@ejemplo.com"
            />
            @if (professorForm.get('email')?.invalid && professorForm.get('email')?.touched) {
              <p class="mt-1 text-sm text-red-600">Email válido requerido</p>
            }
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">
              Teléfono
            </label>
            <input 
              type="tel"
              formControlName="phone"
              class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="+1234567890"
            />
          </div>
        </div>

        <!-- Especialidad -->
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">
            Especialidad
          </label>
          <input 
            type="text"
            formControlName="specialty"
            class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Ej: Matemáticas"
          />
        </div>

        <!-- Actions -->
        <div class="flex justify-end space-x-4 pt-4 border-t">
          <button 
            type="button"
            (click)="goBack()"
            class="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
          >
            Cancelar
          </button>
          <button 
            type="submit"
            [disabled]="professorForm.invalid || submitting()"
            class="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
          >
            @if (submitting()) {
              <div class="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
            }
            <span>Guardar Profesor</span>
          </button>
        </div>
      </form>
    </div>
  `
})
export class ProfesorFormPage {
  private fb = inject(FormBuilder);
  private router = inject(Router);
  private professorService = inject(ProfessorService);

  submitting = signal(false);

  professorForm: FormGroup = this.fb.group({
    firstName: ['', Validators.required],
    lastName: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    phone: [''],
    specialty: ['']
  });

  onSubmit() {
    if (this.professorForm.valid) {
      this.submitting.set(true);
      this.professorService.create(this.professorForm.value).subscribe({
        next: () => {
          this.router.navigate(['/profesores']);
        },
        error: () => {
          this.submitting.set(false);
        }
      });
    }
  }

  goBack() {
    this.router.navigate(['/profesores']);
  }
}
