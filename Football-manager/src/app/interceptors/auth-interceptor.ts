import { HttpInterceptorFn } from '@angular/common/http';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const token = localStorage.getItem('token')?.replace(/"/g, ''); // Удалит все кавычки
  console.log('INTERCEPTOR SEE TOKEN AS:', token); 

  if (token && token !== 'undefined') { 
    const authReq = req.clone({
      setHeaders: {
  Authorization: `Token ${token}`
}
    });
    return next(authReq);
  }
  return next(req);
};