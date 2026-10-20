/**
 * BABULAL FURNITURE — Component & Interaction Controller
 * Editorial Architectural Reset
 * Zero-dependency Vanilla JS with Full Accessibility & SEO Alignment
 */

document.addEventListener('DOMContentLoaded', () => {
  initHeader();
  initMobileNav();
  renderCategories();
  renderFeaturedProducts();
  renderGallery();
  initModals();
  initWhatsAppLinks();
});

/* ==========================================================================
   1. HEADER SCROLL & SPY NAVIGATION
   ========================================================================== */
function initHeader() {
  const header = document.querySelector('.site-header');
  if (!header) return;

  const handleScroll = () => {
    if (window.scrollY > 30) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  };

  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll();

  // Scrollspy for active nav links
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.desktop-nav-link');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('id');
        navLinks.forEach(link => {
          if (link.getAttribute('href') === `#${id}`) {
            link.classList.add('active');
          } else {
            link.classList.remove('active');
          }
        });
      }
    });
  }, { rootMargin: '-20% 0px -70% 0px' });

  sections.forEach(section => observer.observe(section));
}

/* ==========================================================================
   2. MOBILE NAVIGATION DRAWER
   ========================================================================== */
function initMobileNav() {
  const hamburger = document.getElementById('hamburgerBtn');
  const drawer = document.getElementById('mobileNavDrawer');
  const closeBtn = document.getElementById('mobileNavClose');
  const navLinks = document.querySelectorAll('.mobile-nav-item a');

  if (!hamburger || !drawer) return;

  const openDrawer = () => {
    drawer.classList.add('open');
    drawer.setAttribute('aria-hidden', 'false');
    hamburger.setAttribute('aria-expanded', 'true');
    document.body.style.overflow = 'hidden';
  };

  const closeDrawer = () => {
    drawer.classList.remove('open');
    drawer.setAttribute('aria-hidden', 'true');
    hamburger.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
  };

  hamburger.addEventListener('click', openDrawer);
  if (closeBtn) closeBtn.addEventListener('click', closeDrawer);

  drawer.addEventListener('click', (e) => {
    if (e.target === drawer) closeDrawer();
  });

  navLinks.forEach(link => link.addEventListener('click', closeDrawer));

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && drawer.classList.contains('open')) {
      closeDrawer();
    }
  });
}

/* ==========================================================================
   3. CATEGORY DISCOVERY (ARCHITECTURAL IMAGE TILES)
   ========================================================================== */
function renderCategories() {
  const container = document.getElementById('categoriesGrid');
  if (!container || typeof BabulalCategories === 'undefined') return;

  container.innerHTML = BabulalCategories.map(cat => `
    <article class="category-editorial-card" onclick="filterByCategoryId('${cat.id}')" role="button" tabindex="0" aria-label="Explore ${cat.name} Collection">
      <picture>
        <source srcset="${cat.image}" type="image/webp">
        <img class="category-editorial-img" src="${cat.imageFallback}" alt="${cat.name} handcrafted by Babulal Furniture" loading="lazy" width="600" height="450">
      </picture>
      <div class="category-editorial-overlay">
        <span class="category-card-count">${cat.count} PIECES</span>
        <h3 class="category-card-title">${cat.name.toUpperCase()}</h3>
        <span class="category-card-action">
          <span>EXPLORE PIECES</span>
          <span class="material-symbols-outlined" style="font-size: 16px;">arrow_forward</span>
        </span>
      </div>
    </article>
  `).join('');

  // Keyboard accessibility
  container.querySelectorAll('.category-editorial-card').forEach(card => {
    card.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        card.click();
      }
    });
  });
}

/* ==========================================================================
   4. FEATURED PRODUCTS & FILTER SYSTEM
   ========================================================================== */
let activeFilter = 'all';

function renderFeaturedProducts() {
  const grid = document.getElementById('productsGrid');
  const filterBar = document.getElementById('productFilterBar');
  if (!grid || typeof BabulalProducts === 'undefined') return;

  // Initialize Filter Bar Pills Once
  if (filterBar && filterBar.children.length === 0) {
    const pills = [
      { id: 'all', label: 'All Collections' },
      { id: 'living-room', label: 'Living' },
      { id: 'bedroom', label: 'Bedroom' },
      { id: 'dining-room', label: 'Dining' },
      { id: 'swings-jhula', label: 'Swings / Jhula' },
      { id: 'mandir-temples', label: 'Mandir / Temples' },
      { id: 'doors-architectural', label: 'Doors & Woodwork' },
      { id: 'decor-accents', label: 'Accents' }
    ];

    filterBar.innerHTML = pills.map(p => `
      <button class="filter-tab ${p.id === activeFilter ? 'active' : ''}" data-filter="${p.id}" onclick="setProductFilter('${p.id}')">
        ${p.label}
      </button>
    `).join('');
  }

  // Filter products
  const productsToDisplay = activeFilter === 'all'
    ? BabulalProducts
    : BabulalProducts.filter(p => p.categoryId === activeFilter);

  let productCardsHTML = productsToDisplay.map(prod => `
    <article class="product-editorial-card" data-id="${prod.id}" onclick="openProductModal('${prod.id}')" tabindex="0" role="button" aria-label="View specifications for ${prod.name}">
      <div class="product-editorial-media">
        <picture>
          <source srcset="${prod.image}" type="image/webp">
          <img class="product-editorial-img" src="${prod.imageFallback}" alt="${prod.name} - Babulal Furniture" loading="lazy" width="600" height="450">
        </picture>
      </div>
      <div class="product-editorial-body">
        <span class="product-cat-kicker">${prod.category.toUpperCase()}</span>
        <h3 class="product-card-name">${prod.name}</h3>
        <p class="product-card-desc">${prod.materials}</p>
        <div class="product-card-action-bar">
          <span class="btn-view-details">
            <span>VIEW DETAILS</span>
            <span class="material-symbols-outlined" style="font-size: 15px;">arrow_forward</span>
          </span>
        </div>
      </div>
    </article>
  `).join('');

  let totalCardsCount = productsToDisplay.length;

  // If filtered category has 1 or 2 products, append a complementary custom workshop inquiry card to balance the grid
  if (activeFilter !== 'all' && productsToDisplay.length <= 2) {
    const activeCatObj = (typeof BabulalCategories !== 'undefined') ? BabulalCategories.find(c => c.id === activeFilter) : null;
    const catLabel = activeCatObj ? activeCatObj.name : 'Custom';
    totalCardsCount += 1;
    productCardsHTML += `
      <article class="product-editorial-card custom-inquiry-card" onclick="openQuoteModal('Custom ${catLabel} Requirement')" role="button" tabindex="0" aria-label="Request custom ${catLabel} design">
        <div class="custom-inquiry-body">
          <span class="product-cat-kicker">CUSTOM WORKSHOP SIZING</span>
          <h3 class="product-card-name">Made for Your Space</h3>
          <p class="product-card-desc">Need custom sizing or specific dimensions? We craft bespoke ${catLabel} pieces built to your exact floorplan.</p>
          <div class="product-card-action-bar">
            <span class="btn-view-details highlight">
              <span>REQUEST CUSTOM QUOTE</span>
              <span class="material-symbols-outlined" style="font-size: 15px;">arrow_forward</span>
            </span>
          </div>
        </div>
      </article>
    `;
  }

  grid.className = 'products-editorial-grid count-' + totalCardsCount;
  grid.innerHTML = productCardsHTML;

  // Keyboard accessibility for product cards
  grid.querySelectorAll('.product-editorial-card').forEach(card => {
    card.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        card.click();
      }
    });
  });
}

window.setProductFilter = function(filterId) {
  activeFilter = filterId;
  document.querySelectorAll('.filter-tab').forEach(tab => {
    if (tab.getAttribute('data-filter') === filterId) {
      tab.classList.add('active');
    } else {
      tab.classList.remove('active');
    }
  });
  renderFeaturedProducts();
};

window.filterByCategoryId = function(catId) {
  setProductFilter(catId);
  const section = document.getElementById('products');
  if (section) {
    section.scrollIntoView({ behavior: 'smooth' });
  }
};

/* ==========================================================================
   5. EDITORIAL PORTFOLIO GALLERY & LIGHTBOX
   ========================================================================== */
let currentLightboxIndex = 0;
let galleryItemsData = [];

function renderGallery() {
  const grid = document.getElementById('galleryGrid');
  if (!grid || typeof BabulalProducts === 'undefined') return;

  // Curate 8 high-impact pieces for the editorial portfolio
  galleryItemsData = [
    BabulalProducts[0],  // Contemporary Jhula
    BabulalProducts[7],  // TV Unit
    BabulalProducts[1],  // Marble Dining
    BabulalProducts[6],  // Luxury Bed
    BabulalProducts[11], // Gayatri Mantra Temple
    BabulalProducts[3],  // Heritage Jhula
    BabulalProducts[4],  // Nested Coffee Table
    BabulalProducts[12]  // Peacock Temple
  ];

  grid.innerHTML = galleryItemsData.map((item, idx) => {
    const isWide = (idx === 1 || idx === 6);
    return `
      <div class="gallery-editorial-card ${isWide ? 'wide' : ''}" onclick="openLightbox(${idx})" tabindex="0" role="button" aria-label="View ${item.name} in high-resolution">
        <picture>
          <source srcset="${item.image}" type="image/webp">
          <img class="gallery-editorial-img" src="${item.imageFallback}" alt="${item.name} custom furniture by Babulal Furniture" loading="lazy" width="800" height="600">
        </picture>
        <div class="gallery-card-overlay">
          <h4 class="gallery-overlay-title">${item.name}</h4>
          <span class="gallery-overlay-cat">${item.category}</span>
        </div>
      </div>
    `;
  }).join('');

  grid.querySelectorAll('.gallery-editorial-card').forEach(item => {
    item.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        item.click();
      }
    });
  });
}

window.openLightbox = function(index) {
  currentLightboxIndex = index;
  const item = galleryItemsData[index];
  if (!item) return;

  const modal = document.getElementById('lightboxModal');
  const img = document.getElementById('lightboxImg');
  const title = document.getElementById('lightboxTitle');
  const cat = document.getElementById('lightboxCat');

  img.src = item.imageFallback;
  if (title) title.textContent = item.name;
  if (cat) cat.textContent = `${item.category} • Handcrafted Solid Timber`;

  const whatsappBtn = document.getElementById('lightboxWhatsappBtn');
  if (whatsappBtn) {
    const text = encodeURIComponent(
      `Hello Babulal Furniture, I am interested in ${item.name}. Please share more details and pricing.`
    );
    whatsappBtn.href = `https://wa.me/${BabulalConfig.contact.whatsapp}?text=${text}`;
  }

  modal.classList.add('active');
  modal.setAttribute('aria-hidden', 'false');
  document.body.style.overflow = 'hidden';
};

window.closeLightbox = function() {
  const modal = document.getElementById('lightboxModal');
  if (!modal) return;
  modal.classList.remove('active');
  modal.setAttribute('aria-hidden', 'true');
  document.body.style.overflow = '';
};

window.navigateLightbox = function(dir) {
  let nextIndex = currentLightboxIndex + dir;
  if (nextIndex < 0) nextIndex = galleryItemsData.length - 1;
  if (nextIndex >= galleryItemsData.length) nextIndex = 0;
  openLightbox(nextIndex);
};

/* ==========================================================================
   6. SPECIFICATION MODAL & QUOTE FORM MODAL
   ========================================================================== */
function initModals() {
  // Global ESC key listener
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      const lightbox = document.getElementById('lightboxModal');
      if (lightbox && lightbox.classList.contains('active')) closeLightbox();

      const prodModal = document.getElementById('productModal');
      if (prodModal && prodModal.classList.contains('active')) closeProductModal();

      const quoteModal = document.getElementById('quoteModal');
      if (quoteModal && quoteModal.classList.contains('active')) closeQuoteModal();
    }

    const lightbox = document.getElementById('lightboxModal');
    if (lightbox && lightbox.classList.contains('active')) {
      if (e.key === 'ArrowLeft') navigateLightbox(-1);
      if (e.key === 'ArrowRight') navigateLightbox(1);
    }
  });

  // Handle quote form submit directly to WhatsApp
  const quoteForm = document.getElementById('quoteForm');
  if (quoteForm) {
    quoteForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const rawName = document.getElementById('quoteName')?.value || '';
      const rawPhone = document.getElementById('quotePhone')?.value || '';
      const rawProduct = document.getElementById('quoteProduct')?.value || 'Custom Furniture';
      const rawNotes = document.getElementById('quoteNotes')?.value || '';

      const name = rawName.trim().slice(0, 80);
      const phone = rawPhone.trim().replace(/[^0-9+\s\-]/g, '').slice(0, 25);
      const product = rawProduct.trim().slice(0, 100);
      const notes = rawNotes.trim().slice(0, 500);

      const msg = encodeURIComponent(
        `Hello Babulal Furniture,\n\nI would like to request a quote:\n` +
        `• Full Name: ${name}\n` +
        `• WhatsApp / Phone: ${phone}\n` +
        `• Item or Category: ${product}\n` +
        (notes ? `• Requirements / Dimensions: ${notes}\n` : '') +
        `\nPlease share pricing and options.`
      );

      closeQuoteModal();
      window.open(`https://wa.me/${BabulalConfig.contact.whatsapp}?text=${msg}`, '_blank', 'noopener,noreferrer');
    });
  }
}

window.openProductModal = function(productId) {
  const prod = BabulalProducts.find(p => p.id === productId);
  if (!prod) return;

  const modal = document.getElementById('productModal');
  const body = document.getElementById('productModalBody');
  if (!modal || !body) return;

  const whatsappText = encodeURIComponent(
    `Hello Babulal Furniture, I am interested in ${prod.name}. Please share more details and pricing.`
  );
  const whatsappUrl = `https://wa.me/${BabulalConfig.contact.whatsapp}?text=${whatsappText}`;

  body.innerHTML = `
    <div style="display: grid; grid-template-columns: 1fr; gap: 2rem;">
      <div style="border-radius: var(--radius-sm); overflow: hidden; background: var(--concrete); aspect-ratio: 4/3; border: 1px solid var(--border);">
        <picture>
          <source srcset="${prod.image}" type="image/webp">
          <img src="${prod.imageFallback}" alt="${prod.name} handcrafted by Babulal Furniture" width="600" height="450" style="width: 100%; height: 100%; object-fit: cover;">
        </picture>
      </div>
      <div>
        <span class="editorial-tag" style="margin-bottom: 0.35rem;">${prod.category.toUpperCase()}</span>
        <h2 style="font-family: var(--font-display); font-size: 1.85rem; font-weight: 800; margin-bottom: 0.5rem; color: var(--ink); letter-spacing: -0.03em;">${prod.name}</h2>
        <p style="color: var(--text-muted); font-size: 0.95rem; margin-bottom: 1.25rem;">${prod.tagline || ''}</p>
        
        <div style="background: var(--white); padding: 1.25rem; border-radius: var(--radius-sm); border: 1px solid var(--border); margin-bottom: 1.5rem;">
          <h4 style="font-family: var(--font-display); font-weight: 700; font-size: 0.82rem; text-transform: uppercase; letter-spacing: 0.08em; color: var(--ink); margin-bottom: 0.65rem;">
            Materials &amp; Craftsmanship
          </h4>
          <p style="font-size: 0.88rem; color: var(--text-muted); margin-bottom: 0.45rem;">
            <strong style="color: var(--ink);">Build:</strong> ${prod.materials}
          </p>
          <p style="font-size: 0.88rem; color: var(--text-muted); margin-bottom: 0;">
            <strong style="color: var(--ink);">Custom Options:</strong> ${prod.customOptions}
          </p>
        </div>

        <div style="margin-bottom: 1.5rem;">
          <h4 style="font-family: var(--font-display); font-weight: 700; font-size: 0.82rem; text-transform: uppercase; letter-spacing: 0.08em; color: var(--ink); margin-bottom: 0.75rem;">
            Verified Specifications
          </h4>
          <ul style="display: flex; flex-direction: column; gap: 0.5rem; list-style: none;">
            ${prod.specs.map(s => `
              <li style="display: flex; align-items: flex-start; gap: 0.5rem; font-size: 0.88rem; color: var(--text-muted);">
                <span class="material-symbols-outlined" style="font-size: 16px; color: var(--coral); margin-top: 3px;">check_circle</span>
                <span>${s}</span>
              </li>
            `).join('')}
          </ul>
        </div>

        <div style="padding-top: 1.25rem; border-top: 1px solid var(--border); display: flex; flex-wrap: wrap; align-items: center; justify-content: space-between; gap: 1rem;">
          <div>
            <span style="font-size: 0.72rem; text-transform: uppercase; letter-spacing: 0.1em; color: var(--text-muted); display: block; font-weight: 700;">Workshop Pricing</span>
            <span style="font-family: var(--font-display); font-size: 1.35rem; font-weight: 800; color: var(--ink);">${prod.price}</span>
          </div>
          <div style="display: flex; gap: 0.75rem;">
            <button class="btn btn-outline-ink btn-sm" onclick="closeProductModal(); openQuoteModal('${prod.name}')">
              Get Custom Quote
            </button>
            <a href="${whatsappUrl}" target="_blank" rel="noopener noreferrer" class="btn btn-coral btn-sm">
              <span class="material-symbols-outlined" style="font-size: 16px;">chat</span>
              <span>Inquire WhatsApp</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  `;

  modal.classList.add('active');
  modal.setAttribute('aria-hidden', 'false');
  document.body.style.overflow = 'hidden';
};

window.closeProductModal = function() {
  const modal = document.getElementById('productModal');
  if (!modal) return;
  modal.classList.remove('active');
  modal.setAttribute('aria-hidden', 'true');
  document.body.style.overflow = '';
};

window.openQuoteModal = function(preselectedProduct = '') {
  const modal = document.getElementById('quoteModal');
  if (!modal) return;

  const productInput = document.getElementById('quoteProduct');
  if (productInput && preselectedProduct) {
    productInput.value = preselectedProduct;
  }

  modal.classList.add('active');
  modal.setAttribute('aria-hidden', 'false');
  document.body.style.overflow = 'hidden';
};

window.closeQuoteModal = function() {
  const modal = document.getElementById('quoteModal');
  if (!modal) return;
  modal.classList.remove('active');
  modal.setAttribute('aria-hidden', 'true');
  document.body.style.overflow = '';
};

/* ==========================================================================
   7. WHATSAPP & PHONE INTEGRATION
   ========================================================================== */
function initWhatsAppLinks() {
  const generalText = encodeURIComponent(
    `Hello Babulal Furniture, I am interested in this product. Please share more details.`
  );
  const generalUrl = `https://wa.me/${BabulalConfig.contact.whatsapp}?text=${generalText}`;

  document.querySelectorAll('.js-whatsapp-link').forEach(link => {
    link.setAttribute('href', generalUrl);
    link.setAttribute('target', '_blank');
    link.setAttribute('rel', 'noopener noreferrer');
  });

  document.querySelectorAll('.js-phone-link').forEach(link => {
    link.setAttribute('href', `tel:+91${BabulalConfig.contact.phone}`);
  });

  document.querySelectorAll('.js-alt-phone-link').forEach(link => {
    link.setAttribute('href', `tel:+91${BabulalConfig.contact.altPhone}`);
  });
}
