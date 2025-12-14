export interface NavigationItem {
  label: string;
  icon: string;
  path: string;
  active?: boolean;
  children?: NavigationChild[];
}

export interface NavigationChild {
  label: string;
  path: string;
}

export const NAVIGATION_ITEMS: NavigationItem[] = [
  {
    label: 'Dashboard',
    icon: 'home',
    path: '/dashboard',
    active: true
  },
  {
    label: 'Cursos',
    icon: 'book',
    path: '/cursos',
    children: [
      { label: 'Todos los cursos', path: '/cursos' },
      { label: 'Nuevo curso', path: '/cursos/nuevo' }
    ]
  },
  {
    label: 'Profesores',
    icon: 'school',
    path: '/profesores',
    children: [
      { label: 'Lista de profesores', path: '/profesores' },
      { label: 'Agregar profesor', path: '/profesores/nuevo' }
    ]
  },
  {
    label: 'Estudiantes',
    icon: 'people',
    path: '/estudiantes',
    children: [
      { label: 'Lista de estudiantes', path: '/estudiantes' },
      { label: 'Agregar estudiante', path: '/estudiantes/nuevo' }
    ]
  }
];
