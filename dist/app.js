/**
 * Aurora OS — Apple-Grade Minimalist Interaction Scripts
 * Specular Cursor Glare, Interactive Apple Feature Switcher,
 * Kinetic Scroll Reveals, Ambient Aurora Canvas, and Nav Spy
 */

document.addEventListener('DOMContentLoaded', () => {
  initAmbientAurora();
  initSpecularGlassGlare();
  initShowcaseSwitcher();
  initScrollReveals();
  initNavScrollSpy();
  initMobileMenu();
});

/* ==========================================================================
   1. Dynamic Ethereal Northern Lights Canvas (Apple Celestial Palette)
   ========================================================================== */
function initAmbientAurora() {
  const canvas = document.getElementById('aurora-canvas');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  let width, height;
  let animationFrameId;
  let mouse = { x: 0.5, y: 0.3, targetX: 0.5, targetY: 0.3 };
  let time = 0;

  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  function resize() {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  }

  window.addEventListener('resize', resize);
  resize();

  window.addEventListener('mousemove', (e) => {
    mouse.targetX = e.clientX / width;
    mouse.targetY = e.clientY / height;
  });

  const ribbons = [
    {
      color: 'rgba(41, 151, 255, ', // Apple Blue
      speed: 0.0008,
      wavelength: 0.0016,
      amplitude: 70,
      yOffset: 0.18,
      alpha: 0.14
    },
    {
      color: 'rgba(48, 209, 88, ',  // Apple Emerald Green
      speed: 0.0006,
      wavelength: 0.0012,
      amplitude: 85,
      yOffset: 0.22,
      alpha: 0.16
    },
    {
      color: 'rgba(191, 90, 242, ', // Apple Purple
      speed: 0.0010,
      wavelength: 0.0019,
      amplitude: 60,
      yOffset: 0.26,
      alpha: 0.12
    }
  ];

  function render() {
    ctx.clearRect(0, 0, width, height);

    mouse.x += (mouse.targetX - mouse.x) * 0.02;
    mouse.y += (mouse.targetY - mouse.y) * 0.02;

    if (!prefersReducedMotion) {
      time += 1;
    }

    ctx.globalCompositeOperation = 'screen';

    ribbons.forEach((ribbon, index) => {
      ctx.beginPath();
      const currentY = height * ribbon.yOffset + (mouse.y - 0.5) * 45;
      ctx.moveTo(0, currentY);

      for (let x = 0; x <= width; x += 16) {
        const angle1 = (x * ribbon.wavelength) + (time * ribbon.speed) + index;
        const angle2 = (x * ribbon.wavelength * 0.5) - (time * ribbon.speed * 0.6);
        const mouseShift = Math.sin((x / width) * Math.PI) * (mouse.x - 0.5) * 35;

        const y = currentY + 
                  Math.sin(angle1) * ribbon.amplitude + 
                  Math.cos(angle2) * (ribbon.amplitude * 0.35) + 
                  mouseShift;

        ctx.lineTo(x, y);
      }

      ctx.lineTo(width, height * 0.65);
      ctx.lineTo(0, height * 0.65);
      ctx.closePath();

      const grad = ctx.createLinearGradient(0, currentY - 60, 0, currentY + 140);
      grad.addColorStop(0, ribbon.color + '0)');
      grad.addColorStop(0.3, ribbon.color + ribbon.alpha + ')');
      grad.addColorStop(0.7, ribbon.color + (ribbon.alpha * 0.4) + ')');
      grad.addColorStop(1, ribbon.color + '0)');

      ctx.fillStyle = grad;
      ctx.fill();
    });

    ctx.globalCompositeOperation = 'source-over';
    animationFrameId = requestAnimationFrame(render);
  }

  document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
      cancelAnimationFrame(animationFrameId);
    } else {
      render();
    }
  });

  render();
}

/* ==========================================================================
   2. Liquid Glass 2.0 Dynamic Cursor Specular Glare
   ========================================================================== */
function initSpecularGlassGlare() {
  const cards = document.querySelectorAll('.liquid-glass, .hardware-chassis');

  cards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      card.style.setProperty('--mouse-x', `${x}px`);
      card.style.setProperty('--mouse-y', `${y}px`);
    });
  });
}

/* ==========================================================================
   3. Interactive Apple-Style Feature Switcher
   ========================================================================== */
function initShowcaseSwitcher() {
  const tabs = document.querySelectorAll('.showcase-tab');
  const panels = document.querySelectorAll('.showcase-panel');

  if (!tabs.length || !panels.length) return;

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      const targetId = tab.getAttribute('data-target');
      if (!targetId) return;

      tabs.forEach(t => t.classList.remove('active'));
      panels.forEach(p => p.classList.remove('active'));

      tab.classList.add('active');
      const targetPanel = document.getElementById(targetId);
      if (targetPanel) {
        targetPanel.classList.add('active');
      }
    });
  });
}

/* ==========================================================================
   4. Kinetic Scroll Reveals (Apple IntersectionObserver Easing)
   ========================================================================== */
function initScrollReveals() {
  const reveals = document.querySelectorAll('.reveal-on-scroll');
  if (!reveals.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
      }
    });
  }, {
    threshold: 0.12,
    rootMargin: '0px 0px -40px 0px'
  });

  reveals.forEach(el => observer.observe(el));
}

/* ==========================================================================
   5. Single-Bar Navigation Scroll Spy & Blur Intensifier
   ========================================================================== */
function initNavScrollSpy() {
  const siteNav = document.getElementById('site-nav');
  const navLinks = document.querySelectorAll('.nav-menu a');
  const sections = document.querySelectorAll('section[id]');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 20) {
      siteNav?.classList.add('scrolled');
    } else {
      siteNav?.classList.remove('scrolled');
    }

    let current = '';
    const scrollPos = window.scrollY + 130;

    sections.forEach(section => {
      const top = section.offsetTop;
      const height = section.offsetHeight;
      if (scrollPos >= top && scrollPos < top + height) {
        current = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${current}`) {
        link.classList.add('active');
      }
    });
  });
}

/* ==========================================================================
   6. Mobile Navigation Menu
   ========================================================================== */
function initMobileMenu() {
  const toggle = document.getElementById('mobile-toggle');
  const menu = document.getElementById('nav-menu');

  if (!toggle || !menu) return;

  toggle.addEventListener('click', () => {
    if (menu.style.display === 'flex') {
      menu.style.display = 'none';
    } else {
      menu.style.display = 'flex';
      menu.style.flexDirection = 'column';
      menu.style.position = 'absolute';
      menu.style.top = 'var(--nav-h)';
      menu.style.left = '0';
      menu.style.width = '100%';
      menu.style.background = 'rgba(0, 0, 0, 0.96)';
      menu.style.backdropFilter = 'blur(24px)';
      menu.style.padding = '1.75rem 2rem';
      menu.style.borderBottom = '1px solid rgba(255, 255, 255, 0.12)';
      menu.style.gap = '1.25rem';
    }
  });

  menu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      if (window.innerWidth <= 780) {
        menu.style.display = 'none';
      }
    });
  });
}
