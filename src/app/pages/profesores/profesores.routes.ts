import { Routes } from '@angular/router';

export const PROFESORES_ROUTES: Routes = [
  {
    path: '',
    loadComponent: () => import('./profesores-list.page').then(m => m.ProfesoresListPage)
  },
  {
    path: 'nuevo',
    loadComponent: () => import('./profesor-form.page').then(m => m.ProfesorFormPage)
  },
  {
    path: 'editar/:id',
    loadComponent: () => import('./profesor-form.page').then(m => m.ProfesorFormPage)
  }
];
