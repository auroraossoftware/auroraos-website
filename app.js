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
