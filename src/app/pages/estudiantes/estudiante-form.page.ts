import { Component, inject, signal, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
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
            <h1 class="text-3xl font-bold text-gray-800">{{ isEditMode() ? 'Editar' : 'Nuevo' }} Estudiante</h1>
            <p class="text-gray-600 mt-2">Completa la información del estudiante</p>
          </div>
        </div>
      </div>

      <!-- Form -->
      <form [formGroup]="studentForm" (ngSubmit)="onSubmit()" class="bg-white rounded-lg shadow-sm p-6 space-y-6">
        <!-- Nombre Completo -->
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">
            Nombre Completo *
          </label>
          <input 
            type="text"
            formControlName="name"
            class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Ej: Juan Pérez"
          />
          @if (studentForm.get('name')?.invalid && studentForm.get('name')?.touched) {
            <p class="mt-1 text-sm text-red-600">El nombre es requerido</p>
          }
        </div>

        <!-- Email y Carrera -->
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
              Carrera *
            </label>
            <input 
              type="text"
              formControlName="career"
              class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Ej: Ingeniería en Sistemas"
            />
            @if (studentForm.get('career')?.invalid && studentForm.get('career')?.touched) {
              <p class="mt-1 text-sm text-red-600">La carrera es requerida</p>
            }
          </div>
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
export class EstudianteFormPage implements OnInit {
  private fb = inject(FormBuilder);
  private router = inject(Router);
  private route = inject(ActivatedRoute);
  private studentService = inject(StudentService);

  submitting = signal(false);
  isEditMode = signal(false);
  studentId = signal<string | null>(null);

  studentForm: FormGroup = this.fb.group({
    name: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    career: ['', Validators.required]
  });

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.isEditMode.set(true);
      this.studentId.set(id);
      this.loadStudent(id);
    }
  }

  loadStudent(id: string) {
    console.log('Loading student:', id);
    this.studentService.getById(id).subscribe({
      next: (student) => {
        console.log('Student loaded:', student);
        this.studentForm.patchValue({
          name: student.name,
          email: student.email,
          career: student.career
        });
      },
      error: (error) => {
        console.error('Error loading student:', error);
        alert('Error al cargar el estudiante: ' + (error.error?.message || error.message || 'Error desconocido'));
        this.router.navigate(['/estudiantes']);
      }
    });
  }

  onSubmit() {
    if (this.studentForm.valid) {
      this.submitting.set(true);
      const formValue = this.studentForm.value;
      
      if (this.isEditMode() && this.studentId()) {
        console.log('Updating student:', this.studentId(), formValue);
        this.studentService.update(this.studentId()!, formValue).subscribe({
          next: () => {
            console.log('Student updated successfully');
            this.router.navigate(['/estudiantes']);
          },
          error: (error) => {
            console.error('Error updating student:', error);
            alert('Error al actualizar el estudiante: ' + (error.error?.message || error.message || 'Error desconocido'));
            this.submitting.set(false);
          }
        });
      } else {
        console.log('Creating student:', formValue);
        this.studentService.create(formValue).subscribe({
          next: () => {
            console.log('Student created successfully');
            this.router.navigate(['/estudiantes']);
          },
          error: (error) => {
            console.error('Error creating student:', error);
            alert('Error al crear el estudiante: ' + (error.error?.message || error.message || 'Error desconocido'));
            this.submitting.set(false);
          }
        });
      }
    }
  }

  goBack() {
    this.router.navigate(['/estudiantes']);
  }
}
