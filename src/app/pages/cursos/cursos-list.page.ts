import { Component, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { CourseService } from '../../services/course.service';
import { Course } from '../../models/course.model';
import { ConfirmDialogComponent } from '../../shared/confirm-dialog.component';

@Component({
  selector: 'app-cursos-list',
  standalone: true,
  imports: [CommonModule, ConfirmDialogComponent],
  template: `
    <div class="space-y-6">
      <!-- Header -->
      <div class="flex items-center justify-between bg-white rounded-lg shadow-sm p-6">
        <div>
          <h1 class="text-3xl font-bold text-gray-800">Cursos</h1>
          <p class="text-gray-600 mt-2">Gestiona todos los cursos disponibles</p>
        </div>
        <button 
          (click)="navigateToNew()"
          class="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2"
        >
          <span class="material-icons">add</span>
          <span>Nuevo Curso</span>
        </button>
      </div>

      <!-- Search and Filters -->
      <!-- <div class="bg-white rounded-lg shadow-sm p-6">
        <div class="flex flex-col md:flex-row gap-4">
          <div class="flex-1"> -->
            <!-- <input 
              type="text"
              placeholder="Buscar cursos..."
              class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            /> -->
          <!-- </div>
          <select class="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
            <option>Todos los estados</option>
            <option>Activo</option>
            <option>Inactivo</option>
          </select>
        </div>
      </div> -->

      <!-- Courses Table -->
      <div class="bg-white rounded-lg shadow-sm overflow-hidden">
        <table class="min-w-full divide-y divide-gray-200">
          <thead class="bg-gray-50">
            <tr>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Código
              </th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Nombre
              </th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Departamento
              </th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Créditos
              </th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Estado
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
            } @else if (courses().length === 0) {
              <tr>
                <td colspan="6" class="px-6 py-12 text-center text-gray-500">
                  No hay cursos disponibles
                </td>
              </tr>
            } @else {
              @for (course of courses(); track course.courseId) {
                <tr class="hover:bg-gray-50">
                  <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {{ course.courseId }}
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {{ course.name || 'N/A' }}
                  </td>
                  <td class="px-6 py-4 text-sm text-gray-500">
                    {{ course.department || 'N/A' }}
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {{ course.credits || 'N/A' }}
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap">
                    <span class="px-2 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800">
                      Activo
                    </span>
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                    <button 
                      (click)="navigateToEdit(course.courseId)"
                      class="text-blue-600 hover:text-blue-900"
                      title="Editar curso"
                    >
                      <span class="material-icons text-sm">edit</span>
                    </button>
                    <button 
                      (click)="confirmDelete(course.courseId)"
                      class="text-red-600 hover:text-red-900"
                      title="Eliminar curso"
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
        [title]="'Eliminar Curso'"
        [message]="'¿Está seguro que desea eliminar este curso? Esta acción no se puede deshacer.'"
        (confirm)="deleteCourse()"
        (cancel)="cancelDelete()"
      />
    </div>
  `
})
export class CursosListPage implements OnInit {
  private courseService = inject(CourseService);
  private router = inject(Router);

  courses = signal<Course[]>([]);
  loading = signal(true);
  showDeleteDialog = signal(false);
  courseToDelete = signal<string | null>(null);

  ngOnInit() {
    this.loadCourses();
  }

  loadCourses() {
    this.loading.set(true);
    this.courseService.getAll().subscribe({
      next: (response) => {
        console.log('API Response:', response);
        this.courses.set(response.courses || []);
        this.loading.set(false);
      },
      error: (error) => {
        console.error('Error loading courses:', error);
        this.courses.set([]);
        this.loading.set(false);
      }
    });
  }

  navigateToNew() {
    this.router.navigate(['/cursos/nuevo']);
  }

  navigateToEdit(courseId: string) {
    console.log('Navigating to edit course:', courseId);
    this.router.navigate(['/cursos/editar', courseId]);
  }

  confirmDelete(courseId: string) {
    this.courseToDelete.set(courseId);
    this.showDeleteDialog.set(true);
  }

  deleteCourse() {
    const courseId = this.courseToDelete();
    if (courseId) {
      console.log('Attempting to delete course:', courseId);
      this.courseService.delete(courseId).subscribe({
        next: () => {
          console.log('Course deleted successfully');
          this.loadCourses();
          this.showDeleteDialog.set(false);
          this.courseToDelete.set(null);
        },
        error: (error) => {
          console.error('Error deleting course:', error);
          alert('Error al eliminar el curso: ' + (error.error?.message || error.message || 'Error desconocido'));
          this.showDeleteDialog.set(false);
          this.courseToDelete.set(null);
        }
      });
    }
  }

  cancelDelete() {
    this.showDeleteDialog.set(false);
    this.courseToDelete.set(null);
  }
}
