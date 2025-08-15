import { Component, HostListener, AfterViewInit, PLATFORM_ID, Inject, OnDestroy } from '@angular/core';
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
export class HomeComponent implements AfterViewInit, OnDestroy {
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

      // Start auto-scrolling portfolio images
      this.startAutoScroll();
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

  // Portfolio navigation functions
  prevProject() {
    console.log('Previous project clicked');
    // Add logic to navigate to previous project
    this.navigateProject(-1);
  }

  nextProject() {
    console.log('Next project clicked');
    // Add logic to navigate to next project
    this.navigateProject(1);
  }

  private navigateProject(direction: number) {
    // This is a placeholder for project navigation logic
    // You can implement actual project switching here
    const projects = document.querySelectorAll('.portfolio-content');
    if (projects.length > 0) {
      // Example implementation - you may need to adjust based on your actual project structure
      console.log(`Navigating ${direction > 0 ? 'next' : 'previous'} project`);
    }
  }

  // Image slider functions for portfolio
  prevImage() {
    console.log('Previous image clicked');
    this.navigateImage(-1);
  }

  nextImage() {
    console.log('Next image clicked');
    this.navigateImage(1);
  }

  private navigateImage(direction: number) {
    const sliderImage = document.getElementById('slider-image') as HTMLImageElement;
    if (sliderImage) {
      // Example image rotation - adjust based on your actual images
      const images = ['assets/website 1.png', 'assets/website 2.png', 'assets/website 3.png', 'assets/website 4.png'];
      const currentSrc = sliderImage.src;
      const currentIndex = images.findIndex(img => currentSrc.includes(img));
      
      if (currentIndex !== -1) {
        let newIndex = currentIndex + direction;
        if (newIndex < 0) newIndex = images.length - 1;
        if (newIndex >= images.length) newIndex = 0;
        
        sliderImage.src = images[newIndex];
      }
    }
  }

  private autoScrollInterval: any;

  private startAutoScroll() {
    if (!this.isBrowser) return;

    const images = ['assets/website 1.png', 'assets/website 2.png', 'assets/website 3.png', 'assets/website 4.png'];
    let currentIndex = 0;
    const sliderImage = document.getElementById('slider-image') as HTMLImageElement;
    
    if (!sliderImage) return;

    // Set initial image
    sliderImage.src = images[currentIndex];

    // Start auto-rotation every 1 second
    this.autoScrollInterval = setInterval(() => {
      currentIndex = (currentIndex + 1) % images.length;
      sliderImage.src = images[currentIndex];
      
      // Add fade transition effect
      sliderImage.style.transition = 'opacity 0.5s ease-in-out';
      sliderImage.style.opacity = '0';
      
      setTimeout(() => {
        sliderImage.style.opacity = '1';
      }, 250);
    }, 3500);

    // Pause on hover
    const sliderContainer = document.querySelector('.image-slider');
    if (sliderContainer) {
      sliderContainer.addEventListener('mouseenter', () => {
        clearInterval(this.autoScrollInterval);
      });
      
      sliderContainer.addEventListener('mouseleave', () => {
        this.autoScrollInterval = setInterval(() => {
          currentIndex = (currentIndex + 1) % images.length;
          sliderImage.src = images[currentIndex];
          
          sliderImage.style.transition = 'opacity 0.5s ease-in-out';
          sliderImage.style.opacity = '0';
          
          setTimeout(() => {
            sliderImage.style.opacity = '1';
          }, 250);
        }, 3500);
      });
    }
  }

  ngOnDestroy() {
    if (this.autoScrollInterval) {
      clearInterval(this.autoScrollInterval);
    }
  }
}
