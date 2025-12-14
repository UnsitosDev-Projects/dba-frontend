import { Component, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { StudentService } from '../../services/student.service';
import { ProfessorService } from '../../services/professor.service';
import { Student } from '../../models/student.model';
import { Professor } from '../../models/professor.model';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="space-y-6">
      <!-- Header -->
      <div class="bg-white rounded-lg shadow-sm p-6">
        <h1 class="text-3xl font-bold text-gray-800">Dashboard</h1>
        <p class="text-gray-600 mt-2">Bienvenido al sistema de gestión académica</p>
      </div>

      <!-- Stats Cards -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <!-- Total Estudiantes -->
        <div class="bg-white rounded-lg shadow-sm p-6">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-sm font-medium text-gray-600">Total Estudiantes</p>
              @if (loading()) {
                <div class="animate-pulse h-10 bg-gray-200 rounded w-20 mt-2"></div>
              } @else {
                <p class="text-3xl font-bold text-gray-800 mt-2">{{ totalStudents() }}</p>
              }
            </div>
            <div class="bg-blue-100 rounded-full p-3">
              <span class="material-icons text-blue-600">people</span>
            </div>
          </div>
          <button 
            (click)="navigateTo('/estudiantes')"
            class="text-sm text-blue-600 mt-4 hover:underline"
          >
            Ver todos →
          </button>
        </div>

        <!-- Total Profesores -->
        <div class="bg-white rounded-lg shadow-sm p-6">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-sm font-medium text-gray-600">Total Profesores</p>
              @if (loading()) {
                <div class="animate-pulse h-10 bg-gray-200 rounded w-20 mt-2"></div>
              } @else {
                <p class="text-3xl font-bold text-gray-800 mt-2">{{ totalProfessors() }}</p>
              }
            </div>
            <div class="bg-green-100 rounded-full p-3">
              <span class="material-icons text-green-600">school</span>
            </div>
          </div>
          <button 
            (click)="navigateTo('/profesores')"
            class="text-sm text-green-600 mt-4 hover:underline"
          >
            Ver todos →
          </button>
        </div>

        <!-- Total Cursos -->
        <div class="bg-white rounded-lg shadow-sm p-6">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-sm font-medium text-gray-600">Total Cursos</p>
              <p class="text-3xl font-bold text-gray-800 mt-2">-</p>
            </div>
            <div class="bg-purple-100 rounded-full p-3">
              <span class="material-icons text-purple-600">book</span>
            </div>
          </div>
          <p class="text-sm text-gray-500 mt-4">Disponible próximamente</p>
        </div>
      </div>

      <!-- Recent Activity -->
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <!-- Recent Students -->
        <div class="bg-white rounded-lg shadow-sm p-6">
          <div class="flex items-center justify-between mb-4">
            <h2 class="text-xl font-semibold text-gray-800">
              Estudiantes Recientes
            </h2>
            <button 
              (click)="navigateTo('/estudiantes')"
              class="text-sm text-blue-600 hover:underline"
            >
              Ver todos
            </button>
          </div>
          @if (loading()) {
            <div class="space-y-4">
              @for (item of [1,2,3,4]; track item) {
                <div class="animate-pulse flex items-center space-x-3 py-3">
                  <div class="bg-gray-200 rounded-full w-10 h-10"></div>
                  <div class="flex-1">
                    <div class="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                    <div class="h-3 bg-gray-200 rounded w-1/2"></div>
                  </div>
                </div>
              }
            </div>
          } @else if (recentStudents().length === 0) {
            <div class="text-center py-8 text-gray-500">
              <span class="material-icons text-4xl mb-2">people_outline</span>
              <p>No hay estudiantes registrados</p>
            </div>
          } @else {
            <div class="space-y-4">
              @for (student of recentStudents(); track student.id) {
                <div class="flex items-center justify-between py-3 border-b border-gray-100 hover:bg-gray-50 cursor-pointer" (click)="navigateTo('/estudiantes/editar/' + student.id)">
                  <div class="flex items-center space-x-3">
                    <div class="bg-blue-100 rounded-full w-10 h-10 flex items-center justify-center">
                      <span class="material-icons text-blue-600">person</span>
                    </div>
                    <div>
                      <p class="font-medium text-gray-800">{{ student.name }}</p>
                      <p class="text-sm text-gray-600">{{ student.career }}</p>
                    </div>
                  </div>
                  <span class="material-icons text-gray-400">arrow_forward</span>
                </div>
              }
            </div>
          }
        </div>

        <!-- Recent Professors -->
        <div class="bg-white rounded-lg shadow-sm p-6">
          <div class="flex items-center justify-between mb-4">
            <h2 class="text-xl font-semibold text-gray-800">
              Profesores Recientes
            </h2>
            <button 
              (click)="navigateTo('/profesores')"
              class="text-sm text-green-600 hover:underline"
            >
              Ver todos
            </button>
          </div>
          @if (loading()) {
            <div class="space-y-4">
              @for (item of [1,2,3,4]; track item) {
                <div class="animate-pulse flex items-center space-x-3 py-3">
                  <div class="bg-gray-200 rounded-full w-10 h-10"></div>
                  <div class="flex-1">
                    <div class="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                    <div class="h-3 bg-gray-200 rounded w-1/2"></div>
                  </div>
                </div>
              }
            </div>
          } @else if (recentProfessors().length === 0) {
            <div class="text-center py-8 text-gray-500">
              <span class="material-icons text-4xl mb-2">school</span>
              <p>No hay profesores registrados</p>
            </div>
          } @else {
            <div class="space-y-4">
              @for (professor of recentProfessors(); track professor.id) {
                <div class="flex items-center justify-between py-3 border-b border-gray-100 hover:bg-gray-50 cursor-pointer" (click)="navigateTo('/profesores/editar/' + professor.id)">
                  <div class="flex items-center space-x-3">
                    <div class="bg-green-100 rounded-full w-10 h-10 flex items-center justify-center">
                      <span class="material-icons text-green-600">school</span>
                    </div>
                    <div>
                      <p class="font-medium text-gray-800">{{ professor.name }}</p>
                      <p class="text-sm text-gray-600">{{ professor.department }}</p>
                    </div>
                  </div>
                  <span class="material-icons text-gray-400">arrow_forward</span>
                </div>
              }
            </div>
          }
        </div>
      </div>
    </div>
  `
})
export class DashboardPage implements OnInit {
  private studentService = inject(StudentService);
  private professorService = inject(ProfessorService);
  private router = inject(Router);

  loading = signal(true);
  totalStudents = signal(0);
  totalProfessors = signal(0);
  recentStudents = signal<Student[]>([]);
  recentProfessors = signal<Professor[]>([]);

  ngOnInit() {
    this.loadDashboardData();
  }

  loadDashboardData() {
    this.loading.set(true);

    // Load students
    this.studentService.getAll().subscribe({
      next: (students) => {
        console.log('Dashboard - Students loaded:', students);
        this.totalStudents.set(students.length);
        // Get last 5 students
        this.recentStudents.set(students.slice(-5).reverse());
      },
      error: (error) => {
        console.error('Dashboard - Error loading students:', error);
      }
    });

    // Load professors
    this.professorService.getAll().subscribe({
      next: (professors) => {
        console.log('Dashboard - Professors loaded:', professors);
        this.totalProfessors.set(professors.length);
        // Get last 5 professors
        this.recentProfessors.set(professors.slice(-5).reverse());
        this.loading.set(false);
      },
      error: (error) => {
        console.error('Dashboard - Error loading professors:', error);
        this.loading.set(false);
      }
    });
  }

  navigateTo(route: string) {
    this.router.navigate([route]);
  }
}
