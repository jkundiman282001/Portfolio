// ── EmailJS Init ──
(function () {
  if (typeof emailjs !== 'undefined') {
    emailjs.init("I4Gf5AHZD3VDl1rgR");
  }
})();

// ── Custom Cursor ──
const cursor = document.getElementById('cursor');
const cursorRing = document.getElementById('cursor-ring');
let mouseX = 0, mouseY = 0, ringX = 0, ringY = 0;

document.addEventListener('mousemove', e => {
  mouseX = e.clientX;
  mouseY = e.clientY;
  cursor.style.left = mouseX - 6 + 'px';
  cursor.style.top = mouseY - 6 + 'px';
});

function animRing() {
  ringX += (mouseX - ringX - 20) * 0.12;
  ringY += (mouseY - ringY - 20) * 0.12;
  cursorRing.style.left = ringX + 'px';
  cursorRing.style.top = ringY + 'px';
  requestAnimationFrame(animRing);
}
animRing();

// ── Nav scroll ──
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 50);
  document.getElementById('backToTop').classList.toggle('show', window.scrollY > 300);
});

// ── Smooth nav links ──
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const target = document.querySelector(a.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth' });
    }
  });
});

// ── Mobile Menu ──
function toggleMobileMenu() {
  const menu = document.getElementById('mobileMenu');
  const btn = document.getElementById('hamburgerBtn');
  menu.classList.toggle('open');
  btn.classList.toggle('open');
}
function closeMobileMenu() {
  document.getElementById('mobileMenu').classList.remove('open');
  document.getElementById('hamburgerBtn').classList.remove('open');
}

// ── Typed Text ──
const texts = ["IT Student & Developer", "Full-Stack Developer", "Problem Solver", "Tech Enthusiast"];
let textIndex = 0, charIndex = 0, isDeleting = false;
function typeText() {
  const el = document.getElementById('typed-text');
  if (!el) return;
  const current = texts[textIndex];
  el.textContent = isDeleting ? current.substring(0, charIndex - 1) : current.substring(0, charIndex + 1);
  isDeleting ? charIndex-- : charIndex++;
  if (!isDeleting && charIndex === current.length) setTimeout(() => isDeleting = true, 2000);
  else if (isDeleting && charIndex === 0) { isDeleting = false; textIndex = (textIndex + 1) % texts.length; }
  setTimeout(typeText, isDeleting ? 50 : 100);
}
setTimeout(typeText, 1000);

// ── Scroll Reveal ──
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      // Trigger skill bars
      entry.target.querySelectorAll('.skill-bar-fill').forEach(bar => {
        bar.style.width = bar.dataset.width + '%';
      });
      // Trigger count-ups
      entry.target.querySelectorAll('.count-up').forEach(el => {
        const target = parseInt(el.dataset.target);
        let current = 0;
        const step = target / 40;
        const timer = setInterval(() => {
          current += step;
          if (current >= target) { el.textContent = target + (target === 4 ? '+' : ''); clearInterval(timer); }
          else el.textContent = Math.floor(current);
        }, 30);
      });
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.1, rootMargin: '0px 0px -60px 0px' });

document.querySelectorAll('.reveal, .reveal-left').forEach(el => revealObserver.observe(el));

// Also observe skill bars and count-up containers
document.querySelectorAll('.count-up').forEach(el => {
  const parent = el.closest('.hero-stat');
  if (parent) {
    // hero stats - trigger on load after short delay
    setTimeout(() => {
      const target = parseInt(el.dataset.target);
      let current = 0;
      const step = Math.max(1, target / 40);
      const timer = setInterval(() => {
        current += step;
        if (current >= target) { el.textContent = target + (target === 4 ? '+' : ''); clearInterval(timer); }
        else el.textContent = Math.floor(current);
      }, 40);
    }, 1200);
  }
});

// ── Modals ──
function openModal(id) { const el = document.getElementById(id); if(el){ el.classList.add('open'); document.body.style.overflow='hidden'; } }
function closeModal(id) { const el = document.getElementById(id); if(el){ el.classList.remove('open'); document.body.style.overflow=''; } }
document.querySelectorAll('.modal').forEach(modal => {
  modal.addEventListener('click', e => { if (e.target === modal) closeModal(modal.id); });
});

// ── Certificate Viewer ──
function viewCertificate(src) {
  const viewer = document.getElementById('certificateView');
  if (!viewer) return;
  document.getElementById('certificateImg').src = src;
  viewer.classList.add('open');
}
const _certView = document.getElementById('certificateView');
if (_certView) {
  _certView.addEventListener('click', e => {
    if (e.target === _certView) _certView.classList.remove('open');
  });
}

// ── Video Modals ──
function openVideoModal(id) { document.getElementById(id).classList.add('open'); document.body.style.overflow='hidden'; }
function closeVideoModal(id) {
  document.getElementById(id).classList.remove('open');
  document.body.style.overflow='';
  document.querySelectorAll('video').forEach(v => { v.pause(); v.currentTime = 0; });
}
document.querySelectorAll('.video-modal').forEach(modal => {
  modal.addEventListener('click', e => { if (e.target === modal) closeVideoModal(modal.id); });
});
// ── Resume Download ──
function downloadResume() {
  const link = document.createElement('a');
  link.href = 'assets/docs/ATS Resume Kundiman.pdf';
  link.download = 'Japhet_Kundiman_Resume.pdf';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

// ── Contact Form ──
function handleContactForm(event) {
  event.preventDefault();
  const btn = event.target.querySelector('button[type="submit"]');
  const orig = btn.textContent;
  btn.textContent = 'Sending...';
  btn.disabled = true;
  emailjs.send('service_qoejl9a', 'template_efch3rd', {
    from_name: document.getElementById('contactName').value,
    from_email: document.getElementById('contactEmail').value,
    message: document.getElementById('contactMessage').value,
    to_email: 'japhetkundiman11@gmail.com'
  }).then(() => {
    const success = document.getElementById('contactSuccess');
    success.classList.add('show');
    document.getElementById('contactForm').reset();
    btn.textContent = orig;
    btn.disabled = false;
    setTimeout(() => success.classList.remove('show'), 5000);
  }, () => {
    alert('Error sending. Try japhetkundiman11@gmail.com directly.');
    btn.textContent = orig;
    btn.disabled = false;
  });
}

// ── Certifications Slideshow ──
(function() {
  const viewport = document.getElementById('certViewport');
  if (!viewport) return; // not on this page
  const slides = Array.from(document.querySelectorAll('.cert-slide'));
  const counter = document.getElementById('certCounter');
  const dotsContainer = document.getElementById('certDots');
  const progressFill = document.getElementById('certProgressFill');
  const autoplayBtn = document.getElementById('certAutoplayBtn');

  const TOTAL = slides.length;
  const AUTOPLAY_INTERVAL = 4500;
  let current = 0;
  let autoplayTimer = null;
  let progressTimer = null;
  let isPlaying = true;

  // Build dots
  slides.forEach((_, i) => {
    const dot = document.createElement('div');
    dot.className = 'cert-dot' + (i === 0 ? ' active' : '');
    dot.style.width = i === 0 ? '32px' : '16px';
    dot.addEventListener('click', () => goTo(i));
    dotsContainer.appendChild(dot);
  });

  function updateDots() {
    document.querySelectorAll('.cert-dot').forEach((d, i) => {
      d.classList.toggle('active', i === current);
      d.style.width = i === current ? '32px' : '16px';
    });
  }

  function goTo(index) {
    slides[current].classList.remove('active');
    current = (index + TOTAL) % TOTAL;
    slides[current].classList.add('active');
    viewport.style.transform = `translateX(-${current * 100}%)`;
    counter.textContent = String(current + 1).padStart(2, '0') + ' / ' + String(TOTAL).padStart(2, '0');
    updateDots();
    if (isPlaying) startProgress();
  }

  function startProgress() {
    clearInterval(progressTimer);
    progressFill.style.transition = 'none';
    progressFill.style.width = '0%';
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        progressFill.style.transition = `width ${AUTOPLAY_INTERVAL}ms linear`;
        progressFill.style.width = '100%';
      });
    });
  }

  function startAutoplay() {
    clearInterval(autoplayTimer);
    startProgress();
    autoplayTimer = setInterval(() => goTo(current + 1), AUTOPLAY_INTERVAL);
  }

  function stopAutoplay() {
    clearInterval(autoplayTimer);
    clearInterval(progressTimer);
    progressFill.style.transition = 'none';
    progressFill.style.width = '0%';
  }

  window.toggleCertAutoplay = function() {
    isPlaying = !isPlaying;
    if (isPlaying) {
      startAutoplay();
      autoplayBtn.textContent = '⏸ Pause';
      autoplayBtn.classList.add('playing');
    } else {
      stopAutoplay();
      autoplayBtn.textContent = '▶ Play';
      autoplayBtn.classList.remove('playing');
    }
  };

  window.moveCertSlide = function(dir) {
    if (isPlaying) startAutoplay(); // reset timer
    goTo(current + dir);
  };

  // Pause on hover
  const stage = document.getElementById('certStage');
  stage.addEventListener('mouseenter', () => { if (isPlaying) stopAutoplay(); });
  stage.addEventListener('mouseleave', () => { if (isPlaying) startAutoplay(); });

  // Touch/swipe support
  let touchStartX = 0;
  stage.addEventListener('touchstart', e => { touchStartX = e.touches[0].clientX; }, { passive: true });
  stage.addEventListener('touchend', e => {
    const diff = touchStartX - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 50) moveCertSlide(diff > 0 ? 1 : -1);
  }, { passive: true });

  // Init
  goTo(0);
  startAutoplay();
})();


document.addEventListener('keydown', e => {
  if (e.key === 'Escape') {
    document.querySelectorAll('.modal.open, .video-modal.open').forEach(m => {
      m.classList.remove('open');
      document.body.style.overflow = '';
    });
    const cv = document.getElementById('certificateView');
    if (cv) cv.classList.remove('open');
    closeMobileMenu();
  }
});
