// Dark Mode Toggle Functionality
function initDarkMode() {
    const darkModeToggle = document.getElementById('dark-mode-toggle');
    const body = document.body;
    
    // Check for saved theme preference or default to dark mode
    const savedTheme = localStorage.getItem('theme') || 'dark';
    
    // Apply the saved theme
    if (savedTheme === 'dark') {
        body.setAttribute('data-theme', 'dark');
        darkModeToggle.checked = true;
    } else {
        body.setAttribute('data-theme', 'light');
        darkModeToggle.checked = false;
    }
    
    // Add event listener for theme toggle
    darkModeToggle.addEventListener('change', function() {
        if (this.checked) {
            body.setAttribute('data-theme', 'dark');
            localStorage.setItem('theme', 'dark');
        } else {
            body.setAttribute('data-theme', 'light');
            localStorage.setItem('theme', 'light');
        }
    });
}

// Smooth scrolling for navigation links
document.addEventListener('DOMContentLoaded', function() {
    // Initialize dark mode
    initDarkMode();
    // Get all navigation links
    const navLinks = document.querySelectorAll('.nav-link');
    
    // Add click event listeners to navigation links
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                // Calculate offset for fixed navbar
                const navbarHeight = document.querySelector('.navbar').offsetHeight;
                const targetPosition = targetSection.offsetTop - navbarHeight;
                
                // Smooth scroll to target section
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Add scroll effect to navbar
    const navbar = document.querySelector('.navbar');
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            navbar.style.background = 'var(--navbar-bg)';
            navbar.style.boxShadow = '0 2px 20px var(--shadow-light)';
        } else {
            navbar.style.background = 'var(--navbar-bg)';
            navbar.style.boxShadow = 'none';
        }
    });
    
    // Add active class to navigation links based on scroll position
    const sections = document.querySelectorAll('section[id]');
    
    function highlightNavigation() {
        const scrollPosition = window.scrollY + 100;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            const correspondingNavLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                // Remove active class from all nav links
                navLinks.forEach(link => link.classList.remove('active'));
                // Add active class to current nav link
                if (correspondingNavLink) {
                    correspondingNavLink.classList.add('active');
                }
            }
        });
    }
    
    // Call highlightNavigation on scroll
    window.addEventListener('scroll', highlightNavigation);
    
    // Add fade-in animation for project cards
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Observe project cards for animation
    const projectCards = document.querySelectorAll('.project-card');
    projectCards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(card);
    });
    
    // Add hover effect for contact methods
    const contactMethods = document.querySelectorAll('.contact-method');
    contactMethods.forEach(method => {
        method.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-3px) scale(1.02)';
        });
        
        method.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
    
    // Add typing effect to landing title (optional enhancement)
    const landingTitle = document.querySelector('.landing-title');
    if (landingTitle) {
        const originalText = landingTitle.innerHTML;
        landingTitle.innerHTML = '';
        
        let i = 0;
        const typeWriter = () => {
            if (i < originalText.length) {
                landingTitle.innerHTML += originalText.charAt(i);
                i++;
                setTimeout(typeWriter, 50);
            }
        };
        
        // Start typing effect after a short delay
        setTimeout(typeWriter, 500);
    }
});

// Add CSS for active navigation state
const style = document.createElement('style');
style.textContent = `
    .nav-link.active {
        color: #007bff !important;
    }
    
    .nav-link.active::after {
        width: 100% !important;
    }
`;
document.head.appendChild(style);
