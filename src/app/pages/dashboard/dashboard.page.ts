import { Component } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  template: `
    <div class="space-y-6">
      <!-- Header -->
      <div class="bg-white rounded-lg shadow-sm p-6">
        <h1 class="text-3xl font-bold text-gray-800">Dashboard</h1>
        <p class="text-gray-600 mt-2">Bienvenido al sistema de gestión académica</p>
      </div>

      <!-- Stats Cards -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <!-- Total Estudiantes -->
        <div class="bg-white rounded-lg shadow-sm p-6">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-sm font-medium text-gray-600">Total Estudiantes</p>
              <p class="text-3xl font-bold text-gray-800 mt-2">1,234</p>
            </div>
            <div class="bg-blue-100 rounded-full p-3">
              <span class="material-icons text-blue-600">people</span>
            </div>
          </div>
          <p class="text-sm text-green-600 mt-4">+12% vs mes anterior</p>
        </div>

        <!-- Total Profesores -->
        <div class="bg-white rounded-lg shadow-sm p-6">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-sm font-medium text-gray-600">Total Profesores</p>
              <p class="text-3xl font-bold text-gray-800 mt-2">89</p>
            </div>
            <div class="bg-green-100 rounded-full p-3">
              <span class="material-icons text-green-600">school</span>
            </div>
          </div>
          <p class="text-sm text-green-600 mt-4">+3% vs mes anterior</p>
        </div>

        <!-- Total Cursos -->
        <div class="bg-white rounded-lg shadow-sm p-6">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-sm font-medium text-gray-600">Total Cursos</p>
              <p class="text-3xl font-bold text-gray-800 mt-2">45</p>
            </div>
            <div class="bg-purple-100 rounded-full p-3">
              <span class="material-icons text-purple-600">book</span>
            </div>
          </div>
          <p class="text-sm text-green-600 mt-4">+8% vs mes anterior</p>
        </div>

        <!-- Cursos Activos -->
        <div class="bg-white rounded-lg shadow-sm p-6">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-sm font-medium text-gray-600">Cursos Activos</p>
              <p class="text-3xl font-bold text-gray-800 mt-2">38</p>
            </div>
            <div class="bg-yellow-100 rounded-full p-3">
              <span class="material-icons text-yellow-600">trending_up</span>
            </div>
          </div>
          <p class="text-sm text-gray-600 mt-4">84% del total</p>
        </div>
      </div>

      <!-- Recent Activity -->
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <!-- Recent Enrollments -->
        <div class="bg-white rounded-lg shadow-sm p-6">
          <h2 class="text-xl font-semibold text-gray-800 mb-4">
            Inscripciones Recientes
          </h2>
          <div class="space-y-4">
            @for (item of [1,2,3,4]; track item) {
              <div class="flex items-center justify-between py-3 border-b border-gray-100">
                <div class="flex items-center space-x-3">
                  <div class="bg-gray-200 rounded-full w-10 h-10 flex items-center justify-center">
                    <span class="material-icons text-gray-600">person</span>
                  </div>
                  <div>
                    <p class="font-medium text-gray-800">Juan Pérez</p>
                    <p class="text-sm text-gray-600">Matemáticas Avanzadas</p>
                  </div>
                </div>
                <span class="text-sm text-gray-500">Hace 2h</span>
              </div>
            }
          </div>
        </div>

        <!-- Popular Courses -->
        <div class="bg-white rounded-lg shadow-sm p-6">
          <h2 class="text-xl font-semibold text-gray-800 mb-4">
            Cursos Populares
          </h2>
          <div class="space-y-4">
            @for (item of [1,2,3,4]; track item) {
              <div class="flex items-center justify-between py-3 border-b border-gray-100">
                <div class="flex items-center space-x-3">
                  <div class="bg-blue-100 rounded-lg w-10 h-10 flex items-center justify-center">
                    <span class="material-icons text-blue-600">book</span>
                  </div>
                  <div>
                    <p class="font-medium text-gray-800">Programación Web</p>
                    <p class="text-sm text-gray-600">156 estudiantes</p>
                  </div>
                </div>
                <span class="material-icons text-gray-400">arrow_forward</span>
              </div>
            }
          </div>
        </div>
      </div>
    </div>
  `
})
export class DashboardPage {}
