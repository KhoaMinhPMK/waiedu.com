// Component Loader
class ComponentLoader {
    constructor() {
        this.components = new Map();
        this.loadedComponents = new Set();
        this.isLoading = false;
        
        // Register all components
        this.registerComponents();
        
        this.init();
    }

    async init() {
        try {
            await this.loadAll();
            this.initializeFeatures();
        } catch (error) {
            console.error('Failed to initialize components:', error);
        }
    }

    // Register All Components
    registerComponents() {
        // Header component
        this.register('header', {
            url: './components/header.html',
            target: '#header-placeholder'
        });

        // Hero component
        this.register('hero', {
            url: './components/hero.html',
            target: '#hero-placeholder'
        });

        // About component
        this.register('about', {
            url: './components/about.html',
            target: '#about-placeholder'
        });

        // Solution component
        this.register('solution', {
            url: './components/solution.html',
            target: '#solution-placeholder'
        });

        // Product component
        this.register('product', {
            url: './components/product.html',
            target: '#product-placeholder'
        });

        // Competition component
        this.register('competition', {
            url: './components/competition.html',
            target: '#competition-placeholder'
        });

        // Blog component
        this.register('blog', {
            url: './components/blog.html',
            target: '#blog-placeholder'
        });

        // Download component
        this.register('download', {
            url: './components/download.html',
            target: '#download-placeholder'
        });

        // Footer component
        this.register('footer', {
            url: './components/footer.html',
            target: '#footer-placeholder'
        });

        console.log('✓ All components registered');
    }

    // Component Registration
    register(name, config) {
        this.components.set(name, {
            url: config.url,
            target: config.target,
            dependencies: config.dependencies || [],
            onLoad: config.onLoad || null,
            loaded: false
        });
    }

    // Load Individual Component
    async loadComponent(name) {
        const component = this.components.get(name);
        if (!component) {
            console.error(`Component ${name} not registered`);
            return false;
        }

        if (component.loaded) {
            return true;
        }

        try {
            // Load dependencies first
            for (const dep of component.dependencies) {
                await this.loadComponent(dep);
            }

            // Fetch component HTML
            const response = await fetch(component.url);
            if (!response.ok) {
                throw new Error(`Failed to load ${name}: ${response.status}`);
            }

            const html = await response.text();
            
            // Insert into target
            const targetElement = document.querySelector(component.target);
            if (targetElement) {
                targetElement.innerHTML = html;
                component.loaded = true;
                this.loadedComponents.add(name);

                // Execute onLoad callback
                if (component.onLoad) {
                    component.onLoad();
                }

                console.log(`✓ Component ${name} loaded successfully into ${component.target}`);
                
                // Special handling for header
                if (name === 'header') {
                    const header = targetElement.querySelector('.glass-header');
                    if (header) {
                        console.log('🎯 Glass header found and ready');
                        header.style.display = 'block';
                        header.style.visibility = 'visible';
                    }
                }
                
                return true;
            } else {
                console.error(`Target element ${component.target} not found for ${name}`);
                return false;
            }
        } catch (error) {
            console.error(`Failed to load component ${name}:`, error);
            return false;
        }
    }

    // Load All Components
    async loadAll() {
        if (this.isLoading) return;
        
        this.isLoading = true;
        const loadingElement = document.getElementById('loading');

        try {
            const componentNames = Array.from(this.components.keys());
            const loadPromises = componentNames.map(name => this.loadComponent(name));
            
            await Promise.all(loadPromises);
            
            // Initialize all interactive features after components are loaded
            await this.initializeFeatures();
            
        } catch (error) {
            console.error('Error loading components:', error);
        } finally {
            // Hide loading screen
            if (loadingElement) {
                loadingElement.style.opacity = '0';
                setTimeout(() => {
                    loadingElement.style.display = 'none';
                }, 300);
            }
            
            this.isLoading = false;
        }
    }

    // Initialize All Interactive Features
    async initializeFeatures() {
        // Wait a bit for DOM to be ready
        await new Promise(resolve => setTimeout(resolve, 100));
        
        // Debug: Check if header exists
        const header = document.querySelector('.glass-header');
        console.log('Header found:', !!header);
        if (header) {
            console.log('Header classes:', header.className);
            console.log('Header HTML:', header.innerHTML.substring(0, 100));
        }
        
        // Initialize features in the correct order
        this.initScrollEffects();
        this.initSmoothScrolling();
        this.initMobileMenu(); // Add mobile menu initialization
        // this.initLiquidGlassHeaderAI(); // Disabled AI color adaptation
        this.initIntersectionObservers();
        this.initLoadingAnimations();
        
        console.log('✓ All interactive features initialized');
    }

    // Enhanced Scroll Effects for Header
    initScrollEffects() {
        let lastScrollY = window.scrollY;
        let isScrollingDown = false;
        
        const handleScroll = () => {
            const currentScrollY = window.scrollY;
            const header = document.querySelector('.glass-header');
            
            if (header) {
                // Determine scroll direction
                isScrollingDown = currentScrollY > lastScrollY;
                
                // Add scrolled class when scrolled down
                if (currentScrollY > 20) {
                    header.classList.add('scrolled');
                } else {
                    header.classList.remove('scrolled');
                }
                
                // Always ensure header is visible
                header.classList.remove('hidden');
                
                lastScrollY = currentScrollY;
            }
        };

        // Throttle scroll events for better performance
        let scrollTimer = null;
        window.addEventListener('scroll', () => {
            if (scrollTimer) return;
            
            scrollTimer = setTimeout(() => {
                handleScroll();
                scrollTimer = null;
            }, 16); // ~60fps
        }, { passive: true });

        // Always show header on page load
        setTimeout(() => {
            const header = document.querySelector('.glass-header');
            if (header) {
                header.classList.remove('hidden');
            }
        }, 100);
    }

    // Smooth Scrolling for Navigation Links
    initSmoothScrolling() {
        const navLinks = document.querySelectorAll('a[href^="#"]');
        
        navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const targetId = link.getAttribute('href').substring(1);
                const targetElement = document.getElementById(targetId);
                
                if (targetElement) {
                    const headerHeight = document.querySelector('.glass-header')?.offsetHeight || 80;
                    const targetPosition = targetElement.offsetTop - headerHeight;
                    
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                }
            });
        });
    }

    // ======================================================================
    // LIQUID GLASS HEADER AI - INTELLIGENT COLOR & EFFECT ADAPTATION
    // ======================================================================
    
    initLiquidGlassHeaderAI() {
        const header = document.querySelector('.glass-header');
        if (!header) return;

        // AI Color Analysis System
        const ColorAnalyzer = {
            // Extract dominant colors from section background
            analyzeSection(sectionElement) {
                const style = window.getComputedStyle(sectionElement);
                const bgColor = style.backgroundColor;
                const bgImage = style.backgroundImage;
                
                // Parse RGB values
                const rgbMatch = bgColor.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)/);
                if (!rgbMatch) return this.getDefaultLightness();
                
                const [, r, g, b] = rgbMatch.map(Number);
                
                // Calculate relative luminance using WCAG formula
                const luminance = this.calculateLuminance(r, g, b);
                
                // Analyze gradient backgrounds
                if (bgImage && bgImage !== 'none') {
                    return this.analyzeGradientBackground(bgImage, luminance);
                }
                
                return {
                    luminance,
                    isLight: luminance > 0.5,
                    isDark: luminance <= 0.5,
                    brightness: this.calculateBrightness(r, g, b),
                    saturation: this.calculateSaturation(r, g, b),
                    backgroundType: this.classifyBackground(luminance, r, g, b)
                };
            },

            calculateLuminance(r, g, b) {
                // Convert to relative luminance (WCAG 2.1)
                const sRGB = [r, g, b].map(c => {
                    c = c / 255;
                    return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
                });
                
                return 0.2126 * sRGB[0] + 0.7152 * sRGB[1] + 0.0722 * sRGB[2];
            },

            calculateBrightness(r, g, b) {
                // Perceived brightness
                return (r * 299 + g * 587 + b * 114) / 1000;
            },

            calculateSaturation(r, g, b) {
                const max = Math.max(r, g, b);
                const min = Math.min(r, g, b);
                return max === 0 ? 0 : (max - min) / max;
            },

            classifyBackground(luminance, r, g, b) {
                if (luminance > 0.8) return 'very-light';
                if (luminance > 0.6) return 'light';
                if (luminance > 0.4) return 'medium';
                if (luminance > 0.2) return 'dark';
                return 'very-dark';
            },

            analyzeGradientBackground(bgImage, baseLuminance) {
                // Enhanced gradient analysis
                const gradientColors = this.extractGradientColors(bgImage);
                const avgLuminance = gradientColors.reduce((sum, color) => sum + color.luminance, 0) / gradientColors.length;
                
                return {
                    luminance: avgLuminance,
                    isLight: avgLuminance > 0.5,
                    isDark: avgLuminance <= 0.5,
                    brightness: gradientColors.reduce((sum, color) => sum + color.brightness, 0) / gradientColors.length,
                    saturation: gradientColors.reduce((sum, color) => sum + color.saturation, 0) / gradientColors.length,
                    backgroundType: this.classifyBackground(avgLuminance),
                    isGradient: true,
                    gradientColors
                };
            },

            extractGradientColors(bgImage) {
                // Basic gradient color extraction (simplified)
                const colorMatches = bgImage.match(/rgba?\(\d+,\s*\d+,\s*\d+/g) || [];
                return colorMatches.map(match => {
                    const [r, g, b] = match.replace(/rgba?\(/, '').split(',').map(Number);
                    return {
                        r, g, b,
                        luminance: this.calculateLuminance(r, g, b),
                        brightness: this.calculateBrightness(r, g, b),
                        saturation: this.calculateSaturation(r, g, b)
                    };
                });
            },

            getDefaultLightness() {
                return {
                    luminance: 0.5,
                    isLight: true,
                    isDark: false,
                    brightness: 128,
                    saturation: 0,
                    backgroundType: 'medium'
                };
            }
        };

        // Liquid Glass Effect Controller
        const LiquidGlassController = {
            currentState: null,
            transitionDuration: 400,

            applyLiquidGlassState(analysis, scrollPosition) {
                const { isLight, backgroundType, luminance, brightness, saturation } = analysis;
                
                // Remove previous state classes
                header.classList.remove(
                    'header-light-bg', 'header-dark-bg', 
                    'liquid-very-light', 'liquid-light', 'liquid-medium', 
                    'liquid-dark', 'liquid-very-dark'
                );

                // Apply base liquid glass state
                if (isLight) {
                    header.classList.add('header-light-bg');
                    this.applyLightGlassEffects(luminance, brightness, scrollPosition);
                } else {
                    header.classList.add('header-dark-bg');
                    this.applyDarkGlassEffects(luminance, brightness, scrollPosition);
                }

                // Apply specific background type class for fine-tuning
                header.classList.add(`liquid-${backgroundType}`);

                // Dynamic glass properties based on analysis
                this.updateGlassProperties(analysis, scrollPosition);

                this.currentState = { isLight, backgroundType, luminance };
            },

            applyLightGlassEffects(luminance, brightness, scrollY) {
                const scrollFactor = Math.min(scrollY / 300, 1);
                const baseLuminance = Math.max(luminance, 0.3);
                
                // Dynamic opacity based on background brightness
                const glassOpacity = 0.2 + (baseLuminance * 0.15) + (scrollFactor * 0.1);
                const borderOpacity = 0.3 + (baseLuminance * 0.2) + (scrollFactor * 0.1);
                
                header.style.setProperty('--glass-bg-opacity', glassOpacity);
                header.style.setProperty('--glass-border-opacity', borderOpacity);
                header.style.setProperty('--glass-blur', `${35 + scrollFactor * 15}px`);
                header.style.setProperty('--glass-saturation', `${150 + scrollFactor * 50}%`);
            },

            applyDarkGlassEffects(luminance, brightness, scrollY) {
                const scrollFactor = Math.min(scrollY / 300, 1);
                const inverseLuminance = 1 - luminance;
                
                // Stronger glass effect for dark backgrounds
                const glassOpacity = 0.08 + (inverseLuminance * 0.12) + (scrollFactor * 0.08);
                const borderOpacity = 0.15 + (inverseLuminance * 0.15) + (scrollFactor * 0.1);
                
                header.style.setProperty('--glass-bg-opacity', glassOpacity);
                header.style.setProperty('--glass-border-opacity', borderOpacity);
                header.style.setProperty('--glass-blur', `${40 + scrollFactor * 10}px`);
                header.style.setProperty('--glass-saturation', `${180 + scrollFactor * 20}%`);
            },

            updateGlassProperties(analysis, scrollY) {
                const { saturation, brightness, isGradient } = analysis;
                
                // Enhanced glass properties for gradients
                if (isGradient) {
                    header.style.setProperty('--liquid-shimmer-speed', '3s');
                    header.style.setProperty('--liquid-flow-intensity', '1.2');
                } else {
                    header.style.setProperty('--liquid-shimmer-speed', '4s');
                    header.style.setProperty('--liquid-flow-intensity', '1');
                }

                // Saturation-based adjustments
                const glassVibrancy = Math.max(saturation * 100, 150);
                header.style.setProperty('--glass-vibrancy', `${glassVibrancy}%`);
            }
        };

        // Smart Section Detection System
        const sections = document.querySelectorAll('section, div[id*="placeholder"]');
        const sectionAnalysis = new Map();
        
        // Pre-analyze all sections
        sections.forEach(section => {
            if (section.id) {
                const analysis = ColorAnalyzer.analyzeSection(section);
                sectionAnalysis.set(section.id, analysis);
                console.log(`🎨 Section ${section.id}:`, analysis);
            }
        });

        // Advanced Intersection Observer with AI
        const headerObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && entry.intersectionRatio > 0.1) {
                    const sectionId = entry.target.id;
                    const analysis = sectionAnalysis.get(sectionId);
                    
                    if (analysis) {
                        const scrollY = window.scrollY;
                        LiquidGlassController.applyLiquidGlassState(analysis, scrollY);
                        
                        console.log(`🔄 Header adapted for section: ${sectionId}`, analysis);
                    }
                }
            });
        }, {
            threshold: [0.1, 0.3, 0.5],
            rootMargin: '-60px 0px -40% 0px' // Smart detection zone
        });

        // Observe all sections
        sections.forEach(section => {
            if (section.id) {
                headerObserver.observe(section);
            }
        });

        // Real-time scroll adaptation
        let adaptTimer = null;
        window.addEventListener('scroll', () => {
            if (adaptTimer) return;
            
            adaptTimer = setTimeout(() => {
            const scrollY = window.scrollY;
            const headerHeight = 80;
            
                // Find current section based on scroll position
            let currentSection = null;
                let maxVisibility = 0;

            sections.forEach(section => {
                const rect = section.getBoundingClientRect();
                const sectionTop = scrollY + rect.top;
                const sectionBottom = sectionTop + rect.height;
                
                    // Calculate visibility percentage
                    const viewportTop = scrollY + headerHeight;
                    const viewportBottom = scrollY + window.innerHeight;
                    
                    const visibleTop = Math.max(viewportTop, sectionTop);
                    const visibleBottom = Math.min(viewportBottom, sectionBottom);
                    const visibleHeight = Math.max(0, visibleBottom - visibleTop);
                    const visibilityRatio = visibleHeight / Math.min(rect.height, window.innerHeight - headerHeight);
                    
                    if (visibilityRatio > maxVisibility && section.id) {
                        maxVisibility = visibilityRatio;
                    currentSection = section.id;
                }
            });
            
                // Apply liquid glass state for most visible section
                if (currentSection && sectionAnalysis.has(currentSection)) {
                    const analysis = sectionAnalysis.get(currentSection);
                    LiquidGlassController.applyLiquidGlassState(analysis, scrollY);
                }
                
                adaptTimer = null;
            }, 16); // 60fps
        }, { passive: true });

        // Initialize with first section
        setTimeout(() => {
            if (sections.length > 0 && sections[0].id) {
                const firstAnalysis = sectionAnalysis.get(sections[0].id);
                if (firstAnalysis) {
                    LiquidGlassController.applyLiquidGlassState(firstAnalysis, 0);
                }
            }
        }, 100);

        console.log('🚀 Liquid Glass Header AI initialized');
    }

    // Intersection Observers for Animations
    initIntersectionObservers() {
        const observerOptions = {
            threshold: 0.2,
            rootMargin: '0px 0px -50px 0px'
        };

        const fadeInObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                }
            });
        }, observerOptions);

        // Observe elements with fade-in animations
        document.querySelectorAll('.section-fade-in, .card-hover, .stat-card').forEach(el => {
            fadeInObserver.observe(el);
        });
    }

    // Loading Animations
    initLoadingAnimations() {
        // Add loading completed class to body
        document.body.classList.add('loaded');
        
        // Trigger any component-specific loading animations
        const animatedElements = document.querySelectorAll('[data-animate-in]');
        animatedElements.forEach((el, index) => {
            setTimeout(() => {
                el.classList.add('animate-in');
            }, index * 100);
        });
    }

    // Mobile Menu Initialization
    initMobileMenu() {
        console.log('🔄 Initializing mobile menu...');
        
        // Wait for DOM to be fully ready
        setTimeout(() => {
            const mobileMenuBtn = document.getElementById('mobile-menu-btn');
            const mobileMenu = document.getElementById('mobile-menu');
            
            console.log('📱 Mobile menu button:', mobileMenuBtn);
            console.log('📱 Mobile menu:', mobileMenu);
            
            if (mobileMenuBtn && mobileMenu) {
                console.log('✅ Mobile menu elements found, setting up listeners...');
                
                // Remove any existing listeners
                mobileMenuBtn.replaceWith(mobileMenuBtn.cloneNode(true));
                const newBtn = document.getElementById('mobile-menu-btn');
                
                // Force initial state
                mobileMenu.classList.add('hidden');
                mobileMenu.classList.add('mobile-menu-glass-outside'); // Add new positioning class
                mobileMenu.style.display = 'none';
                
                newBtn.addEventListener('click', (e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    console.log('📱 Mobile menu button clicked!');
                    
                    const isHidden = mobileMenu.classList.contains('hidden');
                    console.log('📱 Menu is currently hidden:', isHidden);
                    
                    if (isHidden) {
                        // Show menu with beautiful animation
                        mobileMenu.classList.remove('hidden', 'closing');
                        mobileMenu.classList.add('show');
                        mobileMenu.style.display = 'block';
                        
                        // Reset nav link animations
                        const navLinks = mobileMenu.querySelectorAll('.mobile-nav-link');
                        const button = mobileMenu.querySelector('.btn-primary-glass');
                        
                        navLinks.forEach(link => {
                            link.style.opacity = '0';
                            link.style.transform = 'translateY(20px)';
                        });
                        
                        if (button) {
                            button.style.opacity = '0';
                            button.style.transform = 'translateY(20px)';
                        }
                        
                        console.log('📱 Mobile menu SHOWN with beautiful liquid glass design');
                    } else {
                        // Hide menu with smooth closing animation
                        mobileMenu.classList.add('closing');
                        mobileMenu.classList.remove('show');
                        
                        // Hide after animation completes
                        setTimeout(() => {
                            mobileMenu.classList.add('hidden');
                            mobileMenu.classList.remove('closing');
                            mobileMenu.style.display = 'none';
                        }, 300);
                        
                        console.log('📱 Mobile menu hidden with smooth animation');
                    }
                    
                    // Enhanced hamburger menu animation
                    const spans = newBtn.querySelectorAll('span');
                    spans.forEach((span, index) => {
                        if (isHidden) {
                            // Transform to X
                            if (index === 0) {
                                span.style.transform = 'rotate(45deg) translate(6px, 6px)';
                                span.style.transformOrigin = 'center';
                            }
                            if (index === 1) {
                                span.style.opacity = '0';
                                span.style.transform = 'scaleX(0)';
                            }
                            if (index === 2) {
                                span.style.transform = 'rotate(-45deg) translate(6px, -6px)';
                                span.style.transformOrigin = 'center';
                            }
                        } else {
                            // Transform back to hamburger
                            span.style.transform = 'rotate(0) translate(0, 0)';
                            span.style.opacity = '1';
                            span.style.transformOrigin = 'center';
                        }
                    });
                });
                
                // Close mobile menu when clicking on links
                const mobileLinks = mobileMenu.querySelectorAll('a');
                mobileLinks.forEach(link => {
                    link.addEventListener('click', () => {
                        // Smooth close animation
                        mobileMenu.classList.add('closing');
                        mobileMenu.classList.remove('show');
                        
                        setTimeout(() => {
                            mobileMenu.classList.add('hidden');
                            mobileMenu.classList.remove('closing');
                            mobileMenu.style.display = 'none';
                        }, 300);
                        
                        console.log('📱 Mobile menu closed via link click with animation');
                        
                        // Reset hamburger animation
                        const spans = newBtn.querySelectorAll('span');
                        spans.forEach(span => {
                            span.style.transform = 'rotate(0) translate(0, 0)';
                            span.style.opacity = '1';
                            span.style.transformOrigin = 'center';
                        });
                    });
                });
                
                console.log('✅ Mobile menu initialized successfully!');
            } else {
                console.error('❌ Mobile menu elements not found!');
                console.log('Available elements:', {
                    allButtons: document.querySelectorAll('button'),
                    allIds: Array.from(document.querySelectorAll('[id]')).map(el => el.id)
                });
            }
        }, 300); // Increased timeout to ensure DOM is ready
    }

    // ======================================================================
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new ComponentLoader();
});

// Handle page visibility changes
document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
        // Pause animations when page is not visible
        document.body.style.animationPlayState = 'paused';
    } else {
        // Resume animations when page becomes visible
        document.body.style.animationPlayState = 'running';
    }
});

// Handle resize events
window.addEventListener('resize', () => {
    // Close mobile menu on resize
    const mobileMenu = document.getElementById('mobile-menu');
    if (mobileMenu && window.innerWidth >= 1024) {
        mobileMenu.classList.add('hidden');
        
        const mobileMenuBtn = document.getElementById('mobile-menu-btn');
        if (mobileMenuBtn) {
            const spans = mobileMenuBtn.querySelectorAll('span');
            spans.forEach(span => {
                span.style.transform = 'rotate(0) translate(0, 0)';
                span.style.opacity = '1';
            });
        }
    }
});

// Export for global access if needed
window.ComponentLoader = ComponentLoader;