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
  initSpotlightPlayground();
  initTopologyStack();
  initSecurityLab();
  initTerminalVerification();
  initHardwareHotspots();
  initHardwareCalculator();
  initHardwareDocsTabs();
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
    const newWidth = window.innerWidth;
    const newHeight = window.innerHeight;

    // Ignore minor height changes (e.g. mobile address bar toggling) to prevent canvas wipe
    if (width === newWidth && Math.abs(height - newHeight) < 80) {
      return;
    }

    width = newWidth;
    height = newHeight;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = Math.floor(width * dpr);
    canvas.height = Math.floor(height * dpr);
    canvas.style.width = width + 'px';
    canvas.style.height = height + 'px';
    ctx.scale(dpr, dpr);
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

  if (!sections.length || !navLinks.length) return;

  function updateActiveNav() {
    if (window.scrollY > 20) {
      siteNav?.classList.add('scrolled');
    } else {
      siteNav?.classList.remove('scrolled');
    }

    // Check if scrolled near the bottom of the page (to highlight last nav item)
    const scrollBottom = window.innerHeight + window.scrollY;
    const documentHeight = document.documentElement.scrollHeight;
    const isAtBottom = scrollBottom >= documentHeight - 60;

    let current = '';

    if (isAtBottom) {
      current = sections[sections.length - 1].getAttribute('id');
    } else {
      const navOffset = 140;
      sections.forEach(section => {
        const top = section.offsetTop;
        const height = section.offsetHeight;
        if (window.scrollY + navOffset >= top && window.scrollY + navOffset < top + height) {
          current = section.getAttribute('id');
        }
      });
    }

    if (current) {
      navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
          link.classList.add('active');
        }
      });
    }
  }

  window.addEventListener('scroll', updateActiveNav, { passive: true });
  updateActiveNav();
}

/* ==========================================================================
   6. Mobile Navigation Menu
   ========================================================================== */
function initMobileMenu() {
  const toggle = document.getElementById('mobile-toggle');
  const menu = document.getElementById('nav-menu');

  if (!toggle || !menu) return;

  function closeMenu() {
    menu.classList.remove('is-open');
    toggle.setAttribute('aria-expanded', 'false');
    toggle.innerHTML = '☰';
  }

  function openMenu() {
    menu.classList.add('is-open');
    toggle.setAttribute('aria-expanded', 'true');
    toggle.innerHTML = '✕';
  }

  toggle.setAttribute('aria-expanded', 'false');

  toggle.addEventListener('click', (e) => {
    e.stopPropagation();
    const isOpen = menu.classList.contains('is-open');
    if (isOpen) {
      closeMenu();
    } else {
      openMenu();
    }
  });

  // Close when clicking any menu link
  menu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      closeMenu();
    });
  });

  // Close when clicking outside the menu
  document.addEventListener('click', (e) => {
    if (menu.classList.contains('is-open') && !menu.contains(e.target) && e.target !== toggle) {
      closeMenu();
    }
  });

  // Close on Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && menu.classList.contains('is-open')) {
      closeMenu();
    }
  });

  // Auto-close if resized above mobile breakpoint (780px)
  window.addEventListener('resize', () => {
    if (window.innerWidth > 780 && menu.classList.contains('is-open')) {
      closeMenu();
    }
  });
}

/* ==========================================================================
   7. Interactive Spotlight HUD Playground (Hero Screen)
   ========================================================================== */
function initSpotlightPlayground() {
  const queryEl = document.getElementById('spotlight-query');
  const resultTextEl = document.getElementById('spotlight-result-text');
  const metaLatencyEl = document.getElementById('spotlight-meta-latency');
  const metaSecurityEl = document.getElementById('spotlight-meta-security');
  const metaExtraEl = document.getElementById('spotlight-meta-extra');
  const presetChips = document.querySelectorAll('.spotlight-preset-chip');

  if (!queryEl || !resultTextEl || !presetChips.length) return;

  const presets = {
    dev: {
      query: '"Prepare coding environment and isolate workspace"',
      result: 'Workspace ~/dev/aurora isolated under Linux openat2. Bound to anonymous socketpair(AF_UNIX). Zero ambient cloud access.',
      latency: '✓ Executed in 0.141 ms',
      security: 'Zero cloud telemetry',
      extra: 'Landlock LSM Active'
    },
    security: {
      query: '"Verify system integrity and capability policies"',
      result: '211 / 211 automated test suites passing. Deterministic capability check: OK. Core daemon resident memory: 2.8 MB RSS flatline.',
      latency: '✓ Evaluated in 0.061 ms',
      security: 'Zero Regressions',
      extra: 'Safe Rust Tokio'
    },
    audio: {
      query: '"Transcribe local team meeting and generate notes"',
      result: 'Whisper local NPU pipeline invoked on device. Zero network sockets opened. Markdown summary written to ~/Notes/meeting.md.',
      latency: '✓ On-Device NPU',
      security: 'Zero Cloud Telemetry',
      extra: 'End-to-End Encrypted'
    },
    kernel: {
      query: '"Audit background daemons and block unauthorized raw probes"',
      result: 'Seccomp-bpf filter applied. Unauthorized raw network probe intercepted and blocked in microseconds. Desktop remains 100% fluid.',
      latency: '✓ Blocked in 0.141 ms',
      security: 'Default-Deny Policy',
      extra: 'Kernel Level'
    }
  };

  let isTyping = false;

  function loadPreset(key) {
    const data = presets[key];
    if (!data || isTyping) return;

    presetChips.forEach(chip => {
      chip.classList.toggle('active', chip.getAttribute('data-preset') === key);
    });

    isTyping = true;
    queryEl.style.opacity = '0.5';
    resultTextEl.style.opacity = '0.4';

    setTimeout(() => {
      queryEl.textContent = data.query;
      resultTextEl.textContent = data.result;
      if (metaLatencyEl) metaLatencyEl.textContent = data.latency;
      if (metaSecurityEl) metaSecurityEl.textContent = data.security;
      if (metaExtraEl) metaExtraEl.textContent = data.extra;

      queryEl.style.opacity = '1';
      resultTextEl.style.opacity = '1';
      isTyping = false;
    }, 180);
  }

  presetChips.forEach(chip => {
    chip.addEventListener('click', () => {
      const key = chip.getAttribute('data-preset');
      loadPreset(key);
    });
  });

  // Global ⌘K / Ctrl+K keyboard shortcut to cycle interactive presets
  document.addEventListener('keydown', (e) => {
    if ((e.metaKey || e.ctrlKey) && (e.key === 'k' || e.key === 'K')) {
      e.preventDefault();
      const currentActive = document.querySelector('.spotlight-preset-chip.active');
      const keys = Object.keys(presets);
      let nextIndex = 0;
      if (currentActive) {
        const currentKey = currentActive.getAttribute('data-preset');
        nextIndex = (keys.indexOf(currentKey) + 1) % keys.length;
      }
      loadPreset(keys[nextIndex]);
      queryEl.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  });
}

/* ==========================================================================
   8. Interactive System Architecture Topology Stack (#architecture)
   ========================================================================== */
function initTopologyStack() {
  const cards = document.querySelectorAll('.topology-layer-card');
  const tagEl = document.getElementById('inspector-tag');
  const titleEl = document.getElementById('inspector-title');
  const adrEl = document.getElementById('inspector-adr');
  const descEl = document.getElementById('inspector-desc');
  const m1El = document.getElementById('inspector-m1');
  const m1Lbl = document.getElementById('inspector-m1-lbl');
  const m2El = document.getElementById('inspector-m2');
  const m2Lbl = document.getElementById('inspector-m2-lbl');
  const m3El = document.getElementById('inspector-m3');
  const m3Lbl = document.getElementById('inspector-m3-lbl');
  const fileEl = document.getElementById('inspector-code-file');
  const codeEl = document.getElementById('inspector-code-content');

  if (!cards.length || !titleEl) return;

  const layerData = {
    shell: {
      tag: 'LAYER 4 • USERSPACE INTERFACE',
      title: 'Desktop Shell & Wayland HUD',
      adr: 'ADR-003 ↗',
      adrHref: 'https://github.com/auroraossoftware/auroraos/tree/main/docs/decisions',
      desc: 'Provides a native desktop overlay activated with ⌘K. Communicates with the core daemon via high-speed anonymous socketpair(AF_UNIX) and standard system D-Bus interfaces. No slow HTTP gateways or cloud hops.',
      m1: '0.061 ms', m1Lbl: 'IPC Frame Overhead',
      m2: 'Wayland', m2Lbl: 'Compositor Native',
      m3: '0 bytes', m3Lbl: 'Telemetry Sent',
      file: 'desktop-ipc-client.rs',
      code: `// Connect to daemon via anonymous socketpair\nlet (client_sock, daemon_sock) = socketpair(AF_UNIX, SOCK_STREAM, 0)?;\nlet channel = AuroraIpcClient::bind(client_sock).await?;\nlet response = channel.request_action("workspace.optimize").await?;\nassert!(response.is_ok());`
    },
    daemon: {
      tag: 'LAYER 3 • SYSTEM SERVICE',
      title: 'aurora-ai Core Daemon',
      adr: 'ADR-001 ↗',
      adrHref: 'https://github.com/auroraossoftware/auroraos/tree/main/docs/decisions',
      desc: 'Engineered in safe Rust 2021 with Tokio async I/O. Features a deterministic PolicyEngine and CapabilityDispatcher with flatline resident set size. Manages worker lifetimes without crashing the desktop.',
      m1: '2.8 MB', m1Lbl: 'Daemon Resident RAM',
      m2: '211 / 211', m2Lbl: 'Automated Tests Pass',
      m3: '0.141 ms', m3Lbl: 'Policy Gate Latency',
      file: 'policy_engine.rs',
      code: `pub fn verify_token_capability(token: &CapabilityToken, action: &Action) -> Result<Decision, SecurityError> {\n    if !token.permits(action) {\n        // Default-deny gate evaluated in 0.141ms\n        return Ok(Decision::Deny(Reason::UnauthorizedCapability));\n    }\n    Ok(Decision::Permit)\n}`
    },
    kernel: {
      tag: 'LAYER 2 • KERNEL CONFINEMENT',
      title: 'Linux 6.x & Sandboxing',
      adr: 'ADR-002 ↗',
      adrHref: 'https://github.com/auroraossoftware/auroraos/tree/main/docs/decisions',
      desc: 'Enforces zero-trust isolation using Linux 6.x openat2 path resolution flags (RESOLVE_BENEATH | RESOLVE_NO_SYMLINKS), Landlock LSM filesystem restriction, and seccomp-bpf syscall filtering.',
      m1: 'openat2', m1Lbl: 'Kernel VFS Boundary',
      m2: 'Landlock', m2Lbl: 'LSM Filesystem Confinement',
      m3: 'seccomp', m3Lbl: 'Syscall BPF Filter',
      file: 'sandbox_linux.rs',
      code: `let how = open_how {\n    flags: O_RDONLY | O_CLOEXEC,\n    mode: 0,\n    resolve: RESOLVE_BENEATH | RESOLVE_NO_SYMLINKS,\n};\n// Escapes outside project sandbox fail closed with EXDEV\nlet fd = unsafe { openat2(dir_fd, path.as_ptr(), &how, size_of::<open_how>()) };`
    },
    silicon: {
      tag: 'LAYER 1 • HARDWARE ACCELERATION',
      title: 'Hardware Silicon & NPUs',
      adr: 'Docs ↗',
      adrHref: 'https://github.com/auroraossoftware/auroraos/blob/main/docs/architecture.md',
      desc: 'Runs natively on standard 64-bit x86_64 and aarch64 (including Apple Silicon via Asahi Linux). Bridges local neural inference via Vulkan, Apple Neural Engine, NVIDIA CUDA, and AMD ROCm.',
      m1: 'x86_64 / ARM', m1Lbl: 'Architecture Support',
      m2: 'Vulkan / NPU', m2Lbl: 'Neural Backends',
      m3: 'Zero Cloud', m3Lbl: 'Strictly On-Device',
      file: 'npu_backend.rs',
      code: `// Local quantized GGUF weights executed on device\nlet model = LlamaModel::load_local("~/models/aurora-8b-q4.gguf")?;\nlet tokens = model.stream_inference(&context)?;\nfor token in tokens {\n    socket.write_token(token).await?;\n}`
    }
  };

  cards.forEach(card => {
    card.addEventListener('click', () => {
      const layer = card.getAttribute('data-layer');
      const data = layerData[layer];
      if (!data) return;

      cards.forEach(c => c.classList.remove('active'));
      card.classList.add('active');

      if (tagEl) tagEl.textContent = data.tag;
      if (titleEl) titleEl.textContent = data.title;
      if (adrEl) {
        adrEl.textContent = data.adr;
        adrEl.setAttribute('href', data.adrHref);
      }
      if (descEl) descEl.textContent = data.desc;
      if (m1El) m1El.textContent = data.m1;
      if (m1Lbl) m1Lbl.textContent = data.m1Lbl;
      if (m2El) m2El.textContent = data.m2;
      if (m2Lbl) m2Lbl.textContent = data.m2Lbl;
      if (m3El) m3El.textContent = data.m3;
      if (m3Lbl) m3Lbl.textContent = data.m3Lbl;
      if (fileEl) fileEl.textContent = data.file;
      if (codeEl) codeEl.textContent = data.code;
    });
  });
}

/* ==========================================================================
   9. Interactive Zero-Trust Security Simulator (#security-lab)
   ========================================================================== */
function initSecurityLab() {
  const btns = document.querySelectorAll('.security-vector-btn');
  const titleEl = document.getElementById('sec-attack-title');
  const summaryEl = document.getElementById('sec-attack-summary');
  const codeEl = document.getElementById('sec-payload-code');
  const latencyEl = document.getElementById('sec-latency');
  const responseEl = document.getElementById('sec-response');
  const dispositionEl = document.getElementById('sec-disposition');
  const logTerminal = document.getElementById('sec-terminal-log');

  if (!btns.length || !titleEl || !logTerminal) return;

  const vectorData = {
    telemetry: {
      title: 'Unauthorized Raw Socket Call',
      summary: 'A rogue background script or compromised tool attempts to open a raw network socket to an external cloud IP (198.51.100.42:443) without a cryptographically signed capability token.',
      payload: 'connect(fd=3, addr=198.51.100.42:443, proto=TCP)',
      latency: '0.141 ms',
      response: 'Blocked Closed',
      disposition: 'EPERM (Denied)',
      logs: [
        '<span class="log-time">[00:00.001]</span> <span class="log-cyan">INCOMING:</span> sys.network.connect(198.51.100.42:443)',
        '<span class="log-time">[00:00.042]</span> <span class="log-yellow">CHECK:</span> CapabilityDispatcher evaluating token signature...',
        '<span class="log-time">[00:00.089]</span> <span class="log-red">FAILED:</span> Capability token absent. PolicyEngine: Default-Deny.',
        '<span class="log-time">[00:00.141]</span> <span class="log-green">DISPOSITION:</span> Blocked closed in 0.141ms. Error: EPERM.',
        '<span class="log-time">[00:00.142]</span> <span class="log-white">AUDIT:</span> Threat neutralized. Zero outbound packets transmitted.'
      ]
    },
    traversal: {
      title: 'Symlink Directory Escape Attempt',
      summary: 'An unverified agent attempts to traverse outside the designated sandbox workspace using a malicious symlink pointing to sensitive system files (../../../../etc/shadow).',
      payload: 'openat2(dfd=5, path="../../etc/shadow", resolve=RESOLVE_BENEATH)',
      latency: '0.012 ms',
      response: 'Kernel Block',
      disposition: 'EXDEV (Denied)',
      logs: [
        '<span class="log-time">[00:00.001]</span> <span class="log-cyan">INCOMING:</span> fs.file.read("../../../../etc/shadow")',
        '<span class="log-time">[00:00.004]</span> <span class="log-yellow">RESOLVE:</span> Invoking openat2 with RESOLVE_BENEATH | RESOLVE_NO_SYMLINKS',
        '<span class="log-time">[00:00.008]</span> <span class="log-red">KERNEL TRAP:</span> Target path traverses above dirfd root hierarchy.',
        '<span class="log-time">[00:00.012]</span> <span class="log-green">DISPOSITION:</span> Kernel denied syscall. Error: EXDEV (Cross-device link).',
        '<span class="log-time">[00:00.013]</span> <span class="log-white">AUDIT:</span> Sandbox invariant maintained. Zero file bytes exposed.'
      ]
    },
    memory: {
      title: 'Runaway Memory Allocation Loop',
      summary: 'A tool script enters a runaway recursive allocation loop attempting to exhaust system memory and trigger an OS out-of-memory kernel panic.',
      payload: 'alloc_recursive(depth=1000000, chunk=64MB)',
      latency: '0.089 ms',
      response: 'Budget Throttled',
      disposition: 'CAP_EXHAUSTED',
      logs: [
        '<span class="log-time">[00:00.001]</span> <span class="log-cyan">INCOMING:</span> task.worker.spawn(recursive_payload)',
        '<span class="log-time">[00:00.031]</span> <span class="log-yellow">AUDIT:</span> Tokio WorkerSupervisor tracking memory delta (VmRSS: 2.8 MB)',
        '<span class="log-time">[00:00.065]</span> <span class="log-red">THRESHOLD:</span> Token budget quota exceeded for worker process #14.',
        '<span class="log-time">[00:00.089]</span> <span class="log-green">DISPOSITION:</span> Worker terminated safely. Daemon RAM held at 2.8 MB.',
        '<span class="log-time">[00:00.090]</span> <span class="log-white">AUDIT:</span> Linux desktop compositor remains 100% responsive.'
      ]
    }
  };

  btns.forEach(btn => {
    btn.addEventListener('click', () => {
      const vec = btn.getAttribute('data-vector');
      const data = vectorData[vec];
      if (!data) return;

      btns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      if (titleEl) titleEl.textContent = data.title;
      if (summaryEl) summaryEl.textContent = data.summary;
      if (codeEl) codeEl.textContent = data.payload;
      if (latencyEl) latencyEl.textContent = data.latency;
      if (responseEl) responseEl.textContent = data.response;
      if (dispositionEl) dispositionEl.textContent = data.disposition;

      // Stream simulated terminal logs line by line
      logTerminal.innerHTML = '';
      data.logs.forEach((line, idx) => {
        setTimeout(() => {
          const div = document.createElement('div');
          div.innerHTML = line;
          logTerminal.appendChild(div);
        }, idx * 75);
      });
    });
  });
}

/* ==========================================================================
   10. "Verify in 30 Seconds" Developer Terminal Snippet (#verify)
   ========================================================================== */
function initTerminalVerification() {
  const copyBtn = document.getElementById('btn-copy-cmd');
  const copyText = document.getElementById('copy-btn-text');
  const copyIcon = document.getElementById('copy-btn-icon');
  const simulateBtn = document.getElementById('btn-simulate-test');
  const outputBody = document.getElementById('terminal-output-body');

  const cloneCmd = 'git clone https://github.com/auroraossoftware/auroraos.git && cd auroraos && cargo test --release';

  if (copyBtn) {
    copyBtn.addEventListener('click', () => {
      navigator.clipboard.writeText(cloneCmd).then(() => {
        if (copyText) copyText.textContent = 'Copied! ✓';
        if (copyIcon) copyIcon.textContent = '✓';
        setTimeout(() => {
          if (copyText) copyText.textContent = 'Copy Command';
          if (copyIcon) copyIcon.textContent = '📋';
        }, 2000);
      }).catch(() => {
        if (copyText) copyText.textContent = 'Copied! ✓';
      });
    });
  }

  if (simulateBtn && outputBody) {
    simulateBtn.addEventListener('click', () => {
      simulateBtn.disabled = true;
      simulateBtn.innerHTML = '<span>Verifying...</span>';
      outputBody.innerHTML = '';

      const lines = [
        '<span class="term-line-dim">$ cargo test --release</span>',
        '<span class="term-cyan">   Compiling</span> aurora-ai v0.8.0 (/workspace/auroraos)',
        '<span class="term-cyan">   Compiling</span> aurora-policy v0.8.0',
        '<span class="term-green">    Finished</span> release [optimized] target(s) in 0.18s',
        '<span class="term-line">     Running unittests src/lib.rs (142 tests)</span>',
        '<span class="term-line">test daemon::tokio_supervisor ... <span class="term-green">ok</span></span>',
        '<span class="term-line">test ipc::socketpair_framing ... <span class="term-green">ok</span></span>',
        '<span class="term-line">test policy::default_deny_invariant ... <span class="term-green">ok</span></span>',
        '<span class="term-line">test memory::rss_flatline_audit ... <span class="term-green">ok</span></span>',
        '<span class="term-line">test sandboxing::openat2_bounds ... <span class="term-green">ok</span></span>',
        '<span class="term-line">     Running tests/policy_engine_tests.rs (38 tests)</span>',
        '<span class="term-line">test policy_denial_latency_benchmark (0.141 ms) ... <span class="term-green">ok</span></span>',
        '<span class="term-line">     Running tests/openat2_sandbox_tests.rs (31 tests)</span>',
        '<span class="term-line">test openat2_resolve_beneath_symlink_block ... <span class="term-green">ok</span></span>',
        '<span class="term-line">test openat2_root_traversal_denial ... <span class="term-green">ok</span></span>',
        '<div style="margin-top: 0.65rem; padding-top: 0.5rem; border-top: 1px solid rgba(255,255,255,0.08);"><strong class="term-green">test result: ok. 211 passed; 0 failed; 0 ignored; finished in 0.42s</strong></div>'
      ];

      lines.forEach((l, i) => {
        setTimeout(() => {
          const div = document.createElement('div');
          div.innerHTML = l;
          outputBody.appendChild(div);
          outputBody.scrollTop = outputBody.scrollHeight;

          if (i === lines.length - 1) {
            simulateBtn.disabled = false;
            simulateBtn.innerHTML = '<span>Run Simulation Again ▶</span>';
          }
        }, i * 65);
      });
    });
  }
}

/* ==========================================================================
   11. Interactive Chassis Hardware Hotspots (Apple Silicon Callouts)
   ========================================================================== */
function initHardwareHotspots() {
  const hotspots = document.querySelectorAll('.chassis-hotspot');
  if (!hotspots.length) return;

  hotspots.forEach(hotspot => {
    hotspot.addEventListener('click', (e) => {
      e.stopPropagation();
      const wasActive = hotspot.classList.contains('active');
      hotspots.forEach(h => h.classList.remove('active'));
      if (!wasActive) {
        hotspot.classList.add('active');
      }
    });

    hotspot.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        hotspot.click();
      } else if (e.key === 'Escape') {
        hotspot.classList.remove('active');
        hotspot.blur();
      }
    });
  });

  document.addEventListener('click', () => {
    hotspots.forEach(h => h.classList.remove('active'));
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      hotspots.forEach(h => h.classList.remove('active'));
    }
  });
}

/* ==========================================================================
   12. Interactive Hardware Compatibility & Compute Lab (#hardware)
   ========================================================================== */
const HW_DATABASE = {
  cpus: {
    'amd-zen5-ai': {
      name: 'AMD Ryzen AI 300 / 9000 Series (Zen 5 + XDNA 2)',
      family: 'Zen 5 x86_64',
      npu: 'AMD XDNA 2 (Up to 50 NPU TOPS, Block-FP16)',
      vector: 'AVX-512 (Native 512-bit datapath) + VNNI',
      driver: 'Linux 6.10+ (amdgpu_xdna / XRT runtime)',
      factor: 1.18,
      npuSupported: true
    },
    'amd-zen4': {
      name: 'AMD Ryzen 7000 / 8000 Series (Zen 4)',
      family: 'Zen 4 x86_64',
      npu: 'AMD XDNA 1 (16 TOPS on 8040 series)',
      vector: 'AVX-512 (256-bit double-pumped) + VNNI',
      driver: 'Linux 6.6+ LTS (amdgpu)',
      factor: 1.05,
      npuSupported: false
    },
    'amd-zen3': {
      name: 'AMD Ryzen 5000 Series (Zen 3)',
      family: 'Zen 3 x86_64',
      npu: 'None (Legacy x86)',
      vector: 'AVX2 + FMA3',
      driver: 'Linux 5.15+ LTS (amdgpu)',
      factor: 0.88,
      npuSupported: false
    },
    'intel-ultra2': {
      name: 'Intel Core Ultra 200 Series (Arrow Lake / Lunar Lake)',
      family: 'Lion Cove + Skymont x86_64',
      npu: 'Intel NPU 4 (48 TOPS)',
      vector: 'AVX2 + VNNI + Intel AMX',
      driver: 'Linux 6.11+ (intel_vpu / Level Zero)',
      factor: 1.16,
      npuSupported: true
    },
    'intel-ultra1': {
      name: 'Intel Core Ultra 100 Series (Meteor Lake)',
      family: 'Redwood Cove + Crestmont x86_64',
      npu: 'Intel NPU 3 (11 TOPS)',
      vector: 'AVX2 + VNNI',
      driver: 'Linux 6.8+ (intel_vpu)',
      factor: 0.98,
      npuSupported: true
    },
    'intel-13-14': {
      name: 'Intel 13th / 14th Gen Core (Raptor Lake)',
      family: 'Raptor Cove + Gracemont x86_64',
      npu: 'None',
      vector: 'AVX2 + FMA3 + VNNI',
      driver: 'Linux 6.6+ LTS',
      factor: 0.98,
      npuSupported: false
    },
    /* --- 100 Specific Intel CPU Variants --- */
    /* 1. Core Ultra 200 Series (Arrow Lake & Lunar Lake) [20 models] */
    'intel-ultra-9-285k': {
      name: 'Intel Core Ultra 9 285K (24C/24T, 5.7 GHz, AMX)',
      family: 'Arrow Lake-S',
      npu: 'Intel NPU 3 (13 TOPS)',
      vector: 'AVX2 + VNNI + Intel AMX',
      driver: 'Linux 6.11+ (intel_vpu / xe)',
      factor: 1.22,
      npuSupported: true
    },
    'intel-ultra-9-285': {
      name: 'Intel Core Ultra 9 285 (24C/24T, 65W, AMX)',
      family: 'Arrow Lake-S',
      npu: 'Intel NPU 3 (13 TOPS)',
      vector: 'AVX2 + VNNI + Intel AMX',
      driver: 'Linux 6.11+ (intel_vpu)',
      factor: 1.18,
      npuSupported: true
    },
    'intel-ultra-9-285t': {
      name: 'Intel Core Ultra 9 285T (24C/24T, 35W Eco)',
      family: 'Arrow Lake-S',
      npu: 'Intel NPU 3 (13 TOPS)',
      vector: 'AVX2 + VNNI + Intel AMX',
      driver: 'Linux 6.11+ (intel_vpu)',
      factor: 1.14,
      npuSupported: true
    },
    'intel-ultra-7-265k': {
      name: 'Intel Core Ultra 7 265K (20C/20T, 5.5 GHz, AMX)',
      family: 'Arrow Lake-S',
      npu: 'Intel NPU 3 (13 TOPS)',
      vector: 'AVX2 + VNNI + Intel AMX',
      driver: 'Linux 6.11+ (intel_vpu / xe)',
      factor: 1.17,
      npuSupported: true
    },
    'intel-ultra-7-265kf': {
      name: 'Intel Core Ultra 7 265KF (20C/20T, Discrete GPU)',
      family: 'Arrow Lake-S',
      npu: 'Intel NPU 3 (13 TOPS)',
      vector: 'AVX2 + VNNI + Intel AMX',
      driver: 'Linux 6.11+ (intel_vpu)',
      factor: 1.17,
      npuSupported: true
    },
    'intel-ultra-7-265': {
      name: 'Intel Core Ultra 7 265 (20C/20T, 65W, AMX)',
      family: 'Arrow Lake-S',
      npu: 'Intel NPU 3 (13 TOPS)',
      vector: 'AVX2 + VNNI + Intel AMX',
      driver: 'Linux 6.11+ (intel_vpu)',
      factor: 1.14,
      npuSupported: true
    },
    'intel-ultra-7-265f': {
      name: 'Intel Core Ultra 7 265F (20C/20T, 65W, No iGPU)',
      family: 'Arrow Lake-S',
      npu: 'Intel NPU 3 (13 TOPS)',
      vector: 'AVX2 + VNNI + Intel AMX',
      driver: 'Linux 6.11+ (intel_vpu)',
      factor: 1.14,
      npuSupported: true
    },
    'intel-ultra-7-265t': {
      name: 'Intel Core Ultra 7 265T (20C/20T, 35W Eco)',
      family: 'Arrow Lake-S',
      npu: 'Intel NPU 3 (13 TOPS)',
      vector: 'AVX2 + VNNI + Intel AMX',
      driver: 'Linux 6.11+ (intel_vpu)',
      factor: 1.10,
      npuSupported: true
    },
    'intel-ultra-5-245k': {
      name: 'Intel Core Ultra 5 245K (14C/14T, 5.2 GHz, AMX)',
      family: 'Arrow Lake-S',
      npu: 'Intel NPU 3 (13 TOPS)',
      vector: 'AVX2 + VNNI + Intel AMX',
      driver: 'Linux 6.11+ (intel_vpu / xe)',
      factor: 1.12,
      npuSupported: true
    },
    'intel-ultra-5-245kf': {
      name: 'Intel Core Ultra 5 245KF (14C/14T, Discrete GPU)',
      family: 'Arrow Lake-S',
      npu: 'Intel NPU 3 (13 TOPS)',
      vector: 'AVX2 + VNNI + Intel AMX',
      driver: 'Linux 6.11+ (intel_vpu)',
      factor: 1.12,
      npuSupported: true
    },
    'intel-ultra-5-245': {
      name: 'Intel Core Ultra 5 245 (14C/14T, 65W, AMX)',
      family: 'Arrow Lake-S',
      npu: 'Intel NPU 3 (13 TOPS)',
      vector: 'AVX2 + VNNI + Intel AMX',
      driver: 'Linux 6.11+ (intel_vpu)',
      factor: 1.08,
      npuSupported: true
    },
    'intel-ultra-5-235': {
      name: 'Intel Core Ultra 5 235 (14C/14T, 65W)',
      family: 'Arrow Lake-S',
      npu: 'Intel NPU 3 (13 TOPS)',
      vector: 'AVX2 + VNNI + Intel AMX',
      driver: 'Linux 6.11+ (intel_vpu)',
      factor: 1.06,
      npuSupported: true
    },
    'intel-ultra-5-225': {
      name: 'Intel Core Ultra 5 225 (10C/10T, 65W)',
      family: 'Arrow Lake-S',
      npu: 'Intel NPU 3 (13 TOPS)',
      vector: 'AVX2 + VNNI + Intel AMX',
      driver: 'Linux 6.11+ (intel_vpu)',
      factor: 1.02,
      npuSupported: true
    },
    'intel-ultra-5-225f': {
      name: 'Intel Core Ultra 5 225F (10C/10T, No iGPU)',
      family: 'Arrow Lake-S',
      npu: 'Intel NPU 3 (13 TOPS)',
      vector: 'AVX2 + VNNI + Intel AMX',
      driver: 'Linux 6.11+ (intel_vpu)',
      factor: 1.02,
      npuSupported: true
    },
    'intel-ultra-9-288v': {
      name: 'Intel Core Ultra 9 288V (32GB MoP, NPU 48 TOPS)',
      family: 'Lunar Lake',
      npu: 'Intel NPU 4 (48 TOPS)',
      vector: 'AVX2 + VNNI + Arc 140V',
      driver: 'Linux 6.12+ (intel_vpu / xe)',
      factor: 1.16,
      npuSupported: true
    },
    'intel-ultra-7-268v': {
      name: 'Intel Core Ultra 7 268V (32GB MoP, NPU 48 TOPS)',
      family: 'Lunar Lake',
      npu: 'Intel NPU 4 (48 TOPS)',
      vector: 'AVX2 + VNNI + Arc 140V',
      driver: 'Linux 6.12+ (intel_vpu / xe)',
      factor: 1.14,
      npuSupported: true
    },
    'intel-ultra-7-266v': {
      name: 'Intel Core Ultra 7 266V (16GB MoP, NPU 48 TOPS)',
      family: 'Lunar Lake',
      npu: 'Intel NPU 4 (48 TOPS)',
      vector: 'AVX2 + VNNI + Arc 140V',
      driver: 'Linux 6.12+ (intel_vpu / xe)',
      factor: 1.13,
      npuSupported: true
    },
    'intel-ultra-7-258v': {
      name: 'Intel Core Ultra 7 258V (32GB MoP, NPU 47 TOPS)',
      family: 'Lunar Lake',
      npu: 'Intel NPU 4 (47 TOPS)',
      vector: 'AVX2 + VNNI + Arc 140V',
      driver: 'Linux 6.12+ (intel_vpu / xe)',
      factor: 1.12,
      npuSupported: true
    },
    'intel-ultra-5-238v': {
      name: 'Intel Core Ultra 5 238V (32GB MoP, NPU 40 TOPS)',
      family: 'Lunar Lake',
      npu: 'Intel NPU 4 (40 TOPS)',
      vector: 'AVX2 + VNNI + Arc 130V',
      driver: 'Linux 6.12+ (intel_vpu / xe)',
      factor: 1.05,
      npuSupported: true
    },
    'intel-ultra-5-228v': {
      name: 'Intel Core Ultra 5 228V (32GB MoP, NPU 40 TOPS)',
      family: 'Lunar Lake',
      npu: 'Intel NPU 4 (40 TOPS)',
      vector: 'AVX2 + VNNI + Arc 130V',
      driver: 'Linux 6.12+ (intel_vpu / xe)',
      factor: 1.02,
      npuSupported: true
    },

    /* 2. Core Ultra 100 Series (Meteor Lake Mobile) [8 models] */
    'intel-ultra-9-185h': {
      name: 'Intel Core Ultra 9 185H (16C/22T, NPU 11 TOPS)',
      family: 'Meteor Lake',
      npu: 'Intel NPU 3 (11 TOPS)',
      vector: 'AVX2 + VNNI + Arc Xe-LPG',
      driver: 'Linux 6.8+ (intel_vpu)',
      factor: 1.08,
      npuSupported: true
    },
    'intel-ultra-7-165h': {
      name: 'Intel Core Ultra 7 165H (16C/22T, Arc Xe-LPG)',
      family: 'Meteor Lake',
      npu: 'Intel NPU 3 (11 TOPS)',
      vector: 'AVX2 + VNNI + Arc Xe-LPG',
      driver: 'Linux 6.8+ (intel_vpu)',
      factor: 1.05,
      npuSupported: true
    },
    'intel-ultra-7-155h': {
      name: 'Intel Core Ultra 7 155H (16C/22T, Arc Xe-LPG)',
      family: 'Meteor Lake',
      npu: 'Intel NPU 3 (11 TOPS)',
      vector: 'AVX2 + VNNI + Arc Xe-LPG',
      driver: 'Linux 6.8+ (intel_vpu)',
      factor: 1.03,
      npuSupported: true
    },
    'intel-ultra-7-165u': {
      name: 'Intel Core Ultra 7 165U (12C/14T, 15W)',
      family: 'Meteor Lake',
      npu: 'Intel NPU 3 (11 TOPS)',
      vector: 'AVX2 + VNNI',
      driver: 'Linux 6.8+ (intel_vpu)',
      factor: 0.98,
      npuSupported: true
    },
    'intel-ultra-7-155u': {
      name: 'Intel Core Ultra 7 155U (12C/14T, 15W)',
      family: 'Meteor Lake',
      npu: 'Intel NPU 3 (11 TOPS)',
      vector: 'AVX2 + VNNI',
      driver: 'Linux 6.8+ (intel_vpu)',
      factor: 0.96,
      npuSupported: true
    },
    'intel-ultra-5-135h': {
      name: 'Intel Core Ultra 5 135H (14C/18T, Arc Xe-LPG)',
      family: 'Meteor Lake',
      npu: 'Intel NPU 3 (11 TOPS)',
      vector: 'AVX2 + VNNI + Arc Xe-LPG',
      driver: 'Linux 6.8+ (intel_vpu)',
      factor: 0.99,
      npuSupported: true
    },
    'intel-ultra-5-125h': {
      name: 'Intel Core Ultra 5 125H (14C/18T, Arc Xe-LPG)',
      family: 'Meteor Lake',
      npu: 'Intel NPU 3 (11 TOPS)',
      vector: 'AVX2 + VNNI + Arc Xe-LPG',
      driver: 'Linux 6.8+ (intel_vpu)',
      factor: 0.97,
      npuSupported: true
    },
    'intel-ultra-5-125u': {
      name: 'Intel Core Ultra 5 125U (12C/14T, 15W)',
      family: 'Meteor Lake',
      npu: 'Intel NPU 3 (11 TOPS)',
      vector: 'AVX2 + VNNI',
      driver: 'Linux 6.8+ (intel_vpu)',
      factor: 0.92,
      npuSupported: true
    },

    /* 3. Intel 14th Gen Core (Raptor Lake Refresh) [20 models] */
    'intel-i9-14900ks': {
      name: 'Intel Core i9-14900KS (6.2 GHz Special Edition, 24C/32T)',
      family: 'Raptor Lake-R',
      npu: 'None',
      vector: 'AVX2 + FMA3 + VNNI',
      driver: 'Linux 6.6+ LTS',
      factor: 1.15,
      npuSupported: false
    },
    'intel-i9-14900k': {
      name: 'Intel Core i9-14900K (6.0 GHz, 24C/32T)',
      family: 'Raptor Lake-R',
      npu: 'None',
      vector: 'AVX2 + FMA3 + VNNI',
      driver: 'Linux 6.6+ LTS',
      factor: 1.13,
      npuSupported: false
    },
    'intel-i9-14900kf': {
      name: 'Intel Core i9-14900KF (24C/32T, Discrete GPU)',
      family: 'Raptor Lake-R',
      npu: 'None',
      vector: 'AVX2 + FMA3 + VNNI',
      driver: 'Linux 6.6+ LTS',
      factor: 1.13,
      npuSupported: false
    },
    'intel-i9-14900': {
      name: 'Intel Core i9-14900 (65W, 24C/32T)',
      family: 'Raptor Lake-R',
      npu: 'None',
      vector: 'AVX2 + FMA3 + VNNI',
      driver: 'Linux 6.6+ LTS',
      factor: 1.09,
      npuSupported: false
    },
    'intel-i9-14900f': {
      name: 'Intel Core i9-14900F (65W, 24C/32T, No iGPU)',
      family: 'Raptor Lake-R',
      npu: 'None',
      vector: 'AVX2 + FMA3 + VNNI',
      driver: 'Linux 6.6+ LTS',
      factor: 1.09,
      npuSupported: false
    },
    'intel-i9-14900t': {
      name: 'Intel Core i9-14900T (35W Eco, 24C/32T)',
      family: 'Raptor Lake-R',
      npu: 'None',
      vector: 'AVX2 + FMA3 + VNNI',
      driver: 'Linux 6.6+ LTS',
      factor: 1.03,
      npuSupported: false
    },
    'intel-i7-14700k': {
      name: 'Intel Core i7-14700K (20C/28T, 5.6 GHz)',
      family: 'Raptor Lake-R',
      npu: 'None',
      vector: 'AVX2 + FMA3 + VNNI',
      driver: 'Linux 6.6+ LTS',
      factor: 1.09,
      npuSupported: false
    },
    'intel-i7-14700kf': {
      name: 'Intel Core i7-14700KF (20C/28T, Discrete GPU)',
      family: 'Raptor Lake-R',
      npu: 'None',
      vector: 'AVX2 + FMA3 + VNNI',
      driver: 'Linux 6.6+ LTS',
      factor: 1.09,
      npuSupported: false
    },
    'intel-i7-14700': {
      name: 'Intel Core i7-14700 (20C/28T, 65W)',
      family: 'Raptor Lake-R',
      npu: 'None',
      vector: 'AVX2 + FMA3 + VNNI',
      driver: 'Linux 6.6+ LTS',
      factor: 1.05,
      npuSupported: false
    },
    'intel-i7-14700f': {
      name: 'Intel Core i7-14700F (20C/28T, 65W, No iGPU)',
      family: 'Raptor Lake-R',
      npu: 'None',
      vector: 'AVX2 + FMA3 + VNNI',
      driver: 'Linux 6.6+ LTS',
      factor: 1.05,
      npuSupported: false
    },
    'intel-i7-14700t': {
      name: 'Intel Core i7-14700T (20C/28T, 35W Eco)',
      family: 'Raptor Lake-R',
      npu: 'None',
      vector: 'AVX2 + FMA3 + VNNI',
      driver: 'Linux 6.6+ LTS',
      factor: 0.99,
      npuSupported: false
    },
    'intel-i5-14600k': {
      name: 'Intel Core i5-14600K (14C/20T, 5.3 GHz)',
      family: 'Raptor Lake-R',
      npu: 'None',
      vector: 'AVX2 + FMA3 + VNNI',
      driver: 'Linux 6.6+ LTS',
      factor: 1.04,
      npuSupported: false
    },
    'intel-i5-14600kf': {
      name: 'Intel Core i5-14600KF (14C/20T, Discrete GPU)',
      family: 'Raptor Lake-R',
      npu: 'None',
      vector: 'AVX2 + FMA3 + VNNI',
      driver: 'Linux 6.6+ LTS',
      factor: 1.04,
      npuSupported: false
    },
    'intel-i5-14600': {
      name: 'Intel Core i5-14600 (14C/20T, 65W)',
      family: 'Raptor Lake-R',
      npu: 'None',
      vector: 'AVX2 + FMA3 + VNNI',
      driver: 'Linux 6.6+ LTS',
      factor: 1.00,
      npuSupported: false
    },
    'intel-i5-14500': {
      name: 'Intel Core i5-14500 (14C/20T, 65W)',
      family: 'Raptor Lake-R',
      npu: 'None',
      vector: 'AVX2 + FMA3 + VNNI',
      driver: 'Linux 6.6+ LTS',
      factor: 0.98,
      npuSupported: false
    },
    'intel-i5-14400': {
      name: 'Intel Core i5-14400 (10C/16T, 65W)',
      family: 'Raptor Lake-R',
      npu: 'None',
      vector: 'AVX2 + FMA3 + VNNI',
      driver: 'Linux 6.6+ LTS',
      factor: 0.94,
      npuSupported: false
    },
    'intel-i5-14400f': {
      name: 'Intel Core i5-14400F (10C/16T, No iGPU)',
      family: 'Raptor Lake-R',
      npu: 'None',
      vector: 'AVX2 + FMA3 + VNNI',
      driver: 'Linux 6.6+ LTS',
      factor: 0.94,
      npuSupported: false
    },
    'intel-i3-14100': {
      name: 'Intel Core i3-14100 (4C/8T, 60W)',
      family: 'Raptor Lake-R',
      npu: 'None',
      vector: 'AVX2 + FMA3 + VNNI',
      driver: 'Linux 6.6+ LTS',
      factor: 0.88,
      npuSupported: false
    },
    'intel-i3-14100f': {
      name: 'Intel Core i3-14100F (4C/8T, Entry)',
      family: 'Raptor Lake-R',
      npu: 'None',
      vector: 'AVX2 + FMA3 + VNNI',
      driver: 'Linux 6.6+ LTS',
      factor: 0.88,
      npuSupported: false
    },
    'intel-i9-14900hx': {
      name: 'Intel Core i9-14900HX (Mobile 24C/32T, 5.8 GHz)',
      family: 'Raptor Lake-HX',
      npu: 'None',
      vector: 'AVX2 + FMA3 + VNNI',
      driver: 'Linux 6.6+ LTS',
      factor: 1.10,
      npuSupported: false
    },

    /* 4. Intel 13th Gen Core (Raptor Lake) [18 models] */
    'intel-i9-13900ks': {
      name: 'Intel Core i9-13900KS (6.0 GHz, 24C/32T)',
      family: 'Raptor Lake',
      npu: 'None',
      vector: 'AVX2 + FMA3 + VNNI',
      driver: 'Linux 6.1+ LTS',
      factor: 1.12,
      npuSupported: false
    },
    'intel-i9-13900k': {
      name: 'Intel Core i9-13900K (24C/32T, 5.8 GHz)',
      family: 'Raptor Lake',
      npu: 'None',
      vector: 'AVX2 + FMA3 + VNNI',
      driver: 'Linux 6.1+ LTS',
      factor: 1.11,
      npuSupported: false
    },
    'intel-i9-13900kf': {
      name: 'Intel Core i9-13900KF (24C/32T, Discrete GPU)',
      family: 'Raptor Lake',
      npu: 'None',
      vector: 'AVX2 + FMA3 + VNNI',
      driver: 'Linux 6.1+ LTS',
      factor: 1.11,
      npuSupported: false
    },
    'intel-i9-13900': {
      name: 'Intel Core i9-13900 (65W, 24C/32T)',
      family: 'Raptor Lake',
      npu: 'None',
      vector: 'AVX2 + FMA3 + VNNI',
      driver: 'Linux 6.1+ LTS',
      factor: 1.07,
      npuSupported: false
    },
    'intel-i9-13900f': {
      name: 'Intel Core i9-13900F (65W, No iGPU)',
      family: 'Raptor Lake',
      npu: 'None',
      vector: 'AVX2 + FMA3 + VNNI',
      driver: 'Linux 6.1+ LTS',
      factor: 1.07,
      npuSupported: false
    },
    'intel-i7-13700k': {
      name: 'Intel Core i7-13700K (16C/24T, 5.4 GHz)',
      family: 'Raptor Lake',
      npu: 'None',
      vector: 'AVX2 + FMA3 + VNNI',
      driver: 'Linux 6.1+ LTS',
      factor: 1.07,
      npuSupported: false
    },
    'intel-i7-13700kf': {
      name: 'Intel Core i7-13700KF (16C/24T, Discrete GPU)',
      family: 'Raptor Lake',
      npu: 'None',
      vector: 'AVX2 + FMA3 + VNNI',
      driver: 'Linux 6.1+ LTS',
      factor: 1.07,
      npuSupported: false
    },
    'intel-i7-13700': {
      name: 'Intel Core i7-13700 (65W, 16C/24T)',
      family: 'Raptor Lake',
      npu: 'None',
      vector: 'AVX2 + FMA3 + VNNI',
      driver: 'Linux 6.1+ LTS',
      factor: 1.03,
      npuSupported: false
    },
    'intel-i7-13700f': {
      name: 'Intel Core i7-13700F (65W, No iGPU)',
      family: 'Raptor Lake',
      npu: 'None',
      vector: 'AVX2 + FMA3 + VNNI',
      driver: 'Linux 6.1+ LTS',
      factor: 1.03,
      npuSupported: false
    },
    'intel-i5-13600k': {
      name: 'Intel Core i5-13600K (14C/20T, 5.1 GHz)',
      family: 'Raptor Lake',
      npu: 'None',
      vector: 'AVX2 + FMA3 + VNNI',
      driver: 'Linux 6.1+ LTS',
      factor: 1.02,
      npuSupported: false
    },
    'intel-i5-13600kf': {
      name: 'Intel Core i5-13600KF (14C/20T, Discrete GPU)',
      family: 'Raptor Lake',
      npu: 'None',
      vector: 'AVX2 + FMA3 + VNNI',
      driver: 'Linux 6.1+ LTS',
      factor: 1.02,
      npuSupported: false
    },
    'intel-i5-13500': {
      name: 'Intel Core i5-13500 (14C/20T, 65W)',
      family: 'Raptor Lake',
      npu: 'None',
      vector: 'AVX2 + FMA3 + VNNI',
      driver: 'Linux 6.1+ LTS',
      factor: 0.97,
      npuSupported: false
    },
    'intel-i5-13400': {
      name: 'Intel Core i5-13400 (10C/16T, 65W)',
      family: 'Raptor Lake',
      npu: 'None',
      vector: 'AVX2 + FMA3 + VNNI',
      driver: 'Linux 6.1+ LTS',
      factor: 0.93,
      npuSupported: false
    },
    'intel-i5-13400f': {
      name: 'Intel Core i5-13400F (10C/16T, No iGPU)',
      family: 'Raptor Lake',
      npu: 'None',
      vector: 'AVX2 + FMA3 + VNNI',
      driver: 'Linux 6.1+ LTS',
      factor: 0.93,
      npuSupported: false
    },
    'intel-i3-13100': {
      name: 'Intel Core i3-13100 (4C/8T, 60W)',
      family: 'Raptor Lake',
      npu: 'None',
      vector: 'AVX2 + FMA3 + VNNI',
      driver: 'Linux 6.1+ LTS',
      factor: 0.86,
      npuSupported: false
    },
    'intel-i9-13980hx': {
      name: 'Intel Core i9-13980HX (Laptop Flagship, 24C/32T)',
      family: 'Raptor Lake-HX',
      npu: 'None',
      vector: 'AVX2 + FMA3 + VNNI',
      driver: 'Linux 6.1+ LTS',
      factor: 1.09,
      npuSupported: false
    },
    'intel-i9-13900hx': {
      name: 'Intel Core i9-13900HX (Mobile 24C/32T)',
      family: 'Raptor Lake-HX',
      npu: 'None',
      vector: 'AVX2 + FMA3 + VNNI',
      driver: 'Linux 6.1+ LTS',
      factor: 1.07,
      npuSupported: false
    },
    'intel-i7-13700h': {
      name: 'Intel Core i7-13700H (Mobile 14C/20T)',
      family: 'Raptor Lake-H',
      npu: 'None',
      vector: 'AVX2 + FMA3 + VNNI',
      driver: 'Linux 6.1+ LTS',
      factor: 1.00,
      npuSupported: false
    },

    /* 5. Intel 12th Gen Core (Alder Lake) [14 models] */
    'intel-i9-12900ks': {
      name: 'Intel Core i9-12900KS (5.5 GHz, 16C/24T)',
      family: 'Alder Lake',
      npu: 'None',
      vector: 'AVX2 + FMA3 + VNNI',
      driver: 'Linux 5.15+ LTS',
      factor: 1.06,
      npuSupported: false
    },
    'intel-i9-12900k': {
      name: 'Intel Core i9-12900K (16C/24T, 5.2 GHz)',
      family: 'Alder Lake',
      npu: 'None',
      vector: 'AVX2 + FMA3 + VNNI',
      driver: 'Linux 5.15+ LTS',
      factor: 1.05,
      npuSupported: false
    },
    'intel-i9-12900kf': {
      name: 'Intel Core i9-12900KF (16C/24T, Discrete GPU)',
      family: 'Alder Lake',
      npu: 'None',
      vector: 'AVX2 + FMA3 + VNNI',
      driver: 'Linux 5.15+ LTS',
      factor: 1.05,
      npuSupported: false
    },
    'intel-i9-12900': {
      name: 'Intel Core i9-12900 (65W, 16C/24T)',
      family: 'Alder Lake',
      npu: 'None',
      vector: 'AVX2 + FMA3 + VNNI',
      driver: 'Linux 5.15+ LTS',
      factor: 1.01,
      npuSupported: false
    },
    'intel-i7-12700k': {
      name: 'Intel Core i7-12700K (12C/20T, 5.0 GHz)',
      family: 'Alder Lake',
      npu: 'None',
      vector: 'AVX2 + FMA3 + VNNI',
      driver: 'Linux 5.15+ LTS',
      factor: 1.02,
      npuSupported: false
    },
    'intel-i7-12700kf': {
      name: 'Intel Core i7-12700KF (12C/20T, Discrete GPU)',
      family: 'Alder Lake',
      npu: 'None',
      vector: 'AVX2 + FMA3 + VNNI',
      driver: 'Linux 5.15+ LTS',
      factor: 1.02,
      npuSupported: false
    },
    'intel-i7-12700': {
      name: 'Intel Core i7-12700 (65W, 12C/20T)',
      family: 'Alder Lake',
      npu: 'None',
      vector: 'AVX2 + FMA3 + VNNI',
      driver: 'Linux 5.15+ LTS',
      factor: 0.98,
      npuSupported: false
    },
    'intel-i5-12600k': {
      name: 'Intel Core i5-12600K (10C/16T, 4.9 GHz)',
      family: 'Alder Lake',
      npu: 'None',
      vector: 'AVX2 + FMA3 + VNNI',
      driver: 'Linux 5.15+ LTS',
      factor: 0.98,
      npuSupported: false
    },
    'intel-i5-12600kf': {
      name: 'Intel Core i5-12600KF (10C/16T, Discrete GPU)',
      family: 'Alder Lake',
      npu: 'None',
      vector: 'AVX2 + FMA3 + VNNI',
      driver: 'Linux 5.15+ LTS',
      factor: 0.98,
      npuSupported: false
    },
    'intel-i5-12400': {
      name: 'Intel Core i5-12400 (6C/12T, 65W Budget King)',
      family: 'Alder Lake',
      npu: 'None',
      vector: 'AVX2 + FMA3 + VNNI',
      driver: 'Linux 5.15+ LTS',
      factor: 0.91,
      npuSupported: false
    },
    'intel-i5-12400f': {
      name: 'Intel Core i5-12400F (6C/12T, No iGPU)',
      family: 'Alder Lake',
      npu: 'None',
      vector: 'AVX2 + FMA3 + VNNI',
      driver: 'Linux 5.15+ LTS',
      factor: 0.91,
      npuSupported: false
    },
    'intel-i3-12100': {
      name: 'Intel Core i3-12100 (4C/8T, 60W)',
      family: 'Alder Lake',
      npu: 'None',
      vector: 'AVX2 + FMA3 + VNNI',
      driver: 'Linux 5.15+ LTS',
      factor: 0.84,
      npuSupported: false
    },
    'intel-i9-12900hx': {
      name: 'Intel Core i9-12900HX (Mobile 16C/24T)',
      family: 'Alder Lake-HX',
      npu: 'None',
      vector: 'AVX2 + FMA3 + VNNI',
      driver: 'Linux 5.15+ LTS',
      factor: 1.03,
      npuSupported: false
    },
    'intel-i7-12700h': {
      name: 'Intel Core i7-12700H (Mobile 14C/20T)',
      family: 'Alder Lake-H',
      npu: 'None',
      vector: 'AVX2 + FMA3 + VNNI',
      driver: 'Linux 5.15+ LTS',
      factor: 0.97,
      npuSupported: false
    },

    /* 6. Intel 11th & 10th Gen Core [8 models] */
    'intel-i9-11900k': {
      name: 'Intel Core i9-11900K (8C/16T, AVX-512 Native)',
      family: 'Rocket Lake',
      npu: 'None',
      vector: 'AVX-512 + VNNI + FMA3',
      driver: 'Linux 5.11+ LTS',
      factor: 1.01,
      npuSupported: false
    },
    'intel-i7-11700k': {
      name: 'Intel Core i7-11700K (8C/16T, AVX-512)',
      family: 'Rocket Lake',
      npu: 'None',
      vector: 'AVX-512 + VNNI + FMA3',
      driver: 'Linux 5.11+ LTS',
      factor: 0.98,
      npuSupported: false
    },
    'intel-i5-11600k': {
      name: 'Intel Core i5-11600K (6C/12T, AVX-512)',
      family: 'Rocket Lake',
      npu: 'None',
      vector: 'AVX-512 + VNNI + FMA3',
      driver: 'Linux 5.11+ LTS',
      factor: 0.93,
      npuSupported: false
    },
    'intel-i5-11400': {
      name: 'Intel Core i5-11400 (6C/12T, AVX-512)',
      family: 'Rocket Lake',
      npu: 'None',
      vector: 'AVX-512 + VNNI + FMA3',
      driver: 'Linux 5.11+ LTS',
      factor: 0.89,
      npuSupported: false
    },
    'intel-i7-11800h': {
      name: 'Intel Core i7-11800H (Mobile 8C/16T, AVX-512)',
      family: 'Tiger Lake-H',
      npu: 'None',
      vector: 'AVX-512 + VNNI',
      driver: 'Linux 5.11+ LTS',
      factor: 0.94,
      npuSupported: false
    },
    'intel-i9-10900k': {
      name: 'Intel Core i9-10900K (10C/20T, 5.3 GHz)',
      family: 'Comet Lake',
      npu: 'None',
      vector: 'AVX2 + FMA3',
      driver: 'Linux 5.4+ LTS',
      factor: 0.96,
      npuSupported: false
    },
    'intel-i7-10700k': {
      name: 'Intel Core i7-10700K (8C/16T, 5.1 GHz)',
      family: 'Comet Lake',
      npu: 'None',
      vector: 'AVX2 + FMA3',
      driver: 'Linux 5.4+ LTS',
      factor: 0.92,
      npuSupported: false
    },
    'intel-i5-10400': {
      name: 'Intel Core i5-10400 (6C/12T, Budget Baseline)',
      family: 'Comet Lake',
      npu: 'None',
      vector: 'AVX2 + FMA3',
      driver: 'Linux 5.4+ LTS',
      factor: 0.84,
      npuSupported: false
    },

    /* 7. Intel Xeon Workstation & Server [12 models] */
    'intel-xeon-w9-3495x': {
      name: 'Intel Xeon w9-3495X (56C/112T, AMX + 8-Ch DDR5)',
      family: 'Sapphire Rapids-WS',
      npu: 'Dedicated PCIe NPU',
      vector: 'Dual AVX-512 + AMX (BF16/INT8)',
      driver: 'Linux 6.2+ Enterprise',
      factor: 1.35,
      npuSupported: false
    },
    'intel-xeon-w9-3475x': {
      name: 'Intel Xeon w9-3475X (36C/72T, AMX + 8-Ch DDR5)',
      family: 'Sapphire Rapids-WS',
      npu: 'Dedicated PCIe NPU',
      vector: 'Dual AVX-512 + AMX',
      driver: 'Linux 6.2+ Enterprise',
      factor: 1.32,
      npuSupported: false
    },
    'intel-xeon-w7-3465x': {
      name: 'Intel Xeon w7-3465X (28C/56T, AMX + 8-Ch DDR5)',
      family: 'Sapphire Rapids-WS',
      npu: 'Dedicated PCIe NPU',
      vector: 'Dual AVX-512 + AMX',
      driver: 'Linux 6.2+ Enterprise',
      factor: 1.29,
      npuSupported: false
    },
    'intel-xeon-w7-2495x': {
      name: 'Intel Xeon w7-2495X (24C/48T, 4-Ch DDR5)',
      family: 'Sapphire Rapids-WS',
      npu: 'Dedicated PCIe NPU',
      vector: 'Dual AVX-512 + AMX',
      driver: 'Linux 6.2+ Enterprise',
      factor: 1.26,
      npuSupported: false
    },
    'intel-xeon-w5-3435x': {
      name: 'Intel Xeon w5-3435X (16C/32T, 8-Ch DDR5)',
      family: 'Sapphire Rapids-WS',
      npu: 'Dedicated PCIe NPU',
      vector: 'Dual AVX-512 + AMX',
      driver: 'Linux 6.2+ Enterprise',
      factor: 1.23,
      npuSupported: false
    },
    'intel-xeon-w5-2465x': {
      name: 'Intel Xeon w5-2465X (16C/32T, 4-Ch DDR5)',
      family: 'Sapphire Rapids-WS',
      npu: 'Dedicated PCIe NPU',
      vector: 'Dual AVX-512 + AMX',
      driver: 'Linux 6.2+ Enterprise',
      factor: 1.20,
      npuSupported: false
    },
    'intel-xeon-plat-8592plus': {
      name: 'Intel Xeon Platinum 8592+ (64C/128T Emerald Rapids)',
      family: 'Emerald Rapids-SP',
      npu: 'Enterprise QAT/DLB',
      vector: 'Dual AVX-512 + AMX (BF16/INT8)',
      driver: 'Linux 6.6+ LTS Enterprise',
      factor: 1.40,
      npuSupported: false
    },
    'intel-xeon-plat-8490h': {
      name: 'Intel Xeon Platinum 8490H (60C/120T Sapphire Rapids)',
      family: 'Sapphire Rapids-SP',
      npu: 'Enterprise QAT/DLB',
      vector: 'Dual AVX-512 + AMX',
      driver: 'Linux 6.2+ Enterprise',
      factor: 1.38,
      npuSupported: false
    },
    'intel-xeon-plat-8480plus': {
      name: 'Intel Xeon Platinum 8480+ (56C/112T, AMX)',
      family: 'Sapphire Rapids-SP',
      npu: 'Enterprise QAT',
      vector: 'Dual AVX-512 + AMX',
      driver: 'Linux 6.2+ Enterprise',
      factor: 1.36,
      npuSupported: false
    },
    'intel-xeon-gold-6548yplus': {
      name: 'Intel Xeon Gold 6548Y+ (32C/64T Emerald Rapids)',
      family: 'Emerald Rapids-SP',
      npu: 'Enterprise QAT',
      vector: 'Dual AVX-512 + AMX',
      driver: 'Linux 6.6+ Enterprise',
      factor: 1.30,
      npuSupported: false
    },
    'intel-xeon-gold-6448y': {
      name: 'Intel Xeon Gold 6448Y (32C/64T Sapphire Rapids)',
      family: 'Sapphire Rapids-SP',
      npu: 'Enterprise QAT',
      vector: 'Dual AVX-512 + AMX',
      driver: 'Linux 6.2+ Enterprise',
      factor: 1.28,
      npuSupported: false
    },
    'intel-xeon-silver-4514y': {
      name: 'Intel Xeon Silver 4514Y (16C/32T Emerald Rapids)',
      family: 'Emerald Rapids-SP',
      npu: 'Enterprise QAT',
      vector: 'Dual AVX-512 + AMX',
      driver: 'Linux 6.6+ Enterprise',
      factor: 1.22,
      npuSupported: false
    },
    /* --- Additional 100 Intel CPU Variants (200 Total) --- */
    /* Group 1: Arrow Lake Mobile (Core Ultra 200 H & HX Series) [10 models] */
    'intel-ultra-9-285hx': {
      name: 'Intel Core Ultra 9 285HX (24C/24T, 5.5 GHz Mobile)',
      family: 'Arrow Lake-HX',
      npu: 'Intel NPU 3 (13 TOPS)',
      vector: 'AVX2 + VNNI + Intel AMX',
      driver: 'Linux 6.12+ (intel_vpu)',
      factor: 1.20,
      npuSupported: true
    },
    'intel-ultra-7-275hx': {
      name: 'Intel Core Ultra 7 275HX (20C/20T, 5.4 GHz)',
      family: 'Arrow Lake-HX',
      npu: 'Intel NPU 3 (13 TOPS)',
      vector: 'AVX2 + VNNI + Intel AMX',
      driver: 'Linux 6.12+ (intel_vpu)',
      factor: 1.16,
      npuSupported: true
    },
    'intel-ultra-7-265hx': {
      name: 'Intel Core Ultra 7 265HX (20C/20T, 5.3 GHz)',
      family: 'Arrow Lake-HX',
      npu: 'Intel NPU 3 (13 TOPS)',
      vector: 'AVX2 + VNNI + Intel AMX',
      driver: 'Linux 6.12+ (intel_vpu)',
      factor: 1.15,
      npuSupported: true
    },
    'intel-ultra-5-255hx': {
      name: 'Intel Core Ultra 5 255HX (14C/14T, 5.2 GHz)',
      family: 'Arrow Lake-HX',
      npu: 'Intel NPU 3 (13 TOPS)',
      vector: 'AVX2 + VNNI + Intel AMX',
      driver: 'Linux 6.12+ (intel_vpu)',
      factor: 1.11,
      npuSupported: true
    },
    'intel-ultra-5-245hx': {
      name: 'Intel Core Ultra 5 245HX (14C/14T, 5.1 GHz)',
      family: 'Arrow Lake-HX',
      npu: 'Intel NPU 3 (13 TOPS)',
      vector: 'AVX2 + VNNI + Intel AMX',
      driver: 'Linux 6.12+ (intel_vpu)',
      factor: 1.09,
      npuSupported: true
    },
    'intel-ultra-9-285h': {
      name: 'Intel Core Ultra 9 285H (16C/16T, 45W, Arc Xe2)',
      family: 'Arrow Lake-H',
      npu: 'Intel NPU 3 (13 TOPS)',
      vector: 'AVX2 + VNNI + Intel AMX',
      driver: 'Linux 6.12+ (intel_vpu)',
      factor: 1.14,
      npuSupported: true
    },
    'intel-ultra-7-265h': {
      name: 'Intel Core Ultra 7 265H (16C/16T, 45W, Arc Xe2)',
      family: 'Arrow Lake-H',
      npu: 'Intel NPU 3 (13 TOPS)',
      vector: 'AVX2 + VNNI + Intel AMX',
      driver: 'Linux 6.12+ (intel_vpu)',
      factor: 1.12,
      npuSupported: true
    },
    'intel-ultra-7-255h': {
      name: 'Intel Core Ultra 7 255H (16C/16T, 28W)',
      family: 'Arrow Lake-H',
      npu: 'Intel NPU 3 (13 TOPS)',
      vector: 'AVX2 + VNNI + Intel AMX',
      driver: 'Linux 6.12+ (intel_vpu)',
      factor: 1.10,
      npuSupported: true
    },
    'intel-ultra-5-235h': {
      name: 'Intel Core Ultra 5 235H (14C/14T, 28W)',
      family: 'Arrow Lake-H',
      npu: 'Intel NPU 3 (13 TOPS)',
      vector: 'AVX2 + VNNI + Intel AMX',
      driver: 'Linux 6.12+ (intel_vpu)',
      factor: 1.06,
      npuSupported: true
    },
    'intel-ultra-5-225h': {
      name: 'Intel Core Ultra 5 225H (14C/14T, 28W)',
      family: 'Arrow Lake-H',
      npu: 'Intel NPU 3 (13 TOPS)',
      vector: 'AVX2 + VNNI + Intel AMX',
      driver: 'Linux 6.12+ (intel_vpu)',
      factor: 1.04,
      npuSupported: true
    },
    /* Group 2: Core Ultra 100 Meteor Lake Ultra-Low Power [4 models] */
    'intel-ultra-7-165ul': {
      name: 'Intel Core Ultra 7 165U vPro (12C/14T, 15W)',
      family: 'Meteor Lake',
      npu: 'Intel NPU 3 (11 TOPS)',
      vector: 'AVX2 + VNNI',
      driver: 'Linux 6.8+ (intel_vpu)',
      factor: 0.98,
      npuSupported: true
    },
    'intel-ultra-7-155ul': {
      name: 'Intel Core Ultra 7 155U vPro (12C/14T, 15W)',
      family: 'Meteor Lake',
      npu: 'Intel NPU 3 (11 TOPS)',
      vector: 'AVX2 + VNNI',
      driver: 'Linux 6.8+ (intel_vpu)',
      factor: 0.96,
      npuSupported: true
    },
    'intel-ultra-5-135ul': {
      name: 'Intel Core Ultra 5 135U vPro (12C/14T, 15W)',
      family: 'Meteor Lake',
      npu: 'Intel NPU 3 (11 TOPS)',
      vector: 'AVX2 + VNNI',
      driver: 'Linux 6.8+ (intel_vpu)',
      factor: 0.94,
      npuSupported: true
    },
    'intel-ultra-5-115u': {
      name: 'Intel Core Ultra 5 115U (8C/10T, 15W)',
      family: 'Meteor Lake',
      npu: 'Intel NPU 3 (11 TOPS)',
      vector: 'AVX2 + VNNI',
      driver: 'Linux 6.8+ (intel_vpu)',
      factor: 0.90,
      npuSupported: true
    },
    /* Group 3: More 14th Gen Core (T, E & HX Variants) [8 models] */
    'intel-processor-300': {
      name: 'Intel Processor 300 (2C/4T, 3.9 GHz, 46W)',
      family: 'Raptor Lake-R',
      npu: 'None',
      vector: 'AVX2 + FMA3',
      driver: 'Linux 6.6+ LTS',
      factor: 0.72,
      npuSupported: false
    },
    'intel-processor-300t': {
      name: 'Intel Processor 300T (2C/4T, 35W Eco)',
      family: 'Raptor Lake-R',
      npu: 'None',
      vector: 'AVX2 + FMA3',
      driver: 'Linux 6.6+ LTS',
      factor: 0.68,
      npuSupported: false
    },
    'intel-i5-14400t': {
      name: 'Intel Core i5-14400T (10C/16T, 35W Eco)',
      family: 'Raptor Lake-R',
      npu: 'None',
      vector: 'AVX2 + FMA3 + VNNI',
      driver: 'Linux 6.6+ LTS',
      factor: 0.90,
      npuSupported: false
    },
    'intel-i3-14100t': {
      name: 'Intel Core i3-14100T (4C/8T, 35W Eco)',
      family: 'Raptor Lake-R',
      npu: 'None',
      vector: 'AVX2 + FMA3 + VNNI',
      driver: 'Linux 6.6+ LTS',
      factor: 0.82,
      npuSupported: false
    },
    'intel-i7-14700e': {
      name: 'Intel Core i7-14700E (20C/28T, 65W Embedded)',
      family: 'Raptor Lake-R',
      npu: 'None',
      vector: 'AVX2 + FMA3 + VNNI',
      driver: 'Linux 6.6+ LTS',
      factor: 1.04,
      npuSupported: false
    },
    'intel-i5-14500e': {
      name: 'Intel Core i5-14500E (14C/20T, 65W Embedded)',
      family: 'Raptor Lake-R',
      npu: 'None',
      vector: 'AVX2 + FMA3 + VNNI',
      driver: 'Linux 6.6+ LTS',
      factor: 0.97,
      npuSupported: false
    },
    'intel-i3-14100e': {
      name: 'Intel Core i3-14100E (4C/8T, 60W Embedded)',
      family: 'Raptor Lake-R',
      npu: 'None',
      vector: 'AVX2 + FMA3 + VNNI',
      driver: 'Linux 6.6+ LTS',
      factor: 0.86,
      npuSupported: false
    },
    'intel-i5-14450hx': {
      name: 'Intel Core i5-14450HX (Mobile 10C/16T)',
      family: 'Raptor Lake-HX',
      npu: 'None',
      vector: 'AVX2 + FMA3 + VNNI',
      driver: 'Linux 6.6+ LTS',
      factor: 0.94,
      npuSupported: false
    },
    /* Group 4: More 13th Gen Core (HX, HK, H, P, U Variants) [18 models] */
    'intel-i9-13950hx': {
      name: 'Intel Core i9-13950HX (24C/32T, 5.5 GHz Mobile)',
      family: 'Raptor Lake-HX',
      npu: 'None',
      vector: 'AVX2 + FMA3 + VNNI',
      driver: 'Linux 6.1+ LTS',
      factor: 1.08,
      npuSupported: false
    },
    'intel-i9-13900hk': {
      name: 'Intel Core i9-13900HK (14C/20T, 5.4 GHz Unlocked)',
      family: 'Raptor Lake-H',
      npu: 'None',
      vector: 'AVX2 + FMA3 + VNNI',
      driver: 'Linux 6.1+ LTS',
      factor: 1.04,
      npuSupported: false
    },
    'intel-i9-13900h': {
      name: 'Intel Core i9-13900H (14C/20T, 5.4 GHz)',
      family: 'Raptor Lake-H',
      npu: 'None',
      vector: 'AVX2 + FMA3 + VNNI',
      driver: 'Linux 6.1+ LTS',
      factor: 1.03,
      npuSupported: false
    },
    'intel-i7-13850hx': {
      name: 'Intel Core i7-13850HX (20C/28T, 5.3 GHz Mobile)',
      family: 'Raptor Lake-HX',
      npu: 'None',
      vector: 'AVX2 + FMA3 + VNNI',
      driver: 'Linux 6.1+ LTS',
      factor: 1.05,
      npuSupported: false
    },
    'intel-i7-13650hx': {
      name: 'Intel Core i7-13650HX (14C/20T, 4.9 GHz)',
      family: 'Raptor Lake-HX',
      npu: 'None',
      vector: 'AVX2 + FMA3 + VNNI',
      driver: 'Linux 6.1+ LTS',
      factor: 1.00,
      npuSupported: false
    },
    'intel-i7-13620h': {
      name: 'Intel Core i7-13620H (10C/16T, 4.9 GHz)',
      family: 'Raptor Lake-H',
      npu: 'None',
      vector: 'AVX2 + FMA3 + VNNI',
      driver: 'Linux 6.1+ LTS',
      factor: 0.98,
      npuSupported: false
    },
    'intel-i7-1370p': {
      name: 'Intel Core i7-1370P (14C/20T, 28W Ultrabook)',
      family: 'Raptor Lake-P',
      npu: 'None',
      vector: 'AVX2 + FMA3 + VNNI',
      driver: 'Linux 6.1+ LTS',
      factor: 0.99,
      npuSupported: false
    },
    'intel-i7-1360p': {
      name: 'Intel Core i7-1360P (12C/16T, 28W Ultrabook)',
      family: 'Raptor Lake-P',
      npu: 'None',
      vector: 'AVX2 + FMA3 + VNNI',
      driver: 'Linux 6.1+ LTS',
      factor: 0.97,
      npuSupported: false
    },
    'intel-i7-1365u': {
      name: 'Intel Core i7-1365U (10C/12T, 15W vPro)',
      family: 'Raptor Lake-U',
      npu: 'None',
      vector: 'AVX2 + FMA3 + VNNI',
      driver: 'Linux 6.1+ LTS',
      factor: 0.94,
      npuSupported: false
    },
    'intel-i7-1355u': {
      name: 'Intel Core i7-1355U (10C/12T, 15W)',
      family: 'Raptor Lake-U',
      npu: 'None',
      vector: 'AVX2 + FMA3 + VNNI',
      driver: 'Linux 6.1+ LTS',
      factor: 0.93,
      npuSupported: false
    },
    'intel-i5-13600hx': {
      name: 'Intel Core i5-13600HX (14C/20T, 4.8 GHz)',
      family: 'Raptor Lake-HX',
      npu: 'None',
      vector: 'AVX2 + FMA3 + VNNI',
      driver: 'Linux 6.1+ LTS',
      factor: 0.99,
      npuSupported: false
    },
    'intel-i5-13500hx': {
      name: 'Intel Core i5-13500HX (14C/20T, 4.7 GHz)',
      family: 'Raptor Lake-HX',
      npu: 'None',
      vector: 'AVX2 + FMA3 + VNNI',
      driver: 'Linux 6.1+ LTS',
      factor: 0.97,
      npuSupported: false
    },
    'intel-i5-13500h': {
      name: 'Intel Core i5-13500H (12C/16T, 4.7 GHz)',
      family: 'Raptor Lake-H',
      npu: 'None',
      vector: 'AVX2 + FMA3 + VNNI',
      driver: 'Linux 6.1+ LTS',
      factor: 0.95,
      npuSupported: false
    },
    'intel-i5-13450hx': {
      name: 'Intel Core i5-13450HX (10C/16T, 4.6 GHz)',
      family: 'Raptor Lake-HX',
      npu: 'None',
      vector: 'AVX2 + FMA3 + VNNI',
      driver: 'Linux 6.1+ LTS',
      factor: 0.93,
      npuSupported: false
    },
    'intel-i5-13420h': {
      name: 'Intel Core i5-13420H (8C/12T, 4.6 GHz)',
      family: 'Raptor Lake-H',
      npu: 'None',
      vector: 'AVX2 + FMA3 + VNNI',
      driver: 'Linux 6.1+ LTS',
      factor: 0.90,
      npuSupported: false
    },
    'intel-i5-1350p': {
      name: 'Intel Core i5-1350P (12C/16T, 28W vPro)',
      family: 'Raptor Lake-P',
      npu: 'None',
      vector: 'AVX2 + FMA3 + VNNI',
      driver: 'Linux 6.1+ LTS',
      factor: 0.93,
      npuSupported: false
    },
    'intel-i5-1340p': {
      name: 'Intel Core i5-1340P (12C/16T, 28W)',
      family: 'Raptor Lake-P',
      npu: 'None',
      vector: 'AVX2 + FMA3 + VNNI',
      driver: 'Linux 6.1+ LTS',
      factor: 0.92,
      npuSupported: false
    },
    'intel-i5-1335u': {
      name: 'Intel Core i5-1335U (10C/12T, 15W)',
      family: 'Raptor Lake-U',
      npu: 'None',
      vector: 'AVX2 + FMA3 + VNNI',
      driver: 'Linux 6.1+ LTS',
      factor: 0.89,
      npuSupported: false
    },
    /* Group 5: More 12th Gen Core (Alder Lake Mobile, Desktop & Entry) [16 models] */
    'intel-i9-12950hx': {
      name: 'Intel Core i9-12950HX (16C/24T, 5.0 GHz vPro)',
      family: 'Alder Lake-HX',
      npu: 'None',
      vector: 'AVX2 + FMA3 + VNNI',
      driver: 'Linux 5.15+ LTS',
      factor: 1.04,
      npuSupported: false
    },
    'intel-i9-12900hk': {
      name: 'Intel Core i9-12900HK (14C/20T, 5.0 GHz Unlocked)',
      family: 'Alder Lake-H',
      npu: 'None',
      vector: 'AVX2 + FMA3 + VNNI',
      driver: 'Linux 5.15+ LTS',
      factor: 1.01,
      npuSupported: false
    },
    'intel-i9-12900h': {
      name: 'Intel Core i9-12900H (14C/20T, 5.0 GHz)',
      family: 'Alder Lake-H',
      npu: 'None',
      vector: 'AVX2 + FMA3 + VNNI',
      driver: 'Linux 5.15+ LTS',
      factor: 1.00,
      npuSupported: false
    },
    'intel-i7-12850hx': {
      name: 'Intel Core i7-12850HX (16C/24T, 4.8 GHz)',
      family: 'Alder Lake-HX',
      npu: 'None',
      vector: 'AVX2 + FMA3 + VNNI',
      driver: 'Linux 5.15+ LTS',
      factor: 1.00,
      npuSupported: false
    },
    'intel-i7-12650h': {
      name: 'Intel Core i7-12650H (10C/16T, 4.7 GHz)',
      family: 'Alder Lake-H',
      npu: 'None',
      vector: 'AVX2 + FMA3 + VNNI',
      driver: 'Linux 5.15+ LTS',
      factor: 0.95,
      npuSupported: false
    },
    'intel-i7-1280p': {
      name: 'Intel Core i7-1280P (14C/20T, 28W)',
      family: 'Alder Lake-P',
      npu: 'None',
      vector: 'AVX2 + FMA3 + VNNI',
      driver: 'Linux 5.15+ LTS',
      factor: 0.96,
      npuSupported: false
    },
    'intel-i7-1270p': {
      name: 'Intel Core i7-1270P (12C/16T, 28W vPro)',
      family: 'Alder Lake-P',
      npu: 'None',
      vector: 'AVX2 + FMA3 + VNNI',
      driver: 'Linux 5.15+ LTS',
      factor: 0.94,
      npuSupported: false
    },
    'intel-i7-1260p': {
      name: 'Intel Core i7-1260P (12C/16T, 28W)',
      family: 'Alder Lake-P',
      npu: 'None',
      vector: 'AVX2 + FMA3 + VNNI',
      driver: 'Linux 5.15+ LTS',
      factor: 0.93,
      npuSupported: false
    },
    'intel-i7-1265u': {
      name: 'Intel Core i7-1265U (10C/12T, 15W vPro)',
      family: 'Alder Lake-U',
      npu: 'None',
      vector: 'AVX2 + FMA3 + VNNI',
      driver: 'Linux 5.15+ LTS',
      factor: 0.90,
      npuSupported: false
    },
    'intel-i7-1255u': {
      name: 'Intel Core i7-1255U (10C/12T, 15W)',
      family: 'Alder Lake-U',
      npu: 'None',
      vector: 'AVX2 + FMA3 + VNNI',
      driver: 'Linux 5.15+ LTS',
      factor: 0.89,
      npuSupported: false
    },
    'intel-i5-12600hx': {
      name: 'Intel Core i5-12600HX (12C/16T, 4.6 GHz)',
      family: 'Alder Lake-HX',
      npu: 'None',
      vector: 'AVX2 + FMA3 + VNNI',
      driver: 'Linux 5.15+ LTS',
      factor: 0.96,
      npuSupported: false
    },
    'intel-i5-12600h': {
      name: 'Intel Core i5-12600H (12C/16T, 4.5 GHz)',
      family: 'Alder Lake-H',
      npu: 'None',
      vector: 'AVX2 + FMA3 + VNNI',
      driver: 'Linux 5.15+ LTS',
      factor: 0.94,
      npuSupported: false
    },
    'intel-i5-12500h': {
      name: 'Intel Core i5-12500H (12C/16T, 4.5 GHz)',
      family: 'Alder Lake-H',
      npu: 'None',
      vector: 'AVX2 + FMA3 + VNNI',
      driver: 'Linux 5.15+ LTS',
      factor: 0.93,
      npuSupported: false
    },
    'intel-i5-12450h': {
      name: 'Intel Core i5-12450H (8C/12T, 4.4 GHz)',
      family: 'Alder Lake-H',
      npu: 'None',
      vector: 'AVX2 + FMA3 + VNNI',
      driver: 'Linux 5.15+ LTS',
      factor: 0.88,
      npuSupported: false
    },
    'intel-i5-12500': {
      name: 'Intel Core i5-12500 (6C/12T, 65W Desktop)',
      family: 'Alder Lake',
      npu: 'None',
      vector: 'AVX2 + FMA3 + VNNI',
      driver: 'Linux 5.15+ LTS',
      factor: 0.93,
      npuSupported: false
    },
    'intel-i3-12100f': {
      name: 'Intel Core i3-12100F (4C/8T, No iGPU)',
      family: 'Alder Lake',
      npu: 'None',
      vector: 'AVX2 + FMA3 + VNNI',
      driver: 'Linux 5.15+ LTS',
      factor: 0.84,
      npuSupported: false
    },
    /* Group 6: More 11th Gen Core (Rocket Lake & Tiger Lake) [14 models] */
    'intel-i9-11900kf': {
      name: 'Intel Core i9-11900KF (8C/16T, AVX-512 Discrete)',
      family: 'Rocket Lake',
      npu: 'None',
      vector: 'AVX-512 + VNNI + FMA3',
      driver: 'Linux 5.11+ LTS',
      factor: 1.01,
      npuSupported: false
    },
    'intel-i9-11900': {
      name: 'Intel Core i9-11900 (65W, 8C/16T, AVX-512)',
      family: 'Rocket Lake',
      npu: 'None',
      vector: 'AVX-512 + VNNI + FMA3',
      driver: 'Linux 5.11+ LTS',
      factor: 0.98,
      npuSupported: false
    },
    'intel-i9-11900f': {
      name: 'Intel Core i9-11900F (65W, 8C/16T, No iGPU)',
      family: 'Rocket Lake',
      npu: 'None',
      vector: 'AVX-512 + VNNI + FMA3',
      driver: 'Linux 5.11+ LTS',
      factor: 0.98,
      npuSupported: false
    },
    'intel-i7-11700kf': {
      name: 'Intel Core i7-11700KF (8C/16T, AVX-512)',
      family: 'Rocket Lake',
      npu: 'None',
      vector: 'AVX-512 + VNNI + FMA3',
      driver: 'Linux 5.11+ LTS',
      factor: 0.98,
      npuSupported: false
    },
    'intel-i7-11700': {
      name: 'Intel Core i7-11700 (65W, 8C/16T, AVX-512)',
      family: 'Rocket Lake',
      npu: 'None',
      vector: 'AVX-512 + VNNI + FMA3',
      driver: 'Linux 5.11+ LTS',
      factor: 0.95,
      npuSupported: false
    },
    'intel-i7-11700f': {
      name: 'Intel Core i7-11700F (65W, 8C/16T, No iGPU)',
      family: 'Rocket Lake',
      npu: 'None',
      vector: 'AVX-512 + VNNI + FMA3',
      driver: 'Linux 5.11+ LTS',
      factor: 0.95,
      npuSupported: false
    },
    'intel-i5-11600kf': {
      name: 'Intel Core i5-11600KF (6C/12T, AVX-512)',
      family: 'Rocket Lake',
      npu: 'None',
      vector: 'AVX-512 + VNNI + FMA3',
      driver: 'Linux 5.11+ LTS',
      factor: 0.93,
      npuSupported: false
    },
    'intel-i5-11600': {
      name: 'Intel Core i5-11600 (65W, 6C/12T, AVX-512)',
      family: 'Rocket Lake',
      npu: 'None',
      vector: 'AVX-512 + VNNI + FMA3',
      driver: 'Linux 5.11+ LTS',
      factor: 0.91,
      npuSupported: false
    },
    'intel-i5-11500': {
      name: 'Intel Core i5-11500 (6C/12T, AVX-512)',
      family: 'Rocket Lake',
      npu: 'None',
      vector: 'AVX-512 + VNNI + FMA3',
      driver: 'Linux 5.11+ LTS',
      factor: 0.90,
      npuSupported: false
    },
    'intel-i5-11400f': {
      name: 'Intel Core i5-11400F (6C/12T, AVX-512 No iGPU)',
      family: 'Rocket Lake',
      npu: 'None',
      vector: 'AVX-512 + VNNI + FMA3',
      driver: 'Linux 5.11+ LTS',
      factor: 0.89,
      npuSupported: false
    },
    'intel-i9-11950h': {
      name: 'Intel Core i9-11950H (Mobile 8C/16T vPro)',
      family: 'Tiger Lake-H',
      npu: 'None',
      vector: 'AVX-512 + VNNI',
      driver: 'Linux 5.11+ LTS',
      factor: 0.95,
      npuSupported: false
    },
    'intel-i7-11850h': {
      name: 'Intel Core i7-11850H (Mobile 8C/16T vPro)',
      family: 'Tiger Lake-H',
      npu: 'None',
      vector: 'AVX-512 + VNNI',
      driver: 'Linux 5.11+ LTS',
      factor: 0.93,
      npuSupported: false
    },
    'intel-i7-1165g7': {
      name: 'Intel Core i7-1165G7 (4C/8T, Iris Xe 96EU)',
      family: 'Tiger Lake-U',
      npu: 'None',
      vector: 'AVX-512 + VNNI',
      driver: 'Linux 5.11+ LTS',
      factor: 0.87,
      npuSupported: false
    },
    'intel-i5-1135g7': {
      name: 'Intel Core i5-1135G7 (4C/8T, Iris Xe 80EU)',
      family: 'Tiger Lake-U',
      npu: 'None',
      vector: 'AVX-512 + VNNI',
      driver: 'Linux 5.11+ LTS',
      factor: 0.85,
      npuSupported: false
    },
    /* Group 7: More 10th Gen Core & Classics [12 models] */
    'intel-i9-10900kf': {
      name: 'Intel Core i9-10900KF (10C/20T, 5.3 GHz Discrete)',
      family: 'Comet Lake',
      npu: 'None',
      vector: 'AVX2 + FMA3',
      driver: 'Linux 5.4+ LTS',
      factor: 0.96,
      npuSupported: false
    },
    'intel-i9-10900': {
      name: 'Intel Core i9-10900 (65W, 10C/20T)',
      family: 'Comet Lake',
      npu: 'None',
      vector: 'AVX2 + FMA3',
      driver: 'Linux 5.4+ LTS',
      factor: 0.93,
      npuSupported: false
    },
    'intel-i9-10900f': {
      name: 'Intel Core i9-10900F (65W, 10C/20T, No iGPU)',
      family: 'Comet Lake',
      npu: 'None',
      vector: 'AVX2 + FMA3',
      driver: 'Linux 5.4+ LTS',
      factor: 0.93,
      npuSupported: false
    },
    'intel-i9-10850k': {
      name: 'Intel Core i9-10850K (10C/20T, 5.2 GHz)',
      family: 'Comet Lake',
      npu: 'None',
      vector: 'AVX2 + FMA3',
      driver: 'Linux 5.4+ LTS',
      factor: 0.95,
      npuSupported: false
    },
    'intel-i7-10700kf': {
      name: 'Intel Core i7-10700KF (8C/16T, 5.1 GHz Discrete)',
      family: 'Comet Lake',
      npu: 'None',
      vector: 'AVX2 + FMA3',
      driver: 'Linux 5.4+ LTS',
      factor: 0.92,
      npuSupported: false
    },
    'intel-i7-10700': {
      name: 'Intel Core i7-10700 (65W, 8C/16T)',
      family: 'Comet Lake',
      npu: 'None',
      vector: 'AVX2 + FMA3',
      driver: 'Linux 5.4+ LTS',
      factor: 0.90,
      npuSupported: false
    },
    'intel-i7-10700f': {
      name: 'Intel Core i7-10700F (65W, 8C/16T, No iGPU)',
      family: 'Comet Lake',
      npu: 'None',
      vector: 'AVX2 + FMA3',
      driver: 'Linux 5.4+ LTS',
      factor: 0.90,
      npuSupported: false
    },
    'intel-i5-10600k': {
      name: 'Intel Core i5-10600K (6C/12T, 4.8 GHz)',
      family: 'Comet Lake',
      npu: 'None',
      vector: 'AVX2 + FMA3',
      driver: 'Linux 5.4+ LTS',
      factor: 0.88,
      npuSupported: false
    },
    'intel-i5-10600kf': {
      name: 'Intel Core i5-10600KF (6C/12T, Discrete GPU)',
      family: 'Comet Lake',
      npu: 'None',
      vector: 'AVX2 + FMA3',
      driver: 'Linux 5.4+ LTS',
      factor: 0.88,
      npuSupported: false
    },
    'intel-i5-10500': {
      name: 'Intel Core i5-10500 (6C/12T, 65W)',
      family: 'Comet Lake',
      npu: 'None',
      vector: 'AVX2 + FMA3',
      driver: 'Linux 5.4+ LTS',
      factor: 0.86,
      npuSupported: false
    },
    'intel-i5-10400f': {
      name: 'Intel Core i5-10400F (6C/12T, No iGPU)',
      family: 'Comet Lake',
      npu: 'None',
      vector: 'AVX2 + FMA3',
      driver: 'Linux 5.4+ LTS',
      factor: 0.84,
      npuSupported: false
    },
    'intel-i3-10100': {
      name: 'Intel Core i3-10100 (4C/8T, 4.3 GHz)',
      family: 'Comet Lake',
      npu: 'None',
      vector: 'AVX2 + FMA3',
      driver: 'Linux 5.4+ LTS',
      factor: 0.80,
      npuSupported: false
    },
    /* Group 8: Xeon 6, Granite Rapids, Sierra Forest & High-End Server [18 models] */
    'intel-xeon-6-6980p': {
      name: 'Intel Xeon 6 6980P (128 Performance Cores, AMX)',
      family: 'Granite Rapids-AP',
      npu: 'Enterprise Accelerator QAT',
      vector: 'Dual AVX-512 + AMX (BF16/FP16)',
      driver: 'Linux 6.11+ Enterprise',
      factor: 1.48,
      npuSupported: false
    },
    'intel-xeon-6-6780e': {
      name: 'Intel Xeon 6 6780E (144 Efficiency Cores, 330W)',
      family: 'Sierra Forest-SP',
      npu: 'Enterprise QAT',
      vector: 'AVX2 + VNNI (High Density Throughput)',
      driver: 'Linux 6.9+ Enterprise',
      factor: 1.42,
      npuSupported: false
    },
    'intel-xeon-6-6766e': {
      name: 'Intel Xeon 6 6766E (128 Efficiency Cores, 250W)',
      family: 'Sierra Forest-SP',
      npu: 'Enterprise QAT',
      vector: 'AVX2 + VNNI (Cloud Native)',
      driver: 'Linux 6.9+ Enterprise',
      factor: 1.39,
      npuSupported: false
    },
    'intel-xeon-plat-8580': {
      name: 'Intel Xeon Platinum 8580 (60C/120T, 350W, AMX)',
      family: 'Emerald Rapids-SP',
      npu: 'Enterprise QAT/DLB',
      vector: 'Dual AVX-512 + AMX (BF16/INT8)',
      driver: 'Linux 6.6+ LTS Enterprise',
      factor: 1.38,
      npuSupported: false
    },
    'intel-xeon-plat-8558': {
      name: 'Intel Xeon Platinum 8558 (48C/96T, 260W, AMX)',
      family: 'Emerald Rapids-SP',
      npu: 'Enterprise QAT/DLB',
      vector: 'Dual AVX-512 + AMX',
      driver: 'Linux 6.6+ Enterprise',
      factor: 1.35,
      npuSupported: false
    },
    'intel-xeon-plat-8470': {
      name: 'Intel Xeon Platinum 8470 (52C/104T, Sapphire Rapids)',
      family: 'Sapphire Rapids-SP',
      npu: 'Enterprise QAT',
      vector: 'Dual AVX-512 + AMX',
      driver: 'Linux 6.2+ Enterprise',
      factor: 1.34,
      npuSupported: false
    },
    'intel-xeon-gold-6538yplus': {
      name: 'Intel Xeon Gold 6538Y+ (32C/64T, 205W, AMX)',
      family: 'Emerald Rapids-SP',
      npu: 'Enterprise QAT',
      vector: 'Dual AVX-512 + AMX',
      driver: 'Linux 6.6+ Enterprise',
      factor: 1.29,
      npuSupported: false
    },
    'intel-xeon-gold-6430': {
      name: 'Intel Xeon Gold 6430 (32C/64T, 270W)',
      family: 'Sapphire Rapids-SP',
      npu: 'Enterprise QAT',
      vector: 'Dual AVX-512 + AMX',
      driver: 'Linux 6.2+ Enterprise',
      factor: 1.27,
      npuSupported: false
    },
    'intel-xeon-gold-5520plus': {
      name: 'Intel Xeon Gold 5520+ (28C/56T, Emerald Rapids)',
      family: 'Emerald Rapids-SP',
      npu: 'Enterprise QAT',
      vector: 'Dual AVX-512 + AMX',
      driver: 'Linux 6.6+ Enterprise',
      factor: 1.25,
      npuSupported: false
    },
    'intel-xeon-gold-5418y': {
      name: 'Intel Xeon Gold 5418Y (24C/48T, 185W)',
      family: 'Sapphire Rapids-SP',
      npu: 'Enterprise QAT',
      vector: 'Dual AVX-512 + AMX',
      driver: 'Linux 6.2+ Enterprise',
      factor: 1.24,
      npuSupported: false
    },
    'intel-xeon-silver-4410y': {
      name: 'Intel Xeon Silver 4410Y (12C/24T, 150W)',
      family: 'Sapphire Rapids-SP',
      npu: 'Enterprise QAT',
      vector: 'Dual AVX-512 + AMX',
      driver: 'Linux 6.2+ Enterprise',
      factor: 1.18,
      npuSupported: false
    },
    'intel-xeon-e-2488': {
      name: 'Intel Xeon E-2488 (8C/16T, 95W Entry Server)',
      family: 'Raptor Lake-E',
      npu: 'None',
      vector: 'AVX2 + VNNI',
      driver: 'Linux 6.6+ Enterprise',
      factor: 1.06,
      npuSupported: false
    },
    'intel-xeon-e-2478': {
      name: 'Intel Xeon E-2478 (8C/16T, 80W Entry Server)',
      family: 'Raptor Lake-E',
      npu: 'None',
      vector: 'AVX2 + VNNI',
      driver: 'Linux 6.6+ Enterprise',
      factor: 1.04,
      npuSupported: false
    },
    'intel-xeon-e-2468': {
      name: 'Intel Xeon E-2468 (8C/16T, 65W Entry Server)',
      family: 'Raptor Lake-E',
      npu: 'None',
      vector: 'AVX2 + VNNI',
      driver: 'Linux 6.6+ Enterprise',
      factor: 1.02,
      npuSupported: false
    },
    'intel-xeon-w9-3595x': {
      name: 'Intel Xeon w9-3595X (60C/120T, 385W, 8-Ch DDR5)',
      family: 'Emerald Rapids-WS',
      npu: 'Dedicated PCIe NPU',
      vector: 'Dual AVX-512 + AMX',
      driver: 'Linux 6.6+ Enterprise',
      factor: 1.37,
      npuSupported: false
    },
    'intel-xeon-w7-3565x': {
      name: 'Intel Xeon w7-3565X (32C/64T, 340W, 8-Ch DDR5)',
      family: 'Emerald Rapids-WS',
      npu: 'Dedicated PCIe NPU',
      vector: 'Dual AVX-512 + AMX',
      driver: 'Linux 6.6+ Enterprise',
      factor: 1.31,
      npuSupported: false
    },
    'intel-xeon-w5-3535x': {
      name: 'Intel Xeon w5-3535X (20C/40T, 300W, 8-Ch DDR5)',
      family: 'Emerald Rapids-WS',
      npu: 'Dedicated PCIe NPU',
      vector: 'Dual AVX-512 + AMX',
      driver: 'Linux 6.6+ Enterprise',
      factor: 1.25,
      npuSupported: false
    },
    'intel-xeon-w5-2565x': {
      name: 'Intel Xeon w5-2565X (18C/36T, 240W, 4-Ch DDR5)',
      family: 'Emerald Rapids-WS',
      npu: 'Dedicated PCIe NPU',
      vector: 'Dual AVX-512 + AMX',
      driver: 'Linux 6.6+ Enterprise',
      factor: 1.22,
      npuSupported: false
    },
    'apple-m4-m3': {
      name: 'Apple Silicon M3 / M4 (Pro / Max)',
      family: 'ARM64 ARMv9.2-A',
      npu: 'Apple Neural Engine (38 TOPS)',
      vector: 'ARM NEON + SME / SVE2',
      driver: 'Asahi Linux 6.8+ kernel + Mesa Rusticl',
      factor: 1.25,
      npuSupported: false
    },
    'apple-m1-m2': {
      name: 'Apple Silicon M1 / M2 (Base / Pro / Max)',
      family: 'ARM64 ARMv8.5-A',
      npu: 'Apple Neural Engine (16 TOPS)',
      vector: 'ARM NEON + Matrix Coprocessor',
      driver: 'Asahi Linux 6.6+ kernel',
      factor: 1.02,
      npuSupported: false
    },
    'qualcomm-x': {
      name: 'Qualcomm Snapdragon X Elite / Plus',
      family: 'Oryon ARM64',
      npu: 'Qualcomm Hexagon NPU (45 TOPS)',
      vector: 'ARM NEON + SME',
      driver: 'Linux 6.11+ upstream (qaic driver)',
      factor: 1.06,
      npuSupported: true
    },
    'server-epyc-xeon': {
      name: 'Server / Workstation (AMD EPYC 9004 / Xeon Scalable)',
      family: 'High-Throughput Enterprise x86_64',
      npu: 'Dedicated PCIe AI Co-processors',
      vector: 'Dual AVX-512 + Intel AMX Matrix Engines',
      driver: 'Linux 6.8+ LTS Enterprise (amdgpu / intel-level-zero)',
      factor: 1.35,
      npuSupported: false
    }
  },
  gpus: {
    'nv-rtx4090': {
      name: 'NVIDIA GeForce RTX 4090 (24GB GDDR6X)',
      vram: 24,
      bandwidth: 1008,
      tokPrompt: 1950,
      tokGen: 130,
      tier: 'tier-1',
      tierLabel: 'Tier 1: Extreme Lab Workstation',
      power: '320W–450W (Extreme Compute)',
      driver: 'nvidia-open 560+ • CUDA 12.6 • vLLM / TensorRT-LLM',
      verifyCmd: 'nvidia-smi --query-gpu=name,memory.total,driver_version --format=csv',
      primaryModel: 'DeepSeek-R1-Distill 32B (Q4_K_M) or Llama 3.3 70B (Split)',
      bgModel: 'Llama 3.1 8B (FP16) + Whisper Large v3 + BGE-M3',
      vramFootprint: 19.8
    },
    'nv-rtx4080': {
      name: 'NVIDIA GeForce RTX 4080 (16GB GDDR6X)',
      vram: 16,
      bandwidth: 717,
      tokPrompt: 1450,
      tokGen: 98,
      tier: 'tier-1',
      tierLabel: 'Tier 1: High-Performance dGPU',
      power: '220W–320W (High Performance)',
      driver: 'nvidia-open 560+ • CUDA 12.6 • vLLM / llama.cpp',
      verifyCmd: 'nvidia-smi -q -d MEMORY',
      primaryModel: 'Qwen 2.5 14B (Q8_0) or Mistral Nemo 12B (FP16)',
      bgModel: 'Phi-3.5 Mini 3.8B + Whisper Medium',
      vramFootprint: 13.5
    },
    'nv-rtx4070': {
      name: 'NVIDIA GeForce RTX 4070 / 4070 Ti (12GB GDDR6X)',
      vram: 12,
      bandwidth: 504,
      tokPrompt: 1080,
      tokGen: 74,
      tier: 'tier-1',
      tierLabel: 'Tier 1: Accelerated Desktop',
      power: '160W–220W (Balanced Dedicated)',
      driver: 'nvidia-open 560+ • CUDA 12.6 • llama.cpp CUDA',
      verifyCmd: 'nvidia-smi --query-gpu=gpu_name,driver_version --format=csv',
      primaryModel: 'Llama 3.1 8B (Q8_0) or Mistral Nemo 12B (Q4_K_M)',
      bgModel: 'Phi-3.5 Mini (Q4) + Whisper Small',
      vramFootprint: 9.8
    },
    'nv-rtx4060': {
      name: 'NVIDIA GeForce RTX 4060 / 4060 Ti (8GB / 16GB GDDR6)',
      vram: 8,
      bandwidth: 288,
      tokPrompt: 680,
      tokGen: 48,
      tier: 'tier-2',
      tierLabel: 'Tier 2: Mainstream Accelerated',
      power: '115W–160W (Efficient Dedicated)',
      driver: 'nvidia-open 560+ • CUDA 12.6',
      verifyCmd: 'nvidia-smi -L',
      primaryModel: 'Llama 3.1 8B (Q4_K_M) or Gemma 2 9B (Q4_K_S)',
      bgModel: 'Phi-3.5 Mini (Q4) + Whisper Tiny',
      vramFootprint: 6.8
    },
    'nv-rtx3060-3090': {
      name: 'NVIDIA GeForce RTX 30 Series (12GB–24GB Ampere)',
      vram: 12,
      bandwidth: 360,
      tokPrompt: 750,
      tokGen: 55,
      tier: 'tier-2',
      tierLabel: 'Tier 2: Proven Workhorse',
      power: '170W–350W (Standard Dedicated)',
      driver: 'nvidia-driver 550+ • CUDA 12.4+ • FlashAttention-2',
      verifyCmd: 'nvidia-smi',
      primaryModel: 'Llama 3.1 8B (Q8_0) or Qwen 2.5 7B (FP16)',
      bgModel: 'Phi-3.5 Mini + BGE-Small Embeddings',
      vramFootprint: 8.9
    },
    'amd-rx7900': {
      name: 'AMD Radeon RX 7900 XTX / XT (24GB / 20GB GDDR6)',
      vram: 24,
      bandwidth: 960,
      tokPrompt: 1420,
      tokGen: 112,
      tier: 'tier-1',
      tierLabel: 'Tier 1: Open-Source Extreme Lab',
      power: '300W–355W (High Performance Open)',
      driver: 'ROCm 6.2 (HIP Runtime) + amdgpu kernel module',
      verifyCmd: 'rocm-smi --showid --showmeminfo vram',
      primaryModel: 'DeepSeek-R1-Distill 32B (Q4_K_M) or Llama 3.3 70B (Split)',
      bgModel: 'Mistral 7B v0.3 (Q8_0) + Whisper Large v3',
      vramFootprint: 18.9
    },
    'amd-rx7800-7700': {
      name: 'AMD Radeon RX 7800 XT / 7700 XT (16GB / 12GB RDNA3)',
      vram: 16,
      bandwidth: 624,
      tokPrompt: 990,
      tokGen: 79,
      tier: 'tier-1',
      tierLabel: 'Tier 1: High-Performance ROCm Native',
      power: '245W–263W (High Performance)',
      driver: 'ROCm 6.2 + amdgpu • Vulkan (radv) fallback',
      verifyCmd: 'rocminfo | grep "Marketing Name"',
      primaryModel: 'Qwen 2.5 14B (Q4_K_M) or Llama 3.1 8B (Q8_0)',
      bgModel: 'Phi-3.5 Mini + Whisper Medium',
      vramFootprint: 12.8
    },
    'amd-rx7600': {
      name: 'AMD Radeon RX 7600 / XT (8GB / 16GB RDNA3)',
      vram: 8,
      bandwidth: 288,
      tokPrompt: 550,
      tokGen: 43,
      tier: 'tier-2',
      tierLabel: 'Tier 2: Mainstream ROCm Compute',
      power: '165W–190W',
      driver: 'ROCm 6.2 / Vulkan (radv) + amdgpu',
      verifyCmd: 'rocminfo',
      primaryModel: 'Llama 3.1 8B (Q4_K_M) or Mistral 7B (Q4_K_M)',
      bgModel: 'Phi-3.5 Mini (Q4) + Whisper Tiny',
      vramFootprint: 6.6
    },
    'intel-b580': {
      name: 'Intel Arc Battlemage B580 (12GB GDDR6 • Xe2)',
      vram: 12,
      bandwidth: 456,
      tokPrompt: 740,
      tokGen: 61,
      tier: 'tier-2',
      tierLabel: 'Tier 2: Modern Xe2 Battlemage',
      power: '190W (Modern Efficiency)',
      driver: 'Intel Compute Runtime (Level Zero / OpenCL) + oneAPI',
      verifyCmd: 'xpu-smi discovery -d 0',
      primaryModel: 'Mistral Nemo 12B (Q4_K_M) or Llama 3.1 8B (Q8_0)',
      bgModel: 'Phi-3.5 Mini + Whisper Small',
      vramFootprint: 9.4
    },
    'intel-a770': {
      name: 'Intel Arc A770 (16GB GDDR6 • Alchemist Xe)',
      vram: 16,
      bandwidth: 560,
      tokPrompt: 620,
      tokGen: 49,
      tier: 'tier-2',
      tierLabel: 'Tier 2: 16GB High-Memory Value',
      power: '225W (Discrete Alchemist)',
      driver: 'intel-compute-runtime (Level Zero) + IPEX-LLM / SYCL',
      verifyCmd: 'clinfo | grep "Device Name"',
      primaryModel: 'Qwen 2.5 14B (Q4_K_M) or Llama 3.1 8B (Q8_0)',
      bgModel: 'Phi-3.5 Mini + Whisper Small',
      vramFootprint: 12.2
    },
    'apple-m-gpu': {
      name: 'Apple Silicon Unified GPU (M-Series 10–40 Cores)',
      vram: 0,
      isUnified: true,
      bandwidth: 320,
      tokPrompt: 820,
      tokGen: 68,
      tier: 'tier-1',
      tierLabel: 'Tier 1: Zero-Copy Unified Silicon',
      power: '25W–45W (Ultra Low Power)',
      driver: 'Asahi Linux • Mesa Rusticl (OpenCL 3.0) / Vulkan Kompute',
      verifyCmd: 'asahi-diagnose && clinfo',
      primaryModel: 'Dynamic: Scales to 75% of System RAM (Zero-Copy Pool)',
      bgModel: 'Phi-3.5 Mini + Whisper Large v3 (Shared Pool)',
      vramFootprint: 0
    },
    'igpu-amd-890m': {
      name: 'AMD Radeon 890M / 780M iGPU (RDNA 3.5 APU)',
      vram: 0,
      isUnified: true,
      bandwidth: 128,
      tokPrompt: 280,
      tokGen: 26,
      tier: 'tier-2',
      tierLabel: 'Tier 2: High-Performance Integrated APU',
      power: '28W–54W (Full System SoC)',
      driver: 'ROCm / Vulkan (radv) + amdgpu kernel module',
      verifyCmd: 'vulkaninfo --summary',
      primaryModel: 'Llama 3.1 8B (Q4_K_M) or Gemma 2 9B (Q4_K_S)',
      bgModel: 'Phi-3.5 Mini (Q4) + BGE-Small Embeddings',
      vramFootprint: 0
    },
    'igpu-intel-arc': {
      name: 'Intel Arc Xe-LPG iGPU (Core Ultra Integrated)',
      vram: 0,
      isUnified: true,
      bandwidth: 115,
      tokPrompt: 210,
      tokGen: 20,
      tier: 'tier-2',
      tierLabel: 'Tier 2: Ultra-Low-Power APU',
      power: '20W–45W (Full System SoC)',
      driver: 'intel-compute-runtime + Level Zero / i915 / xe driver',
      verifyCmd: 'sycl-ls',
      primaryModel: 'Phi-3.5 Mini 3.8B (Q8_0) or Llama 3.1 8B (Q4_K_S)',
      bgModel: 'Whisper Small + Local Embeddings',
      vramFootprint: 0
    },
    'none-cpu-only': {
      name: 'No Discrete GPU (CPU AVX-512 / VNNI Vector Compute Only)',
      vram: 0,
      isCpuOnly: true,
      bandwidth: 68,
      tokPrompt: 95,
      tokGen: 11,
      tier: 'tier-3',
      tierLabel: 'Tier 3: CPU Vector Fallback (AVX-512 / AMX)',
      power: '15W–65W (CPU Only)',
      driver: 'Open-Source ggml-cpu backend • AVX-512 / AMX Tile kernels',
      verifyCmd: 'lscpu | grep -E "avx512|amx|vnni|neon|sve"',
      primaryModel: 'Phi-3.5 Mini 3.8B (Q4_K_M) or Llama 3.1 8B (Q4_K_S)',
      bgModel: 'Whisper Tiny + BGE-Small Embeddings',
      vramFootprint: 0
    }
  },
  rams: {
    'ram-8': {
      capacity: 8,
      usableAI: 4.8,
      label: '8 GB (Entry Tier)',
      bestQuant: 'Q4_K_S (4-bit small)',
      status: 'Lightweight & Edge'
    },
    'ram-16': {
      capacity: 16,
      usableAI: 12.4,
      label: '16 GB (Desktop Baseline)',
      bestQuant: 'Q4_K_M (4-bit medium) or Q5_K_M',
      status: 'Sweet-Spot Baseline'
    },
    'ram-32': {
      capacity: 32,
      usableAI: 27.2,
      label: '32 GB (Power User Sweet-Spot)',
      bestQuant: 'Q8_0 or FP16 for 8B / Q4_K_M for 14B',
      status: 'Power User Tier'
    },
    'ram-64': {
      capacity: 64,
      usableAI: 57.6,
      label: '64 GB (Advanced Workstation)',
      bestQuant: 'Q4_K_M for 32B / Q8_0 for 14B',
      status: 'Workstation Tier'
    },
    'ram-128': {
      capacity: 128,
      usableAI: 118.0,
      label: '128 GB+ (Local LLM Laboratory)',
      bestQuant: 'Q4_K_M for 70B / Q8_0 for 32B',
      status: 'Extreme Research Lab'
    }
  }
};

function initHardwareCalculator() {
  const cpuSelect = document.getElementById('hw-cpu-select');
  const gpuSelect = document.getElementById('hw-gpu-select');
  const ramSelect = document.getElementById('hw-ram-select');
  if (!cpuSelect || !gpuSelect || !ramSelect) return;

  function recalculate() {
    const cpuKey = cpuSelect.value;
    const gpuKey = gpuSelect.value;
    const ramKey = ramSelect.value;

    const cpu = HW_DATABASE.cpus[cpuKey] || HW_DATABASE.cpus['amd-zen5-ai'];
    const gpu = HW_DATABASE.gpus[gpuKey] || HW_DATABASE.gpus['nv-rtx4070'];
    const ram = HW_DATABASE.rams[ramKey] || HW_DATABASE.rams['ram-32'];

    const tierBadge = document.getElementById('hw-tier-badge');
    const tokGenVal = document.getElementById('hw-tok-gen');
    const tokPromptVal = document.getElementById('hw-tok-prompt');
    const powerVal = document.getElementById('hw-power-env');
    const primaryModelVal = document.getElementById('hw-primary-model');
    const bgModelVal = document.getElementById('hw-bg-model');
    const bestQuantVal = document.getElementById('hw-best-quant');
    const driverStackVal = document.getElementById('hw-driver-stack');
    const verifyCmdVal = document.getElementById('hw-verify-cmd');
    const vramStatVal = document.getElementById('hw-vram-stat');
    const vramBarFill = document.getElementById('hw-vram-bar-fill');
    const ramStatVal = document.getElementById('hw-ram-stat');
    const ramBarFill = document.getElementById('hw-ram-bar-fill');
    const vectorIsaVal = document.getElementById('hw-vector-isa');
    const npuStatusVal = document.getElementById('hw-npu-status');
    const bandwidthVal = document.getElementById('hw-bandwidth-stat');

    let promptSpeed, genSpeed, vramUsedGB, vramTotalGB, vramPercent, ramUsedGB, ramPercent;
    let effectiveTier = gpu.tier;
    let effectiveTierLabel = gpu.tierLabel;

    const ramMultiplier = ram.capacity >= 64 ? 1.15 : (ram.capacity <= 8 ? 0.78 : 1.0);

    if (gpu.isUnified) {
      vramTotalGB = ram.capacity;
      const modelFootprint = Math.min(ram.usableAI * 0.65, 14.5);
      vramUsedGB = parseFloat(modelFootprint.toFixed(1));
      vramPercent = Math.min(95, Math.round((vramUsedGB / vramTotalGB) * 100));

      ramUsedGB = parseFloat((vramUsedGB + 2.2).toFixed(1));
      ramPercent = Math.min(98, Math.round((ramUsedGB / ram.capacity) * 100));

      promptSpeed = Math.round(gpu.tokPrompt * cpu.factor * ramMultiplier);
      genSpeed = Math.round(gpu.tokGen * cpu.factor * ramMultiplier);
    } else if (gpu.isCpuOnly) {
      vramTotalGB = 0;
      vramUsedGB = 0;
      vramPercent = 0;

      ramUsedGB = parseFloat(Math.min(ram.capacity * 0.75, 6.2).toFixed(1));
      ramPercent = Math.min(95, Math.round((ramUsedGB / ram.capacity) * 100));

      promptSpeed = Math.round(gpu.tokPrompt * cpu.factor * ramMultiplier);
      genSpeed = Math.round(gpu.tokGen * cpu.factor * ramMultiplier);
    } else {
      vramTotalGB = gpu.vram;
      vramUsedGB = Math.min(gpu.vram, gpu.vramFootprint);
      vramPercent = Math.min(100, Math.round((vramUsedGB / gpu.vram) * 100));

      ramUsedGB = parseFloat((2.4 + (ram.capacity * 0.06)).toFixed(1));
      ramPercent = Math.min(95, Math.round((ramUsedGB / ram.capacity) * 100));

      promptSpeed = Math.round(gpu.tokPrompt * cpu.factor);
      genSpeed = Math.round(gpu.tokGen * cpu.factor);

      if (ram.capacity <= 8 && gpu.vram >= 16) {
        effectiveTier = 'tier-2';
        effectiveTierLabel = 'Tier 2: System RAM Bottleneck (VRAM > RAM)';
      }
    }

    if (tierBadge) {
      tierBadge.className = 'hw-tier-badge ' + effectiveTier;
      tierBadge.textContent = effectiveTierLabel;
    }
    if (tokGenVal) tokGenVal.textContent = genSpeed;
    if (tokPromptVal) tokPromptVal.textContent = promptSpeed.toLocaleString();
    if (powerVal) powerVal.textContent = gpu.power;
    if (primaryModelVal) primaryModelVal.textContent = gpu.primaryModel;
    if (bgModelVal) bgModelVal.textContent = gpu.bgModel;
    if (bestQuantVal) bestQuantVal.textContent = ram.bestQuant;
    if (driverStackVal) driverStackVal.textContent = gpu.driver;
    if (verifyCmdVal) verifyCmdVal.textContent = gpu.verifyCmd;
    if (vectorIsaVal) vectorIsaVal.textContent = cpu.vector;
    if (npuStatusVal) npuStatusVal.textContent = cpu.npu;
    if (bandwidthVal) bandwidthVal.textContent = (gpu.bandwidth || 64) + ' GB/s';

    if (vramStatVal && vramBarFill) {
      if (gpu.isUnified) {
        vramStatVal.textContent = vramUsedGB + ' GB dynamic unified pool (of ' + ram.capacity + ' GB total)';
        vramBarFill.style.width = vramPercent + '%';
      } else if (gpu.isCpuOnly) {
        vramStatVal.textContent = 'None (0 GB Dedicated VRAM) • Zero-Copy Host RAM Engine';
        vramBarFill.style.width = '0%';
      } else {
        vramStatVal.textContent = vramUsedGB + ' GB allocated of ' + vramTotalGB + ' GB GDDR';
        vramBarFill.style.width = vramPercent + '%';
      }
    }

    if (ramStatVal && ramBarFill) {
      ramStatVal.textContent = ramUsedGB + ' GB in use (' + ram.capacity + ' GB physical)';
      ramBarFill.style.width = ramPercent + '%';
    }
  }

  cpuSelect.addEventListener('change', recalculate);
  gpuSelect.addEventListener('change', recalculate);
  ramSelect.addEventListener('change', recalculate);

  recalculate();
}

/* ==========================================================================
   13. Interactive Hardware Documentation Tabs Switcher
   ========================================================================== */
function initHardwareDocsTabs() {
  const tabs = document.querySelectorAll('.hw-docs-tab');
  const panels = document.querySelectorAll('.hw-docs-panel');
  if (!tabs.length || !panels.length) return;

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      const targetId = tab.getAttribute('data-tab');
      tabs.forEach(t => t.classList.remove('active'));
      panels.forEach(p => p.classList.remove('active'));

      tab.classList.add('active');
      const activePanel = document.getElementById(targetId);
      if (activePanel) {
        activePanel.classList.add('active');
      }
    });

    tab.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowRight' || e.key === 'ArrowLeft') {
        e.preventDefault();
        const tabList = Array.from(tabs);
        const currentIndex = tabList.indexOf(tab);
        let nextIndex;
        if (e.key === 'ArrowRight') {
          nextIndex = (currentIndex + 1) % tabList.length;
        } else {
          nextIndex = (currentIndex - 1 + tabList.length) % tabList.length;
        }
        tabList[nextIndex].focus();
        tabList[nextIndex].click();
      }
    });
  });
}
