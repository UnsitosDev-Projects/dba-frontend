import { Routes } from '@angular/router';

export const CURSOS_ROUTES: Routes = [
  {
    path: '',
    loadComponent: () => import('./cursos-list.page').then(m => m.CursosListPage)
  },
  {
    path: 'nuevo',
    loadComponent: () => import('./curso-form.page').then(m => m.CursoFormPage)
  }
];
