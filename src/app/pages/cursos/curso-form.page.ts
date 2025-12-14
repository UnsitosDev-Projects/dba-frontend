import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CourseService } from '../../services/course.service';

@Component({
  selector: 'app-curso-form',
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
            <h1 class="text-3xl font-bold text-gray-800">Nuevo Curso</h1>
            <p class="text-gray-600 mt-2">Completa la información del curso</p>
          </div>
        </div>
      </div>

      <!-- Form -->
      <form [formGroup]="courseForm" (ngSubmit)="onSubmit()" class="bg-white rounded-lg shadow-sm p-6 space-y-6">
        <!-- Código -->
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">
            Código del Curso *
          </label>
          <input 
            type="text"
            formControlName="code"
            class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Ej: MAT101"
          />
          @if (courseForm.get('code')?.invalid && courseForm.get('code')?.touched) {
            <p class="mt-1 text-sm text-red-600">El código es requerido</p>
          }
        </div>

        <!-- Nombre -->
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">
            Nombre del Curso *
          </label>
          <input 
            type="text"
            formControlName="name"
            class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Ej: Matemáticas Avanzadas"
          />
          @if (courseForm.get('name')?.invalid && courseForm.get('name')?.touched) {
            <p class="mt-1 text-sm text-red-600">El nombre es requerido</p>
          }
        </div>

        <!-- Descripción -->
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">
            Descripción
          </label>
          <textarea 
            formControlName="description"
            rows="4"
            class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Descripción del curso..."
          ></textarea>
        </div>

        <!-- Créditos -->
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">
            Créditos *
          </label>
          <input 
            type="number"
            formControlName="credits"
            min="1"
            max="10"
            class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Ej: 4"
          />
          @if (courseForm.get('credits')?.invalid && courseForm.get('credits')?.touched) {
            <p class="mt-1 text-sm text-red-600">Los créditos son requeridos (1-10)</p>
          }
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
            [disabled]="courseForm.invalid || submitting()"
            class="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
          >
            @if (submitting()) {
              <div class="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
            }
            <span>Guardar Curso</span>
          </button>
        </div>
      </form>
    </div>
  `
})
export class CursoFormPage {
  private fb = inject(FormBuilder);
  private router = inject(Router);
  private courseService = inject(CourseService);

  submitting = signal(false);

  courseForm: FormGroup = this.fb.group({
    code: ['', Validators.required],
    name: ['', Validators.required],
    description: [''],
    credits: [null, [Validators.required, Validators.min(1), Validators.max(10)]]
  });

  onSubmit() {
    if (this.courseForm.valid) {
      this.submitting.set(true);
      this.courseService.create(this.courseForm.value).subscribe({
        next: () => {
          this.router.navigate(['/cursos']);
        },
        error: () => {
          this.submitting.set(false);
        }
      });
    }
  }

  goBack() {
    this.router.navigate(['/cursos']);
  }
}
