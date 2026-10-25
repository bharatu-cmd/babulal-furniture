/**
 * BABULAL FURNITURE — V2 Master Redesign Controller
 * Luxury Furniture Atelier & Showroom Experience
 * Zero-dependency Vanilla JS with Full Accessibility & SEO Alignment
 */

document.addEventListener('DOMContentLoaded', () => {
  initHeader();
  initMobileNav();
  renderFeaturedCollection();
  renderCategoryGrid();
  renderFullCatalogue();
  initModals();
  initLightbox();
  initWhatsAppLinks();
});

/* ==========================================================================
   1. HEADER SCROLL & NAVIGATION
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
   3. FEATURED COLLECTION SECTION (Immediately After Hero)
   ========================================================================== */
function renderFeaturedCollection() {
  const container = document.getElementById('featuredGrid');
  if (!container || typeof BabulalProducts === 'undefined') return;

  // Filter featured products or top 6 pieces
  const featured = BabulalProducts.filter(p => p.featured).slice(0, 6);
  const displayList = featured.length >= 4 ? featured : BabulalProducts.slice(0, 6);

  container.innerHTML = displayList.map(prod => `
    <article class="product-card" data-id="${prod.id}" onclick="openProductModal('${prod.id}')" tabindex="0" role="button" aria-label="View ${prod.name}">
      <div class="product-card-media">
        <picture>
          <source srcset="${prod.image}" type="image/webp">
          <img class="product-card-img" src="${prod.imageFallback}" alt="${prod.name} handcrafted by Babulal Furniture" loading="lazy" width="600" height="450">
        </picture>
        <span class="product-card-badge">FEATURED</span>
        <button class="product-quick-view-btn" onclick="event.stopPropagation(); openLightboxByProduct('${prod.id}')" aria-label="Enlarge image for ${prod.name}">
          <span class="material-symbols-outlined">zoom_in</span>
        </button>
      </div>
      <div class="product-card-body">
        <span class="product-card-kicker">${prod.category.toUpperCase()}</span>
        <h3 class="product-card-title">${prod.name}</h3>
        <p class="product-card-desc">${prod.materials}</p>
        <div class="product-card-footer">
          <span class="product-card-pricing">Workshop Direct</span>
          <span class="product-card-link">
            <span>VIEW DETAILS</span>
            <span class="material-symbols-outlined">arrow_forward</span>
          </span>
        </div>
      </div>
    </article>
  `).join('');

  // Keyboard accessibility
  container.querySelectorAll('.product-card').forEach(card => {
    card.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        card.click();
      }
    });
  });
}

/* ==========================================================================
   4. SHOP BY CATEGORY SECTION
   ========================================================================== */
function renderCategoryGrid() {
  const container = document.getElementById('categoriesGrid');
  if (!container || typeof BabulalCategories === 'undefined') return;

  container.innerHTML = BabulalCategories.map(cat => `
    <article class="category-card" onclick="filterByCategoryId('${cat.id}')" role="button" tabindex="0" aria-label="Explore ${cat.name} Collection">
      <div class="category-card-media">
        <picture>
          <source srcset="${cat.image}" type="image/webp">
          <img class="category-card-img" src="${cat.imageFallback}" alt="${cat.name} handcrafted by Babulal Furniture" loading="lazy" width="600" height="450">
        </picture>
        <div class="category-card-overlay">
          <span class="category-card-count">${cat.count} PIECES</span>
          <h3 class="category-card-title">${cat.name.toUpperCase()}</h3>
          <p class="category-card-desc">${cat.description}</p>
          <span class="category-card-action">
            <span>EXPLORE PIECES</span>
            <span class="material-symbols-outlined">arrow_forward</span>
          </span>
        </div>
      </div>
    </article>
  `).join('');

  // Keyboard accessibility
  container.querySelectorAll('.category-card').forEach(card => {
    card.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        card.click();
      }
    });
  });
}

window.filterByCategoryId = function(categoryId) {
  setProductFilter(categoryId);
  const catalogueSection = document.getElementById('catalogue');
  if (catalogueSection) {
    catalogueSection.scrollIntoView({ behavior: 'smooth' });
  }
};

/* ==========================================================================
   5. COMPLETE PRODUCT CATALOGUE & FILTER SYSTEM (2 Per Row on Mobile!)
   ========================================================================== */
let activeCatalogueFilter = 'all';

function renderFullCatalogue() {
  const grid = document.getElementById('catalogueGrid');
  const filterBar = document.getElementById('catalogueFilterBar');
  if (!grid || typeof BabulalProducts === 'undefined') return;

  // Initialize Filter Bar Tabs Once
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
      <button class="filter-tab ${p.id === activeCatalogueFilter ? 'active' : ''}" data-filter="${p.id}" onclick="setProductFilter('${p.id}')">
        ${p.label}
      </button>
    `).join('');
  }

  // Filter products
  const productsToDisplay = activeCatalogueFilter === 'all'
    ? BabulalProducts
    : BabulalProducts.filter(p => p.categoryId === activeCatalogueFilter);

  let cardsHTML = productsToDisplay.map(prod => `
    <article class="product-card" data-id="${prod.id}" onclick="openProductModal('${prod.id}')" tabindex="0" role="button" aria-label="View specifications for ${prod.name}">
      <div class="product-card-media">
        <picture>
          <source srcset="${prod.image}" type="image/webp">
          <img class="product-card-img" src="${prod.imageFallback}" alt="${prod.name} handcrafted by Babulal Furniture" loading="lazy" width="600" height="450">
        </picture>
        <button class="product-quick-view-btn" onclick="event.stopPropagation(); openLightboxByProduct('${prod.id}')" aria-label="Enlarge image for ${prod.name}">
          <span class="material-symbols-outlined">zoom_in</span>
        </button>
      </div>
      <div class="product-card-body">
        <span class="product-card-kicker">${prod.category.toUpperCase()}</span>
        <h3 class="product-card-title">${prod.name}</h3>
        <p class="product-card-desc">${prod.materials}</p>
        <div class="product-card-footer">
          <span class="product-card-pricing">Workshop Direct</span>
          <span class="product-card-link">
            <span>VIEW DETAILS</span>
            <span class="material-symbols-outlined">arrow_forward</span>
          </span>
        </div>
      </div>
    </article>
  `).join('');

  let totalCardsCount = productsToDisplay.length;

  // Complement small categories with a bespoke inquiry card to maintain visual balance
  if (activeCatalogueFilter !== 'all' && productsToDisplay.length <= 2) {
    const activeCatObj = (typeof BabulalCategories !== 'undefined') ? BabulalCategories.find(c => c.id === activeCatalogueFilter) : null;
    const catLabel = activeCatObj ? activeCatObj.name : 'Custom';
    totalCardsCount += 1;
    cardsHTML += `
      <article class="product-card custom-inquiry-card" onclick="openQuoteModal('Custom ${catLabel} Requirement')" role="button" tabindex="0" aria-label="Request custom ${catLabel} design">
        <div class="custom-inquiry-body">
          <span class="product-card-kicker">CUSTOM WORKSHOP SIZING</span>
          <h3 class="product-card-title">Made for Your Space</h3>
          <p class="product-card-desc">Need custom sizing or specific dimensions? We craft bespoke ${catLabel} pieces built to your exact floorplan.</p>
          <div class="product-card-footer" style="margin-top: auto; padding-top: 1rem;">
            <span class="product-card-link highlight">
              <span>REQUEST CUSTOM QUOTE</span>
              <span class="material-symbols-outlined">arrow_forward</span>
            </span>
          </div>
        </div>
      </article>
    `;
  }

  grid.className = 'catalogue-products-grid count-' + totalCardsCount;
  grid.innerHTML = cardsHTML;

  // Keyboard accessibility
  grid.querySelectorAll('.product-card').forEach(card => {
    card.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        card.click();
      }
    });
  });
}

window.setProductFilter = function(filterId) {
  activeCatalogueFilter = filterId;
  document.querySelectorAll('.filter-tab').forEach(tab => {
    if (tab.getAttribute('data-filter') === filterId) {
      tab.classList.add('active');
    } else {
      tab.classList.remove('active');
    }
  });
  renderFullCatalogue();
};

/* ==========================================================================
   6. REDESIGNED PRODUCT DETAIL EXPERIENCE (2-Column Desktop & Compact Mobile)
   ========================================================================== */
window.openProductModal = function(productId) {
  const prod = (typeof BabulalProducts !== 'undefined') ? BabulalProducts.find(p => p.id === productId) : null;
  if (!prod) return;

  const modal = document.getElementById('productModal');
  const body = document.getElementById('productModalBody');
  if (!modal || !body) return;

  const whatsappText = encodeURIComponent(
    `Hello Babulal Furniture, I am interested in ${prod.name}. Please share more details and pricing.`
  );
  const whatsappUrl = `https://wa.me/${BabulalConfig.contact.whatsapp}?text=${whatsappText}`;

  body.innerHTML = `
    <div class="product-detail-modal-layout">
      <!-- Left: Large Uncropped Contained Product Image & Lightbox Trigger -->
      <div class="product-detail-media-panel">
        <div class="product-detail-img-container" onclick="openLightboxByProduct('${prod.id}')" title="Click to view full screen">
          <picture>
            <source srcset="${prod.image}" type="image/webp">
            <img class="product-detail-img" src="${prod.imageFallback}" alt="${prod.name} handcrafted by Babulal Furniture" width="800" height="600">
          </picture>
          <button class="detail-zoom-hint" aria-label="Enlarge image">
            <span class="material-symbols-outlined">fullscreen</span>
            <span>Tap to Enlarge</span>
          </button>
        </div>
      </div>

      <!-- Right: Structured Information & Immediate Actions -->
      <div class="product-detail-info-panel">
        <div class="product-detail-header">
          <span class="editorial-tag">${prod.category.toUpperCase()}</span>
          <h2 class="product-detail-title">${prod.name}</h2>
          <p class="product-detail-tagline">${prod.tagline || 'Handcrafted solid wood furniture tailored to your space.'}</p>
        </div>

        <div class="product-detail-box">
          <div class="detail-spec-row">
            <span class="detail-spec-label">Craft &amp; Build</span>
            <span class="detail-spec-value">${prod.materials}</span>
          </div>
          <div class="detail-spec-row">
            <span class="detail-spec-label">Customization</span>
            <span class="detail-spec-value">${prod.customOptions}</span>
          </div>
          <div class="detail-spec-row">
            <span class="detail-spec-label">Pricing</span>
            <span class="detail-spec-value highlight">Direct Workshop Pricing</span>
          </div>
        </div>

        <div class="product-detail-specs-list">
          <h4 class="specs-heading">Key Specifications</h4>
          <ul>
            ${prod.specs.map(s => `
              <li>
                <span class="material-symbols-outlined check-icon">check_circle</span>
                <span>${s}</span>
              </li>
            `).join('')}
          </ul>
        </div>

        <div class="product-detail-actions">
          <a href="${whatsappUrl}" target="_blank" rel="noopener noreferrer" class="btn btn-gold btn-block js-whatsapp-link">
            <span class="material-symbols-outlined">chat</span>
            <span>Ask on WhatsApp</span>
          </a>
          <div class="detail-secondary-actions">
            <button class="btn btn-outline-dark" onclick="closeProductModal(); openQuoteModal('${prod.name}')">
              <span>Request Custom Quote</span>
            </button>
            <button class="btn btn-subtle" onclick="closeProductModal()">
              <span>Back to Catalogue</span>
            </button>
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

/* ==========================================================================
   7. INTERACTIVE QUOTE MODAL (Direct to WhatsApp)
   ========================================================================== */
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
   8. PRODUCT IMAGE LIGHTBOX (Dark Elegant Uncropped Fullscreen Viewer)
   ========================================================================== */
let lightboxIndex = 0;

function initLightbox() {
  // ESC key and Arrow keys are handled in initModals
}

window.openLightboxByProduct = function(productId) {
  if (typeof BabulalProducts === 'undefined') return;
  const idx = BabulalProducts.findIndex(p => p.id === productId);
  if (idx !== -1) {
    openLightbox(idx);
  }
};

window.openLightbox = function(index) {
  if (typeof BabulalProducts === 'undefined' || !BabulalProducts[index]) return;
  lightboxIndex = index;
  const prod = BabulalProducts[index];

  const modal = document.getElementById('lightboxModal');
  const img = document.getElementById('lightboxImg');
  const title = document.getElementById('lightboxTitle');
  const cat = document.getElementById('lightboxCat');
  const waBtn = document.getElementById('lightboxWhatsappBtn');

  if (!modal || !img) return;

  img.src = prod.imageFallback;
  img.alt = prod.name;
  if (title) title.textContent = prod.name;
  if (cat) cat.textContent = prod.category.toUpperCase();

  if (waBtn) {
    const text = encodeURIComponent(
      `Hello Babulal Furniture, I am inquiring about ${prod.name}. Please share more details and pricing.`
    );
    waBtn.href = `https://wa.me/${BabulalConfig.contact.whatsapp}?text=${text}`;
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
  if (typeof BabulalProducts === 'undefined') return;
  let next = lightboxIndex + dir;
  if (next < 0) next = BabulalProducts.length - 1;
  if (next >= BabulalProducts.length) next = 0;
  openLightbox(next);
};

/* ==========================================================================
   9. MODALS INIT & QUOTE FORM SUBMISSION
   ========================================================================== */
function initModals() {
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

/* ==========================================================================
   10. WHATSAPP & PHONE LINKS
   ========================================================================== */
function initWhatsAppLinks() {
  if (typeof BabulalConfig === 'undefined') return;

  const generalText = encodeURIComponent(
    `Hello Babulal Furniture, I am interested in your handcrafted furniture. Please share more details.`
  );
  const generalUrl = `https://wa.me/${BabulalConfig.contact.whatsapp}?text=${generalText}`;

  document.querySelectorAll('.js-whatsapp-link').forEach(link => {
    if (!link.getAttribute('href') || link.getAttribute('href').includes('text=Hello')) {
      link.setAttribute('href', generalUrl);
    }
    link.setAttribute('target', '_blank');
    link.setAttribute('rel', 'noopener noreferrer');
  });

  document.querySelectorAll('.js-phone-link').forEach(link => {
    link.setAttribute('href', `tel:+91${BabulalConfig.contact.phone}`);
  });
}
