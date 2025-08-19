import { Component, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from './navbar/navbar.component'; // ✅ Import NavbarComponent
import { inject } from '@vercel/analytics';
import { isPlatformBrowser } from '@angular/common';

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
export class AppComponent implements OnInit {
  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  ngOnInit() {
    // Initialize Vercel Analytics only in browser environment
    if (isPlatformBrowser(this.platformId)) {
      inject();
    }
  }
}
