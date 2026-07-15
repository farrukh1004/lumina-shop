/**
 * Home: inject featured product cards from catalog (Price removed)
 */
(function () {
  const root = document.getElementById("featured-products");
  const products = window.LUMINA_PRODUCTS || [];
  if (!root) return;

  const ids = [1, 4, 6, 12];

  const picked = ids
    .map((id) => products.find((p) => p.id === id))
    .filter(Boolean);

  root.innerHTML = picked
    .map((p) => {
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
            <a class="btn btn--ghost" href="product.html?id=${p.id}" style="margin-top:0.75rem;width:100%">Дэлгэрэнгүй үзэх</a>
          </div>
        </article>`;
    })
    .join("");
})();
