// DOM Elements
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');
const navLinks = document.querySelectorAll('.nav-menu a');
const amountBtns = document.querySelectorAll('.amount-btn');
const customAmountInput = document.querySelector('.custom-amount');
const productBtns = document.querySelectorAll('.btn-product');
const donateBtn = document.querySelector('.btn-donate');
const contactForm = document.querySelector('.contact-form form');

// Mobile Navigation Toggle
hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking on links
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// Smooth scrolling for navigation links
navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = link.getAttribute('href');
        const targetSection = document.querySelector(targetId);
        
        if (targetSection) {
            const offsetTop = targetSection.offsetTop - 80; // Account for fixed header
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// Donation amount selection
amountBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        // Remove active class from all buttons
        amountBtns.forEach(b => b.classList.remove('active'));
        // Add active class to clicked button
        btn.classList.add('active');
        // Clear custom amount input
        customAmountInput.value = '';
        // Store selected amount
        btn.dataset.selected = 'true';
    });
});

// Custom amount input handling
customAmountInput.addEventListener('input', () => {
    // Remove active class from all preset buttons
    amountBtns.forEach(btn => {
        btn.classList.remove('active');
        btn.dataset.selected = 'false';
    });
});

// Shopping cart functionality
let cart = [];

// Add to cart functionality
productBtns.forEach((btn, index) => {
    btn.addEventListener('click', () => {
        const productCard = btn.closest('.product-card');
        const productName = productCard.querySelector('h3').textContent;
        const productPrice = productCard.querySelector('.product-price').textContent;
        
        // Add item to cart
        const item = {
            name: productName,
            price: productPrice,
            id: Date.now() + index
        };
        
        cart.push(item);
        
        // Visual feedback
        btn.textContent = 'Added!';
        btn.style.background = '#28a745';
        
        setTimeout(() => {
            btn.textContent = 'Add to Cart';
            btn.style.background = '';
        }, 1500);
        
        // Update cart display
        updateCartDisplay();
        
        // Show success message
        showNotification(`${productName} added to cart!`, 'success');
    });
});

// Update cart display (you can expand this to show cart contents)
function updateCartDisplay() {
    // You can add a cart icon with item count here
    console.log('Cart updated:', cart);
}

// Donation button handling
donateBtn.addEventListener('click', () => {
    let donationAmount = '';
    
    // Check if a preset amount is selected
    const activeBtn = document.querySelector('.amount-btn.active');
    if (activeBtn) {
        donationAmount = activeBtn.dataset.amount;
    } else if (customAmountInput.value) {
        donationAmount = customAmountInput.value;
    }
    
    if (donationAmount && donationAmount > 0) {
        // Simulate donation processing
        donateBtn.textContent = 'Processing...';
        donateBtn.disabled = true;
        
        setTimeout(() => {
            showNotification(`Thank you for your $${donationAmount} donation!`, 'success');
            donateBtn.textContent = 'Donate Now';
            donateBtn.disabled = false;
            
            // Reset form
            amountBtns.forEach(btn => btn.classList.remove('active'));
            customAmountInput.value = '';
        }, 2000);
    } else {
        showNotification('Please select or enter a donation amount.', 'error');
    }
});

// Contact form handling
contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const formData = new FormData(contactForm);
    const submitBtn = contactForm.querySelector('.btn-submit');
    
    // Simulate form submission
    submitBtn.textContent = 'Sending...';
    submitBtn.disabled = true;
    
    setTimeout(() => {
        showNotification('Thank you for your message! We\'ll get back to you soon.', 'success');
        contactForm.reset();
        submitBtn.textContent = 'Send Message';
        submitBtn.disabled = false;
    }, 2000);
});

// Notification system
function showNotification(message, type = 'info') {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    
    // Style the notification
    Object.assign(notification.style, {
        position: 'fixed',
        top: '20px',
        right: '20px',
        padding: '15px 20px',
        borderRadius: '5px',
        color: 'white',
        fontWeight: '600',
        zIndex: '9999',
        opacity: '0',
        transform: 'translateX(100%)',
        transition: 'all 0.3s ease',
        maxWidth: '300px',
        wordWrap: 'break-word'
    });
    
    // Set background color based on type
    switch (type) {
        case 'success':
            notification.style.background = '#28a745';
            break;
        case 'error':
            notification.style.background = '#dc3545';
            break;
        default:
            notification.style.background = '#2E86AB';
    }
    
    // Add to DOM
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.opacity = '1';
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Remove after 4 seconds
    setTimeout(() => {
        notification.style.opacity = '0';
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 300);
    }, 4000);
}

// Navbar background on scroll
window.addEventListener('scroll', () => {
    const header = document.querySelector('.header');
    if (window.scrollY > 100) {
        header.style.background = 'rgba(46, 134, 171, 0.95)';
        header.style.backdropFilter = 'blur(10px)';
    } else {
        header.style.background = 'linear-gradient(135deg, #2E86AB 0%, #A23B72 100%)';
        header.style.backdropFilter = 'none';
    }
});

// Animate elements on scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe elements for animation
document.addEventListener('DOMContentLoaded', () => {
    const animateElements = document.querySelectorAll('.product-card, .stat, .contact-item');
    
    animateElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'all 0.6s ease';
        observer.observe(el);
    });
});

// Counter animation for stats
function animateCounters() {
    const counters = document.querySelectorAll('.stat-number');
    
    counters.forEach(counter => {
        const target = parseInt(counter.textContent.replace(/\D/g, ''));
        const increment = target / 100;
        let current = 0;
        
        const updateCounter = () => {
            if (current < target) {
                current += increment;
                if (counter.textContent.includes('$')) {
                    counter.textContent = `$${Math.floor(current).toLocaleString()}`;
                } else if (counter.textContent.includes('+')) {
                    counter.textContent = `${Math.floor(current)}+`;
                } else {
                    counter.textContent = Math.floor(current);
                }
                requestAnimationFrame(updateCounter);
            } else {
                if (counter.textContent.includes('$')) {
                    counter.textContent = `$${target.toLocaleString()}`;
                } else if (counter.textContent.includes('+')) {
                    counter.textContent = `${target}+`;
                } else {
                    counter.textContent = target;
                }
            }
        };
        
        updateCounter();
    });
}

// Trigger counter animation when stats section is visible
const statsSection = document.querySelector('.stats');
if (statsSection) {
    const statsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounters();
                statsObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    
    statsObserver.observe(statsSection);
}

// Initialize page
document.addEventListener('DOMContentLoaded', () => {
    // Show welcome message
    setTimeout(() => {
        showNotification('Welcome to our charity ice cream event! 🍦', 'info');
    }, 1000);
    
    // Initialize any other components
    console.log('Lions Club Charity Landing Page Loaded Successfully!');
});