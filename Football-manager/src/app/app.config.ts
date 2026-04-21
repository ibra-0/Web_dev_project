import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { provideRouter } from '@angular/router'; 
import { routes } from './app.routes'; 
import { authInterceptor } from './interceptors/auth-interceptor';
import { AppRoutingModule } from './app-routing-module';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes), 
    importProvidersFrom(AppRoutingModule),    
    provideHttpClient(
      withInterceptors([authInterceptor])
    )
  ]
};