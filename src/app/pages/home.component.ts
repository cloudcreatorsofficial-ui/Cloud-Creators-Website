import { Component, HostListener, AfterViewInit, PLATFORM_ID, Inject, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
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
  private portfolioIntervals: any[] = [];

  constructor(@Inject(PLATFORM_ID) private platformId: Object, private router: Router) {
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

  scrollToTerms() {
    this.router.navigate(['/terms-and-conditions']);
  }

  scrollToPrivacy() {
    this.router.navigate(['/privacy-policy']);
  }

  // Portfolio navigation functions
  prevProject() {
    console.log('Previous project clicked');
    this.navigateProject(-1);
  }

  nextProject() {
    console.log('Next project clicked');
    this.navigateProject(1);
  }

  private navigateProject(direction: number) {
    const projects = document.querySelectorAll('.portfolio-content');
    if (projects.length > 0) {
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

    setTimeout(() => {
      // Define different image sets for each slider
      const sliderImageSets = [
        // First slider (Chandrayaan-2) - your specified images
        [
          'assets/website 1.png',
          'assets/website 2.png',
          'assets/website 3.png',
          'assets/website 4.png'
        ],
        // Second slider (Resort Booking) - your specified images
        [
          'assets/website-2-1.png',
          'assets/website-2-2.png',
          'assets/website-2-3.png',
          'assets/website-2-4.png',
          'assets/website-2-5.png'
        ],
        // Third slider (Chat App) - your specified images
        [
          'assets/app 1.png',
          'assets/app 2.png',
          'assets/app 3.png',
          'assets/app 4.png',
          'assets/app 5.png',
          'assets/app 6.png'
        ],
        // Fourth slider (DRBK Building Systems) - your specified images
        [
          'assets/DRBK/DRBK-1.jpeg',
          'assets/DRBK/DRBK-2.jpeg',
          'assets/DRBK/DRBK-3.jpeg',
          'assets/DRBK/DRBK-4.jpeg',
          'assets/DRBK/DRBK-5.jpeg',
          'assets/DRBK/DRBK-6.jpeg',
          'assets/DRBK/DRBK-7.jpeg',
          'assets/DRBK/DRBK-8.jpeg',
          'assets/DRBK/DRBK-9.jpeg',
          'assets/DRBK/DRBK-10.jpeg',
          'assets/DRBK/DRBK-11.jpeg',
          'assets/DRBK/DRBK-12.jpeg'
        ]
      ];
      
      // Get all image sliders in portfolio sections
      const imageSliders = document.querySelectorAll('.portfolio-section .image-slider img') as NodeListOf<HTMLImageElement>;
      
      imageSliders.forEach((sliderImage, sliderIndex) => {
        if (!sliderImage) return;

        // Get the appropriate image set for this slider
        const currentImageSet = sliderImageSets[sliderIndex] || sliderImageSets[0];
        let currentIndex = 0;
        
        // Set initial image (already set in HTML, but ensure consistency)
        if (sliderIndex === 0) {
          sliderImage.src = currentImageSet[0]; // Start with website 1.png for first slider
        } else if (sliderIndex === 1) {
          sliderImage.src = currentImageSet[0]; // Start with website-2-1.png for second slider
        } else if (sliderIndex === 2) {
          sliderImage.src = currentImageSet[0]; // Start with app 1.png for third slider
        } else if (sliderIndex === 3) {
          sliderImage.src = currentImageSet[0]; // Start with DRBK-1.jpeg for fourth slider
        }
        
        // Define different intervals for each slider (in milliseconds)
        const sliderIntervals = [1500, 1500, 2000, 1500]; // 1.5s, 1.5s, 2s, 1.5s
        const currentInterval = sliderIntervals[sliderIndex] || 1500;
        
        // Enhanced pop animation styles
        sliderImage.style.transition = 'all 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275)';
        sliderImage.style.borderRadius = '12px';
        sliderImage.style.boxShadow = '0 8px 32px rgba(0,0,0,0.15)';

        // Start animation with staggered timing for each slider
        setTimeout(() => {
          const intervalId = setInterval(() => {
            currentIndex = (currentIndex + 1) % currentImageSet.length;
            
            // Pop out animation (scale down and fade)
            sliderImage.style.transform = 'scale(0.85)';
            sliderImage.style.opacity = '0.6';
            
            setTimeout(() => {
              // Change image during the transition
              sliderImage.src = currentImageSet[currentIndex];
              
              // Pop in animation (scale up and fade in)
              sliderImage.style.transform = 'scale(1.1)';
              sliderImage.style.opacity = '1';
              
              // Settle to normal size
              setTimeout(() => {
                sliderImage.style.transform = 'scale(1)';
              }, 200);
            }, 250);
          }, currentInterval); // Use the specific interval for this slider

          // Store interval for cleanup
          this.portfolioIntervals.push(intervalId);

          // Pause animation on hover
          const sliderContainer = sliderImage.closest('.image-slider');
          if (sliderContainer) {
            let isPaused = false;
            
            sliderContainer.addEventListener('mouseenter', () => {
              if (!isPaused) {
                clearInterval(intervalId);
                isPaused = true;
                // Add hover effect
                sliderImage.style.transform = 'scale(1.05)';
                sliderImage.style.boxShadow = '0 12px 40px rgba(0,0,0,0.25)';
              }
            });
            
            sliderContainer.addEventListener('mouseleave', () => {
              if (isPaused) {
                // Resume animation
                const newIntervalId = setInterval(() => {
                  currentIndex = (currentIndex + 1) % currentImageSet.length;
                  
                  sliderImage.style.transform = 'scale(0.85)';
                  sliderImage.style.opacity = '0.6';
                  
                  setTimeout(() => {
                    sliderImage.src = currentImageSet[currentIndex];
                    sliderImage.style.transform = 'scale(1.1)';
                    sliderImage.style.opacity = '1';
                    
                    setTimeout(() => {
                      sliderImage.style.transform = 'scale(1)';
                      sliderImage.style.boxShadow = '0 8px 32px rgba(0,0,0,0.15)';
                    }, 200);
                  }, 250);
                }, currentInterval); // Use the same specific interval for this slider
                
                // Update stored interval
                const index = this.portfolioIntervals.indexOf(intervalId);
                if (index > -1) {
                  this.portfolioIntervals[index] = newIntervalId;
                }
                isPaused = false;
              }
            });
          }
        }, sliderIndex * 667); // Stagger start times by ~0.667 seconds
      });
    }, 1000);
  }

  ngOnDestroy() {
    // Clear all portfolio intervals
    if (this.portfolioIntervals && this.portfolioIntervals.length > 0) {
      this.portfolioIntervals.forEach(interval => {
        if (interval) {
          clearInterval(interval);
        }
      });
      this.portfolioIntervals = [];
    }
  }

  // Email functionality
  async sendEmail(event: Event) {
    event.preventDefault();
    
    if (this.isSubmitting) return;
    
    const form = event.target as HTMLFormElement;
    const formData = new FormData(form);
    
    const requiredFields = ['name', 'email', 'requirement', 'requirementDescription', 'contactNumber', 'schedule', 'time'];
    for (const field of requiredFields) {
      if (!formData.get(field)) {
        this.showMessage(`Please fill in the ${field.replace(/([A-Z])/g, ' $1').toLowerCase()} field.`, 'error');
        return;
      }
    }
    
    const name = formData.get('name') as string;
    const email = formData.get('email') as string;
    const requirement = formData.get('requirement') as string;
    const description = formData.get('requirementDescription') as string;
    const contactNumber = formData.get('contactNumber') as string;
    const schedule = formData.get('schedule') as string;
    const time = formData.get('time') as string;
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      this.showMessage('Please enter a valid email address.', 'error');
      return;
    }
    
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
      emailjs.init('W72yK8WU4E3hJee4c');
      
      const businessResult = await emailjs.send(
        'service_tgitmhe',
        'template_zqf4p0n',
        templateParams
      );

      console.log('Business email sent successfully:', businessResult);
      
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
        'service_d0fgrqh',
        'template_oi8pb5p',
        userTemplateParams
      );

      console.log('User confirmation email sent successfully:', userResult);
      
      this.showMessage('Message sent successfully! We will get back to you soon. A confirmation email has been sent to your email address.', 'success');
      
      form.reset();

    } catch (error) {
      console.error('Email send failed:', error);
      this.showMessage('Failed to send message. Please try again later.', 'error');
    } finally {
      this.isSubmitting = false;
    }
  }

  private showMessage(message: string, type: 'success' | 'error') {
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

    setTimeout(() => {
      messageDiv.style.transform = 'translateX(0)';
    }, 100);

    setTimeout(() => {
      messageDiv.style.transform = 'translateX(100%)';
      setTimeout(() => {
        if (document.body.contains(messageDiv)) {
          document.body.removeChild(messageDiv);
        }
      }, 300);
    }, 5000);
  }

  // Initialize Calendly widget
  private initializeCalendly() {
    // Wait for Calendly script to load
    const checkCalendly = () => {
      if ((window as any).Calendly) {
        // Initialize Calendly inline widget
        (window as any).Calendly.initInlineWidget({
          url: 'https://calendly.com/cloud-creators-official',
          parentElement: document.querySelector('.calendly-inline-widget'),
          prefill: {},
          utm: {}
        });
      } else {
        // Retry after 100ms if Calendly script hasn't loaded yet
        setTimeout(checkCalendly, 100);
      }
    };
    
    // Start checking for Calendly
    setTimeout(checkCalendly, 500);
  }
}
