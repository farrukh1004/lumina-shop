/**
 * Shop grid: filters, sort, product cards with wishlist toggle
 */
(function () {
  const products = window.LUMINA_PRODUCTS || [];
  const grid = document.getElementById("shop-grid");
  const resultCount = document.getElementById("shop-result-count");
  const sortSelect = document.getElementById("shop-sort");
  const filterType = document.getElementById("filter-type");
  const filterMin = document.getElementById("filter-price-min");
  const filterMax = document.getElementById("filter-price-max");
  const filterMaterial = document.getElementById("filter-material");
  const resetBtn = document.getElementById("filter-reset");
  const colorChips = document.getElementById("filter-colors");
  const sizeChips = document.getElementById("filter-sizes");

  if (!grid) return;

  const state = {
    colors: new Set(),
    sizes: new Set(),
  };

  function money(n) {
    if (n === null || n === undefined) return "";
    return new Intl.NumberFormat(undefined, { style: "currency", currency: "USD" }).format(n);
  }

  function stars(r) {
    const full = Math.round(r);
    return "★★★★★".slice(0, full) + "☆☆☆☆☆".slice(0, 5 - full);
  }

  function uniqueValues(key, mapFn) {
    const set = new Set();
    products.forEach((p) => {
      (p[key] || []).forEach((v) => set.add(mapFn ? mapFn(v) : v));
    });
    return Array.from(set).sort();
  }

  function buildChips() {
    if (colorChips) {
      const colors = uniqueValues("colorTags");
      colorChips.innerHTML = "";
      colors.forEach((c) => {
        const b = document.createElement("button");
        b.type = "button";
        b.className = "chip";
        b.textContent = c.charAt(0).toUpperCase() + c.slice(1);
        b.dataset.color = c;
        b.addEventListener("click", () => {
          if (state.colors.has(c)) state.colors.delete(c);
          else state.colors.add(c);
          b.classList.toggle("is-selected", state.colors.has(c));
          render();
        });
        colorChips.appendChild(b);
      });
    }
    if (sizeChips) {
      const sizes = new Set();
      products.forEach((p) => p.sizes.forEach((s) => sizes.add(s)));
      const list = Array.from(sizes);
      sizeChips.innerHTML = "";
      list.forEach((s) => {
        const b = document.createElement("button");
        b.type = "button";
        b.className = "chip";
        b.textContent = s;
        b.dataset.size = s;
        b.addEventListener("click", () => {
          if (state.sizes.has(s)) state.sizes.delete(s);
          else state.sizes.add(s);
          b.classList.toggle("is-selected", state.sizes.has(s));
          render();
        });
        sizeChips.appendChild(b);
      });
    }
  }

  function parseParams() {
    const p = new URLSearchParams(window.location.search);
    const cat = p.get("category");
    if (cat && filterType) {
      filterType.value = cat;
    }
    const q = p.get("q");
    if (q && document.getElementById("shop-search-hint")) {
      document.getElementById("shop-search-hint").textContent = `Showing results for “${q}”.`;
    }
  }

  function filterList(list) {
    let out = list.slice();
    const type = filterType ? filterType.value : "";
    if (type) out = out.filter((p) => p.category === type);
    const min = filterMin && filterMin.value !== "" ? Number(filterMin.value) : null;
    const max = filterMax && filterMax.value !== "" ? Number(filterMax.value) : null;
    if (min != null && !Number.isNaN(min)) out = out.filter((p) => p.price >= min);
    if (max != null && !Number.isNaN(max)) out = out.filter((p) => p.price <= max || p.price === 0);
    const mat = filterMaterial && filterMaterial.value;
    if (mat) out = out.filter((p) => p.materials.some((m) => m === mat));
    if (state.colors.size) {
      out = out.filter((p) => p.colorTags.some((c) => state.colors.has(c)));
    }
    if (state.sizes.size) {
      out = out.filter((p) => p.sizes.some((s) => state.sizes.has(s)));
    }
    const p = new URLSearchParams(window.location.search);
    const q = (p.get("q") || "").trim().toLowerCase();
    if (q) {
      out = out.filter(
        (x) =>
          x.name.toLowerCase().includes(q) ||
          x.categoryLabel.toLowerCase().includes(q)
      );
    }
    return out;
  }

  function sortList(list) {
    const v = sortSelect ? sortSelect.value : "popularity";
    const copy = [...list];
    if (v === "price-asc") copy.sort((a, b) => (a.price || 0) - (b.price || 0));
    if (v === "price-desc") copy.sort((a, b) => (b.price || 0) - (a.price || 0));
    if (v === "popularity") copy.sort((a, b) => b.popularity - a.popularity);
    if (v === "newest") copy.sort((a, b) => (b.addedAt || "").localeCompare(a.addedAt || ""));
    return copy;
  }

  function cardHtml(p) {
    const inWish = window.LuminaStore.isInWishlist(p.id);
    
    // Completely omit pricing block if the price is null
    const price = p.price === null 
      ? "" 
      : p.consultationOnly || p.price === 0
        ? `<span class="price">Quote</span>`
        : p.compareAt
          ? `<span class="price price--sale">${money(p.price)}</span><span class="price--was">${money(p.compareAt)}</span>`
          : `<span class="price">${money(p.price)}</span>`;

    return `
      <article class="card" data-product-id="${p.id}">
        <div class="card__image">
          <a href="product.html?id=${p.id}" aria-label="${p.name}">
            <img src="${p.images[0]}" alt="" loading="lazy" width="400" height="500" />
          </a>
          <button type="button" class="icon-btn wishlist-toggle" data-wishlist="${p.id}" aria-pressed="${inWish}" aria-label="Add to wishlist" style="position:absolute;top:8px;right:8px;background:rgba(255,255,255,.9)">
            <svg viewBox="0 0 24 24" fill="${inWish ? "var(--color-accent)" : "none"}" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>
          </button>
        </div>
        <div class="card__body">
          <p class="tag" style="margin:0 0 0.35rem">${p.categoryLabel}${p.isNew ? " · New" : ""}</p>
          <h3 class="card__title"><a href="product.html?id=${p.id}">${p.name}</a></h3>
          <div class="price-row">${price}</div>
          <p class="stars" aria-label="Rating ${p.rating} out of 5">${stars(p.rating)} <span class="muted">(${p.reviewCount})</span></p>
        </div>
      </article>
    `;
  }

  function render() {
    let list = filterList(products);
    list = sortList(list);
    if (resultCount) resultCount.textContent = `${list.length} product${list.length === 1 ? "" : "s"}`;
    grid.innerHTML = list.map(cardHtml).join("");
    grid.querySelectorAll(".wishlist-toggle").forEach((btn) => {
      btn.addEventListener("click", (e) => {
        e.preventDefault();
        e.stopPropagation();
        const id = Number(btn.getAttribute("data-wishlist"));
        const now = window.LuminaStore.toggleWishlist(id);
        btn.setAttribute("aria-pressed", now ? "true" : "false");
        const svg = btn.querySelector("svg");
        if (svg) {
          svg.setAttribute("fill", now ? "var(--color-accent)" : "none");
        }
      });
    });
  }

  function fillCategories() {
    if (!filterType) return;
    const cats = window.LUMINA_CATEGORIES || [];
    const opts = ['<option value="">All types</option>'];
    cats.forEach((c) => {
      opts.push(`<option value="${c.id}">${c.label}</option>`);
    });
    filterType.innerHTML = opts.join("");
  }

  function fillMaterials() {
    if (!filterMaterial) return;
    const mats = new Set();
    products.forEach((p) => p.materials.forEach((m) => mats.add(m)));
    const opts = ['<option value="">All materials</option>'];
    Array.from(mats)
      .sort()
      .forEach((m) => opts.push(`<option value="${m.replace(/"/g, "&quot;")}">${m}</option>`));
    filterMaterial.innerHTML = opts.join("");
  }

  buildChips();
  fillCategories();
  fillMaterials();
  parseParams();

  const filtersToggle = document.getElementById("filters-toggle");
  const filtersPanel = document.getElementById("filters-panel");
  if (filtersToggle && filtersPanel) {
    filtersToggle.addEventListener("click", () => {
      const open = filtersPanel.classList.toggle("is-open");
      filtersToggle.setAttribute("aria-expanded", open ? "true" : "false");
      filtersToggle.textContent = open ? "Hide filters" : "Filters";
    });
  }

  [filterType, filterMin, filterMax, filterMaterial].forEach((el) => {
    if (el) el.addEventListener("input", render);
    if (el) el.addEventListener("change", render);
  });
  if (sortSelect) sortSelect.addEventListener("change", render);
  if (resetBtn) {
    resetBtn.addEventListener("click", () => {
      if (filterType) filterType.value = "";
      if (filterMin) filterMin.value = "";
      if (filterMax) filterMax.value = "";
      if (filterMaterial) filterMaterial.value = "";
      state.colors.clear();
      state.sizes.clear();
      $$allChips();
      render();
    });
  }

  function $$allChips() {
    document.querySelectorAll("#filter-colors .chip, #filter-sizes .chip").forEach((c) => c.classList.remove("is-selected"));
  }

  render();
})();
