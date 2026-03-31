/* ============================================
   TYPING ANIMATION
   ============================================ */
const typingWords = {
  en: ['freelance', 'UX/UI', 'graphic', 'brand identity', 'website', 'digital', 'product'],
  de: ['freelance', 'UX/UI', 'grafik', 'marken idäntität', 'website', 'digital', 'produkt']
};

function initTypingAnimation() {
  const typingWordElement = document.querySelector('.typing-word');
  if (!typingWordElement) return;

  // Detect language from current page
  const isGerman = window.location.pathname.includes('/de');
  const words = isGerman ? typingWords.de : typingWords.en;

  let wordIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  const typingSpeed = 100;
  const deletingSpeed = 50;
  const wordPause = 2000;

  function typeWord() {
    const currentWord = words[wordIndex];

    if (isDeleting) {
      typingWordElement.textContent = currentWord.substring(0, charIndex - 1);
      charIndex--;

      if (charIndex === 0) {
        isDeleting = false;
        wordIndex = (wordIndex + 1) % words.length;
        setTimeout(typeWord, 500);
      } else {
        setTimeout(typeWord, deletingSpeed);
      }
    } else {
      typingWordElement.textContent = currentWord.substring(0, charIndex + 1);
      charIndex++;

      if (charIndex === currentWord.length) {
        isDeleting = true;
        setTimeout(typeWord, wordPause);
      } else {
        setTimeout(typeWord, typingSpeed);
      }
    }
  }

  typeWord();
}

/* ============================================
   NAVIGATION SCROLL EFFECT
   ============================================ */
function initNavigation() {
  const nav = document.querySelector('nav');
  let lastScrollTop = 0;

  window.addEventListener('scroll', () => {
    const scrollTop = window.scrollY;

    if (scrollTop > 50) {
      nav.classList.add('scrolled');
    } else {
      nav.classList.remove('scrolled');
    }

    lastScrollTop = scrollTop;
  });
}

/* ============================================
   CHEVRON SCROLL
   ============================================ */
function initChevronScroll() {
  const chevrons = document.querySelectorAll('.chevron-down');

  chevrons.forEach((chevron) => {
    chevron.addEventListener('click', () => {
      const nextSection = chevron.parentElement.nextElementSibling;
      if (nextSection) {
        nextSection.scrollIntoView({ behavior: 'smooth' });
      }
    });

    // Also make it hover-able
    chevron.style.cursor = 'pointer';
  });
}

/* ============================================
   CONTACT BUTTON
   ============================================ */
function initContactButton() {
  const contactBtn = document.querySelector('.contact-btn');

  if (contactBtn) {
    contactBtn.addEventListener('click', () => {
      const mailtoLink = `mailto:mindel.michel@gmail.com`;
      window.location.href = mailtoLink;
    });
  }
}

/* ============================================
   LANGUAGE TOGGLE
   ============================================ */
function initLanguageToggle() {
  const toggles = document.querySelectorAll('.language-toggle');

  toggles.forEach((toggle) => {
    toggle.addEventListener('click', (e) => {
      e.preventDefault();
      const href = toggle.getAttribute('href');
      if (href) {
        window.location.href = href;
      }
    });
  });
}

/* ============================================
   SCROLL ANIMATIONS
   ============================================ */
function initScrollAnimations() {
  const sections = document.querySelectorAll('section');

  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, observerOptions);

  sections.forEach((section) => {
    observer.observe(section);
  });
}

/* ============================================
   INITIALIZATION
   ============================================ */
document.addEventListener('DOMContentLoaded', () => {
  initTypingAnimation();
  initNavigation();
  initChevronScroll();
  initContactButton();
  initLanguageToggle();
  initScrollAnimations();
});

/* ============================================
   SMOOTH SCROLL FALLBACK FOR OLDER BROWSERS
   ============================================ */
if (!('scrollBehavior' in document.documentElement.style)) {
  document.addEventListener('click', (e) => {
    if (e.target.matches('a[href^="#"]')) {
      e.preventDefault();
      const target = document.querySelector(e.target.getAttribute('href'));
      if (target) {
        target.scrollIntoView({ behavior: 'smooth' });
      }
    }
  });
}
