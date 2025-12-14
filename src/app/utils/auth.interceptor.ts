import { HttpInterceptorFn } from '@angular/common/http';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  // No agregar headers de autenticación a la API de AWS
  if (req.url.includes('execute-api.us-east-1.amazonaws.com')) {
    return next(req);
  }

  // Obtener el token del localStorage (o sessionStorage)
  const token = localStorage.getItem('auth_token');

  // Si existe el token, clonar la petición y agregar el header Authorization
  if (token) {
    const clonedRequest = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`
      }
    });
    return next(clonedRequest);
  }

  // Si no hay token, continuar con la petición original
  return next(req);
};
