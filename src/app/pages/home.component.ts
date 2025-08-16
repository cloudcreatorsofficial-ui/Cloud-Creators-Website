import { Component, HostListener, AfterViewInit, PLATFORM_ID, Inject, OnDestroy } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NavbarComponent } from '../navbar/navbar.component';
import { Chart } from 'chart.js/auto';
import emailjs from '@emailjs/browser';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, FormsModule, NavbarComponent],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements AfterViewInit, OnDestroy {
  sectionIds = ['home', 'services', 'about', 'portfolio', 'terms', 'contact'];
  private isBrowser: boolean;
  isSubmitting = false;

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
    // Only create charts if the elements exist
    const pieChartElement = document.getElementById('myPieChart');
    const barChartElement = document.getElementById('myBarChart');

    if (pieChartElement) {
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
    }

    if (barChartElement) {
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

    // Wait a bit for DOM to be fully loaded
    setTimeout(() => {
      const images = [
        'assets/website%201.png', 
        'assets/website%202.png', 
        'assets/website%203.png', 
        'assets/website%204.png'
      ];
      let currentIndex = 0;
      const sliderImage = document.getElementById('slider-image') as HTMLImageElement;
      
      console.log('Slider image element:', sliderImage); // Debug log
      
      if (!sliderImage) {
        console.error('Slider image element not found!');
        return;
      }

      // Set initial image
      sliderImage.src = images[currentIndex];
      console.log('Initial image set to:', images[currentIndex]); // Debug log

      // Add CSS transition for fade animation
      sliderImage.style.transition = 'opacity 0.6s ease-in-out, transform 0.6s ease-in-out';

      // Start auto-rotation every 2 seconds
      this.autoScrollInterval = setInterval(() => {
        currentIndex = (currentIndex + 1) % images.length;
        console.log('Changing to image:', images[currentIndex]); // Debug log
        
        // Add smooth fade + scale animation
        sliderImage.style.opacity = '0';
        sliderImage.style.transform = 'scale(1.05)';
        
        setTimeout(() => {
          sliderImage.src = images[currentIndex];
          sliderImage.style.opacity = '1';
          sliderImage.style.transform = 'scale(1)';
        }, 300);
      }, 2000); // Changed to 2 seconds (2000ms)

      console.log('Auto scroll started with 2 second intervals'); // Debug log

      // Pause on hover
      const sliderContainer = document.querySelector('.image-slider');
      if (sliderContainer) {
        sliderContainer.addEventListener('mouseenter', () => {
          console.log('Pausing slideshow'); // Debug log
          clearInterval(this.autoScrollInterval);
        });
        
        sliderContainer.addEventListener('mouseleave', () => {
          console.log('Resuming slideshow'); // Debug log
          this.autoScrollInterval = setInterval(() => {
            currentIndex = (currentIndex + 1) % images.length;
            console.log('Changing to image (resumed):', images[currentIndex]); // Debug log
            
            // Add fade + scale animation for resumed slideshow
            sliderImage.style.opacity = '0';
            sliderImage.style.transform = 'scale(1.05)';
            
            setTimeout(() => {
              sliderImage.src = images[currentIndex];
              sliderImage.style.opacity = '1';
              sliderImage.style.transform = 'scale(1)';
            }, 300);
          }, 2000); // Changed to 2 seconds (2000ms)
        });
      }
    }, 1000); // Wait time for DOM to be ready
  }

  ngOnDestroy() {
    if (this.autoScrollInterval) {
      clearInterval(this.autoScrollInterval);
    }
  }

  // Email functionality
  async sendEmail(event: Event) {
    event.preventDefault();
    
    if (this.isSubmitting) return; // Prevent double submission
    
    const form = event.target as HTMLFormElement;
    const formData = new FormData(form);
    
    // Validate required fields
    const requiredFields = ['name', 'email', 'requirement', 'requirementDescription', 'contactNumber', 'schedule', 'time'];
    for (const field of requiredFields) {
      if (!formData.get(field)) {
        this.showMessage(`Please fill in the ${field.replace(/([A-Z])/g, ' $1').toLowerCase()} field.`, 'error');
        return;
      }
    }
    
    // Extract form values
    const name = formData.get('name') as string;
    const email = formData.get('email') as string;
    const requirement = formData.get('requirement') as string;
    const description = formData.get('requirementDescription') as string;
    const contactNumber = formData.get('contactNumber') as string;
    const schedule = formData.get('schedule') as string;
    const time = formData.get('time') as string;
    
    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      this.showMessage('Please enter a valid email address.', 'error');
      return;
    }
    
    // Prepare email template parameters
    const templateParams = {
      from_name: name,
      from_email: email,
      to_email: 'cloud.creators.official@gmail.com',
      subject: `New Contact Form Submission - ${requirement}`,
      message: `
        New contact form submission received:
        
        📋 CONTACT DETAILS:
        ▪️ Name: ${name}
        ▪️ Email: ${email}
        ▪️ Contact Number: ${contactNumber}
        
        🔧 PROJECT DETAILS:
        ▪️ Requirement: ${requirement}
        ▪️ Description: ${description}
        
        📅 MEETING SCHEDULE:
        ▪️ Date: ${schedule}
        ▪️ Time: ${time}
        
        ---
        This message was sent from the Cloud Creators website contact form.
      `,
      name: name,
      email: email,
      requirement: requirement,
      description: description,
      contact_number: contactNumber,
      schedule_date: schedule,
      schedule_time: time
    };

    this.isSubmitting = true;

    try {
      // Initialize EmailJS
      emailjs.init('W72yK8WU4E3hJee4c');
      
      // Send email to business (Cloud Creators)
      const businessResult = await emailjs.send(
        'service_tgitmhe',    // Your Service ID from EmailJS
        'template_zqf4p0n',   // Your Template ID for business emails
        templateParams
      );

      console.log('Business email sent successfully:', businessResult);
      
      // Send confirmation email to the user
      const userTemplateParams = {
        to_email: email,
        to_name: name,
        requirement: requirement,
        subject: 'Thank you for contacting Cloud Creators',
        message: `Hi ${name},

Thank you for reaching us out. Our team will be contacting you soon.

Good day!

Regards,
Cloud Creators`
      };

      const userResult = await emailjs.send(
        'service_tgitmhe',    // Same Service ID
        'template_oi8pb5p', // You'll need to create this template for user confirmations
        userTemplateParams
      );

      console.log('User confirmation email sent successfully:', userResult);
      
      // Show success message
      this.showMessage('Message sent successfully! We will get back to you soon. A confirmation email has been sent to your email address.', 'success');
      
      // Reset form
      form.reset();

    } catch (error) {
      console.error('Email send failed:', error);
      this.showMessage('Failed to send message. Please try again later.', 'error');
    } finally {
      this.isSubmitting = false;
    }
  }

  private showMessage(message: string, type: 'success' | 'error') {
    // Create message element
    const messageDiv = document.createElement('div');
    messageDiv.className = `message-popup ${type}`;
    messageDiv.textContent = message;
    messageDiv.style.cssText = `
      position: fixed;
      top: 20px;
      right: 20px;
      padding: 15px 20px;
      border-radius: 8px;
      color: white;
      font-weight: 600;
      z-index: 1000;
      max-width: 350px;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
      font-size: 14px;
      line-height: 1.4;
      background-color: ${type === 'success' ? '#4CAF50' : '#f44336'};
      transform: translateX(100%);
      transition: transform 0.3s ease;
    `;

    document.body.appendChild(messageDiv);

    // Animate in
    setTimeout(() => {
      messageDiv.style.transform = 'translateX(0)';
    }, 100);

    // Remove after 5 seconds
    setTimeout(() => {
      messageDiv.style.transform = 'translateX(100%)';
      setTimeout(() => {
        if (document.body.contains(messageDiv)) {
          document.body.removeChild(messageDiv);
        }
      }, 300);
    }, 5000);
  }
}
