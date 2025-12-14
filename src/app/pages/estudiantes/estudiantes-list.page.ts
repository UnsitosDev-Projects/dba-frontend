import { Component, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { StudentService } from '../../services/student.service';
import { Student } from '../../models/student.model';
import { ConfirmDialogComponent } from '../../shared/confirm-dialog.component';

@Component({
  selector: 'app-estudiantes-list',
  standalone: true,
  imports: [CommonModule, ConfirmDialogComponent],
  template: `
    <div class="space-y-6">
      <!-- Header -->
      <div class="flex items-center justify-between bg-white rounded-lg shadow-sm p-6">
        <div>
          <h1 class="text-3xl font-bold text-gray-800">Estudiantes</h1>
          <p class="text-gray-600 mt-2">Gestiona todos los estudiantes</p>
        </div>
        <button 
          (click)="navigateToNew()"
          class="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2"
        >
          <span class="material-icons">add</span>
          <span>Nuevo Estudiante</span>
        </button>
      </div>

      <!-- Search -->
      <div class="bg-white rounded-lg shadow-sm p-6">
        <input 
          type="text"
          placeholder="Buscar estudiantes..."
          class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <!-- Students Table -->
      <div class="bg-white rounded-lg shadow-sm overflow-hidden">
        <table class="min-w-full divide-y divide-gray-200">
          <thead class="bg-gray-50">
            <tr>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                ID
              </th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Nombre
              </th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Email
              </th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Carrera
              </th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Acciones
              </th>
            </tr>
          </thead>
          <tbody class="bg-white divide-y divide-gray-200">
            @if (loading()) {
              <tr>
                <td colspan="6" class="px-6 py-12 text-center">
                  <div class="flex justify-center items-center">
                    <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
                  </div>
                </td>
              </tr>
            } @else if (students().length === 0) {
              <tr>
                <td colspan="6" class="px-6 py-12 text-center text-gray-500">
                  No hay estudiantes disponibles
                </td>
              </tr>
            } @else {
              @for (student of students(); track student.id) {
                <tr class="hover:bg-gray-50">
                  <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {{ student.id }}
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap">
                    <div class="flex items-center">
                      <div class="bg-blue-100 rounded-full w-10 h-10 flex items-center justify-center mr-3">
                        <span class="material-icons text-blue-600">person</span>
                      </div>
                      <div>
                        <div class="text-sm font-medium text-gray-900">
                          {{ student.name }}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {{ student.email }}
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {{ student.career }}
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                    <button 
                      (click)="navigateToEdit(student.id)"
                      class="text-blue-600 hover:text-blue-900"
                      title="Editar estudiante"
                    >
                      <span class="material-icons text-sm">edit</span>
                    </button>
                    <button 
                      (click)="confirmDelete(student.id)"
                      class="text-red-600 hover:text-red-900"
                      title="Eliminar estudiante"
                    >
                      <span class="material-icons text-sm">delete</span>
                    </button>
                  </td>
                </tr>
              }
            }
          </tbody>
        </table>
      </div>

      <!-- Confirm Dialog -->
      <app-confirm-dialog
        [isOpen]="showDeleteDialog()"
        [title]="'Eliminar Estudiante'"
        [message]="'¿Está seguro que desea eliminar este estudiante? Esta acción no se puede deshacer.'"
        (confirm)="deleteStudent()"
        (cancel)="cancelDelete()"
      />
    </div>
  `
})
export class EstudiantesListPage implements OnInit {
  private studentService = inject(StudentService);
  private router = inject(Router);

  students = signal<Student[]>([]);
  loading = signal(true);
  showDeleteDialog = signal(false);
  studentToDelete = signal<string | null>(null);

  ngOnInit() {
    this.loadStudents();
  }

  loadStudents() {
    this.loading.set(true);
    this.studentService.getAll().subscribe({
      next: (students) => {
        console.log('Students loaded:', students);
        this.students.set(students);
        this.loading.set(false);
      },
      error: (error) => {
        console.error('Error loading students:', error);
        this.loading.set(false);
      }
    });
  }

  navigateToNew() {
    this.router.navigate(['/estudiantes/nuevo']);
  }

  navigateToEdit(studentId: string) {
    console.log('Navigating to edit student:', studentId);
    this.router.navigate(['/estudiantes/editar', studentId]);
  }

  confirmDelete(studentId: string) {
    this.studentToDelete.set(studentId);
    this.showDeleteDialog.set(true);
  }

  deleteStudent() {
    const studentId = this.studentToDelete();
    if (studentId) {
      console.log('Attempting to delete student:', studentId);
      this.studentService.delete(studentId).subscribe({
        next: () => {
          console.log('Student deleted successfully');
          this.loadStudents();
          this.showDeleteDialog.set(false);
          this.studentToDelete.set(null);
        },
        error: (error) => {
          console.error('Error deleting student:', error);
          alert('Error al eliminar el estudiante: ' + (error.error?.message || error.message || 'Error desconocido'));
          this.showDeleteDialog.set(false);
          this.studentToDelete.set(null);
        }
      });
    }
  }

  cancelDelete() {
    this.showDeleteDialog.set(false);
    this.studentToDelete.set(null);
  }
}
