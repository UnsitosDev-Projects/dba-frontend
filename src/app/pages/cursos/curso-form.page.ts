import { Component, inject, signal, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
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
            <h1 class="text-3xl font-bold text-gray-800">{{ isEditMode() ? 'Editar' : 'Nuevo' }} Curso</h1>
            <p class="text-gray-600 mt-2">Completa la información del curso</p>
          </div>
        </div>
      </div>

      <!-- Form -->
      <form [formGroup]="courseForm" (ngSubmit)="onSubmit()" class="bg-white rounded-lg shadow-sm p-6 space-y-6">
        <!-- Código del Curso -->
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">
            Código del Curso *
          </label>
          <input 
            type="text"
            formControlName="courseId"
            [readonly]="isEditMode()"
            class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            [class.bg-gray-100]="isEditMode()"
            placeholder="Ej: MAT101"
          />
          @if (courseForm.get('courseId')?.invalid && courseForm.get('courseId')?.touched) {
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

        <!-- Departamento -->
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">
            Departamento
          </label>
          <input 
            type="text"
            formControlName="department"
            class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Ej: Matemáticas"
          />
        </div>

        <!-- Créditos -->
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">
            Créditos
          </label>
          <input 
            type="number"
            formControlName="credits"
            min="1"
            max="10"
            class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Ej: 4"
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
export class CursoFormPage implements OnInit {
  private fb = inject(FormBuilder);
  private router = inject(Router);
  private route = inject(ActivatedRoute);
  private courseService = inject(CourseService);

  submitting = signal(false);
  isEditMode = signal(false);
  courseId = signal<string | null>(null);

  courseForm: FormGroup = this.fb.group({
    courseId: ['', Validators.required],
    name: ['', Validators.required],
    department: [''],
    credits: [null]
  });

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.isEditMode.set(true);
      this.courseId.set(id);
      this.loadCourse(id);
    }
  }

  loadCourse(id: string) {
    console.log('Loading course:', id);
    this.courseService.getById(id).subscribe({
      next: (course) => {
        console.log('Course loaded:', course);
        this.courseForm.patchValue({
          courseId: course.courseId,
          name: course.name,
          department: course.department,
          credits: course.credits
        });
      },
      error: (error) => {
        console.error('Error loading course:', error);
        alert('Error al cargar el curso: ' + (error.error?.message || error.message || 'Error desconocido'));
        this.router.navigate(['/cursos']);
      }
    });
  }

  onSubmit() {
    if (this.courseForm.valid) {
      this.submitting.set(true);
      const formValue = this.courseForm.value;
      
      if (this.isEditMode() && this.courseId()) {
        console.log('Updating course:', this.courseId(), formValue);
        this.courseService.update(this.courseId()!, formValue).subscribe({
          next: () => {
            console.log('Course updated successfully');
            this.router.navigate(['/cursos']);
          },
          error: (error) => {
            console.error('Error updating course:', error);
            alert('Error al actualizar el curso: ' + (error.error?.message || error.message || 'Error desconocido'));
            this.submitting.set(false);
          }
        });
      } else {
        console.log('Creating course:', formValue);
        this.courseService.create(formValue).subscribe({
          next: () => {
            console.log('Course created successfully');
            this.router.navigate(['/cursos']);
          },
          error: (error) => {
            console.error('Error creating course:', error);
            alert('Error al crear el curso: ' + (error.error?.message || error.message || 'Error desconocido'));
            this.submitting.set(false);
          }
        });
      }
    }
  }

  goBack() {
    this.router.navigate(['/cursos']);
  }
}
