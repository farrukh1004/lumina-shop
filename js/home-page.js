/**
 * Home: inject featured product cards from catalog
 */
(function () {
  const root = document.getElementById("featured-products");
  const products = window.LUMINA_PRODUCTS || [];
  if (!root) return;

  const ids = [1, 4, 6, 12];
  function money(n) {
    return new Intl.NumberFormat(undefined, { style: "currency", currency: "USD" }).format(n);
  }

  const picked = ids
    .map((id) => products.find((p) => p.id === id))
    .filter(Boolean);

  root.innerHTML = picked
    .map((p) => {
      const price =
        p.compareAt && !p.consultationOnly
          ? `<span class="price price--sale">${money(p.price)}</span><span class="price--was">${money(p.compareAt)}</span>`
          : p.consultationOnly
            ? `<span class="price">Quote</span>`
            : `<span class="price">${money(p.price)}</span>`;
      return `
        <article class="card">
          <div class="card__image">
            <a href="product.html?id=${p.id}" aria-label="${p.name}">
              <img src="${p.images[0]}" alt="" loading="lazy" width="400" height="500" />
            </a>
          </div>
          <div class="card__body">
            <p class="tag" style="margin:0 0 0.35rem">${p.categoryLabel}</p>
            <h3 class="card__title"><a href="product.html?id=${p.id}">${p.name}</a></h3>
            <div class="price-row">${price}</div>
            <a class="btn btn--ghost" href="product.html?id=${p.id}" style="margin-top:0.75rem;width:100%">View details</a>
          </div>
        </article>`;
    })
    .join("");
})();
