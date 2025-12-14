# Sistema de Gestión Académica - DBA Frontend

Aplicación Angular 20+ con arquitectura limpia y componentes standalone para gestionar cursos, profesores y estudiantes.

> [!NOTE]
> Este proyecto fue generado con Angular CLI 20.2.2 y utiliza las últimas características de Angular incluyendo Signals y Componentes Standalone.

## Características

| Característica | Descripción |
|----------------|-------------|
| **Angular 20+** | Componentes Standalone y Signals |
| **Arquitectura** | Limpia y escalable con Repository Pattern |
| **Estilos** | Tailwind CSS con Material Icons |
| **Estado** | Signals para reactividad |
| **HTTP** | Interceptors para Loading, Error y Auth |
| **Routing** | Lazy Loading en todas las rutas |
| **UI** | Sidebar responsive y colapsable |

## Estructura del Proyecto

```
src/app/
├── config/           # Configuraciones (API, navegación)
│   ├── api.config.ts
│   └── navigation.config.ts
├── layout/          # Componentes de layout
│   ├── main-layout.component.ts
│   ├── sidebar.component.ts
│   ├── header.component.ts
│   └── footer.component.ts
├── pages/           # Páginas principales
│   ├── dashboard/
│   │   ├── dashboard.page.ts
│   │   └── dashboard.routes.ts
│   ├── cursos/
│   │   ├── cursos-list.page.ts
│   │   ├── curso-form.page.ts
│   │   └── cursos.routes.ts
│   ├── profesores/
│   │   ├── profesores-list.page.ts
│   │   ├── profesor-form.page.ts
│   │   └── profesores.routes.ts
│   └── estudiantes/
│       ├── estudiantes-list.page.ts
│       ├── estudiante-form.page.ts
│       └── estudiantes.routes.ts
├── models/           # Interfaces TypeScript
│   ├── professor.model.ts
│   ├── student.model.ts
│   └── course.model.ts
├── dtos/            # Data Transfer Objects
│   ├── create-professor.dto.ts
│   ├── update-professor.dto.ts
│   ├── professor-response.dto.ts
│   ├── create-student.dto.ts
│   └── create-course.dto.ts
├── repositories/     # Servicios de acceso a datos (HTTP)
│   ├── professor.repository.ts
│   ├── student.repository.ts
│   └── course.repository.ts
├── services/         # Servicios de lógica de negocio
│   ├── professor.service.ts
│   ├── student.service.ts
│   ├── course.service.ts
│   └── loading.service.ts
├── shared/           # Componentes reutilizables
│   ├── loading-spinner.component.ts
│   ├── error-alert.component.ts
│   ├── confirm-dialog.component.ts
│   └── search-filter.component.ts
└── utils/           # Utilidades e interceptors
    ├── error.interceptor.ts
    ├── loading.interceptor.ts
    └── auth.interceptor.ts
```

## Instalación

> [!IMPORTANT]
> Asegúrate de tener Node.js 18+ instalado en tu sistema.

### 1. Instalar dependencias
```bash
npm install
```

### 2. Configuración de Tailwind
Tailwind ya está configurado. Si necesitas reinstalarlo:
```bash
npm install -D tailwindcss postcss autoprefixer
```

## Desarrollo

Para iniciar el servidor de desarrollo:

```bash
npm start
```
## API Backend

> [!WARNING]
> Asegúrate de que el backend esté ejecutándose antes de iniciar la aplicación frontend.

El frontend está configurado para conectarse al backend en:
```bash
http://localhost:8080/api
```

### Endpoints esperados:

| Recurso | Método | Endpoint | Descripción |
|---------|--------|----------|-------------|
| **Profesores** | GET | `/professors` | Listar todos |
| | GET | `/professors/:id` | Obtener uno |
| | POST | `/professors` | Crear |
| | PUT | `/professors/:id` | Actualizar |
| | DELETE | `/professors/:id` | Eliminar |
| **Estudiantes** | GET | `/students` | Listar todos |
| | GET | `/students/:id` | Obtener uno |
| | POST | `/students` | Crear |
| | PUT | `/students/:id` | Actualizar |
| | DELETE | `/students/:id` | Eliminar |
| **Cursos** | GET | `/courses` | Listar todos |
| | GET | `/courses/:id` | Obtener uno |
| | POST | `/courses` | Crear |
| | PUT | `/courses/:id` | Actualizar |
| | DELETE | `/courses/:id` | Eliminar |
**Cursos:**
- GET `/courses` - Listar todos
- GET `/courses/:id` - Obtener uno
- POST `/courses` - Crear
- PUT `/courses/:id` - Actualizar
- DELETE `/courses/:id` - Eliminar

## Módulos Principales

| Módulo | Descripción | Rutas |
|--------|-------------|-------|
| **Dashboard** | Página principal con estadísticas y resumen | `/dashboard` |
| **Cursos** | Gestión de cursos académicos | `/cursos`, `/cursos/nuevo` |
| **Profesores** | Gestión del cuerpo docente | `/profesores`, `/profesores/nuevo` |
| **Estudiantes** | Gestión de estudiantes | `/estudiantes`, `/estudiantes/nuevo` |

## Características Implementadas

### Layout
- Sidebar colapsable con navegación
- Header con botón de toggle
- Footer con información
- Responsive design (desktop, tablet, mobile)

### Sistema de Navegación
- Lazy loading en todas las rutas
- Rutas hijas configuradas
- Submenús en el sidebar
## Características Implementadas

| Categoría | Características |
|-----------|-----------------|
| **Layout** | Sidebar colapsable, Header con toggle, Footer, Responsive (desktop/tablet/mobile) |
| **Navegación** | Lazy loading, Rutas hijas, Submenús, Redirección automática |
| **HTTP & API** | HTTP Client, Interceptors (errores, loading, auth), Repository pattern, Service layer |
| **Componentes** | Loading spinner, Error alert, Confirm dialog, Search filter |
| **Estilos** | Tailwind CSS, Material Icons, Tema oscuro en sidebar, Animaciones |
| **Arquitectura** | Standalone Components, Signals, inject(), Repository Pattern, DTO Pattern |
### Modificar Rutas del Sidebar
Editar `src/app/config/navigation.config.ts`:
```typescript
export const NAVIGATION_ITEMS = [
  // Agregar o modificar rutas
];
```

### Personalizar Colores
Editar `tailwind.config.js`:
```javascript
theme: {
  extend: {
    colors: {
      // Personalizar colores
    }
  }
}
```

## Build

Para compilar el proyecto:

```bash
npm run build
```

Los archivos se generarán en el directorio `dist/`.

## Tests

## Configuración

> [!TIP]
> Todos los archivos de configuración están centralizados en la carpeta `src/app/config/`.

### Cambiar URL del Backend
Editar `src/app/config/api.config.ts`:
```typescript
export const API_CONFIG = {
  BASE_URL: 'http://localhost:8080/api', // Cambiar aquí
  // ...
};
```

### Modificar Rutas del Sidebar
Editar `src/app/config/navigation.config.ts`:
```typescript
export const NAVIGATION_ITEMS = [
  // Agregar o modificar rutas
## Build

Para compilar el proyecto para producción:

## Troubleshooting

> [!WARNING]
> Si encuentras problemas, verifica estas soluciones comunes.

| Problema | Solución |
|----------|----------|
| **Tailwind no funciona** | Ejecutar: `npm install -D tailwindcss postcss autoprefixer` |
| **Material Icons no aparecen** | Verificar el link en `index.html`: `<link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">` |
| **Errores HTTP** | Verificar que `provideHttpClient` esté en `app.config.ts` |
| **Backend no responde** | Asegurar que el backend esté ejecutándose en `http://localhost:8080` |
## Autenticación (Opcional)

> [!TIP]
> El interceptor de autenticación está preconfigurado pero desactivado por defecto.

## Archivos Clave

| Archivo | Descripción |
|---------|-------------|
| `app.routes.ts` | Configuración de rutas y lazy loading |
| `app.config.ts` | Configuración global y providers |
| `app.ts` | Componente raíz de la aplicación |
| `styles.css` | Estilos globales con Tailwind |
| `index.html` | HTML principal |
| `tailwind.config.js` | Configuración de Tailwind CSS |
|------------|-------------|
| **Dependency Injection** | Usar `inject()` en lugar de constructor |
## Próximos Pasos Recomendados

> [!TIP]
> Estas son las mejoras sugeridas para extender la funcionalidad de la aplicación.

| Prioridad | Tarea |
|-----------|-------|
| Alta | Conectar con el backend real |
| Alta | Implementar autenticación completa |
| Media | Agregar paginación a las tablas |
| Media | Implementar búsqueda y filtros avanzados |
| Media | Agregar validaciones personalizadas |
| Media | Implementar guards de ruta |
| Baja | Agregar notificaciones toast |
| Baja | Implementar tests unitarios |l
2. Implementar autenticación completa
3. Agregar paginación a las tablas
4. Implementar búsqueda y filtros avanzados
5. Agregar validaciones personalizadas
6. Implementar guards de ruta
7. Agregar notificaciones toast
8. Implementar tests unitarios

## Recursos Adicionales

- [Angular CLI](https://angular.dev/tools/cli)
- [Angular Documentation](https://angular.dev)
- [Tailwind CSS](https://tailwindcss.com)
- [Material Icons](https://fonts.google.com/icons)
