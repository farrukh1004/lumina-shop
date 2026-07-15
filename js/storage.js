/**
 * Cart, wishlist, and optional session user — localStorage persistence
 */
(function () {
  const CART_KEY = "lumina_cart_v1";
  const WISH_KEY = "lumina_wishlist_v1";
  const USER_KEY = "lumina_user_v1";

  function readJson(key, fallback) {
    try {
      const raw = localStorage.getItem(key);
      return raw ? JSON.parse(raw) : fallback;
    } catch {
      return fallback;
    }
  }

  function writeJson(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
  }

  window.LuminaStore = {
    getCart() {
      return readJson(CART_KEY, []);
    },

    saveCart(lines) {
      writeJson(CART_KEY, lines);
      document.dispatchEvent(new CustomEvent("lumina:cart"));
    },

    addToCart(productId, options) {
      const cart = this.getCart();
      const id = Number(productId);
      const color = options.color || "";
      const size = options.size || "";
      const existing = cart.find(
        (l) => l.productId === id && l.color === color && l.size === size
      );
      const qty = Math.max(1, Number(options.qty) || 1);
      if (existing) {
        existing.qty += qty;
      } else {
        cart.push({ productId: id, color, size, qty });
      }
      this.saveCart(cart);
    },

    updateLine(index, qty) {
      const cart = this.getCart();
      if (!cart[index]) return;
      if (qty < 1) cart.splice(index, 1);
      else cart[index].qty = qty;
      this.saveCart(cart);
    },

    removeLine(index) {
      const cart = this.getCart();
      cart.splice(index, 1);
      this.saveCart(cart);
    },

    cartCount() {
      return this.getCart().reduce((s, l) => s + l.qty, 0);
    },

    cartSubtotal(products) {
      return this.getCart().reduce((sum, line) => {
        const p = products.find((x) => x.id === line.productId);
        if (!p) return sum;
        const price = Number(p.price) || 0;
        return sum + price * line.qty;
      }, 0);
    },

    getWishlist() {
      return readJson(WISH_KEY, []);
    },

    toggleWishlist(productId) {
      const ids = this.getWishlist();
      const id = Number(productId);
      const i = ids.indexOf(id);
      if (i === -1) ids.push(id);
      else ids.splice(i, 1);
      writeJson(WISH_KEY, ids);
      document.dispatchEvent(new CustomEvent("lumina:wishlist"));
      return ids.indexOf(id) !== -1;
    },

    isInWishlist(productId) {
      return this.getWishlist().includes(Number(productId));
    },

    wishlistCount() {
      return this.getWishlist().length;
    },

    getUser() {
      return readJson(USER_KEY, null);
    },

    setUser(user) {
      if (user) writeJson(USER_KEY, user);
      else localStorage.removeItem(USER_KEY);
      document.dispatchEvent(new CustomEvent("lumina:user"));
    },

    logout() {
      this.setUser(null);
    },
  };
})();
