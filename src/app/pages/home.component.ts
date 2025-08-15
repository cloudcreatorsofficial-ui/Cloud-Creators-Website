import { Component, HostListener, AfterViewInit, PLATFORM_ID, Inject } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { NavbarComponent } from '../navbar/navbar.component';
import { Chart } from 'chart.js/auto';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, NavbarComponent],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements AfterViewInit {
  sectionIds = ['home', 'services', 'about', 'portfolio', 'terms', 'contact'];
  private isBrowser: boolean;

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {
    this.isBrowser = isPlatformBrowser(this.platformId);
  }

  ngAfterViewInit() {
    if (this.isBrowser) {
      this.revealSections();

      // Chart.js graphs
      this.createCharts();

      // Calendar icon click handling
      const icon = document.querySelector(".calendar-icon");
      const dateInput = document.querySelector("#schedule") as HTMLInputElement;

      if (icon && dateInput && (dateInput as any).showPicker) {
        icon.addEventListener("click", () => {
          (dateInput as any).showPicker();
        });
      }
    }
  }

  createCharts() {
    // Pie Chart
    new Chart('myPieChart', {
      type: 'pie',
      data: {
        labels: ['Red', 'Blue', 'Yellow'],
        datasets: [{
          label: 'My Dataset',
          data: [10, 20, 30],
          backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56']
        }]
      }
    });

    // Bar Chart
    new Chart('myBarChart', {
      type: 'bar',
      data: {
        labels: ['January', 'February', 'March'],
        datasets: [{
          label: 'Monthly Sales',
          data: [65, 59, 80],
          backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56']
        }]
      },
      options: {
        responsive: true,
        plugins: {
          legend: { position: 'top' },
        }
      }
    });
  }

  @HostListener('window:scroll', [])
  onWindowScroll() {
    if (this.isBrowser) {
      this.revealSections();
      this.highlightNavLink();
    }
  }

  revealSections() {
    this.sectionIds.forEach(id => {
      const section = document.getElementById(id);
      if (section) {
        const rect = section.getBoundingClientRect();
        if (rect.top < window.innerHeight - 100) {
          section.classList.add('active');
        }
      }
    });
  }

  highlightNavLink() {
    const scrollPos = window.scrollY || window.pageYOffset;
    this.sectionIds.forEach(id => {
      const section = document.getElementById(id);
      const navLink = document.querySelector(`.nav-links a[href="#${id}"]`);
      if (section && navLink) {
        const offsetTop = section.offsetTop - 120;
        const offsetHeight = section.offsetHeight;
        if (scrollPos >= offsetTop && scrollPos < offsetTop + offsetHeight) {
          navLink.classList.add('active');
        } else {
          navLink.classList.remove('active');
        }
      }
    });
  }

  scrollToSection(event: Event, id: string) {
    event.preventDefault();
    const section = document.getElementById(id);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
  }
}
