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
    const scrollPosition = window.scrollY + 150; // Navbar offset

    for (let i = sections.length - 1; i >= 0; i--) {
      const section = sections[i];
      const element = this.document.getElementById(section);
      if (element) {
        const offsetTop = element.offsetTop;
        
        if (scrollPosition >= offsetTop) {
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
    
    // Immediately set the active section when clicked
    this.activeSection = sectionId;
    
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