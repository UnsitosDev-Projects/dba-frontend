import { Routes } from '@angular/router';

export const ESTUDIANTES_ROUTES: Routes = [
  {
    path: '',
    loadComponent: () => import('./estudiantes-list.page').then(m => m.EstudiantesListPage)
  },
  {
    path: 'nuevo',
    loadComponent: () => import('./estudiante-form.page').then(m => m.EstudianteFormPage)
  }
];
