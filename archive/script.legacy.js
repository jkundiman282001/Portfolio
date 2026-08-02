(function () {
  emailjs.init("I4Gf5AHZD3VDl1rgR");
})();

const texts = ["IT Student & Developer", "Full-Stack Developer", "Problem Solver", "Tech Enthusiast"];
let textIndex = 0;
let charIndex = 0;
let isDeleting = false;

function typeText() {
  const typedElement = document.getElementById('typed-text');
  if (!typedElement) return;

  const currentText = texts[textIndex];

  if (isDeleting) {
    typedElement.textContent = currentText.substring(0, charIndex - 1);
    charIndex--;
  } else {
    typedElement.textContent = currentText.substring(0, charIndex + 1);
    charIndex++;
  }

  if (!isDeleting && charIndex === currentText.length) {
    setTimeout(() => isDeleting = true, 2000);
  } else if (isDeleting && charIndex === 0) {
    isDeleting = false;
    textIndex = (textIndex + 1) % texts.length;
  }

  setTimeout(typeText, isDeleting ? 50 : 100);
}

setTimeout(typeText, 1000);

document.querySelectorAll('nav a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const targetId = this.getAttribute('href').substring(1);
    const targetSection = document.getElementById(targetId);

    if (targetSection) {
      const offsetTop = targetSection.offsetTop - 80;
      window.scrollTo({
        top: offsetTop,
        behavior: 'smooth'
      });
    }

    const mobileMenu = document.getElementById('mobileMenu');
    const mobileBtn = document.getElementById('mobileMenuBtn');
    if (mobileMenu && !mobileMenu.classList.contains('hidden')) {
      mobileMenu.classList.add('hidden');
      mobileBtn.classList.remove('active');
    }
  });
});

let lastScroll = 0;
const navbar = document.querySelector('nav');
window.addEventListener('scroll', () => {
  const currentScroll = window.pageYOffset;

  if (currentScroll > 50) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }

  lastScroll = currentScroll;
});

const observerOptions = {
  threshold: 0.05,
  rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, observerOptions);

function isInViewport(element, margin = 100) {
  const rect = element.getBoundingClientRect();
  return (
    rect.top <= (window.innerHeight + margin) &&
    rect.bottom >= -margin &&
    rect.left <= (window.innerWidth + margin) &&
    rect.right >= -margin
  );
}

function makeVisible(element) {
  if (!element.classList.contains('visible')) {
    element.classList.add('visible');
  }
}

function initScrollAnimations() {
  const animatedElements = document.querySelectorAll('.fade-in, .slide-in-left, .slide-in-right, .scale-in');

  animatedElements.forEach(el => {
    if (isInViewport(el, 200)) {
      makeVisible(el);
    } else {
      observer.observe(el);
    }
  });

  setTimeout(() => {
    animatedElements.forEach(el => {
      if (isInViewport(el, 200) && !el.classList.contains('visible')) {
        makeVisible(el);
      }
    });
  }, 500);
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initScrollAnimations);
} else {
  setTimeout(initScrollAnimations, 100);
}

let scrollTimeout;
window.addEventListener('scroll', () => {
  clearTimeout(scrollTimeout);
  scrollTimeout = setTimeout(() => {
    document.querySelectorAll('.fade-in:not(.visible), .slide-in-left:not(.visible), .slide-in-right:not(.visible), .scale-in:not(.visible)').forEach(el => {
      if (isInViewport(el, 200)) {
        makeVisible(el);
        observer.unobserve(el);
      }
    });
  }, 50);
}, { passive: true });

document.addEventListener('mousemove', (e) => {
  const layers = document.querySelectorAll('.parallax');
  const x = (e.clientX / window.innerWidth - 0.5) * 30;
  const y = (e.clientY / window.innerHeight - 0.5) * 30;

  layers.forEach((layer, index) => {
    const speed = (index + 1) * 5;
    layer.style.transform = `translate(${x / speed}px, ${y / speed}px)`;
  });
});

const backToTopBtn = document.createElement('div');
backToTopBtn.className = 'back-to-top';
backToTopBtn.innerHTML = '<svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 10l7-7m0 0l7 7m-7-7v18"/></svg>';
backToTopBtn.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});
document.body.appendChild(backToTopBtn);

window.addEventListener('scroll', () => {
  if (window.pageYOffset > 300) {
    backToTopBtn.classList.add('visible');
  } else {
    backToTopBtn.classList.remove('visible');
  }
});

document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('section > div').forEach((section, index) => {
    if (index > 0) {
      section.classList.add('fade-in');
    }
  });

  document.querySelectorAll('#projects .bg-gray-800').forEach((card, index) => {
    card.classList.add('project-card', 'fade-in', `stagger-${(index % 6) + 1}`);
  });

  document.querySelectorAll('#skills .group').forEach((card, index) => {
    card.classList.add('skill-card', 'scale-in', `stagger-${(index % 6) + 1}`);
  });
});

function openModal(id) {
  document.getElementById(id).classList.remove("hidden");
}

function closeModal(id) {
  document.getElementById(id).classList.add("hidden");
}

function viewCertificate(imgSrc) {
  document.getElementById("certificateImg").src = imgSrc;
  document.getElementById("certificateView").classList.remove("hidden");
  document.getElementById("certificateView").classList.add("flex");
}

function openVideoModal(videoId) {
  document.getElementById(videoId).classList.remove("hidden");
  document.getElementById(videoId).classList.add("flex");
}

function closeVideoModal(videoId) {
  document.getElementById(videoId).classList.add("hidden");
  document.getElementById(videoId).classList.remove("flex");
  const videos = document.querySelectorAll('video');
  videos.forEach(video => {
    video.pause();
    video.currentTime = 0;
  });
}

function toggleMobileMenu() {
  const menu = document.getElementById('mobileMenu');
  const btn = document.getElementById('mobileMenuBtn');
  menu.classList.toggle('hidden');
  menu.classList.toggle('show');
  btn.classList.toggle('active');
}

document.addEventListener('click', function(event) {
  const menu = document.getElementById('mobileMenu');
  const btn = document.getElementById('mobileMenuBtn');
  const nav = document.querySelector('nav');

  if (!nav.contains(event.target) && !menu.classList.contains('hidden')) {
    menu.classList.add('hidden');
    btn.classList.remove('active');
  }
});

function downloadResume() {
  const link = document.createElement('a');
  link.href = 'assets/docs/ATS Resume Kundiman.pdf';
  link.download = 'Japhet_Kundiman_Resume.pdf';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

function handleContactForm(event) {
  event.preventDefault();

  const name = document.getElementById('contactName').value;
  const email = document.getElementById('contactEmail').value;
  const message = document.getElementById('contactMessage').value;

  const submitButton = event.target.querySelector('button[type="submit"]');
  const originalButtonText = submitButton.textContent;
  submitButton.textContent = 'Sending...';
  submitButton.disabled = true;

  emailjs.send('service_qoejl9a', 'template_efch3rd', {
    from_name: name,
    from_email: email,
    message: message,
    to_email: 'japhetkundiman11@gmail.com'
  })
  .then(function() {
    const successMessage = document.getElementById('contactSuccess');
    successMessage.classList.remove('hidden');

    document.getElementById('contactForm').reset();

    submitButton.textContent = originalButtonText;
    submitButton.disabled = false;

    setTimeout(() => {
      successMessage.classList.add('hidden');
    }, 5000);

    successMessage.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  }, function() {
    alert('Sorry, there was an error sending your message. Please try again later or contact me directly at japhetkundiman11@gmail.com');

    submitButton.textContent = originalButtonText;
    submitButton.disabled = false;
  });
}
