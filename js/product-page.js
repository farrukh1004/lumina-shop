/**
 * Product detail: gallery, variants, cart, wishlist, related
 */
(function () {
  const params = new URLSearchParams(window.location.search);
  const id = Number(params.get("id"));
  const product = window.LUMINA_getProductById ? window.LUMINA_getProductById(id) : null;

  const titleEl = document.getElementById("pd-title");
  const breadcrumb = document.getElementById("pd-breadcrumb");
  const mainImg = document.getElementById("pd-main-img");
  const thumbs = document.getElementById("pd-thumbs");
  const priceEl = document.getElementById("pd-price");
  const descEl = document.getElementById("pd-desc");
  const colorsEl = document.getElementById("pd-colors");
  const sizesEl = document.getElementById("pd-sizes");
  const reviewsEl = document.getElementById("pd-reviews");
  const relatedEl = document.getElementById("pd-related");
  const addBtn = document.getElementById("pd-add");
  const wishBtn = document.getElementById("pd-wishlist");
  const consultBtn = document.getElementById("pd-consult");
  const metaSku = document.getElementById("pd-sku");

  if (!product || !titleEl) {
    if (titleEl) titleEl.textContent = "Product not found";
    const mainImg = document.getElementById("pd-main-img");
    if (mainImg) {
      mainImg.removeAttribute("src");
      mainImg.alt = "";
    }
    const addBtn = document.getElementById("pd-add");
    if (addBtn) addBtn.hidden = true;
    return;
  }

  function money(n) {
    if (n === null || n === undefined) return "";
    return new Intl.NumberFormat(undefined, { style: "currency", currency: "USD" }).format(n);
  }

  document.title = `${product.name} | Lumina Atelier`;

  titleEl.textContent = product.name;
  if (breadcrumb) {
    breadcrumb.innerHTML = `<a href="index.html">Home</a> · <a href="shop.html">Shop</a> · <span aria-current="page">${product.name}</span>`;
  }
  if (descEl) descEl.textContent = product.description;
  if (metaSku) metaSku.textContent = `SKU: LA-${String(product.id).padStart(4, "0")}`;

  // Completely hide or handle prices if set to null
  if (product.price === null) {
    if (priceEl) {
      priceEl.innerHTML = ""; // No price text at all
      priceEl.style.display = "none";
    }
    if (consultBtn) {
      consultBtn.hidden = false;
      consultBtn.href = "contact.html?topic=custom";
    }
  } else if (product.consultationOnly) {
    if (priceEl) priceEl.innerHTML = `<span class="price">Consultation — custom quote</span>`;
    if (addBtn) addBtn.hidden = true;
    if (consultBtn) {
      consultBtn.hidden = false;
      consultBtn.href = "contact.html?topic=custom";
    }
  } else {
    if (priceEl) {
      priceEl.style.display = "block";
      if (product.compareAt) {
        priceEl.innerHTML = `<span class="price price--sale">${money(product.price)}</span> <span class="price--was">${money(product.compareAt)}</span> <span class="tag" style="margin-left:0.5rem">Save</span>`;
      } else {
        priceEl.innerHTML = `<span class="price">${money(product.price)}</span>`;
      }
    }
    if (consultBtn) consultBtn.hidden = true;
  }

  let selectedColor = product.colors[0] || "";
  let selectedSize = product.sizes[0] || "";

  function setMain(src, alt) {
    if (mainImg) {
      mainImg.src = src;
      mainImg.alt = alt || product.name;
    }
  }

  if (product.images.length) setMain(product.images[0], product.name);

  if (thumbs) {
    thumbs.innerHTML = "";
    product.images.forEach((src, i) => {
      const b = document.createElement("button");
      b.type = "button";
      b.className = "is-active";
      if (i > 0) b.classList.remove("is-active");
      b.innerHTML = `<img src="${src}" alt="" width="120" height="120" loading="lazy" />`;
      b.addEventListener("click", () => {
        thumbs.querySelectorAll("button").forEach((x) => x.classList.remove("is-active"));
        b.classList.add("is-active");
        setMain(src, `${product.name} view ${i + 1}`);
      });
      thumbs.appendChild(b);
    });
  }

  function renderOptions(container, values, key, selected, onPick) {
    if (!container) return;
    container.innerHTML = "";
    values.forEach((v) => {
      const b = document.createElement("button");
      b.type = "button";
      b.className = "option-btn" + (v === selected ? " is-selected" : "");
      b.textContent = v;
      b.addEventListener("click", () => {
        selected = v;
        onPick(v);
        container.querySelectorAll("button").forEach((x) => x.classList.remove("is-selected"));
        b.classList.add("is-selected");
      });
      container.appendChild(b);
    });
  }

  renderOptions(colorsEl, product.colors, "color", selectedColor, (v) => {
    selectedColor = v;
  });
  renderOptions(sizesEl, product.sizes, "size", selectedSize, (v) => {
    selectedSize = v;
  });

  if (reviewsEl) {
    if (!product.reviews.length) {
      reviewsEl.innerHTML = "<p class=\"muted\">No written reviews yet — be the first after purchase.</p>";
    } else {
      reviewsEl.innerHTML = product.reviews
        .map(
          (r) => `
        <article class="review-card" style="margin-bottom:1rem">
          <p class="stars">${"★".repeat(r.rating)}${"☆".repeat(5 - r.rating)}</p>
          <p>${r.text}</p>
          <p class="muted"><cite>${r.author}</cite> · ${r.date}</p>
        </article>`
        )
        .join("");
    }
  }

  if (relatedEl) {
    const related = window.LUMINA_PRODUCTS.filter(
      (p) => p.category === product.category && p.id !== product.id
    ).slice(0, 3);
    relatedEl.innerHTML = related
      .map(
        (p) => `
      <article class="card">
        <div class="card__image">
          <a href="product.html?id=${p.id}"><img src="${p.images[0]}" alt="" loading="lazy" width="300" height="375" /></a>
        </div>
        <div class="card__body">
          <h3 class="card__title"><a href="product.html?id=${p.id}">${p.name}</a></h3>
          <div class="price-row">
            ${p.price === null ? "" : `<span class="price">${p.consultationOnly ? "Quote" : money(p.price)}</span>`}
          </div>
        </div>
      </article>`
      )
      .join("");
  }

  if (addBtn) {
    addBtn.addEventListener("click", () => {
      if (product.consultationOnly) return;
      window.LuminaStore.addToCart(product.id, {
        color: selectedColor,
        size: selectedSize,
        qty: 1,
      });
      addBtn.textContent = "Added to cart";
      setTimeout(() => {
        addBtn.textContent = "Add to cart";
      }, 1600);
    });
  }

  function syncWish() {
    const on = window.LuminaStore.isInWishlist(product.id);
    if (wishBtn) {
      wishBtn.setAttribute("aria-pressed", on ? "true" : "false");
      wishBtn.textContent = on ? "Saved to wishlist" : "Add to wishlist";
    }
  }

  if (wishBtn) {
    wishBtn.addEventListener("click", () => {
      window.LuminaStore.toggleWishlist(product.id);
      syncWish();
    });
    document.addEventListener("lumina:wishlist", syncWish);
    syncWish();
  }
})();
