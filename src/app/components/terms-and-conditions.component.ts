import { Component, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { Router } from '@angular/router';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-terms-and-conditions',
  standalone: true,
  templateUrl: './terms and conditions.html',
  styleUrls: []
})
export class TermsAndConditionsComponent implements OnInit {
  constructor(private router: Router, @Inject(PLATFORM_ID) private platformId: Object) {}

  ngOnInit() {
    if (isPlatformBrowser(this.platformId)) {
      window.scrollTo({ top: 0, behavior: 'auto' });
    }
  }

  goHome() {
    this.router.navigate(['/']);
  }
}
