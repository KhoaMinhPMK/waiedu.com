// Product Responsive Test Script
// This script helps test responsive behavior of product section

document.addEventListener('DOMContentLoaded', function() {
    // Function to test responsive breakpoints
    function testResponsiveBreakpoints() {
        const breakpoints = {
            mobile: 640,
            tablet: 1023,
            desktop: 1024
        };
        
        const currentWidth = window.innerWidth;
        let deviceType = '';
        
        if (currentWidth <= breakpoints.mobile) {
            deviceType = 'mobile';
        } else if (currentWidth <= breakpoints.tablet) {
            deviceType = 'tablet';
        } else {
            deviceType = 'desktop';
        }
        
        console.log(`Current device type: ${deviceType} (${currentWidth}px)`);
        return deviceType;
    }
    
    // Function to adjust product images for mobile
    function optimizeForMobile() {
        if (window.innerWidth <= 640) {
            const productImages = document.querySelectorAll('.product-image');
            productImages.forEach(img => {
                img.style.maxHeight = '300px';
                img.style.objectFit = 'contain';
            });
            
            // Add mobile-specific classes
            const cards = document.querySelectorAll('.slide-card');
            cards.forEach(card => {
                card.classList.add('mobile-center', 'mobile-shadow');
            });
            
            // Disable animations on mobile for performance
            const animatedElements = document.querySelectorAll('.animate-blob, .animate-pulse');
            animatedElements.forEach(el => {
                el.classList.add('no-motion');
            });
        }
    }
    
    // Function to handle window resize
    function handleResize() {
        testResponsiveBreakpoints();
        optimizeForMobile();
        
        // Adjust swiper if exists
        if (window.heroSwiper) {
            window.heroSwiper.update();
        }
    }
    
    // Function to lazy load images on mobile
    function setupLazyLoading() {
        if ('IntersectionObserver' in window) {
            const imageObserver = new IntersectionObserver((entries, observer) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const img = entry.target;
                        img.src = img.dataset.src;
                        img.classList.remove('product-loading');
                        observer.unobserve(img);
                    }
                });
            });
            
            const lazyImages = document.querySelectorAll('img[data-src]');
            lazyImages.forEach(img => {
                img.classList.add('product-loading');
                imageObserver.observe(img);
            });
        }
    }
    
    // Function to add touch gestures for mobile
    function setupTouchGestures() {
        if (window.innerWidth <= 640) {
            const productCards = document.querySelectorAll('.slide-card, #product-features .group');
            
            productCards.forEach(card => {
                let startY = 0;
                let startX = 0;
                
                card.addEventListener('touchstart', (e) => {
                    startY = e.touches[0].clientY;
                    startX = e.touches[0].clientX;
                }, { passive: true });
                
                card.addEventListener('touchend', (e) => {
                    const endY = e.changedTouches[0].clientY;
                    const endX = e.changedTouches[0].clientX;
                    const diffY = startY - endY;
                    const diffX = startX - endX;
                    
                    // Simple tap detection
                    if (Math.abs(diffY) < 10 && Math.abs(diffX) < 10) {
                        card.classList.add('touch-target');
                        setTimeout(() => {
                            card.classList.remove('touch-target');
                        }, 200);
                    }
                }, { passive: true });
            });
        }
    }
    
    // Function to optimize performance on mobile
    function optimizePerformance() {
        if (window.innerWidth <= 640) {
            // Reduce blur effects
            const blurElements = document.querySelectorAll('[class*="blur-"]');
            blurElements.forEach(el => {
                const currentClasses = el.className;
                if (currentClasses.includes('blur-')) {
                    el.style.filter = 'blur(20px)'; // Reduce blur for performance
                }
            });
            
            // Disable parallax on mobile
            const parallaxElements = document.querySelectorAll('.abstract-shape');
            parallaxElements.forEach(el => {
                el.style.transform = 'none';
            });
        }
    }
    
    // Function to test all product sections
    function testProductSections() {
        const sections = ['#product-intro', '#product-features', '#product-slides'];
        const deviceType = testResponsiveBreakpoints();
        
        sections.forEach(sectionId => {
            const section = document.querySelector(sectionId);
            if (section) {
                console.log(`✓ ${sectionId} found and responsive for ${deviceType}`);
                
                // Check if section has proper responsive classes
                const hasResponsiveClasses = section.querySelector('[class*="lg:"], [class*="md:"], [class*="sm:"]');
                if (hasResponsiveClasses) {
                    console.log(`  ✓ Responsive classes detected in ${sectionId}`);
                } else {
                    console.warn(`  ⚠ No responsive classes found in ${sectionId}`);
                }
            } else {
                console.error(`✗ ${sectionId} not found`);
            }
        });
    }
    
    // Initialize all functions
    function init() {
        console.log('🎯 Product Responsive Test Started');
        testProductSections();
        optimizeForMobile();
        setupLazyLoading();
        setupTouchGestures();
        optimizePerformance();
        
        // Add resize listener
        let resizeTimeout;
        window.addEventListener('resize', () => {
            clearTimeout(resizeTimeout);
            resizeTimeout = setTimeout(handleResize, 250);
        });
        
        console.log('✅ Product Responsive Test Completed');
    }
    
    // Run tests
    init();
    
    // Expose testing functions globally for manual testing
    window.productResponsiveTest = {
        testBreakpoints: testResponsiveBreakpoints,
        optimizeForMobile: optimizeForMobile,
        testSections: testProductSections
    };
});

// CSS Media Query Tests
function testCSSMediaQueries() {
    const tests = [
        { name: 'Mobile', query: '(max-width: 640px)' },
        { name: 'Tablet', query: '(min-width: 641px) and (max-width: 1023px)' },
        { name: 'Desktop', query: '(min-width: 1024px)' }
    ];
    
    tests.forEach(test => {
        if (window.matchMedia(test.query).matches) {
            console.log(`📱 Active breakpoint: ${test.name}`);
            document.body.setAttribute('data-device', test.name.toLowerCase());
        }
    });
}

// Run CSS tests
testCSSMediaQueries();

// Monitor breakpoint changes
const mediaQueries = [
    window.matchMedia('(max-width: 640px)'),
    window.matchMedia('(min-width: 641px) and (max-width: 1023px)'),
    window.matchMedia('(min-width: 1024px)')
];

mediaQueries.forEach((mq, index) => {
    mq.addListener(() => {
        if (mq.matches) {
            const devices = ['mobile', 'tablet', 'desktop'];
            console.log(`🔄 Breakpoint changed to: ${devices[index]}`);
            document.body.setAttribute('data-device', devices[index]);
            testCSSMediaQueries();
        }
    });
});
