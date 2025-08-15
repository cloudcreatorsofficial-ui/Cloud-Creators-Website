import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { HomeComponent } from './pages/home.component';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter([
      {
        path: '',
        component: HomeComponent,
      }
    ])
  ]
};
