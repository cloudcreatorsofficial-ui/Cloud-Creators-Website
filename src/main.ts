import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { provideRouter } from '@angular/router';
import { HomeComponent } from './app/pages/home.component';

bootstrapApplication(AppComponent, {
  providers: [
    provideRouter([
      { path: '', component: HomeComponent }
    ])
  ]
});
