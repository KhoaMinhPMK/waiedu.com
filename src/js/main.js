// Import Alpine.js for reactive components
import Alpine from 'alpinejs'

// Make Alpine available globally
window.Alpine = Alpine

// Alpine.js components and data
document.addEventListener('alpine:init', () => {
  // Mobile menu component
  Alpine.data('mobileMenu', () => ({
    isOpen: false,
    toggle() {
      this.isOpen = !this.isOpen
    },
    close() {
      this.isOpen = false
    }
  }))

  // Newsletter subscription component
  Alpine.data('newsletter', () => ({
    email: '',
    isLoading: false,
    message: '',
    messageType: 'success',
    
    async subscribe() {
      if (!this.email || !this.isValidEmail(this.email)) {
        this.showMessage('Please enter a valid email address', 'error')
        return
      }

      this.isLoading = true
      
      try {
        await this.delay(1500)
        this.email = ''
        this.showMessage('Successfully subscribed! Thank you for your interest.', 'success')
      } catch (error) {
        this.showMessage('An error occurred. Please try again later.', 'error')
      } finally {
        this.isLoading = false
      }
    },
    
    isValidEmail(email) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      return emailRegex.test(email)
    },
    
    showMessage(text, type) {
      this.message = text
      this.messageType = type
      setTimeout(() => {
        this.message = ''
      }, 5000)
    },
    
    delay(ms) {
      return new Promise(resolve => setTimeout(resolve, ms))
    }
  }))
})

// DOM Content Loaded
document.addEventListener('DOMContentLoaded', function() {
  // Initialize Alpine.js
  Alpine.start()
  
  // Initialize mobile menu
  initMobileMenu()
  
  // Initialize smooth scrolling
  initSmoothScrolling()
  
  // Initialize scroll animations
  initScrollAnimations()
  
  // Initialize header scroll effect
  initHeaderScrollEffect()
  
  // Initialize hero animations
  initHeroAnimations()
  
  // Initialize header color change and navigation effects
  initHeaderColorChange()
  initNavigationEffects()
  initSectionObserver()
})

// Initialize mobile menu
function initMobileMenu() {
  const mobileMenuBtn = document.getElementById('mobileMenuBtn')
  const mobileMenu = document.getElementById('mobileMenu')
  
  if (mobileMenuBtn && mobileMenu) {
    mobileMenuBtn.addEventListener('click', () => {
      mobileMenu.classList.toggle('hidden')
    })
    
    // Close mobile menu when clicking on links
    const mobileLinks = mobileMenu.querySelectorAll('a')
    mobileLinks.forEach(link => {
      link.addEventListener('click', () => {
        mobileMenu.classList.add('hidden')
      })
    })
  }
}

// Initialize smooth scrolling
function initSmoothScrolling() {
  const links = document.querySelectorAll('a[href^="#"]')
  
  links.forEach(link => {
    link.addEventListener('click', function(e) {
      e.preventDefault()
      
      const targetId = this.getAttribute('href')
      const targetElement = document.querySelector(targetId)
      
      if (targetElement) {
        const headerHeight = document.getElementById('header').offsetHeight
        const targetPosition = targetElement.offsetTop - headerHeight
        
        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        })
      }
    })
  })
}

// Initialize scroll animations
function initScrollAnimations() {
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  }
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animate-fade-in')
        
        // Special animations for cards
        const cards = entry.target.querySelectorAll('.hover-lift, .feature-card')
        cards.forEach((card, index) => {
          setTimeout(() => {
            card.classList.add('animate-slide-up')
          }, index * 100)
        })
      }
    })
  }, observerOptions)
  
  // Observe sections for animation
  const sections = document.querySelectorAll('section')
  sections.forEach(section => {
    observer.observe(section)
  })
}

// Initialize header scroll effect
function initHeaderScrollEffect() {
  const header = document.getElementById('header')
  if (!header) return
  
  let lastScrollY = window.scrollY
  
  window.addEventListener('scroll', () => {
    const currentScrollY = window.scrollY
    
    if (currentScrollY > 100) {
      header.classList.add('shadow-lg')
      header.classList.remove('bg-white/80')
      header.classList.add('bg-white/95')
    } else {
      header.classList.remove('shadow-lg')
      header.classList.add('bg-white/80')
      header.classList.remove('bg-white/95')
    }
    
    // Hide/show header on scroll
    if (currentScrollY > lastScrollY && currentScrollY > 200) {
      header.style.transform = 'translateY(-100%)'
    } else {
      header.style.transform = 'translateY(0)'
    }
    
    lastScrollY = currentScrollY
  })
}

// Initialize hero animations
function initHeroAnimations() {
  const heroSection = document.getElementById('hero')
  if (!heroSection) return
  
  // Parallax effect for background
  window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset
    const rate = scrolled * -0.5
    heroSection.style.transform = `translateY(${rate}px)`
  })
  
  // Logo pulse animation
  const heroLogo = heroSection.querySelector('.logo')
  if (heroLogo) {
    setInterval(() => {
      heroLogo.classList.add('pulse-glow')
      setTimeout(() => {
        heroLogo.classList.remove('pulse-glow')
      }, 2000)
    }, 5000)
  }
}

// Scroll to next section function
function scrollToNextSection() {
  const aboutSection = document.getElementById('about')
  if (aboutSection) {
    const headerHeight = document.querySelector('.glass-header')?.offsetHeight || 80
    const targetPosition = aboutSection.offsetTop - headerHeight
    
    window.scrollTo({
      top: targetPosition,
      behavior: 'smooth'
    })
  }
}

// Make function globally available
window.scrollToNextSection = scrollToNextSection

// Initialize interactive elements
function initInteractiveElements() {
  // Add hover effects to cards
  const cards = document.querySelectorAll('.hover-lift')
  cards.forEach(card => {
    card.addEventListener('mouseenter', () => {
      card.style.transform = 'translateY(-8px) scale(1.02)'
    })
    
    card.addEventListener('mouseleave', () => {
      card.style.transform = 'translateY(0) scale(1)'
    })
  })
  
  // Add click animations to buttons
  const buttons = document.querySelectorAll('button, .btn')
  buttons.forEach(button => {
    button.addEventListener('click', (e) => {
      // Create ripple effect
      const ripple = document.createElement('span')
      const rect = button.getBoundingClientRect()
      const size = Math.max(rect.width, rect.height)
      const x = e.clientX - rect.left - size / 2
      const y = e.clientY - rect.top - size / 2
      
      ripple.style.width = ripple.style.height = size + 'px'
      ripple.style.left = x + 'px'
      ripple.style.top = y + 'px'
      ripple.classList.add('ripple')
      
      button.appendChild(ripple)
      
      setTimeout(() => {
        ripple.remove()
      }, 600)
    })
  })
}

// Newsletter subscription functionality
function initNewsletter() {
  const form = document.querySelector('footer form')
  const emailInput = form?.querySelector('input[type="email"]')
  const submitBtn = form?.querySelector('button[type="submit"]')
  
  if (form && emailInput && submitBtn) {
    form.addEventListener('submit', async (e) => {
      e.preventDefault()
      
      const email = emailInput.value.trim()
      if (!email || !isValidEmail(email)) {
        showNotification('Please enter a valid email address', 'error')
        return
      }
      
      // Show loading state
      const originalText = submitBtn.textContent
      submitBtn.textContent = 'Subscribing...'
      submitBtn.disabled = true
      
      try {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1500))
        
        emailInput.value = ''
        showNotification('Successfully subscribed! Thank you.', 'success')
      } catch (error) {
        showNotification('Failed to subscribe. Please try again.', 'error')
      } finally {
        submitBtn.textContent = originalText
        submitBtn.disabled = false
      }
    })
  }
}

// Utility functions
function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

function showNotification(message, type = 'info') {
  // Create notification element
  const notification = document.createElement('div')
  notification.className = `fixed top-4 right-4 z-50 p-4 rounded-lg shadow-lg max-w-sm transition-all duration-300 ${
    type === 'success' ? 'bg-green-500 text-white' : 
    type === 'error' ? 'bg-red-500 text-white' : 
    'bg-blue-500 text-white'
  }`
  notification.textContent = message
  
  document.body.appendChild(notification)
  
  // Animate in
  setTimeout(() => {
    notification.style.transform = 'translateX(0)'
    notification.style.opacity = '1'
  }, 100)
  
  // Remove after 5 seconds
  setTimeout(() => {
    notification.style.transform = 'translateX(100%)'
    notification.style.opacity = '0'
    setTimeout(() => {
      notification.remove()
    }, 300)
  }, 5000)
}

// Initialize competition cards interactions
function initCompetitionCards() {
  const competitionCards = document.querySelectorAll('#competition .bg-gradient-to-r')
  
  competitionCards.forEach(card => {
    card.addEventListener('mouseenter', () => {
      card.style.transform = 'scale(1.02) rotateX(2deg)'
    })
    
    card.addEventListener('mouseleave', () => {
      card.style.transform = 'scale(1) rotateX(0)'
    })
  })
}

// Initialize blog cards
function initBlogCards() {
  const blogCards = document.querySelectorAll('#blog article')
  
  blogCards.forEach((card, index) => {
    // Stagger animation
    card.style.animationDelay = `${index * 0.1}s`
    
    // Hover effects
    card.addEventListener('mouseenter', () => {
      const img = card.querySelector('div:first-child')
      if (img) {
        img.style.transform = 'scale(1.1)'
      }
    })
    
    card.addEventListener('mouseleave', () => {
      const img = card.querySelector('div:first-child')
      if (img) {
        img.style.transform = 'scale(1)'
      }
    })
  })
}

// Initialize download section
function initDownloadSection() {
  const downloadButtons = document.querySelectorAll('#download a')
  
  downloadButtons.forEach(button => {
    button.addEventListener('click', (e) => {
      e.preventDefault()
      showNotification('Download will start shortly...', 'info')
      
      // Simulate download
      setTimeout(() => {
        showNotification('Thank you for downloading our app!', 'success')
      }, 2000)
    })
  })
}

// Initialize all interactive elements
function initAllInteractions() {
  initInteractiveElements()
  initNewsletter()
  initCompetitionCards()
  initBlogCards()
  initDownloadSection()
}

// Run all initializations
document.addEventListener('DOMContentLoaded', () => {
  initAllInteractions()
})

// Performance optimization
const performanceOptimizations = {
  initLazyLoading() {
    if ('IntersectionObserver' in window) {
      const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const img = entry.target
            img.src = img.dataset.src
            img.classList.remove('lazy')
            imageObserver.unobserve(img)
          }
        })
      })
      
      document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img)
      })
    }
  },
  
  preloadResources() {
    const criticalResources = [
      './assets/logo.png'
    ]
    
    criticalResources.forEach(resource => {
      const link = document.createElement('link')
      link.rel = 'preload'
      link.href = resource
      link.as = 'image'
      document.head.appendChild(link)
    })
  }
}

// Initialize performance optimizations
performanceOptimizations.initLazyLoading()
performanceOptimizations.preloadResources()

// Header color change for product section
function initHeaderColorChange() {
  const header = document.querySelector('header')
  const productSection = document.querySelector('#product-intro')
  
  if (!header || !productSection) return
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        // Product section is visible - change header to dark text
        header.classList.add('header-dark-text')
      } else {
        // Product section is not visible - revert to normal header
        header.classList.remove('header-dark-text')
      }
    })
  }, {
    threshold: 0.2, // Trigger when 20% of product section is visible
    rootMargin: '-80px 0px 0px 0px' // Offset to account for header height
  })
  
  observer.observe(productSection)
}

// Section observer for automatic navigation highlighting
function initSectionObserver() {
    // Create an intersection observer to track which section is in view
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link-glass, .mobile-nav-link');
    
    const observerOptions = {
        root: null,
        rootMargin: '-20% 0px -60% 0px', // Trigger when section is well visible
        threshold: 0.3
    };
      const observer = new IntersectionObserver((entries) => {
        // Don't interfere if user is actively clicking
        if (window.isUserClicking && window.isUserClicking()) {
            return;
        }
        
        let currentSection = null;
        let maxRatio = 0;
        
        // Find the section with highest intersection ratio
        entries.forEach(entry => {
            if (entry.isIntersecting && entry.intersectionRatio > maxRatio) {
                maxRatio = entry.intersectionRatio;
                currentSection = entry.target.id;
            }
        });
        
        // Only update if we have a clear current section
        if (currentSection) {
            // Remove active class from all nav links
            navLinks.forEach(link => {
                link.classList.remove('active');
            });
            
            // Add active class to corresponding nav link
            const activeLink = document.querySelector(`a[href="#${currentSection}"]`);
            if (activeLink) {
                activeLink.classList.add('active');
            }
        }
    }, observerOptions);
    
    // Observe all sections
    sections.forEach(section => {
        observer.observe(section);
    });
}

// Navigation link click effects
function initNavigationEffects() {
    // Get all navigation links
    const navLinks = document.querySelectorAll('.nav-link-glass, .mobile-nav-link');
    let isUserClicking = false; // Flag to prevent observer interference
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            // Set flag to prevent observer interference
            isUserClicking = true;
            
            // Remove active class from all nav links
            navLinks.forEach(otherLink => {
                otherLink.classList.remove('active');
            });
            
            // Add active class to clicked link immediately
            this.classList.add('active');
            
            // Handle smooth scrolling
            const href = this.getAttribute('href');
            if (href && href.startsWith('#')) {
                e.preventDefault();
                
                const targetElement = document.querySelector(href);
                if (targetElement) {
                    const headerHeight = 80; // Approximate header height
                    const targetPosition = targetElement.offsetTop - headerHeight;
                    
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                    
                    // Allow observer to work again after scroll completes
                    setTimeout(() => {
                        isUserClicking = false;
                    }, 1000);
                }
            } else {
                // If not a hash link, allow observer immediately
                setTimeout(() => {
                    isUserClicking = false;
                }, 100);
            }
            
            // If it's a mobile menu link, close the mobile menu
            if (this.classList.contains('mobile-nav-link')) {
                const mobileMenu = document.getElementById('mobile-menu');
                if (mobileMenu) {
                    mobileMenu.classList.add('hidden');
                }
            }
        });
    });
    
    // Set Home as active by default when page loads
    setTimeout(() => {
        const homeLink = document.querySelector('a[href="#hero"]');
        if (homeLink) {
            homeLink.classList.add('active');
        }
    }, 100);
    
    // Get Started button effect
    const getStartedButtons = document.querySelectorAll('.btn-primary-glass');
    getStartedButtons.forEach(button => {
        button.addEventListener('click', function() {
            // The :active pseudo-class will handle the visual effect
            // No need to add/remove classes as :active works automatically
        });
    });
    
    // Make isUserClicking available to section observer
    window.isUserClicking = () => isUserClicking;
}

// Export for global use
window.WAIEducation = {
  showNotification,
  isValidEmail
}