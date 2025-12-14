import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./layout/main-layout.component').then(m => m.MainLayoutComponent),
    children: [
      {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full'
      },
      {
        path: 'dashboard',
        loadChildren: () => import('./pages/dashboard/dashboard.routes').then(m => m.DASHBOARD_ROUTES)
      },
      {
        path: 'cursos',
        loadChildren: () => import('./pages/cursos/cursos.routes').then(m => m.CURSOS_ROUTES)
      },
      {
        path: 'profesores',
        loadChildren: () => import('./pages/profesores/profesores.routes').then(m => m.PROFESORES_ROUTES)
      },
      {
        path: 'estudiantes',
        loadChildren: () => import('./pages/estudiantes/estudiantes.routes').then(m => m.ESTUDIANTES_ROUTES)
      }
    ]
  },
  {
    path: '**',
    redirectTo: 'dashboard'
  }
];
