/* ============================================
   MUSEO DIGITAL - JavaScript Global
   Animaciones scroll, QR dinámico, navegación
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {
  initScrollAnimations();
  initNavigationBar();
  initMobileMenu();
  initReadingProgress();
  initSmoothScroll();
  generateQRCode();
  initFabNav();
});

/* --- Scroll Animations (Intersection Observer) --- */
function initScrollAnimations() {
  const animatedElements = document.querySelectorAll(
    '.animate-fadeUp, .animate-fadeLeft, .animate-fadeRight, .animate-scaleIn, .animate-fadeIn'
  );

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
      if (entry.isIntersecting) {
        // Stagger delay for sibling elements
        const delay = Array.from(entry.target.parentElement.children)
          .filter(el => el.classList.contains('animate-fadeUp') || 
                        el.classList.contains('animate-fadeLeft') ||
                        el.classList.contains('animate-fadeRight') ||
                        el.classList.contains('animate-scaleIn') ||
                        el.classList.contains('animate-fadeIn'))
          .indexOf(entry.target) * 100;

        setTimeout(() => {
          entry.target.classList.add('visible');
        }, Math.min(delay, 500));

        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  });

  animatedElements.forEach(el => observer.observe(el));
}

/* --- Navigation Bar (sticky effect) --- */
function initNavigationBar() {
  const navbar = document.querySelector('.navbar');
  if (!navbar) return;

  let lastScroll = 0;
  
  window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 100) {
      navbar.style.background = 'rgba(15, 15, 26, 0.98)';
      navbar.style.boxShadow = '0 2px 20px rgba(0,0,0,0.3)';
    } else {
      navbar.style.background = 'rgba(15, 15, 26, 0.95)';
      navbar.style.boxShadow = 'none';
    }
    
    lastScroll = currentScroll;
  }, { passive: true });
}

/* --- Mobile Menu --- */
function initMobileMenu() {
  const toggle = document.querySelector('.nav-toggle');
  const menu = document.querySelector('.nav-menu');
  const overlay = document.querySelector('.nav-overlay');
  
  if (!toggle) return;

  function toggleMenu() {
    toggle.classList.toggle('active');
    menu.classList.toggle('active');
    overlay.classList.toggle('active');
    document.body.style.overflow = menu.classList.contains('active') ? 'hidden' : '';
  }

  toggle.addEventListener('click', toggleMenu);
  
  if (overlay) {
    overlay.addEventListener('click', toggleMenu);
  }

  // Close menu on link click
  const menuLinks = menu ? menu.querySelectorAll('a') : [];
  menuLinks.forEach(link => {
    link.addEventListener('click', () => {
      if (window.innerWidth < 768) {
        toggleMenu();
      }
    });
  });
}

/* --- Reading Progress Bar --- */
function initReadingProgress() {
  const progressBar = document.querySelector('.reading-progress');
  if (!progressBar) return;

  window.addEventListener('scroll', () => {
    const scrollTop = window.pageYOffset;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const scrollPercent = (scrollTop / docHeight) * 100;
    progressBar.style.width = scrollPercent + '%';
  }, { passive: true });
}

/* --- Smooth Scroll for anchor links --- */
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });
}

/* --- FAB Navigation --- */
function initFabNav() {
  const fab = document.querySelector('.fab-nav');
  if (!fab) return;

  window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) {
      fab.classList.add('visible');
    } else {
      fab.classList.remove('visible');
    }
  }, { passive: true });
}

/* --- QR Code Generation --- */
function generateQRCode() {
  const qrContainer = document.getElementById('qr-container');
  if (!qrContainer) return;

  const qrData = document.getElementById('qr-url');
  if (!qrData) return;

  const url = qrData.value;
  const qrSize = 200;

  // Using Google Charts API for QR generation (free, no dependencies)
  const qrSrc = `https://api.qrserver.com/v1/create-qr-code/?size=${qrSize}x${qrSize}&data=${encodeURIComponent(url)}&bgcolor=ffffff&color=1a1a2e&margin=10`;
  
  const qrImg = document.createElement('img');
  qrImg.src = qrSrc;
  qrImg.alt = 'Código QR del museo';
  qrImg.style.width = qrSize + 'px';
  qrImg.style.height = qrSize + 'px';
  qrImg.id = 'qr-image';
  
  qrContainer.innerHTML = '';
  qrContainer.appendChild(qrImg);

  // Setup download button
  const downloadBtn = document.getElementById('qr-download');
  if (downloadBtn) {
    downloadBtn.addEventListener('click', () => {
      downloadQR(qrSrc);
    });
  }
}

async function downloadQR(qrSrc) {
  try {
    const response = await fetch(qrSrc);
    const blob = await response.blob();
    const url = URL.createObjectURL(blob);
    
    const a = document.createElement('a');
    a.href = url;
    a.download = 'codigo-qr-museo.png';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  } catch (error) {
    // Fallback: open in new tab
    window.open(qrSrc, '_blank');
  }
}

/* --- Parallax effect on scroll --- */
if (window.matchMedia('(min-width: 768px)').matches) {
  window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const parallaxElements = document.querySelectorAll('[data-parallax]');
    parallaxElements.forEach(el => {
      const speed = el.getAttribute('data-parallax') || 0.3;
      el.style.transform = `translateY(${scrolled * speed}px)`;
    });
  }, { passive: true });
}

/* --- Counter animation for stats --- */
function animateCounters() {
  const counters = document.querySelectorAll('[data-count]');
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const target = parseInt(el.getAttribute('data-count'));
        let current = 0;
        const increment = target / 50;
        const duration = 1500;
        const stepTime = duration / 50;
        
        const timer = setInterval(() => {
          current += increment;
          if (current >= target) {
            el.textContent = target;
            clearInterval(timer);
          } else {
            el.textContent = Math.floor(current);
          }
        }, stepTime);
        
        observer.unobserve(el);
      }
    });
  }, { threshold: 0.5 });

  counters.forEach(counter => observer.observe(counter));
}

// Run counter animation on init
document.addEventListener('DOMContentLoaded', animateCounters);
