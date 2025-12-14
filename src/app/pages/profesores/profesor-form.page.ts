import { Component, inject, signal, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
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
            <h1 class="text-3xl font-bold text-gray-800">{{ isEditMode() ? 'Editar' : 'Nuevo' }} Profesor</h1>
            <p class="text-gray-600 mt-2">Completa la información del profesor</p>
          </div>
        </div>
      </div>

      <!-- Form -->
      <form [formGroup]="professorForm" (ngSubmit)="onSubmit()" class="bg-white rounded-lg shadow-sm p-6 space-y-6">
        <!-- Nombre Completo -->
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">
            Nombre Completo *
          </label>
          <input 
            type="text"
            formControlName="name"
            class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Ej: Dr. John Smith"
          />
          @if (professorForm.get('name')?.invalid && professorForm.get('name')?.touched) {
            <p class="mt-1 text-sm text-red-600">El nombre es requerido</p>
          }
        </div>

        <!-- Departamento y Email -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">
              Departamento *
            </label>
            <input 
              type="text"
              formControlName="department"
              class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Ej: Computer Science"
            />
            @if (professorForm.get('department')?.invalid && professorForm.get('department')?.touched) {
              <p class="mt-1 text-sm text-red-600">El departamento es requerido</p>
            }
          </div>

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
export class ProfesorFormPage implements OnInit {
  private fb = inject(FormBuilder);
  private router = inject(Router);
  private route = inject(ActivatedRoute);
  private professorService = inject(ProfessorService);

  submitting = signal(false);
  isEditMode = signal(false);
  professorId = signal<string | null>(null);

  professorForm: FormGroup = this.fb.group({
    name: ['', Validators.required],
    department: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]]
  });

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.isEditMode.set(true);
      this.professorId.set(id);
      this.loadProfessor(id);
    }
  }

  loadProfessor(id: string) {
    console.log('Loading professor:', id);
    this.professorService.getById(id).subscribe({
      next: (professor) => {
        console.log('Professor loaded:', professor);
        this.professorForm.patchValue({
          name: professor.name,
          department: professor.department,
          email: professor.email
        });
      },
      error: (error) => {
        console.error('Error loading professor:', error);
        alert('Error al cargar el profesor: ' + (error.error?.message || error.message || 'Error desconocido'));
        this.router.navigate(['/profesores']);
      }
    });
  }

  onSubmit() {
    if (this.professorForm.valid) {
      this.submitting.set(true);
      const formValue = this.professorForm.value;
      
      if (this.isEditMode() && this.professorId()) {
        console.log('Updating professor:', this.professorId(), formValue);
        this.professorService.update(this.professorId()!, formValue).subscribe({
          next: () => {
            console.log('Professor updated successfully');
            this.router.navigate(['/profesores']);
          },
          error: (error) => {
            console.error('Error updating professor:', error);
            alert('Error al actualizar el profesor: ' + (error.error?.message || error.message || 'Error desconocido'));
            this.submitting.set(false);
          }
        });
      } else {
        console.log('Creating professor:', formValue);
        this.professorService.create(formValue).subscribe({
          next: () => {
            console.log('Professor created successfully');
            this.router.navigate(['/profesores']);
          },
          error: (error) => {
            console.error('Error creating professor:', error);
            alert('Error al crear el profesor: ' + (error.error?.message || error.message || 'Error desconocido'));
            this.submitting.set(false);
          }
        });
      }
    }
  }

  goBack() {
    this.router.navigate(['/profesores']);
  }
}
