import { Component, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { ProfessorService } from '../../services/professor.service';
import { Professor } from '../../models/professor.model';
import { ConfirmDialogComponent } from '../../shared/confirm-dialog.component';

@Component({
  selector: 'app-profesores-list',
  standalone: true,
  imports: [CommonModule, ConfirmDialogComponent],
  template: `
    <div class="space-y-6">
      <!-- Header -->
      <div class="flex items-center justify-between bg-white rounded-lg shadow-sm p-6">
        <div>
          <h1 class="text-3xl font-bold text-gray-800">Profesores</h1>
          <p class="text-gray-600 mt-2">Gestiona el cuerpo docente</p>
        </div>
        <button 
          (click)="navigateToNew()"
          class="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2"
        >
          <span class="material-icons">add</span>
          <span>Nuevo Profesor</span>
        </button>
      </div>

      <!-- Search -->
      <div class="bg-white rounded-lg shadow-sm p-6">
        <input 
          type="text"
          placeholder="Buscar profesores..."
          class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <!-- Professors Grid -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        @if (loading()) {
          <div class="col-span-full flex justify-center py-12">
            <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          </div>
        } @else if (professors().length === 0) {
          <div class="col-span-full text-center py-12 text-gray-500">
            No hay profesores disponibles
          </div>
        } @else {
          @for (professor of professors(); track professor.id) {
            <div class="bg-white rounded-lg shadow-sm p-6 hover:shadow-md transition-shadow">
              <div class="flex items-start justify-between">
                <div class="flex items-center space-x-4">
                  <div class="bg-blue-100 rounded-full w-16 h-16 flex items-center justify-center">
                    <span class="material-icons text-blue-600 text-3xl">school</span>
                  </div>
                  <div>
                    <h3 class="font-semibold text-lg text-gray-800">
                      {{ professor.name }}
                    </h3>
                    <p class="text-sm text-gray-600">{{ professor.email }}</p>
                    <p class="text-sm text-gray-500 mt-1">ID: {{ professor.id }}</p>
                  </div>
                </div>
              </div>
              
              <div class="mt-4 flex items-center justify-between pt-4 border-t">
                <span class="text-sm text-gray-600">
                  Departamento: {{ professor.department || 'N/A' }}
                </span>
                <div class="flex space-x-2">
                  <button 
                    (click)="navigateToEdit(professor.id)"
                    class="text-blue-600 hover:text-blue-800"
                    title="Editar profesor"
                  >
                    <span class="material-icons">edit</span>
                  </button>
                  <button 
                    (click)="confirmDelete(professor.id)"
                    class="text-red-600 hover:text-red-800"
                    title="Eliminar profesor"
                  >
                    <span class="material-icons">delete</span>
                  </button>
                </div>
              </div>
            </div>
          }
        }
      </div>

      <!-- Confirm Dialog -->
      <app-confirm-dialog
        [isOpen]="showDeleteDialog()"
        [title]="'Eliminar Profesor'"
        [message]="'¿Está seguro que desea eliminar este profesor? Esta acción no se puede deshacer.'"
        (confirm)="deleteProfessor()"
        (cancel)="cancelDelete()"
      />
    </div>
  `
})
export class ProfesoresListPage implements OnInit {
  private professorService = inject(ProfessorService);
  private router = inject(Router);

  professors = signal<Professor[]>([]);
  loading = signal(true);
  showDeleteDialog = signal(false);
  professorToDelete = signal<string | null>(null);

  ngOnInit() {
    this.loadProfessors();
  }

  loadProfessors() {
    this.loading.set(true);
    this.professorService.getAll().subscribe({
      next: (professors) => {
        console.log('Professors loaded:', professors);
        this.professors.set(professors);
        this.loading.set(false);
      },
      error: (error) => {
        console.error('Error loading professors:', error);
        this.loading.set(false);
      }
    });
  }

  navigateToNew() {
    this.router.navigate(['/profesores/nuevo']);
  }

  navigateToEdit(professorId: string) {
    console.log('Navigating to edit professor:', professorId);
    this.router.navigate(['/profesores/editar', professorId]);
  }

  confirmDelete(professorId: string) {
    this.professorToDelete.set(professorId);
    this.showDeleteDialog.set(true);
  }

  deleteProfessor() {
    const professorId = this.professorToDelete();
    if (professorId) {
      console.log('Attempting to delete professor:', professorId);
      this.professorService.delete(professorId).subscribe({
        next: () => {
          console.log('Professor deleted successfully');
          this.loadProfessors();
          this.showDeleteDialog.set(false);
          this.professorToDelete.set(null);
        },
        error: (error) => {
          console.error('Error deleting professor:', error);
          alert('Error al eliminar el profesor: ' + (error.error?.message || error.message || 'Error desconocido'));
          this.showDeleteDialog.set(false);
          this.professorToDelete.set(null);
        }
      });
    }
  }

  cancelDelete() {
    this.showDeleteDialog.set(false);
    this.professorToDelete.set(null);
  }
}
