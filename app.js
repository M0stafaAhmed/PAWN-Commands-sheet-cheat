/* PwnRef — app.js */

/* ============================================================
   STARFIELD
   ============================================================ */
(function initStarfield() {
  const canvas = document.getElementById('starfield');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');

  let W, H, stars = [], mouse = { x: -9999, y: -9999 };
  const STAR_COUNT = 320;
  const REPEL_RADIUS = 120;
  const REPEL_STRENGTH = 3.5;
  const RETURN_SPEED = 0.035;

  function resize() {
    W = canvas.width = window.innerWidth;
    H = canvas.height = window.innerHeight;
  }

  function randBetween(a, b) { return a + Math.random() * (b - a); }

  function initStars() {
    stars = [];
    for (let i = 0; i < STAR_COUNT; i++) {
      const x = Math.random() * W;
      const y = Math.random() * H;
      stars.push({
        ox: x, oy: y,
        x: x, y: y,
        vx: 0, vy: 0,
        r: randBetween(0.4, 1.8),
        alpha: randBetween(0.2, 1),
        alphaDelta: randBetween(0.002, 0.008) * (Math.random() < 0.5 ? 1 : -1),
        drift: { x: randBetween(-0.04, 0.04), y: randBetween(-0.015, 0.015) }
      });
    }
  }

  function draw() {
    ctx.clearRect(0, 0, W, H);

    stars.forEach(s => {
      // Drift origin slowly
      s.ox += s.drift.x;
      s.oy += s.drift.y;
      if (s.ox < 0) s.ox = W;
      if (s.ox > W) s.ox = 0;
      if (s.oy < 0) s.oy = H;
      if (s.oy > H) s.oy = 0;

      // Twinkle
      s.alpha += s.alphaDelta;
      if (s.alpha > 1 || s.alpha < 0.1) s.alphaDelta *= -1;
      s.alpha = Math.max(0.1, Math.min(1, s.alpha));

      // Repulsion
      const dx = s.x - mouse.x;
      const dy = s.y - mouse.y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < REPEL_RADIUS) {
        const force = (1 - dist / REPEL_RADIUS) * REPEL_STRENGTH;
        s.vx += (dx / dist) * force;
        s.vy += (dy / dist) * force;
      }

      // Return to origin + dampen
      s.vx += (s.ox - s.x) * RETURN_SPEED;
      s.vy += (s.oy - s.y) * RETURN_SPEED;
      s.vx *= 0.82;
      s.vy *= 0.82;
      s.x += s.vx;
      s.y += s.vy;

      // Draw
      ctx.beginPath();
      ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(${lerp(180,200,s.alpha)},${lerp(160,180,s.alpha)},255,${s.alpha})`;
      ctx.fill();
    });

    requestAnimationFrame(draw);
  }

  function lerp(a, b, t) { return Math.round(a + (b - a) * t); }

  window.addEventListener('resize', () => { resize(); initStars(); });
  document.addEventListener('mousemove', e => { mouse.x = e.clientX; mouse.y = e.clientY; });
  document.addEventListener('mouseleave', () => { mouse.x = -9999; mouse.y = -9999; });
  resize();
  initStars();
  draw();
})();


/* ============================================================
   DATA — sidebar structure
   ============================================================ */
const NAV_STRUCTURE = [
  {
    label: 'Reconnaissance',
    items: [
      { id: 'nmap',        label: 'Nmap' },
      { id: 'netcat',      label: 'Netcat (nc)' },
      { id: 'gobuster',    label: 'Gobuster' },
      { id: 'ffuf',        label: 'ffuf' },
      { id: 'feroxbuster', label: 'Feroxbuster' },
      { id: 'nikto',       label: 'Nikto' },
      { id: 'searchsploit',label: 'Searchsploit' },
      { id: 'whatweb',     label: 'WhatWeb / curl' },
      { id: 'dnsrecon',    label: 'DNS Enumeration' },
    ]
  },
  {
    label: 'Enumeration',
    items: [
      { id: 'smbclient',   label: 'SMB (smbclient/map)' },
      { id: 'ldapsearch',  label: 'LDAP' },
      { id: 'snmpwalk',    label: 'SNMP' },
      { id: 'responder',   label: 'Responder' },
    ]
  },
  {
    label: 'Exploitation',
    items: [
      { id: 'metasploit',  label: 'Metasploit / msfvenom' },
      { id: 'sqlmap',      label: 'SQLMap' },
      { id: 'hydra',       label: 'Hydra' },
      { id: 'burp',        label: 'Burp Suite' },
    ]
  },
  {
    label: 'Password Attacks',
    items: [
      { id: 'hashcat',     label: 'Hashcat' },
      { id: 'john',        label: 'John the Ripper' },
      { id: 'cewl',        label: 'CeWL' },
    ]
  },
  {
    label: 'Active Directory',
    items: [
      { id: 'crackmapexec',label: 'NetExec / CrackMapExec' },
      { id: 'bloodhound',  label: 'BloodHound' },
      { id: 'evil-winrm',  label: 'Evil-WinRM' },
      { id: 'impacket',    label: 'Impacket Toolkit' },
      { id: 'ad-attacks',  label: 'AD Attack Paths' },
    ]
  },
  {
    label: 'Post-Exploitation',
    items: [
      { id: 'privesc',     label: 'Privilege Escalation' },
      { id: 'shells',      label: 'Shells & Upgrades' },
    ]
  },
  {
    label: 'Linux',
    items: [
      { id: 'find',        label: 'find / grep / awk' },
      { id: 'ssh',         label: 'SSH Tunneling' },
      { id: 'scp',         label: 'File Transfer' },
    ]
  },
  {
    label: 'Wireless',
    items: [
      { id: 'aircrack',    label: 'Aircrack-ng Suite' },
    ]
  },
  {
    label: 'Misc / Pivoting',
    items: [
      { id: 'chisel',      label: 'Chisel & Ligolo-ng' },
      { id: 'socat',       label: 'Socat' },
      { id: 'tcpdump',     label: 'tcpdump' },
    ]
  }
];


/* ============================================================
   SIDEBAR BUILD
   ============================================================ */
function buildSidebar() {
  const nav = document.getElementById('sidebar-nav');
  if (!nav) return;
  nav.innerHTML = NAV_STRUCTURE.map(cat => `
    <div class="sidebar-section" data-cat="${cat.label}">
      <div class="sidebar-category" onclick="toggleCategory(this)">
        ${cat.label}
        <span class="chevron">▼</span>
      </div>
      <div class="sidebar-items">
        ${cat.items.map(item => `
          <div class="sidebar-item" data-target="${item.id}" onclick="scrollToSection('${item.id}')">
            <span class="dot"></span>${item.label}
          </div>
        `).join('')}
      </div>
    </div>
  `).join('');
}

function toggleCategory(el) {
  const section = el.parentElement;
  const items = section.querySelector('.sidebar-items');
  const isCollapsed = section.classList.toggle('collapsed');
  items.style.maxHeight = isCollapsed ? '0' : items.scrollHeight + 'px';
}

function initSidebarHeights() {
  document.querySelectorAll('.sidebar-items').forEach(el => {
    el.style.maxHeight = el.scrollHeight + 'px';
  });
}


/* ============================================================
   SCROLL SPY
   ============================================================ */
function initScrollSpy() {
  const sections = document.querySelectorAll('.tool-section');
  const items = document.querySelectorAll('.sidebar-item');

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.id;
        items.forEach(item => item.classList.toggle('active', item.dataset.target === id));
        // Ensure active item is visible in sidebar
        const active = document.querySelector(`.sidebar-item.active`);
        if (active) {
          const sidebar = document.getElementById('sidebar');
          const itemTop = active.offsetTop;
          const sidebarScroll = sidebar.scrollTop;
          const sidebarH = sidebar.clientHeight;
          if (itemTop < sidebarScroll + 60 || itemTop > sidebarScroll + sidebarH - 60) {
            sidebar.scrollTo({ top: itemTop - sidebarH / 2, behavior: 'smooth' });
          }
        }
      }
    });
  }, { rootMargin: '-60px 0px -60% 0px', threshold: 0 });

  sections.forEach(s => observer.observe(s));
}


/* ============================================================
   SCROLL TO SECTION
   ============================================================ */
function scrollToSection(id) {
  const el = document.getElementById(id);
  if (!el) return;
  el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  // Close mobile sidebar
  if (window.innerWidth < 900) {
    document.getElementById('sidebar').classList.remove('open');
    document.getElementById('overlay').classList.remove('show');
  }
}


/* ============================================================
   SEARCH
   ============================================================ */
let searchTimeout;

function initSearch() {
  const input = document.getElementById('search');
  if (!input) return;

  input.addEventListener('input', () => {
    clearTimeout(searchTimeout);
    searchTimeout = setTimeout(() => performSearch(input.value.trim()), 120);
  });

  // Keyboard shortcut ⌘K / Ctrl+K
  document.addEventListener('keydown', e => {
    if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
      e.preventDefault();
      input.focus();
      input.select();
    }
    if (e.key === 'Escape' && document.activeElement === input) {
      input.value = '';
      performSearch('');
      input.blur();
    }
  });
}

function performSearch(query) {
  const sections = document.querySelectorAll('.tool-section');
  const sidebarItems = document.querySelectorAll('.sidebar-item');
  const noResults = document.getElementById('no-results');
  const countEl = document.getElementById('sidebar-search-count');
  const q = query.toLowerCase();
  let visibleCount = 0;

  sections.forEach(section => {
    if (!q) {
      section.classList.remove('hidden');
      unhighlightSection(section);
      visibleCount++;
      return;
    }

    const text = section.textContent.toLowerCase();
    const title = section.querySelector('.section-title')?.textContent.toLowerCase() || '';
    const match = text.includes(q) || title.includes(q);

    section.classList.toggle('hidden', !match);
    if (match) {
      highlightSection(section, query);
      visibleCount++;
    }
  });

  // Update sidebar visibility
  let sidebarVisible = 0;
  sidebarItems.forEach(item => {
    const target = document.getElementById(item.dataset.target);
    if (!target) return;
    const hidden = target.classList.contains('hidden');
    item.style.display = hidden ? 'none' : '';
    if (!hidden) sidebarVisible++;
  });

  // Toggle sidebar categories based on children visibility
  document.querySelectorAll('.sidebar-section').forEach(cat => {
    const visibleChildren = Array.from(cat.querySelectorAll('.sidebar-item')).filter(i => i.style.display !== 'none');
    cat.style.display = visibleChildren.length === 0 && q ? 'none' : '';
  });

  noResults.style.display = visibleCount === 0 ? 'block' : 'none';

  if (q) {
    countEl.style.display = 'block';
    countEl.textContent = `${visibleCount} result${visibleCount !== 1 ? 's' : ''} for "${query}"`;
  } else {
    countEl.style.display = 'none';
  }
}

function highlightSection(section, query) {
  const cards = section.querySelectorAll('.cmd-code, .cmd-desc');
  const regex = new RegExp(`(${escapeRegex(query)})`, 'gi');
  cards.forEach(card => {
    if (card.dataset.original === undefined) card.dataset.original = card.innerHTML;
    card.innerHTML = card.dataset.original.replace(regex, '<span class="cmd-highlight">$1</span>');
  });
}

function unhighlightSection(section) {
  section.querySelectorAll('.cmd-code, .cmd-desc').forEach(el => {
    if (el.dataset.original !== undefined) {
      el.innerHTML = el.dataset.original;
    }
  });
}

function escapeRegex(str) {
  return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}


/* ============================================================
   COPY COMMAND
   ============================================================ */
function copyCmd(btn, text) {
  const decoded = text
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&amp;/g, '&')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'");

  navigator.clipboard.writeText(decoded).then(() => {
    const orig = btn.textContent;
    btn.textContent = '✓ done';
    btn.classList.add('copied');
    showToast('✓', 'Copied to clipboard');
    setTimeout(() => {
      btn.textContent = orig;
      btn.classList.remove('copied');
    }, 1800);
  }).catch(() => {
    // Fallback
    const ta = document.createElement('textarea');
    ta.value = decoded;
    ta.style.position = 'fixed';
    ta.style.opacity = '0';
    document.body.appendChild(ta);
    ta.select();
    document.execCommand('copy');
    document.body.removeChild(ta);
    showToast('✓', 'Copied!');
  });
}


/* ============================================================
   FAVORITES
   ============================================================ */
let favorites = JSON.parse(localStorage.getItem('pwnref-favs') || '[]');

function toggleFav(btn) {
  const card = btn.closest('.cmd-card');
  const cmd = card.dataset.cmd || card.querySelector('.cmd-code')?.textContent?.trim() || '';
  const desc = card.dataset.desc || card.querySelector('.cmd-desc')?.textContent?.trim() || '';
  const label = card.querySelector('.cmd-label')?.textContent?.trim() || 'Command';

  const existing = favorites.findIndex(f => f.cmd === cmd);
  if (existing >= 0) {
    favorites.splice(existing, 1);
    btn.classList.remove('faved');
    showToast('☆', 'Removed from favorites');
  } else {
    favorites.push({ cmd, desc, label, id: Date.now() });
    btn.classList.add('faved');
    showToast('★', 'Added to favorites');
  }

  localStorage.setItem('pwnref-favs', JSON.stringify(favorites));
  updateFavCount();
  renderFavList();
}

function updateFavCount() {
  const el = document.getElementById('fav-count');
  if (el) el.textContent = favorites.length;
}

function renderFavList() {
  const list = document.getElementById('fav-list');
  if (!list) return;
  if (favorites.length === 0) {
    list.innerHTML = '<div class="fav-empty">No favorites yet.<br>Click ★ on any command to save it.</div>';
    return;
  }
  list.innerHTML = favorites.map((fav, idx) => `
    <div class="fav-item">
      <button class="fav-item-del" onclick="deleteFav(${idx})" title="Remove">✕</button>
      <div class="fav-item-cmd">${escapeHtml(fav.cmd)}</div>
      <div class="fav-item-desc">${escapeHtml(fav.label)}</div>
    </div>
  `).join('');
}

function deleteFav(idx) {
  favorites.splice(idx, 1);
  localStorage.setItem('pwnref-favs', JSON.stringify(favorites));
  updateFavCount();
  renderFavList();
  syncFavButtons();
}

function syncFavButtons() {
  document.querySelectorAll('.fav-btn').forEach(btn => {
    const card = btn.closest('.cmd-card');
    const cmd = card?.dataset.cmd || card?.querySelector('.cmd-code')?.textContent?.trim() || '';
    btn.classList.toggle('faved', favorites.some(f => f.cmd === cmd));
  });
}

function exportFavs() {
  if (favorites.length === 0) {
    showToast('⚠', 'No favorites to export');
    return;
  }
  const text = favorites.map(f => `# ${f.label}\n${f.cmd}\n`).join('\n');
  const blob = new Blob([text], { type: 'text/plain' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'pwnref-favorites.txt';
  a.click();
  URL.revokeObjectURL(url);
  showToast('↓', 'Favorites exported');
}

function toggleFavPanel() {
  const panel = document.getElementById('fav-panel');
  const overlay = document.getElementById('overlay');
  const isOpen = panel.classList.toggle('open');
  overlay.classList.toggle('show', isOpen);
  if (isOpen) renderFavList();
}


/* ============================================================
   MOBILE SIDEBAR
   ============================================================ */
function toggleSidebar() {
  const sidebar = document.getElementById('sidebar');
  const overlay = document.getElementById('overlay');
  const isOpen = sidebar.classList.toggle('open');
  overlay.classList.toggle('show', isOpen);
}

function closeAll() {
  document.getElementById('sidebar').classList.remove('open');
  document.getElementById('fav-panel').classList.remove('open');
  document.getElementById('overlay').classList.remove('show');
}


/* ============================================================
   TOAST
   ============================================================ */
let toastTimer;
function showToast(icon, message) {
  const toast = document.getElementById('toast');
  const toastIcon = document.getElementById('toast-icon');
  const toastText = document.getElementById('toast-text');
  if (!toast) return;
  toastIcon.textContent = icon;
  toastText.textContent = message;
  toast.style.opacity = '1';
  toast.style.transform = 'translateY(0)';
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateY(20px)';
  }, 1800);
}


/* ============================================================
   UTILS
   ============================================================ */
function escapeHtml(str) {
  return (str || '').replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
}


/* ============================================================
   INIT
   ============================================================ */
document.addEventListener('DOMContentLoaded', () => {
  buildSidebar();
  initSidebarHeights();
  initScrollSpy();
  initSearch();
  updateFavCount();
  syncFavButtons();

  // Animate sections on scroll
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.05 });

  document.querySelectorAll('.tool-section').forEach((s, i) => {
    s.style.opacity = '0';
    s.style.transform = 'translateY(24px)';
    s.style.transition = `opacity .4s ease ${i * 0.03}s, transform .4s ease ${i * 0.03}s`;
    observer.observe(s);
  });
});
