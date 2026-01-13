// Navbar scroll effect
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Mobile menu toggle
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('nav-links');

hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    hamburger.classList.toggle('active');
});

// Close mobile menu when clicking a link
navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('active');
        hamburger.classList.remove('active');
    });
});

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const offsetTop = target.offsetTop - 80;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// Form submission
const contactForm = document.getElementById('contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', function (e) {
        e.preventDefault();

        const formData = new FormData(this);
        const data = Object.fromEntries(formData);

        // Show success message
        const btn = this.querySelector('button[type="submit"]');
        const originalText = btn.innerHTML;
        btn.innerHTML = '<span>✓ Mesajınız Alındı!</span>';
        btn.style.background = '#22C55E';

        // Reset form
        setTimeout(() => {
            this.reset();
            btn.innerHTML = originalText;
            btn.style.background = '';
        }, 3000);

        console.log('Form submitted:', data);
    });
}

// Scroll animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate-in');
        }
    });
}, observerOptions);

// Observe elements for animation
document.querySelectorAll('.service-card, .product-card, .info-card, .testimonial-card, .feature-item').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});

// Add CSS class for animated elements
const style = document.createElement('style');
style.textContent = `
    .animate-in {
        opacity: 1 !important;
        transform: translateY(0) !important;
    }
`;
document.head.appendChild(style);

// Stagger animation for grid items
document.querySelectorAll('.services-grid, .products-grid, .testimonials-grid, .why-us-cards').forEach(grid => {
    const children = grid.children;
    Array.from(children).forEach((child, index) => {
        child.style.transitionDelay = `${index * 0.1}s`;
    });
});

// Active nav link highlighting
const sections = document.querySelectorAll('section[id]');
window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 100;
        if (window.scrollY >= sectionTop) {
            current = section.getAttribute('id');
        }
    });

    navLinks.querySelectorAll('a').forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});

// Randevu Modal
const randevuBtn = document.getElementById('randevu-btn');
const randevuModal = document.getElementById('randevu-modal');
const modalClose = document.getElementById('modal-close');
const randevuForm = document.getElementById('randevu-form');

// Set minimum date to today
const today = new Date().toISOString().split('T')[0];
const randevuTarih = document.getElementById('randevu-tarih');
if (randevuTarih) {
    randevuTarih.setAttribute('min', today);
}

// Open modal
if (randevuBtn) {
    randevuBtn.addEventListener('click', (e) => {
        e.preventDefault();
        randevuModal.classList.add('active');
        document.body.style.overflow = 'hidden';
    });
}

// Close modal
if (modalClose) {
    modalClose.addEventListener('click', () => {
        randevuModal.classList.remove('active');
        document.body.style.overflow = '';
    });
}

// Close on overlay click
if (randevuModal) {
    randevuModal.addEventListener('click', (e) => {
        if (e.target === randevuModal) {
            randevuModal.classList.remove('active');
            document.body.style.overflow = '';
        }
    });
}

// Randevu form submission
if (randevuForm) {
    randevuForm.addEventListener('submit', function (e) {
        e.preventDefault();

        const formData = new FormData(this);
        const ad = formData.get('ad');
        const telefon = formData.get('telefon');
        const tarih = formData.get('tarih');
        const saat = formData.get('saat');
        const hizmet = formData.get('hizmet');
        const adres = formData.get('adres');
        const not = formData.get('not');

        // Format date
        const dateObj = new Date(tarih);
        const formattedDate = dateObj.toLocaleDateString('tr-TR');

        // Create WhatsApp message
        let message = `📅 *YENİ RANDEVU TALEBİ*%0A%0A`;
        message += `👤 *Ad Soyad:* ${ad}%0A`;
        message += `📱 *Telefon:* ${telefon}%0A`;
        message += `📆 *Tarih:* ${formattedDate}%0A`;
        message += `⏰ *Saat:* ${saat}%0A`;
        message += `🔧 *Hizmet:* ${hizmet}%0A`;
        if (adres) message += `📍 *Adres:* ${adres}%0A`;
        if (not) message += `📝 *Not:* ${not}%0A`;

        // Send to WhatsApp
        const whatsappUrl = `https://wa.me/905316628829?text=${message}`;
        window.open(whatsappUrl, '_blank');

        // Show success
        const btn = this.querySelector('button[type="submit"]');
        btn.innerHTML = '<span>✓ Randevu Talebiniz Gönderildi!</span>';
        btn.style.background = '#22C55E';

        setTimeout(() => {
            this.reset();
            randevuModal.classList.remove('active');
            document.body.style.overflow = '';
            btn.innerHTML = '<span>📅 Randevu Oluştur</span>';
            btn.style.background = '';
        }, 2000);
    });
}
