import { Component, OnInit, OnDestroy, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common'; // Add this import
import AOS from 'aos';
import LocomotiveScroll from 'locomotive-scroll';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterModule], // Add this to imports array
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit, AfterViewInit, OnDestroy {
  private scroll!: LocomotiveScroll;
  private resizeObserver!: ResizeObserver;
  isScrolled = false;
  isSidebarOpen = false;

  navLinks = [
    { id: 'home', label: 'Home' },
    { id: 'about', label: 'About' },
    { id: 'showcase', label: 'Showcase' },
    { id: 'services', label: 'Services' },
    { id: 'contact', label: 'Contact' },
  ];

  ngOnInit() {
    AOS.init({
      duration: 1000,
      once: true,
      easing: 'ease-in-out',
      mirror: false,
    });

    window.addEventListener('scroll', this.handleScroll);
  }

  ngAfterViewInit() {
    this.initLocomotiveScroll();
  }

  private handleScroll = () => {
    this.isScrolled = window.scrollY > 10;
  };

  toggleSidebar() {
    this.isSidebarOpen = !this.isSidebarOpen;
    document.body.style.overflow = this.isSidebarOpen ? 'hidden' : 'auto';
  }

  scrollToSection(event: Event, sectionId: string) {
    event.preventDefault();

    // Close sidebar if open
    if (this.isSidebarOpen) {
      this.toggleSidebar();
    }

    // Use Locomotive Scroll for smooth scrolling
    if (this.scroll) {
      this.scroll.scrollTo(`#${sectionId}`);
    } else {
      // Fallback if Locomotive Scroll not initialized
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }

  private initLocomotiveScroll() {
    try {
      const container = document.querySelector('[data-scroll-container]');
      if (container) {
        this.scroll = new LocomotiveScroll({
          el: container as HTMLElement,
          smooth: true,
          lerp: 0.1,
          multiplier: 1.2,
          smartphone: { smooth: true },
          tablet: { smooth: true, breakpoint: 1024 },
        });

        // Update scroll on resize
        this.resizeObserver = new ResizeObserver(() => {
          this.scroll?.update();
        });
        this.resizeObserver.observe(document.body);

        // Initial update
        setTimeout(() => this.scroll?.update(), 500);
      }
    } catch (e) {
      console.error('Locomotive Scroll initialization error:', e);
    }
  }

  ngOnDestroy() {
    if (this.scroll) {
      this.scroll.destroy();
    }
    if (this.resizeObserver) {
      this.resizeObserver.disconnect();
    }
    window.removeEventListener('scroll', this.handleScroll);
    AOS.refresh();
  }
  // Add these to your component class
  showLightbox = false;
  lightboxImage = '';
  lightboxVideo = '';
  lightboxContentType: 'image' | 'video' = 'image';

  openLightbox(type: string) {
    this.showLightbox = true;
    this.lightboxContentType = 'image';

    if (type === 'wedding') {
      this.lightboxImage =
        'https://images.unsplash.com/photo-1519225421980-715cb0215aed?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80';
    } else if (type === 'landscape') {
      this.lightboxImage =
        'https://images.unsplash.com/photo-1506744038136-46273834b3fb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80';
    }
  }

  closeLightbox() {
    this.showLightbox = false;
  }
  constructor(public router: Router) {}
}
