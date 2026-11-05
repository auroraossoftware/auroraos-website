/**
 * Aurora OS — Apple-Grade Minimalist Interaction Scripts
 * Smooth ambient canvas aurora animation, sticky subnav spy, and mobile navigation
 */

document.addEventListener('DOMContentLoaded', () => {
  initAmbientAurora();
  initSubnavScrollSpy();
  initMobileMenu();
});

/* ==========================================================================
   1. Dynamic Ethereal Northern Lights Canvas
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

  // Soft atmospheric luminous aurora ribbons (Apple celestial palette)
  const ribbons = [
    {
      color: 'rgba(41, 151, 255, ', // Apple Blue
      speed: 0.0009,
      wavelength: 0.0016,
      amplitude: 70,
      yOffset: 0.20,
      alpha: 0.14
    },
    {
      color: 'rgba(48, 209, 88, ',  // Apple Emerald Green
      speed: 0.0007,
      wavelength: 0.0013,
      amplitude: 85,
      yOffset: 0.24,
      alpha: 0.16
    },
    {
      color: 'rgba(191, 90, 242, ', // Apple Purple
      speed: 0.0011,
      wavelength: 0.0020,
      amplitude: 60,
      yOffset: 0.28,
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
      const currentY = height * ribbon.yOffset + (mouse.y - 0.5) * 50;
      ctx.moveTo(0, currentY);

      for (let x = 0; x <= width; x += 16) {
        const angle1 = (x * ribbon.wavelength) + (time * ribbon.speed) + index;
        const angle2 = (x * ribbon.wavelength * 0.5) - (time * ribbon.speed * 0.6);
        const mouseShift = Math.sin((x / width) * Math.PI) * (mouse.x - 0.5) * 40;

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
   2. Sticky Subnav Scroll Spy
   ========================================================================== */
function initSubnavScrollSpy() {
  const globalNav = document.getElementById('global-nav');
  const subnavLinks = document.querySelectorAll('.subnav-links a:not(.subnav-github-link)');
  const sections = document.querySelectorAll('section[id]');

  window.addEventListener('scroll', () => {
    // Nav background blur intensify on scroll
    if (window.scrollY > 30) {
      globalNav?.classList.add('scrolled');
    } else {
      globalNav?.classList.remove('scrolled');
    }

    // Scroll spy for subnav
    let current = '';
    const scrollPos = window.scrollY + 140;

    sections.forEach(section => {
      const top = section.offsetTop;
      const height = section.offsetHeight;
      if (scrollPos >= top && scrollPos < top + height) {
        current = section.getAttribute('id');
      }
    });

    subnavLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${current}`) {
        link.classList.add('active');
      }
    });
  });
}

/* ==========================================================================
   3. Mobile Navigation Menu
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
      menu.style.padding = '1.75rem';
      menu.style.borderBottom = '1px solid rgba(255, 255, 255, 0.12)';
      menu.style.gap = '1.25rem';
    }
  });

  menu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      if (window.innerWidth <= 680) {
        menu.style.display = 'none';
      }
    });
  });
}
