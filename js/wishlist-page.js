/**
 * Wishlist grid from localStorage IDs
 */
(function () {
  const root = document.getElementById("wishlist-grid");
  const empty = document.getElementById("wishlist-empty");
  const products = window.LUMINA_PRODUCTS || [];
  if (!root) return;

  function money(n) {
    return new Intl.NumberFormat(undefined, { style: "currency", currency: "USD" }).format(n);
  }

  function render() {
    const ids = window.LuminaStore.getWishlist();
    if (!ids.length) {
      root.innerHTML = "";
      if (empty) empty.hidden = false;
      return;
    }
    if (empty) empty.hidden = true;
    const list = ids.map((id) => products.find((p) => p.id === id)).filter(Boolean);
    root.innerHTML = list
      .map((p) => {
        const price = p.consultationOnly ? "Quote" : money(p.price);
        return `
        <article class="card">
          <div class="card__image">
            <a href="product.html?id=${p.id}"><img src="${p.images[0]}" alt="" loading="lazy" width="400" height="500" /></a>
            <button type="button" class="icon-btn remove-wish" data-id="${p.id}" aria-label="Remove from wishlist" style="position:absolute;top:8px;right:8px;background:rgba(255,255,255,.9)">×</button>
          </div>
          <div class="card__body">
            <h3 class="card__title"><a href="product.html?id=${p.id}">${p.name}</a></h3>
            <div class="price-row"><span class="price">${price}</span></div>
            <a class="btn btn--primary" href="product.html?id=${p.id}" style="width:100%;margin-top:0.75rem">View product</a>
          </div>
        </article>`;
      })
      .join("");

    root.querySelectorAll(".remove-wish").forEach((btn) => {
      btn.addEventListener("click", () => {
        window.LuminaStore.toggleWishlist(Number(btn.getAttribute("data-id")));
        render();
      });
    });
  }

  document.addEventListener("lumina:wishlist", render);
  render();
})();
