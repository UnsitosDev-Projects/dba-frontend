import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { StudentService } from '../../services/student.service';

@Component({
  selector: 'app-estudiante-form',
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
            <h1 class="text-3xl font-bold text-gray-800">Nuevo Estudiante</h1>
            <p class="text-gray-600 mt-2">Completa la información del estudiante</p>
          </div>
        </div>
      </div>

      <!-- Form -->
      <form [formGroup]="studentForm" (ngSubmit)="onSubmit()" class="bg-white rounded-lg shadow-sm p-6 space-y-6">
        <!-- Número de Matrícula -->
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">
            Número de Matrícula *
          </label>
          <input 
            type="text"
            formControlName="enrollmentNumber"
            class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Ej: 2024001"
          />
          @if (studentForm.get('enrollmentNumber')?.invalid && studentForm.get('enrollmentNumber')?.touched) {
            <p class="mt-1 text-sm text-red-600">El número de matrícula es requerido</p>
          }
        </div>

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
            @if (studentForm.get('firstName')?.invalid && studentForm.get('firstName')?.touched) {
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
            @if (studentForm.get('lastName')?.invalid && studentForm.get('lastName')?.touched) {
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
            @if (studentForm.get('email')?.invalid && studentForm.get('email')?.touched) {
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

        <!-- Fecha de Ingreso -->
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">
            Fecha de Ingreso *
          </label>
          <input 
            type="date"
            formControlName="enrollmentDate"
            class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          @if (studentForm.get('enrollmentDate')?.invalid && studentForm.get('enrollmentDate')?.touched) {
            <p class="mt-1 text-sm text-red-600">La fecha de ingreso es requerida</p>
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
            [disabled]="studentForm.invalid || submitting()"
            class="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
          >
            @if (submitting()) {
              <div class="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
            }
            <span>Guardar Estudiante</span>
          </button>
        </div>
      </form>
    </div>
  `
})
export class EstudianteFormPage {
  private fb = inject(FormBuilder);
  private router = inject(Router);
  private studentService = inject(StudentService);

  submitting = signal(false);

  studentForm: FormGroup = this.fb.group({
    enrollmentNumber: ['', Validators.required],
    firstName: ['', Validators.required],
    lastName: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    phone: [''],
    enrollmentDate: ['', Validators.required]
  });

  onSubmit() {
    if (this.studentForm.valid) {
      this.submitting.set(true);
      this.studentService.create(this.studentForm.value).subscribe({
        next: () => {
          this.router.navigate(['/estudiantes']);
        },
        error: () => {
          this.submitting.set(false);
        }
      });
    }
  }

  goBack() {
    this.router.navigate(['/estudiantes']);
  }
}
