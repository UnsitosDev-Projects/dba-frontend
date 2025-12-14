import { Component, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { StudentService } from '../../services/student.service';
import { Student } from '../../models/student.model';

@Component({
  selector: 'app-estudiantes-list',
  standalone: true,
  imports: [CommonModule],
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
                Matrícula
              </th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Nombre Completo
              </th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Email
              </th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Teléfono
              </th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Fecha Ingreso
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
                  <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {{ student.enrollmentNumber }}
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap">
                    <div class="flex items-center">
                      <div class="bg-blue-100 rounded-full w-10 h-10 flex items-center justify-center mr-3">
                        <span class="material-icons text-blue-600">person</span>
                      </div>
                      <div>
                        <div class="text-sm font-medium text-gray-900">
                          {{ student.firstName }} {{ student.lastName }}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {{ student.email }}
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {{ student.phone || 'N/A' }}
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {{ student.enrollmentDate | date }}
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                    <button class="text-blue-600 hover:text-blue-900">
                      <span class="material-icons text-sm">edit</span>
                    </button>
                    <button class="text-red-600 hover:text-red-900">
                      <span class="material-icons text-sm">delete</span>
                    </button>
                  </td>
                </tr>
              }
            }
          </tbody>
        </table>
      </div>
    </div>
  `
})
export class EstudiantesListPage implements OnInit {
  private studentService = inject(StudentService);
  private router = inject(Router);

  students = signal<Student[]>([]);
  loading = signal(true);

  ngOnInit() {
    this.loadStudents();
  }

  loadStudents() {
    this.loading.set(true);
    this.studentService.getAll().subscribe({
      next: (students) => {
        this.students.set(students);
        this.loading.set(false);
      },
      error: () => {
        this.loading.set(false);
      }
    });
  }

  navigateToNew() {
    this.router.navigate(['/estudiantes/nuevo']);
  }
}
