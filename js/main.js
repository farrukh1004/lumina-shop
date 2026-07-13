/**
 * Global UI: mobile nav, dropdowns, search modal, auth modal, header counts
 */
(function () {
  const products = window.LUMINA_PRODUCTS || [];

  function $(sel, root) {
    return (root || document).querySelector(sel);
  }

  function $$(sel, root) {
    return Array.from((root || document).querySelectorAll(sel));
  }

  function updateBadges() {
    const store = window.LuminaStore;
    if (!store) return;
    const c = store.cartCount();
    const w = store.wishlistCount();
    $$("[data-cart-count]").forEach((el) => {
      el.textContent = c > 99 ? "99+" : String(c);
      el.hidden = c === 0;
    });
    $$("[data-wishlist-count]").forEach((el) => {
      el.textContent = w > 99 ? "99+" : String(w);
      el.hidden = w === 0;
    });
  }

  function initMobileNav() {
    const toggle = $(".menu-toggle");
    const panel = $("#mobile-nav");
    if (!toggle || !panel) return;

    toggle.addEventListener("click", () => {
      const open = panel.classList.toggle("is-open");
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
      panel.hidden = !open;
    });

    $$(".mobile-nav [data-mobile-submenu-toggle]").forEach((btn) => {
      btn.addEventListener("click", () => {
        const id = btn.getAttribute("aria-controls");
        const sub = id ? document.getElementById(id) : null;
        if (!sub) return;
        const isOpen = sub.classList.toggle("is-open");
        btn.setAttribute("aria-expanded", isOpen ? "true" : "false");
      });
    });

    document.addEventListener("click", (e) => {
      if (!panel.classList.contains("is-open")) return;
      if (e.target.closest(".mobile-nav") || e.target.closest(".menu-toggle")) return;
      panel.classList.remove("is-open");
      toggle.setAttribute("aria-expanded", "false");
      panel.hidden = true;
    });
  }

  function openModal(name) {
    const backdrop = $(`[data-modal-backdrop="${name}"]`);
    const modal = $(`[data-modal="${name}"]`);
    if (backdrop) backdrop.classList.add("is-open");
    if (modal) {
      modal.classList.add("is-open");
      modal.setAttribute("aria-hidden", "false");
      const focusEl = modal.querySelector("input, button, a");
      if (focusEl) focusEl.focus();
    }
    document.body.style.overflow = "hidden";
  }

  function closeModal(name) {
    const backdrop = $(`[data-modal-backdrop="${name}"]`);
    const modal = $(`[data-modal="${name}"]`);
    if (backdrop) backdrop.classList.remove("is-open");
    if (modal) {
      modal.classList.remove("is-open");
      modal.setAttribute("aria-hidden", "true");
    }
    document.body.style.overflow = "";
  }

  function initModals() {
    $$("[data-open-modal]").forEach((el) => {
      el.addEventListener("click", () => {
        const name = el.getAttribute("data-open-modal");
        if (name) openModal(name);
      });
    });
    $$("[data-close-modal]").forEach((el) => {
      el.addEventListener("click", () => {
        const name = el.getAttribute("data-close-modal");
        if (name) closeModal(name);
      });
    });
    $$("[data-modal-backdrop]").forEach((bd) => {
      bd.addEventListener("click", () => {
        const name = bd.getAttribute("data-modal-backdrop");
        if (name) closeModal(name);
      });
    });
  }

  function renderSearchResults(query) {
    const list = $("#search-results");
    if (!list) return;
    const q = (query || "").trim().toLowerCase();
    list.innerHTML = "";
    if (!q) {
      list.innerHTML = '<li class="muted" style="padding:1rem">Type to search products…</li>';
      return;
    }
    const hits = products.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        p.categoryLabel.toLowerCase().includes(q) ||
        p.materials.some((m) => m.toLowerCase().includes(q))
    );
    if (!hits.length) {
      list.innerHTML = '<li class="muted" style="padding:1rem">No matches found.</li>';
      return;
    }
    hits.slice(0, 8).forEach((p) => {
      const li = document.createElement("li");
      const a = document.createElement("a");
      a.href = `product.html?id=${p.id}`;
      a.innerHTML = `
        <img src="${p.images[0]}" alt="" width="48" height="48" loading="lazy" />
        <span>
          <strong style="display:block;color:var(--color-text)">${p.name}</strong>
          <span class="muted">${p.categoryLabel}</span>
        </span>
      `;
      li.appendChild(a);
      list.appendChild(li);
    });
  }

  function initSearch() {
    const input = $("#search-input");
    const list = $("#search-results");
    if (list) {
      list.addEventListener("click", (e) => {
        if (e.target.closest("a")) closeModal("search");
      });
    }
    if (!input) return;
    input.addEventListener("input", () => renderSearchResults(input.value));
    $$("[data-open-modal='search']").forEach((btn) => {
      btn.addEventListener("click", () => {
        setTimeout(() => {
          input.value = "";
          renderSearchResults("");
          input.focus();
        }, 50);
      });
    });
  }

  function initAuth() {
    const form = $("#auth-form");
    if (!form) return;
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const fd = new FormData(form);
      const mode = fd.get("mode") === "signup" ? "signup" : "login";
      const name = String(fd.get("name") || "").trim();
      const email = String(fd.get("email") || "").trim();
      if (!email) return;
      if (mode === "signup" && !name) return;
      window.LuminaStore.setUser({
        email,
        name: mode === "signup" ? name : name || email.split("@")[0],
        mode,
        since: new Date().toISOString(),
      });
      closeModal("auth");
      updateUserChip();
      form.reset();
    });

    function syncAuthMode(mode) {
      const modeInput = form.querySelector('input[name="mode"]');
      if (modeInput) modeInput.value = mode || "login";
      const nameInput = $("#auth-name");
      const nameLabel = $("#auth-name-label");
      if (nameInput && nameLabel) {
        if (mode === "signup") {
          nameLabel.textContent = "Full name";
          nameInput.required = true;
        } else {
          nameLabel.textContent = "Display name (optional)";
          nameInput.required = false;
        }
      }
    }

    $$("[data-auth-tab]").forEach((btn) => {
      btn.addEventListener("click", () => {
        const mode = btn.getAttribute("data-auth-tab");
        syncAuthMode(mode);
        $$("[data-auth-tab]").forEach((b) => b.classList.remove("is-selected"));
        btn.classList.add("is-selected");
      });
    });
    syncAuthMode("login");

    const logoutBtn = $("#auth-logout");
    if (logoutBtn) {
      logoutBtn.addEventListener("click", () => {
        window.LuminaStore.logout();
        updateUserChip();
      });
    }
  }

  function updateUserChip() {
    const user = window.LuminaStore.getUser();
    const chip = $("#user-chip");
    if (!chip) return;
    if (user) {
      chip.textContent = user.name || user.email;
      chip.hidden = false;
    } else {
      chip.textContent = "";
      chip.hidden = true;
    }
  }

  function initYear() {
    $$("[data-year]").forEach((el) => {
      el.textContent = String(new Date().getFullYear());
    });
  }

  document.addEventListener("DOMContentLoaded", () => {
    $$(".has-dropdown").forEach((wrap) => {
      const btn = wrap.querySelector("button");
      if (!btn) return;
      btn.addEventListener("click", (e) => {
        e.stopPropagation();
        const open = !wrap.classList.contains("is-open");
        $$(".has-dropdown").forEach((w) => w.classList.remove("is-open"));
        if (open) wrap.classList.add("is-open");
        btn.setAttribute("aria-expanded", open ? "true" : "false");
      });
    });
    document.addEventListener("click", () => {
      $$(".has-dropdown").forEach((w) => {
        w.classList.remove("is-open");
        const b = w.querySelector("button");
        if (b) b.setAttribute("aria-expanded", "false");
      });
    });

    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") {
        $$(".has-dropdown").forEach((w) => {
          w.classList.remove("is-open");
          const b = w.querySelector("button");
          if (b) b.setAttribute("aria-expanded", "false");
        });
        closeModal("search");
        closeModal("auth");
      }
    });

    initMobileNav();
    initModals();
    initSearch();
    initAuth();
    initYear();
    updateBadges();
    updateUserChip();
    document.addEventListener("lumina:cart", updateBadges);
    document.addEventListener("lumina:wishlist", updateBadges);
    document.addEventListener("lumina:user", updateUserChip);
  });
})();
