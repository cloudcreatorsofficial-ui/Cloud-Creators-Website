import { Component, HostListener, Inject } from '@angular/core';
import { CommonModule, DOCUMENT } from '@angular/common';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  activeSection = 'home';

  constructor(@Inject(DOCUMENT) private document: Document) {}

  @HostListener('window:scroll', ['$event'])
  onScroll() {
    this.updateActiveSection();
  }

  private updateActiveSection() {
    const sections = ['home', 'services', 'about', 'portfolio', 'terms', 'contact'];
    const scrollPosition = window.scrollY + 100; // Navbar offset

    for (const section of sections) {
      const element = this.document.getElementById(section);
      if (element) {
        const offsetTop = element.offsetTop;
        const offsetBottom = offsetTop + element.offsetHeight;

        if (scrollPosition >= offsetTop && scrollPosition < offsetBottom) {
          this.activeSection = section;
          break;
        }
      }
    }
  }

  isActive(section: string): boolean {
    return this.activeSection === section;
  }

  scrollToSection(event: Event, sectionId: string) {
    event.preventDefault();
    const section = this.document.getElementById(sectionId);
    if (section) {
      const navbarHeight = 80; // Adjust to your navbar height
      const scrollPosition = section.offsetTop - navbarHeight;

      window.scrollTo({
        top: scrollPosition,
        behavior: 'smooth'
      });
    }
  }
}
