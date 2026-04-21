import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app'; // Замени App на AppComponent

bootstrapApplication(AppComponent, appConfig) // И здесь замени App на AppComponent
  .catch((err) => console.error(err));