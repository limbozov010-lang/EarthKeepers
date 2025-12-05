// EarthKeepers Premium JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // Initialize Lucide icons
    lucide.createIcons();
    
    // Initialize AOS
    AOS.init({
        duration: 800,
        easing: 'ease-out-cubic',
        once: true,
        offset: 100
    });

    // Navigation scroll effect
    const navbar = document.getElementById('navbar');
    const heroBg = document.getElementById('heroBg');
    
    window.addEventListener('scroll', function() {
        const scrollY = window.scrollY;
        
        // Navbar background
        if (scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
        
        // Parallax effect on hero background
        if (heroBg) {
            const opacity = Math.max(0.3, 1 - scrollY / 1000);
            heroBg.style.opacity = opacity;
        }
        
        // Back to top button
        const backToTop = document.getElementById('backToTop');
        if (scrollY > 500) {
            backToTop.classList.add('visible');
        } else {
            backToTop.classList.remove('visible');
        }
    });

    // Mobile menu toggle
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const mobileMenu = document.getElementById('mobileMenu');
    
    if (mobileMenuBtn && mobileMenu) {
        mobileMenuBtn.addEventListener('click', function() {
            mobileMenu.classList.toggle('active');
            const icon = mobileMenuBtn.querySelector('i');
            if (mobileMenu.classList.contains('active')) {
                icon.setAttribute('data-lucide', 'x');
            } else {
                icon.setAttribute('data-lucide', 'menu');
            }
            lucide.createIcons();
        });

        // Close mobile menu when clicking a link
        const mobileLinks = mobileMenu.querySelectorAll('.mobile-link');
        mobileLinks.forEach(link => {
            link.addEventListener('click', function() {
                mobileMenu.classList.remove('active');
                const icon = mobileMenuBtn.querySelector('i');
                icon.setAttribute('data-lucide', 'menu');
                lucide.createIcons();
            });
        });
    }

    // Stats counter animation
    const statNumbers = document.querySelectorAll('.stat-number[data-count]');
    
    const animateCounter = (element) => {
        const target = parseInt(element.getAttribute('data-count'));
        const duration = 2000;
        const step = target / (duration / 16);
        let current = 0;
        
        const updateCounter = () => {
            current += step;
            if (current < target) {
                element.textContent = Math.floor(current).toLocaleString();
                requestAnimationFrame(updateCounter);
            } else {
                element.textContent = target.toLocaleString();
            }
        };
        
        updateCounter();
    };

    // Intersection Observer for stats
    const statsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounter(entry.target);
                statsObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    statNumbers.forEach(stat => statsObserver.observe(stat));

    // Testimonials slider
    const testimonialCards = document.querySelectorAll('.testimonial-card');
    const dots = document.querySelectorAll('.dot');
    let currentTestimonial = 0;

    function showTestimonial(index) {
        testimonialCards.forEach((card, i) => {
            card.classList.remove('active');
            dots[i].classList.remove('active');
        });
        testimonialCards[index].classList.add('active');
        dots[index].classList.add('active');
    }

    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            currentTestimonial = index;
            showTestimonial(currentTestimonial);
        });
    });

    // Auto-rotate testimonials
    setInterval(() => {
        currentTestimonial = (currentTestimonial + 1) % testimonialCards.length;
        showTestimonial(currentTestimonial);
    }, 5000);

    // Donation functionality
    const donationTypeBtns = document.querySelectorAll('.donation-type-btn');
    const amountBtns = document.querySelectorAll('.amount-btn');
    const customAmountInput = document.getElementById('customAmount');
    const donateBtn = document.getElementById('donateBtn');
    
    let selectedAmount = 50;
    let donationType = 'monthly';

    donationTypeBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            donationTypeBtns.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            donationType = this.getAttribute('data-type');
        });
    });

    amountBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            amountBtns.forEach(b => b.classList.remove('selected'));
            this.classList.add('selected');
            selectedAmount = parseInt(this.getAttribute('data-amount'));
            customAmountInput.value = '';
        });
    });

    customAmountInput.addEventListener('input', function() {
        if (this.value) {
            amountBtns.forEach(b => b.classList.remove('selected'));
            selectedAmount = parseInt(this.value) || 0;
        }
    });

    donateBtn.addEventListener('click', function() {
        const amount = customAmountInput.value || selectedAmount;
        if (amount > 0) {
            showModal();
        }
    });

    // Modal functions
    window.showModal = function() {
        const modal = document.getElementById('successModal');
        modal.classList.add('active');
        lucide.createIcons();
    };

    window.closeModal = function() {
        const modal = document.getElementById('successModal');
        modal.classList.remove('active');
    };

    // Close modal on backdrop click
    document.getElementById('successModal').addEventListener('click', function(e) {
        if (e.target === this) {
            closeModal();
        }
    });

    // Newsletter form
    const newsletterForm = document.getElementById('newsletterForm');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const email = this.querySelector('input').value;
            if (email) {
                alert('Спасибо за подписку! Мы отправим вам письмо на ' + email);
                this.reset();
            }
        });
    }

    // Back to top button
    const backToTopBtn = document.getElementById('backToTop');
    if (backToTopBtn) {
        backToTopBtn.addEventListener('click', function() {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const headerOffset = 80;
                const elementPosition = target.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Progress bar animation on scroll
    const progressBars = document.querySelectorAll('.progress-fill');
    const progressObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const width = entry.target.style.width;
                entry.target.style.width = '0%';
                setTimeout(() => {
                    entry.target.style.width = width;
                }, 100);
                progressObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    progressBars.forEach(bar => progressObserver.observe(bar));

    // Keyboard navigation for modal
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            closeModal();
        }
    });

    // Image lazy loading fallback
    const images = document.querySelectorAll('img[loading="lazy"]');
    if ('loading' in HTMLImageElement.prototype) {
        // Browser supports lazy loading
    } else {
        // Fallback for older browsers
        const lazyLoadObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src || img.src;
                    lazyLoadObserver.unobserve(img);
                }
            });
        });
        images.forEach(img => lazyLoadObserver.observe(img));
    }

    // Add hover effects to cards
    const cards = document.querySelectorAll('.problem-card, .project-card');
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px)';
        });
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });

    console.log('EarthKeepers website loaded successfully!');
});


// ============================================
// PREMIUM 5000₽ FEATURES
// ============================================

// Gallery Lightbox
const galleryItems = document.querySelectorAll('.gallery-item');
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightboxImg');
const lightboxCaption = document.getElementById('lightboxCaption');
const lightboxClose = document.getElementById('lightboxClose');
const lightboxPrev = document.getElementById('lightboxPrev');
const lightboxNext = document.getElementById('lightboxNext');

let currentImageIndex = 0;
const galleryImages = [];

galleryItems.forEach((item, index) => {
    const src = item.getAttribute('data-src');
    const caption = item.querySelector('.gallery-overlay span')?.textContent || '';
    galleryImages.push({ src, caption });
    
    item.addEventListener('click', () => {
        currentImageIndex = index;
        openLightbox(src, caption);
    });
});

function openLightbox(src, caption) {
    lightbox.classList.add('active');
    lightboxImg.src = src;
    lightboxCaption.textContent = caption;
    document.body.style.overflow = 'hidden';
    lucide.createIcons();
}

function closeLightbox() {
    lightbox.classList.remove('active');
    document.body.style.overflow = '';
}

function showPrevImage() {
    currentImageIndex = (currentImageIndex - 1 + galleryImages.length) % galleryImages.length;
    const { src, caption } = galleryImages[currentImageIndex];
    lightboxImg.src = src;
    lightboxCaption.textContent = caption;
}

function showNextImage() {
    currentImageIndex = (currentImageIndex + 1) % galleryImages.length;
    const { src, caption } = galleryImages[currentImageIndex];
    lightboxImg.src = src;
    lightboxCaption.textContent = caption;
}

if (lightboxClose) lightboxClose.addEventListener('click', closeLightbox);
if (lightboxPrev) lightboxPrev.addEventListener('click', showPrevImage);
if (lightboxNext) lightboxNext.addEventListener('click', showNextImage);

// Close lightbox on backdrop click
if (lightbox) {
    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) closeLightbox();
    });
}

// Keyboard navigation for lightbox
document.addEventListener('keydown', (e) => {
    if (!lightbox?.classList.contains('active')) return;
    if (e.key === 'Escape') closeLightbox();
    if (e.key === 'ArrowLeft') showPrevImage();
    if (e.key === 'ArrowRight') showNextImage();
});

// FAQ Accordion
const faqItems = document.querySelectorAll('.faq-item');

faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');
    question?.addEventListener('click', () => {
        const isActive = item.classList.contains('active');
        
        // Close all other items
        faqItems.forEach(otherItem => {
            otherItem.classList.remove('active');
        });
        
        // Toggle current item
        if (!isActive) {
            item.classList.add('active');
        }
        
        lucide.createIcons();
    });
});

// Video Play Button
const playVideoBtn = document.getElementById('playVideoBtn');
if (playVideoBtn) {
    playVideoBtn.addEventListener('click', () => {
        // Create video modal
        const videoModal = document.createElement('div');
        videoModal.className = 'video-modal active';
        videoModal.innerHTML = `
            <div class="video-modal-content">
                <p style="font-size: 1.5rem;">🎬 Видео скоро будет доступно</p>
                <p style="margin-top: 1rem; opacity: 0.7;">Нажмите в любом месте, чтобы закрыть</p>
            </div>
        `;
        document.body.appendChild(videoModal);
        document.body.style.overflow = 'hidden';
        
        videoModal.addEventListener('click', () => {
            videoModal.remove();
            document.body.style.overflow = '';
        });
    });
}

// Contact Form
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const formData = new FormData(contactForm);
        const name = formData.get('name');
        
        // Show success message
        const successModal = document.getElementById('successModal');
        if (successModal) {
            const modalTitle = successModal.querySelector('.modal-title');
            const modalText = successModal.querySelector('.modal-text');
            if (modalTitle) modalTitle.textContent = 'Сообщение отправлено!';
            if (modalText) modalText.textContent = `Спасибо, ${name}! Мы свяжемся с вами в ближайшее время.`;
            successModal.classList.add('active');
            lucide.createIcons();
        }
        
        contactForm.reset();
    });
}

// Scroll Reveal Animation
const revealElements = document.querySelectorAll('.reveal');
const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('active');
        }
    });
}, { threshold: 0.1 });

revealElements.forEach(el => revealObserver.observe(el));

// Parallax Effect on Scroll
const parallaxElements = document.querySelectorAll('[data-parallax]');
window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;
    parallaxElements.forEach(el => {
        const speed = el.getAttribute('data-parallax') || 0.5;
        el.style.transform = `translateY(${scrollY * speed}px)`;
    });
});

// Typing Effect for Hero Title
function typeWriter(element, text, speed = 100) {
    let i = 0;
    element.textContent = '';
    function type() {
        if (i < text.length) {
            element.textContent += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    type();
}

// Number Counter with Easing
function animateValue(element, start, end, duration) {
    const range = end - start;
    const startTime = performance.now();
    
    function update(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        
        // Easing function (ease-out-cubic)
        const easeProgress = 1 - Math.pow(1 - progress, 3);
        
        const current = Math.floor(start + range * easeProgress);
        element.textContent = current.toLocaleString();
        
        if (progress < 1) {
            requestAnimationFrame(update);
        }
    }
    
    requestAnimationFrame(update);
}

// Smooth Scroll with Offset
function smoothScrollTo(target, offset = 80) {
    const element = document.querySelector(target);
    if (element) {
        const top = element.getBoundingClientRect().top + window.pageYOffset - offset;
        window.scrollTo({
            top,
            behavior: 'smooth'
        });
    }
}

// Add hover sound effect (optional)
function addHoverSound() {
    const buttons = document.querySelectorAll('.btn, .amount-btn, .donate-btn');
    buttons.forEach(btn => {
        btn.addEventListener('mouseenter', () => {
            // Could add subtle sound here
        });
    });
}

// Initialize all premium features
function initPremiumFeatures() {
    // Add loading animation
    const preloader = document.createElement('div');
    preloader.className = 'preloader';
    preloader.innerHTML = `
        <i data-lucide="leaf" class="preloader-logo"></i>
        <div class="preloader-text">EarthKeepers</div>
        <div class="preloader-bar">
            <div class="preloader-progress"></div>
        </div>
    `;
    document.body.prepend(preloader);
    lucide.createIcons();
    
    // Hide preloader after page load
    window.addEventListener('load', () => {
        setTimeout(() => {
            preloader.classList.add('hidden');
            setTimeout(() => preloader.remove(), 500);
        }, 1500);
    });
    
    // Add floating action button for quick donate
    const fabContainer = document.createElement('div');
    fabContainer.className = 'fab-container';
    fabContainer.innerHTML = `
        <button class="fab-btn" onclick="document.getElementById('donate').scrollIntoView({behavior: 'smooth'})">
            <i data-lucide="heart"></i>
        </button>
    `;
    document.body.appendChild(fabContainer);
    lucide.createIcons();
}

// Run premium features
initPremiumFeatures();

// Add smooth page transitions
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = this.getAttribute('href');
        smoothScrollTo(target);
    });
});

console.log('Premium features (5000₽) loaded successfully!');


// ============================================
// ULTRA PREMIUM 10000₽+ FEATURES
// ============================================

// Reading Progress Bar
const readingProgress = document.getElementById('readingProgress');
if (readingProgress) {
    window.addEventListener('scroll', () => {
        const scrollTop = window.scrollY;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        const progress = (scrollTop / docHeight) * 100;
        readingProgress.style.width = progress + '%';
    });
}

// Dark Mode Toggle
const themeToggle = document.getElementById('themeToggle');
const themeIcon = document.getElementById('themeIcon');

function setTheme(isDark) {
    document.body.classList.toggle('dark-mode', isDark);
    if (themeIcon) {
        themeIcon.setAttribute('data-lucide', isDark ? 'sun' : 'moon');
        lucide.createIcons();
    }
    localStorage.setItem('darkMode', isDark);
}

// Check saved theme
const savedTheme = localStorage.getItem('darkMode');
if (savedTheme === 'true') {
    setTheme(true);
}

if (themeToggle) {
    themeToggle.addEventListener('click', () => {
        const isDark = !document.body.classList.contains('dark-mode');
        setTheme(isDark);
    });
}

// Live Chat Widget
const chatToggle = document.getElementById('chatToggle');
const chatWindow = document.getElementById('chatWindow');
const chatClose = document.getElementById('chatClose');
const chatInput = document.getElementById('chatInput');
const chatSend = document.getElementById('chatSend');
const chatMessages = document.getElementById('chatMessages');
const chatBadge = document.querySelector('.chat-badge');

const botResponses = {
    'привет': 'Привет! Рад вас видеть! Чем могу помочь?',
    'помощь': 'Я могу рассказать о наших проектах, как сделать пожертвование или стать волонтером.',
    'пожертвование': 'Вы можете сделать пожертвование в разделе "Помочь". Каждый доллар = 0.5 посаженных деревьев!',
    'волонтер': 'Чтобы стать волонтером, заполните форму в разделе "Контакты" или напишите на info@earthkeepers.org',
    'проекты': 'У нас 3 основных направления: посадка лесов, очистка океанов и защита животных.',
    'default': 'Спасибо за ваш вопрос! Наш оператор свяжется с вами в ближайшее время. Или напишите на info@earthkeepers.org'
};

function addChatMessage(text, isUser = false) {
    const message = document.createElement('div');
    message.className = `chat-message ${isUser ? 'user' : 'bot'}`;
    message.textContent = text;
    chatMessages.appendChild(message);
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

function getBotResponse(text) {
    const lowerText = text.toLowerCase();
    for (const [key, response] of Object.entries(botResponses)) {
        if (lowerText.includes(key)) {
            return response;
        }
    }
    return botResponses.default;
}

function sendMessage() {
    const text = chatInput.value.trim();
    if (!text) return;
    
    addChatMessage(text, true);
    chatInput.value = '';
    
    // Simulate typing
    setTimeout(() => {
        addChatMessage(getBotResponse(text));
    }, 1000);
}

if (chatToggle) {
    chatToggle.addEventListener('click', () => {
        chatWindow.classList.toggle('active');
        if (chatBadge) chatBadge.style.display = 'none';
        lucide.createIcons();
    });
}

if (chatClose) {
    chatClose.addEventListener('click', () => {
        chatWindow.classList.remove('active');
    });
}

if (chatSend) {
    chatSend.addEventListener('click', sendMessage);
}

if (chatInput) {
    chatInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') sendMessage();
    });
}

// Cookie Banner
const cookieBanner = document.getElementById('cookieBanner');
const cookieAccept = document.getElementById('cookieAccept');
const cookieDecline = document.getElementById('cookieDecline');

if (!localStorage.getItem('cookiesAccepted')) {
    setTimeout(() => {
        if (cookieBanner) cookieBanner.classList.add('visible');
    }, 2000);
}

if (cookieAccept) {
    cookieAccept.addEventListener('click', () => {
        localStorage.setItem('cookiesAccepted', 'true');
        cookieBanner.classList.remove('visible');
        showToast('success', 'Настройки сохранены', 'Спасибо за согласие!');
    });
}

if (cookieDecline) {
    cookieDecline.addEventListener('click', () => {
        localStorage.setItem('cookiesAccepted', 'false');
        cookieBanner.classList.remove('visible');
    });
}

// Toast Notifications
function showToast(type, title, message) {
    const container = document.getElementById('toastContainer');
    if (!container) return;
    
    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    
    const iconName = type === 'success' ? 'check-circle' : type === 'error' ? 'x-circle' : 'info';
    
    toast.innerHTML = `
        <i data-lucide="${iconName}" class="toast-icon"></i>
        <div class="toast-content">
            <div class="toast-title">${title}</div>
            <div class="toast-message">${message}</div>
        </div>
        <button class="toast-close">
            <i data-lucide="x"></i>
        </button>
    `;
    
    container.appendChild(toast);
    lucide.createIcons();
    
    const closeBtn = toast.querySelector('.toast-close');
    closeBtn.addEventListener('click', () => {
        toast.classList.add('hiding');
        setTimeout(() => toast.remove(), 300);
    });
    
    setTimeout(() => {
        toast.classList.add('hiding');
        setTimeout(() => toast.remove(), 300);
    }, 5000);
}

// Impact Calculator
const calcSlider = document.getElementById('calcSlider');
const calcValue = document.getElementById('calcValue');
const calcTrees = document.getElementById('calcTrees');
const calcWater = document.getElementById('calcWater');
const calcCO2 = document.getElementById('calcCO2');
const calcAnimals = document.getElementById('calcAnimals');

function updateCalculator(value) {
    if (calcValue) calcValue.textContent = '$' + value;
    if (calcTrees) calcTrees.textContent = Math.round(value * 0.5);
    if (calcWater) calcWater.textContent = Math.round(value * 10);
    if (calcCO2) calcCO2.textContent = (value * 0.024).toFixed(1);
    if (calcAnimals) calcAnimals.textContent = Math.round(value * 0.06);
}

if (calcSlider) {
    calcSlider.addEventListener('input', (e) => {
        updateCalculator(e.target.value);
    });
    updateCalculator(calcSlider.value);
}

// Scroll Progress Circle
const scrollProgress = document.getElementById('scrollProgress');
const progressCircle = document.getElementById('progressCircle');
const scrollTopBtn = document.getElementById('scrollTopBtn');

window.addEventListener('scroll', () => {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const progress = scrollTop / docHeight;
    
    if (scrollProgress) {
        if (scrollTop > 300) {
            scrollProgress.classList.add('visible');
        } else {
            scrollProgress.classList.remove('visible');
        }
    }
    
    if (progressCircle) {
        const circumference = 2 * Math.PI * 20;
        const offset = circumference - (progress * circumference);
        progressCircle.style.strokeDashoffset = offset;
    }
});

if (scrollTopBtn) {
    scrollTopBtn.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
}

// Confetti Effect
function createConfetti() {
    const colors = ['#22c55e', '#4ade80', '#86efac', '#fbbf24', '#60a5fa'];
    
    for (let i = 0; i < 50; i++) {
        const confetti = document.createElement('div');
        confetti.className = 'confetti';
        confetti.style.left = Math.random() * 100 + 'vw';
        confetti.style.background = colors[Math.floor(Math.random() * colors.length)];
        confetti.style.animationDelay = Math.random() * 2 + 's';
        confetti.style.animationDuration = (Math.random() * 2 + 2) + 's';
        document.body.appendChild(confetti);
        
        setTimeout(() => confetti.remove(), 5000);
    }
}

// Show confetti on donation
const originalDonateHandler = donateBtn?.onclick;
if (donateBtn) {
    donateBtn.addEventListener('click', () => {
        createConfetti();
        showToast('success', 'Спасибо!', 'Ваше пожертвование принято!');
    });
}

// Particles Background
function createParticles() {
    const container = document.createElement('div');
    container.className = 'particles-container';
    document.body.prepend(container);
    
    for (let i = 0; i < 20; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.left = Math.random() * 100 + '%';
        particle.style.animationDelay = Math.random() * 15 + 's';
        particle.style.width = (Math.random() * 10 + 5) + 'px';
        particle.style.height = particle.style.width;
        container.appendChild(particle);
    }
}

// Initialize particles on hero section only
const heroSection = document.getElementById('hero');
if (heroSection) {
    createParticles();
}

// Magnetic Button Effect
document.querySelectorAll('.btn-primary, .donate-btn').forEach(btn => {
    btn.addEventListener('mousemove', (e) => {
        const rect = btn.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        btn.style.transform = `translate(${x * 0.1}px, ${y * 0.1}px)`;
    });
    
    btn.addEventListener('mouseleave', () => {
        btn.style.transform = '';
    });
});

// Intersection Observer for animations
const animateOnScroll = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate-in');
        }
    });
}, { threshold: 0.1 });

document.querySelectorAll('.stat-number, .crisis-stat-number, .wildlife-stat-number').forEach(el => {
    animateOnScroll.observe(el);
});

// Welcome notification
setTimeout(() => {
    showToast('info', 'Добро пожаловать!', 'Спасибо, что заботитесь о планете 🌍');
}, 3000);

console.log('Ultra Premium features (10000₽+) loaded successfully!');


// ============================================
// EPIC BANNER ANIMATIONS
// ============================================

// Mouse Trail Effect
function createMouseTrail() {
    const trail = [];
    const trailLength = 10;
    
    for (let i = 0; i < trailLength; i++) {
        const dot = document.createElement('div');
        dot.className = 'mouse-trail';
        dot.style.opacity = (1 - i / trailLength) * 0.5;
        dot.style.transform = `scale(${1 - i / trailLength})`;
        document.body.appendChild(dot);
        trail.push(dot);
    }
    
    let mouseX = 0, mouseY = 0;
    
    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });
    
    function animateTrail() {
        let x = mouseX, y = mouseY;
        
        trail.forEach((dot, index) => {
            const nextDot = trail[index + 1] || trail[0];
            
            dot.style.left = x + 'px';
            dot.style.top = y + 'px';
            
            x += (parseFloat(nextDot.style.left) - x) * 0.3 || 0;
            y += (parseFloat(nextDot.style.top) - y) * 0.3 || 0;
        });
        
        requestAnimationFrame(animateTrail);
    }
    
    animateTrail();
}

// Only enable on desktop
if (window.innerWidth > 768) {
    createMouseTrail();
}

// 3D Tilt Effect for Cards
function initTiltEffect() {
    const cards = document.querySelectorAll('.problem-card, .project-card, .crisis-stat-card, .wildlife-stat');
    
    cards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = (y - centerY) / 10;
            const rotateY = (centerX - x) / 10;
            
            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.02)`;
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = '';
        });
    });
}

initTiltEffect();

// Parallax Scroll Effect for Sections
function initParallaxSections() {
    const sections = document.querySelectorAll('.crisis-section, .wildlife-section, .video-section');
    
    window.addEventListener('scroll', () => {
        sections.forEach(section => {
            const rect = section.getBoundingClientRect();
            const scrolled = window.innerHeight - rect.top;
            
            if (scrolled > 0 && rect.top < window.innerHeight) {
                const bg = section.querySelector('.crisis-bg img, .wildlife-bg img, .video-bg img');
                if (bg) {
                    bg.style.transform = `translateY(${scrolled * 0.3}px) scale(1.1)`;
                }
            }
        });
    });
}

initParallaxSections();

// Text Scramble Effect
class TextScramble {
    constructor(el) {
        this.el = el;
        this.chars = '!<>-_\\/[]{}—=+*^?#________';
        this.update = this.update.bind(this);
    }
    
    setText(newText) {
        const oldText = this.el.innerText;
        const length = Math.max(oldText.length, newText.length);
        const promise = new Promise((resolve) => this.resolve = resolve);
        this.queue = [];
        
        for (let i = 0; i < length; i++) {
            const from = oldText[i] || '';
            const to = newText[i] || '';
            const start = Math.floor(Math.random() * 40);
            const end = start + Math.floor(Math.random() * 40);
            this.queue.push({ from, to, start, end });
        }
        
        cancelAnimationFrame(this.frameRequest);
        this.frame = 0;
        this.update();
        return promise;
    }
    
    update() {
        let output = '';
        let complete = 0;
        
        for (let i = 0, n = this.queue.length; i < n; i++) {
            let { from, to, start, end, char } = this.queue[i];
            
            if (this.frame >= end) {
                complete++;
                output += to;
            } else if (this.frame >= start) {
                if (!char || Math.random() < 0.28) {
                    char = this.randomChar();
                    this.queue[i].char = char;
                }
                output += `<span class="scramble-char">${char}</span>`;
            } else {
                output += from;
            }
        }
        
        this.el.innerHTML = output;
        
        if (complete === this.queue.length) {
            this.resolve();
        } else {
            this.frameRequest = requestAnimationFrame(this.update);
            this.frame++;
        }
    }
    
    randomChar() {
        return this.chars[Math.floor(Math.random() * this.chars.length)];
    }
}

// Apply scramble effect to section titles on scroll
const sectionTitles = document.querySelectorAll('.section-title');
const scrambleObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const fx = new TextScramble(entry.target);
            fx.setText(entry.target.textContent);
            scrambleObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

sectionTitles.forEach(title => scrambleObserver.observe(title));

// Animated Counter with Easing
function animateCounterWithEasing(element, target, duration = 2000) {
    const start = 0;
    const startTime = performance.now();
    
    function easeOutExpo(t) {
        return t === 1 ? 1 : 1 - Math.pow(2, -10 * t);
    }
    
    function update(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const easedProgress = easeOutExpo(progress);
        const current = Math.floor(start + (target - start) * easedProgress);
        
        element.textContent = current.toLocaleString();
        
        if (progress < 1) {
            requestAnimationFrame(update);
        }
    }
    
    requestAnimationFrame(update);
}

// Trigger counter animation on scroll
const counterElements = document.querySelectorAll('.stat-number[data-count], .crisis-stat-number, .wildlife-stat-number');
const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const target = parseInt(entry.target.textContent.replace(/[^0-9]/g, '')) || 
                          parseInt(entry.target.getAttribute('data-count')) || 100;
            animateCounterWithEasing(entry.target, target);
            counterObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

counterElements.forEach(el => counterObserver.observe(el));

// Stagger Animation for Grid Items
function initStaggerAnimation() {
    const grids = document.querySelectorAll('.problems-grid, .projects-grid, .gallery-grid, .calculator-results');
    
    grids.forEach(grid => {
        const items = grid.children;
        Array.from(items).forEach((item, index) => {
            item.style.setProperty('--index', index);
        });
    });
}

initStaggerAnimation();

// Timeline Marker Animation
const timelineMarkers = document.querySelectorAll('.timeline-marker');
timelineMarkers.forEach((marker, index) => {
    marker.style.setProperty('--index', index);
});

// Smooth Reveal on Scroll
function initSmoothReveal() {
    const elements = document.querySelectorAll('.crisis-stat-card, .wildlife-stat, .calc-result-item, .gallery-item');
    
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }, index * 100);
            }
        });
    }, { threshold: 0.1 });
    
    elements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)';
        revealObserver.observe(el);
    });
}

initSmoothReveal();

// Typing Effect for Hero Subtitle
function typeWriter(element, text, speed = 50) {
    let i = 0;
    element.textContent = '';
    
    function type() {
        if (i < text.length) {
            element.textContent += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    
    type();
}

// Apply typing effect to hero subtitle
const heroSubtitle = document.querySelector('.hero-subtitle');
if (heroSubtitle) {
    const originalText = heroSubtitle.textContent;
    setTimeout(() => {
        typeWriter(heroSubtitle, originalText, 30);
    }, 1000);
}

// Floating Elements Animation
function initFloatingElements() {
    const floatingElements = document.querySelectorAll('.crisis-info-card, .wildlife-info, .newsletter-card');
    
    floatingElements.forEach((el, index) => {
        el.style.animation = `floatCard ${4 + index}s ease-in-out infinite`;
        el.style.animationDelay = `${index * 0.5}s`;
    });
}

initFloatingElements();

// Button Ripple Effect
function createRipple(event) {
    const button = event.currentTarget;
    const circle = document.createElement('span');
    const diameter = Math.max(button.clientWidth, button.clientHeight);
    const radius = diameter / 2;
    
    circle.style.width = circle.style.height = `${diameter}px`;
    circle.style.left = `${event.clientX - button.offsetLeft - radius}px`;
    circle.style.top = `${event.clientY - button.offsetTop - radius}px`;
    circle.classList.add('ripple-effect');
    
    const ripple = button.getElementsByClassName('ripple-effect')[0];
    if (ripple) {
        ripple.remove();
    }
    
    button.appendChild(circle);
    
    setTimeout(() => circle.remove(), 600);
}

// Add ripple to all buttons
document.querySelectorAll('.btn, .donate-btn, .amount-btn, .submit-btn').forEach(button => {
    button.addEventListener('click', createRipple);
});

// Add ripple effect styles
const rippleStyle = document.createElement('style');
rippleStyle.textContent = `
    .ripple-effect {
        position: absolute;
        border-radius: 50%;
        transform: scale(0);
        animation: rippleAnimation 0.6s linear;
        background: rgba(255, 255, 255, 0.4);
        pointer-events: none;
    }
    
    @keyframes rippleAnimation {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
`;
document.head.appendChild(rippleStyle);

// Create Hero Particles
function createHeroParticles() {
    const container = document.getElementById('heroParticles');
    if (!container) return;
    
    const particleCount = 30;
    
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'hero-particle';
        particle.style.left = Math.random() * 100 + '%';
        particle.style.animationDelay = Math.random() * 15 + 's';
        particle.style.animationDuration = (Math.random() * 10 + 10) + 's';
        particle.style.width = (Math.random() * 4 + 3) + 'px';
        particle.style.height = particle.style.width;
        particle.style.opacity = Math.random() * 0.5 + 0.3;
        container.appendChild(particle);
    }
}

createHeroParticles();

// Intersection Observer for Animation Triggers
const animationTriggers = document.querySelectorAll('[data-aos]');
const triggerObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('aos-animate');
        }
    });
}, { threshold: 0.1 });

animationTriggers.forEach(el => triggerObserver.observe(el));

console.log('Epic Banner Animations loaded! 🎨');
