/* ============================================
   BURGERVERSE — 3D Interactive JavaScript
   ============================================ */

'use strict';

// =============================================
// GSAP Registration
// =============================================
gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

// =============================================
// DATA
// =============================================
const menuItems = [
  {
    id: 1, name: 'THE CLASSIC', category: 'classic', price: 14.99,
    desc: 'Wagyu beef patty, aged cheddar, house pickles, secret sauce on toasted brioche.',
    emoji: '🍔', spicy: 1
  },
  {
    id: 2, name: 'INFERNO STACK', category: 'spicy', price: 17.99,
    desc: 'Double smash patty, ghost pepper cheese, jalapeños, fiery aioli. Not for the faint-hearted.',
    emoji: '🌶️', spicy: 3
  },
  {
    id: 3, name: 'TRUFFLE ROYALE', category: 'premium', price: 24.99,
    desc: 'Black truffle mayo, Wagyu smash, Gruyère, caramelised onions, wild mushrooms.',
    emoji: '🥩', spicy: 0
  },
  {
    id: 4, name: 'GARDEN GOD', category: 'vegan', price: 15.99,
    desc: 'Crispy plant patty, cashew cheese, roasted peppers, avocado smash, sprout slaw.',
    emoji: '🥬', spicy: 0
  },
  {
    id: 5, name: 'BACON FORTRESS', category: 'classic', price: 19.99,
    desc: 'Triple crispy bacon, smoked cheddar, BBQ glaze, fried egg, house burger blend patty.',
    emoji: '🥓', spicy: 1
  },
  {
    id: 6, name: 'DRAGON SMASH', category: 'spicy', price: 18.99,
    desc: 'Triple smash patty, sriracha mayo, crunchy slaw, pickled daikon, sesame brioche.',
    emoji: '🔥', spicy: 2
  },
  {
    id: 7, name: 'GOLD STANDARD', category: 'premium', price: 29.99,
    desc: 'A5 Wagyu, lobster sauce, truffle oil, micro greens, gold leaf — the absolute pinnacle.',
    emoji: '👑', spicy: 0
  },
  {
    id: 8, name: 'TERRA VERDE', category: 'vegan', price: 16.99,
    desc: 'Beetroot & quinoa patty, vegan aioli, sun-dried tomato, fresh basil, sourdough bun.',
    emoji: '🌿', spicy: 0
  },
];

const ingredients = [
  { icon: '🍞', name: 'Brioche Bun', desc: 'Baked fresh daily with butter & honey', color: '#D4851A' },
  { icon: '🥬', name: 'Crisp Lettuce', desc: 'Hydroponic, harvested same morning', color: '#5CB85C' },
  { icon: '🍅', name: 'Roma Tomatoes', desc: 'Sun-ripened, sliced to 8mm precision', color: '#E63946' },
  { icon: '🧀', name: 'Aged Cheddar', desc: '18-month cave-aged English cheddar', color: '#FFD700' },
  { icon: '🥩', name: 'Wagyu Beef', desc: 'Marble Score 9+, hand-formed daily', color: '#3B1E0A' },
  { icon: '🫙', name: 'Secret Sauce', desc: '17 ingredients, zero compromises', color: '#FF6B1A' },
];

const testimonials = [
  { name: 'Sofia M.', location: 'New York', stars: 5, text: '"The Truffle Royale completely changed my understanding of what a burger could be. Absolute perfection in every bite."', emoji: '👩' },
  { name: 'James K.', location: 'Los Angeles', stars: 5, text: '"I flew from LA just to try BurgerVerse. Worth every single mile. The secret sauce alone is worth the trip."', emoji: '👨' },
  { name: 'Priya S.', location: 'London', stars: 5, text: '"As a Londoner, I was sceptical. Then I had the Gold Standard. I now visit every time I\'m in New York."', emoji: '👩‍🦱' },
  { name: 'Marcus T.', location: 'Chicago', stars: 5, text: '"The Inferno Stack nearly made me cry — and I mean that as the highest compliment. Extraordinary."', emoji: '👨‍🦲' },
  { name: 'Aiko Y.', location: 'Tokyo', stars: 5, text: '"As someone from Japan who takes beef seriously, BurgerVerse\'s Wagyu quality is genuinely impressive."', emoji: '👩‍🦰' },
  { name: 'Diego R.', location: 'Miami', stars: 5, text: '"Garden God converted me. I came for a real burger, tried the vegan option on a dare, and left a convert."', emoji: '🧑' },
];

// =============================================
// CART STATE
// =============================================
let cart = [];

// =============================================
// DOM READY
// =============================================
document.addEventListener('DOMContentLoaded', () => {
  initCustomCursor();
  initNavbar();
  initMobileMenu();
  initParticleCanvas();
  initHeroCanvas();
  initMenuGrid();
  initMenuFilters();
  initIngredientCards();
  initTestimonials();
  initScrollAnimations();
  initCounters();
  initSmoothScroll();
  initContactForm();
  initOrderModal();
  initAboutCanvas();
});

// =============================================
// CUSTOM CURSOR
// =============================================
function initCustomCursor() {
  const dot = document.getElementById('cursorDot');
  const ring = document.getElementById('cursorRing');
  let ringX = 0, ringY = 0;
  let mouseX = 0, mouseY = 0;

  document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    dot.style.left = mouseX + 'px';
    dot.style.top = mouseY + 'px';
  });

  function animateRing() {
    ringX += (mouseX - ringX) * 0.12;
    ringY += (mouseY - ringY) * 0.12;
    ring.style.left = ringX + 'px';
    ring.style.top = ringY + 'px';
    requestAnimationFrame(animateRing);
  }
  animateRing();

  // Hover effect on interactive elements
  const hoverEls = document.querySelectorAll('a, button, .menu-card, .filter-btn, .ingredient-card, .social-icon');
  hoverEls.forEach(el => {
    el.addEventListener('mouseenter', () => ring.classList.add('hovering'));
    el.addEventListener('mouseleave', () => ring.classList.remove('hovering'));
  });

  // Add hover to dynamically added elements
  document.addEventListener('mouseenter', (e) => {
    if (e.target.matches('a, button, .menu-card, .filter-btn, .ingredient-card, .social-icon, .card-add-btn')) {
      ring.classList.add('hovering');
    }
  }, true);
  document.addEventListener('mouseleave', (e) => {
    if (e.target.matches('a, button, .menu-card, .filter-btn, .ingredient-card, .social-icon, .card-add-btn')) {
      ring.classList.remove('hovering');
    }
  }, true);
}

// =============================================
// NAVBAR SCROLL BEHAVIOR
// =============================================
function initNavbar() {
  const navbar = document.getElementById('navbar');
  const navLinks = document.querySelectorAll('.nav-link');
  const sections = document.querySelectorAll('.section');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 60) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }

    // Active nav link
    let current = '';
    sections.forEach(section => {
      const sectionTop = section.offsetTop - 120;
      if (window.scrollY >= sectionTop) {
        current = section.id;
      }
    });
    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.dataset.section === current) {
        link.classList.add('active');
      }
    });
  });
}

// =============================================
// MOBILE MENU
// =============================================
function initMobileMenu() {
  const btn = document.getElementById('hamburgerBtn');
  const menu = document.getElementById('mobileMenu');
  const mobileLinks = document.querySelectorAll('.mobile-nav-link');
  let isOpen = false;

  btn.addEventListener('click', () => {
    isOpen = !isOpen;
    menu.classList.toggle('open', isOpen);
    const spans = btn.querySelectorAll('span');
    if (isOpen) {
      spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
      spans[1].style.opacity = '0';
      spans[2].style.transform = 'rotate(-45deg) translate(5px, -5px)';
    } else {
      spans[0].style.transform = '';
      spans[1].style.opacity = '';
      spans[2].style.transform = '';
    }
  });

  mobileLinks.forEach(link => {
    link.addEventListener('click', () => {
      isOpen = false;
      menu.classList.remove('open');
      const spans = btn.querySelectorAll('span');
      spans[0].style.transform = '';
      spans[1].style.opacity = '';
      spans[2].style.transform = '';
    });
  });
}

// =============================================
// PARTICLE CANVAS (Background)
// =============================================
function initParticleCanvas() {
  const canvas = document.getElementById('particleCanvas');
  const ctx = canvas.getContext('2d');
  let particles = [];
  let W, H;

  function resize() {
    W = canvas.width = window.innerWidth;
    H = canvas.height = window.innerHeight;
  }
  resize();
  window.addEventListener('resize', resize);

  class Particle {
    constructor() { this.reset(); }
    reset() {
      this.x = Math.random() * W;
      this.y = Math.random() * H;
      this.r = Math.random() * 1.8 + 0.3;
      this.speedY = -(Math.random() * 0.4 + 0.1);
      this.speedX = (Math.random() - 0.5) * 0.2;
      this.opacity = Math.random() * 0.5 + 0.1;
      this.decay = Math.random() * 0.002 + 0.001;
      const colors = ['#FF6B1A', '#FFB627', '#E63946', '#ffffff'];
      this.color = colors[Math.floor(Math.random() * colors.length)];
    }
    update() {
      this.x += this.speedX;
      this.y += this.speedY;
      this.opacity -= this.decay;
      if (this.opacity <= 0 || this.y < 0) this.reset();
    }
    draw() {
      ctx.save();
      ctx.globalAlpha = this.opacity;
      ctx.fillStyle = this.color;
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    }
  }

  for (let i = 0; i < 120; i++) {
    const p = new Particle();
    p.y = Math.random() * H; // Start spread across screen
    particles.push(p);
  }

  function animate() {
    ctx.clearRect(0, 0, W, H);
    particles.forEach(p => { p.update(); p.draw(); });
    requestAnimationFrame(animate);
  }
  animate();
}

// =============================================
// HERO CANVAS — Wave / Grid
// =============================================
function initHeroCanvas() {
  const canvas = document.getElementById('heroCanvas');
  const ctx = canvas.getContext('2d');
  let W, H, time = 0;

  function resize() {
    W = canvas.width = canvas.offsetWidth;
    H = canvas.height = canvas.offsetHeight;
  }
  resize();
  window.addEventListener('resize', resize);

  function draw() {
    ctx.clearRect(0, 0, W, H);
    time += 0.008;

    // Draw perspective grid
    const cols = 20;
    const rows = 16;
    const cellW = W / cols;
    const cellH = H / rows;
    const horizon = H * 0.55;

    ctx.strokeStyle = 'rgba(255,107,26,0.07)';
    ctx.lineWidth = 0.8;

    // Vertical lines
    for (let i = 0; i <= cols; i++) {
      const x = i * cellW;
      ctx.beginPath();
      ctx.moveTo(x, horizon);
      // Perspective vanish to center
      ctx.lineTo(W / 2 + (x - W / 2) * 0.02, horizon - 60);
      ctx.lineTo(x, H + 20);
      ctx.stroke();
    }

    // Horizontal lines
    for (let j = 0; j <= rows * 0.6; j++) {
      const yProgress = j / (rows * 0.6);
      const y = horizon + yProgress * (H - horizon + 20);
      // Wave distortion
      ctx.beginPath();
      for (let x = 0; x <= W; x += 4) {
        const wave = Math.sin(x * 0.015 + time + j * 0.5) * (6 * (1 - yProgress));
        if (x === 0) ctx.moveTo(x, y + wave);
        else ctx.lineTo(x, y + wave);
      }
      ctx.stroke();
    }

    requestAnimationFrame(draw);
  }
  draw();
}

// =============================================
// ABOUT SECTION 3D CANVAS
// =============================================
function initAboutCanvas() {
  const canvas = document.getElementById('aboutCanvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  let W, H, time = 0;

  function resize() {
    W = canvas.width = canvas.offsetWidth;
    H = canvas.height = canvas.offsetHeight;
  }
  resize();

  // Rotating 3D Burger visualization
  function draw() {
    ctx.clearRect(0, 0, W, H);
    time += 0.01;

    const cx = W / 2;
    const cy = H / 2;

    // Background glow
    const grd = ctx.createRadialGradient(cx, cy, 0, cx, cy, W * 0.5);
    grd.addColorStop(0, 'rgba(255,107,26,0.06)');
    grd.addColorStop(1, 'rgba(0,0,0,0)');
    ctx.fillStyle = grd;
    ctx.fillRect(0, 0, W, H);

    // Draw spinning orbit rings
    for (let i = 0; i < 3; i++) {
      const angle = time * (0.5 + i * 0.3) + (i * Math.PI * 0.66);
      const rx = W * 0.35;
      const ry = W * 0.12;
      ctx.save();
      ctx.translate(cx, cy);
      ctx.rotate(angle * 0.2 + i * 0.5);
      ctx.scale(1, ry / rx);
      ctx.beginPath();
      ctx.arc(0, 0, rx, 0, Math.PI * 2);
      ctx.strokeStyle = `rgba(255,107,26,${0.06 - i * 0.01})`;
      ctx.lineWidth = 1;
      ctx.stroke();

      // Dot on orbit
      const dotX = Math.cos(angle) * rx;
      const dotY = Math.sin(angle) * rx;
      ctx.scale(1, rx / ry);
      ctx.beginPath();
      ctx.arc(dotX, dotY, 4, 0, Math.PI * 2);
      ctx.fillStyle = i === 0 ? '#FF6B1A' : i === 1 ? '#FFB627' : '#E63946';
      ctx.fill();
      ctx.restore();
    }

    // CSS Burger layers as canvas art
    const layers = [
      { h: 28, color: '#D4851A', borderR: 70 }, // bun top
      { h: 10, color: '#5CB85C', borderR: 5 },   // lettuce
      { h: 8, color: '#E63946', borderR: 4 },    // tomato
      { h: 7, color: '#FFD700', borderR: 3 },    // cheese
      { h: 18, color: '#3B1E0A', borderR: 8 },   // patty
      { h: 16, color: '#C47A1A', borderR: 50 },  // bun bottom
    ];

    const totalH = layers.reduce((s, l) => s + l.h + 4, 0);
    let startY = cy - totalH / 2;

    const rotSpeed = Math.sin(time * 0.5) * 0.08;
    const lift = Math.sin(time) * 6;

    layers.forEach((layer, i) => {
      const perspective = 1 + i * 0.03;
      const layerW = (W * 0.55) * perspective;
      const offsetX = (cx - layerW / 2);
      const y = startY + lift + (i > 0 && time % (Math.PI * 2) < 0.5 ? i * -2 : 0);

      // Layer shadow
      ctx.save();
      ctx.filter = 'blur(8px)';
      ctx.globalAlpha = 0.2;
      ctx.fillStyle = '#000';
      ctx.beginPath();
      ctx.ellipse(cx, y + layer.h + 10, layerW * 0.45, 8, 0, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();

      // Layer body
      ctx.save();
      ctx.translate(cx, y + layer.h / 2);
      ctx.transform(1, rotSpeed * (i - 2.5) * 0.3, 0, 1, 0, 0);

      const ry = layer.h / 2;
      const rx = layerW / 2;

      ctx.beginPath();
      ctx.ellipse(0, -ry * 0.3, rx, ry, 0, 0, Math.PI * 2);
      ctx.fillStyle = layer.color;
      ctx.fill();

      // Highlight
      const grad = ctx.createLinearGradient(0, -ry, 0, ry);
      grad.addColorStop(0, 'rgba(255,255,255,0.15)');
      grad.addColorStop(0.5, 'rgba(255,255,255,0.03)');
      grad.addColorStop(1, 'rgba(0,0,0,0.25)');
      ctx.fillStyle = grad;
      ctx.fill();
      ctx.restore();

      startY += layer.h + 4;
    });

    requestAnimationFrame(draw);
  }
  draw();
}

// =============================================
// MENU GRID
// =============================================
function initMenuGrid() {
  const grid = document.getElementById('menuGrid');
  renderMenuCards(menuItems, grid);
}

function renderMenuCards(items, container) {
  container.innerHTML = '';
  items.forEach((item, i) => {
    const card = document.createElement('div');
    card.className = 'menu-card';
    card.dataset.category = item.category;
    card.style.animationDelay = `${i * 0.07}s`;

    const spicyDots = [1,2,3].map(n => `<div class="spicy-pip ${n <= item.spicy ? 'hot' : ''}"></div>`).join('');

    card.innerHTML = `
      <div class="card-img-wrap">
        <div class="card-burger-emoji">${item.emoji}</div>
        <div class="card-img-glow"></div>
        <div class="card-badge badge-${item.category}">${item.category.toUpperCase()}</div>
      </div>
      <div class="card-body">
        <div class="card-spicy-meter">${spicyDots}</div>
        <h3 class="card-name">${item.name}</h3>
        <p class="card-desc">${item.desc}</p>
        <div class="card-footer">
          <span class="card-price">$${item.price.toFixed(2)}</span>
          <button class="card-add-btn" aria-label="Add ${item.name} to cart" data-id="${item.id}" data-name="${item.name}" data-price="${item.price}">+</button>
        </div>
      </div>
    `;

    // Add to cart
    card.querySelector('.card-add-btn').addEventListener('click', (e) => {
      e.stopPropagation();
      addToCart(item);
      animateAddToCart(e.currentTarget);
    });

    container.appendChild(card);
  });

  // Reveal cards with stagger
  gsap.fromTo('.menu-card', { y: 40, opacity: 0 }, {
    y: 0, opacity: 1, duration: 0.6, stagger: 0.08, ease: 'power2.out',
    scrollTrigger: { trigger: '#menuGrid', start: 'top 85%' }
  });
}

function animateAddToCart(btn) {
  gsap.timeline()
    .to(btn, { scale: 1.4, duration: 0.15, ease: 'power2.out' })
    .to(btn, { scale: 1, duration: 0.2, ease: 'elastic.out(1, 0.5)' });
}

// =============================================
// MENU FILTERS
// =============================================
function initMenuFilters() {
  const filterBtns = document.querySelectorAll('.filter-btn');
  const grid = document.getElementById('menuGrid');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.dataset.filter;
      const filtered = filter === 'all' ? menuItems : menuItems.filter(i => i.category === filter);
      
      gsap.to(grid, { opacity: 0, y: 10, duration: 0.2, onComplete: () => {
        renderMenuCards(filtered, grid);
        gsap.to(grid, { opacity: 1, y: 0, duration: 0.3 });
      }});
    });
  });
}

// =============================================
// CART
// =============================================
function addToCart(item) {
  const existing = cart.find(c => c.id === item.id);
  if (existing) {
    existing.qty++;
  } else {
    cart.push({ ...item, qty: 1 });
  }
  updateCartModal();
  // Badge on nav button
  updateNavCartBadge();
}

function updateNavCartBadge() {
  const btn = document.getElementById('navOrderBtn');
  const total = cart.reduce((s, i) => s + i.qty, 0);
  if (total > 0) {
    btn.textContent = `Order (${total})`;
  } else {
    btn.textContent = 'Order Now';
  }
}

function updateCartModal() {
  const cartEl = document.getElementById('modalCart');
  const totalEl = document.getElementById('modalTotal');
  const placeBtn = document.getElementById('placeOrderBtn');
  const totalPrice = document.getElementById('totalPrice');

  if (cart.length === 0) {
    cartEl.innerHTML = '<p class="cart-empty">Your cart is empty. Add some burgers!</p>';
    totalEl.style.display = 'none';
    placeBtn.style.display = 'none';
    return;
  }

  cartEl.innerHTML = cart.map(item => `
    <div class="cart-item">
      <span>${item.emoji} ${item.name} × ${item.qty}</span>
      <span>$${(item.price * item.qty).toFixed(2)}</span>
    </div>
  `).join('');

  const total = cart.reduce((s, i) => s + i.price * i.qty, 0);
  totalPrice.textContent = `$${total.toFixed(2)}`;
  totalEl.style.display = 'flex';
  placeBtn.style.display = 'flex';
}

// =============================================
// ORDER MODAL
// =============================================
function initOrderModal() {
  const modal = document.getElementById('orderModal');
  const navBtn = document.getElementById('navOrderBtn');
  const closeBtn = document.getElementById('modalClose');
  const placeBtn = document.getElementById('placeOrderBtn');

  navBtn.addEventListener('click', () => {
    modal.classList.add('open');
    updateCartModal();
  });
  closeBtn.addEventListener('click', () => modal.classList.remove('open'));
  modal.addEventListener('click', (e) => {
    if (e.target === modal) modal.classList.remove('open');
  });

  placeBtn.addEventListener('click', () => {
    gsap.to(placeBtn, { scale: 0.95, duration: 0.1, yoyo: true, repeat: 1 });
    setTimeout(() => {
      cart = [];
      updateCartModal();
      updateNavCartBadge();
      modal.classList.remove('open');
      showToast('🍔 Order placed! Get ready for the experience of your life.');
    }, 400);
  });
}

function showToast(msg) {
  const toast = document.createElement('div');
  toast.style.cssText = `
    position: fixed; bottom: 32px; left: 50%; transform: translateX(-50%) translateY(20px);
    background: #1a1510; border: 1px solid rgba(255,107,26,0.3);
    color: #F5EFE6; padding: 14px 24px; border-radius: 50px;
    font-size: 0.9rem; z-index: 9000; opacity: 0;
    transition: all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
    box-shadow: 0 8px 32px rgba(0,0,0,0.6);
    white-space: nowrap;
  `;
  toast.textContent = msg;
  document.body.appendChild(toast);
  setTimeout(() => { toast.style.opacity = '1'; toast.style.transform = 'translateX(-50%) translateY(0)'; }, 10);
  setTimeout(() => {
    toast.style.opacity = '0'; toast.style.transform = 'translateX(-50%) translateY(20px)';
    setTimeout(() => toast.remove(), 400);
  }, 3500);
}

// =============================================
// INGREDIENT CARDS
// =============================================
function initIngredientCards() {
  const wrap = document.getElementById('ingredientCards');
  const stack = document.getElementById('layerPreviewStack');

  if (!wrap || !stack) return;

  // Build preview stack elements
  const layerColors = [
    { bg: '#D4851A', h: '28px', label: 'Bun Top', br: '60px 60px 30px 30px' },
    { bg: '#5CB85C', h: '14px', label: 'Lettuce', br: '4px' },
    { bg: '#E63946', h: '10px', label: 'Tomato', br: '4px' },
    { bg: '#FFD700', h: '9px', label: 'Cheese', br: '3px' },
    { bg: '#3B1E0A', h: '22px', label: 'Patty', br: '8px' },
    { bg: '#C47A1A', h: '20px', label: 'Bun Bottom', br: '30px 30px 60px 60px' },
  ];

  stack.innerHTML = layerColors.map((l, i) => `
    <div class="layer-preview-item" id="layer-prev-${i}" style="
      height: ${l.h};
      background: ${l.bg};
      border-radius: ${l.br};
      width: 80%;
      box-shadow: 0 4px 12px rgba(0,0,0,0.4);
    "></div>
  `).join('');

  // Ingredient cards
  ingredients.forEach((ingr, i) => {
    const card = document.createElement('div');
    card.className = 'ingredient-card reveal-up';
    card.innerHTML = `
      <span class="ingr-num">0${i + 1}</span>
      <span class="ingr-icon">${ingr.icon}</span>
      <div class="ingr-info">
        <h4>${ingr.name}</h4>
        <p>${ingr.desc}</p>
      </div>
    `;

    card.addEventListener('mouseenter', () => {
      // Highlight corresponding layer
      document.querySelectorAll('.layer-preview-item').forEach((el, j) => {
        el.classList.remove('highlight');
        if (j === i) el.classList.add('highlight');
      });
      gsap.to(`#layer-prev-${i}`, {
        scaleX: 1.08, boxShadow: `0 0 24px ${ingr.color}60`, duration: 0.3
      });
    });
    card.addEventListener('mouseleave', () => {
      gsap.to(`#layer-prev-${i}`, {
        scaleX: 1, boxShadow: '0 4px 12px rgba(0,0,0,0.4)', duration: 0.3
      });
    });

    wrap.appendChild(card);
  });

  // Animate stack entrance
  gsap.fromTo('.layer-preview-item', {
    x: -30, opacity: 0
  }, {
    x: 0, opacity: 1, duration: 0.5, stagger: 0.1, ease: 'power2.out',
    scrollTrigger: { trigger: '#ingredients', start: 'top 70%' }
  });
}

// =============================================
// TESTIMONIALS
// =============================================
function initTestimonials() {
  const track = document.getElementById('testimonialsTrack');
  if (!track) return;

  const doubled = [...testimonials, ...testimonials]; // Infinite loop

  doubled.forEach(t => {
    const card = document.createElement('div');
    card.className = 'testimonial-card';
    card.innerHTML = `
      <div class="testi-stars">${'⭐'.repeat(t.stars)}</div>
      <p class="testi-text">${t.text}</p>
      <div class="testi-author">
        <div class="testi-avatar">${t.emoji}</div>
        <div>
          <div class="testi-name">${t.name}</div>
          <div class="testi-location">${t.location}</div>
        </div>
      </div>
    `;
    track.appendChild(card);
  });
}

// =============================================
// SCROLL ANIMATIONS (IntersectionObserver)
// =============================================
function initScrollAnimations() {
  const revealEls = document.querySelectorAll('.reveal-up, .reveal-left, .reveal-right');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

  revealEls.forEach(el => observer.observe(el));

  // Observe dynamic elements
  setTimeout(() => {
    document.querySelectorAll('.reveal-up:not(.revealed)').forEach(el => observer.observe(el));
  }, 200);

  // GSAP ScrollTrigger parallax on hero burger
  gsap.to('.hero-burger-container', {
    y: 80,
    ease: 'none',
    scrollTrigger: { trigger: '#hero', start: 'top top', end: 'bottom top', scrub: 1.5 }
  });

  // Hero content parallax
  gsap.to('.hero-content', {
    y: -40,
    ease: 'none',
    scrollTrigger: { trigger: '#hero', start: 'top top', end: 'bottom top', scrub: 1 }
  });

  // Menu section title pin
  gsap.fromTo('.menu-section .section-header', { y: 30, opacity: 0 }, {
    y: 0, opacity: 1, duration: 0.8,
    scrollTrigger: { trigger: '.menu-section', start: 'top 80%' }
  });
}

// =============================================
// COUNTERS
// =============================================
function initCounters() {
  const counters = document.querySelectorAll('.stat-number');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const target = parseInt(el.dataset.target);
        let start = 0;
        const step = target / 60;
        const timer = setInterval(() => {
          start += step;
          if (start >= target) { start = target; clearInterval(timer); }
          el.textContent = Math.floor(start);
        }, 25);
        observer.unobserve(el);
      }
    });
  }, { threshold: 0.5 });

  counters.forEach(c => observer.observe(c));
}

// =============================================
// SMOOTH SCROLL
// =============================================
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      const href = anchor.getAttribute('href');
      if (href === '#') return;
      const target = document.querySelector(href);
      if (!target) return;
      e.preventDefault();
      gsap.to(window, {
        duration: 1.2,
        scrollTo: { y: target, offsetY: 70 },
        ease: 'power3.inOut'
      });
    });
  });
}

// =============================================
// CONTACT FORM
// =============================================
function initContactForm() {
  const form = document.getElementById('contactForm');
  const success = document.getElementById('formSuccess');
  const btn = document.getElementById('reserveBtn');

  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    btn.disabled = true;
    btn.querySelector('span').textContent = 'Confirming...';

    gsap.to(btn, { scale: 0.97, duration: 0.1, yoyo: true, repeat: 1 });

    setTimeout(() => {
      form.querySelectorAll('input, select, textarea').forEach(el => el.value = '');
      btn.querySelector('span').textContent = 'Reserve My Table';
      btn.disabled = false;
      success.style.display = 'block';
      gsap.fromTo(success, { opacity: 0, y: 10 }, { opacity: 1, y: 0, duration: 0.5 });
      setTimeout(() => {
        gsap.to(success, { opacity: 0, y: -10, duration: 0.4, onComplete: () => { success.style.display = 'none'; } });
      }, 4000);
    }, 1400);
  });
}

// =============================================
// THREE.JS BACKGROUND SCENE (Floating Particles)
// =============================================
/* We use our canvas-based particle system instead of Three.js
   to keep it lightweight, but let's add a Three.js donut ring
   decorative element behind the about section visual */
window.addEventListener('load', () => {
  try {
    if (typeof THREE === 'undefined') return;
    // Three.js is available — create ambient decorative scene
    // (handled via canvas fallback already; this is a bonus enhancement)
  } catch(e) {
    console.log('Three.js enhancement skipped');
  }
});

// =============================================
// BURGER LAYER HOVER — 3D Tilt on Hero Burger
// =============================================
(function initBurgerTilt() {
  const wrapper = document.getElementById('burger3D');
  if (!wrapper) return;

  wrapper.addEventListener('mousemove', (e) => {
    const rect = wrapper.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const dx = (e.clientX - cx) / (rect.width / 2);
    const dy = (e.clientY - cy) / (rect.height / 2);

    gsap.to(wrapper, {
      rotationY: dx * 18,
      rotationX: -dy * 12,
      transformPerspective: 600,
      transformOrigin: 'center center',
      duration: 0.4,
      ease: 'power2.out'
    });
  });

  wrapper.addEventListener('mouseleave', () => {
    gsap.to(wrapper, {
      rotationY: 0,
      rotationX: 0,
      duration: 0.8,
      ease: 'elastic.out(1, 0.4)'
    });
  });
})();

// =============================================
// MENU CARD TILT EFFECT
// =============================================
document.addEventListener('mousemove', (e) => {
  const cards = document.querySelectorAll('.menu-card');
  cards.forEach(card => {
    const rect = card.getBoundingClientRect();
    if (e.clientX < rect.left - 80 || e.clientX > rect.right + 80 ||
        e.clientY < rect.top - 80 || e.clientY > rect.bottom + 80) return;

    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const dx = (e.clientX - cx) / (rect.width / 2);
    const dy = (e.clientY - cy) / (rect.height / 2);

    gsap.to(card, {
      rotationY: dx * 6,
      rotationX: -dy * 4,
      transformPerspective: 800,
      duration: 0.4,
      ease: 'power2.out'
    });
  });
});

document.addEventListener('mouseleave', () => {
  document.querySelectorAll('.menu-card').forEach(card => {
    gsap.to(card, { rotationY: 0, rotationX: 0, duration: 0.6, ease: 'power2.out' });
  });
});

// =============================================
// PERF: Pause animations when tab is hidden
// =============================================
document.addEventListener('visibilitychange', () => {
  if (document.hidden) {
    gsap.globalTimeline.pause();
  } else {
    gsap.globalTimeline.resume();
  }
});

console.log('%c🍔 BurgerVerse', 'font-size: 32px; color: #FF6B1A; font-weight: bold;');
console.log('%cBuilt with passion, Three.js, GSAP & CSS wizardry.', 'color: #FFB627;');
