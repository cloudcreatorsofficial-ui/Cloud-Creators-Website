import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from './navbar/navbar.component'; // ✅ Import NavbarComponent

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    NavbarComponent // ✅ Add it here
  ],
  template: `
    <app-navbar></app-navbar> <!-- Navbar always visible -->
    <router-outlet></router-outlet>
  `,
})
export class AppComponent {}
