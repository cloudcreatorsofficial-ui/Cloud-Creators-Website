import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-terms-and-conditions',
  standalone: true,
  templateUrl: './terms and conditions.html',
  styleUrls: []
})
export class TermsAndConditionsComponent implements OnInit {
  constructor(private router: Router) {}

  ngOnInit() {
    window.scrollTo({ top: 0, behavior: 'auto' });
  }

  goHome() {
    this.router.navigate(['/']);
  }
}
