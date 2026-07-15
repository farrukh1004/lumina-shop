/**
 * Cart lines, totals, checkout form (client-side demo connected to Telegram)6368632269
 */
(function () {
  

  const linesEl = document.getElementById("cart-lines");
  const emptyEl = document.getElementById("cart-empty");
  const layoutEl = document.querySelector(".cart-layout");
  const summarySub = document.getElementById("cart-subtotal");
  const summaryShip = document.getElementById("cart-shipping");
  const summaryTotal = document.getElementById("cart-total");
  const checkoutForm = document.getElementById("checkout-form");
  const products = window.LUMINA_PRODUCTS || [];

  function money(n) {
    return new Intl.NumberFormat(undefined, { style: "currency", currency: "USD" }).format(n);
  }

  function getLineProduct(id) {
    return products.find((p) => p.id === id);
  }

  function shippingFor(sub) {
    if (sub === 0) return 0;
    return sub >= 200 ? 0 : 12;
  }

  function render() {
    const cart = window.LuminaStore.getCart();
    if (!linesEl) return;

    if (!cart.length) {
      linesEl.innerHTML = "";
      if (emptyEl) emptyEl.hidden = false;
      if (layoutEl) layoutEl.hidden = true;
      if (summarySub) summarySub.textContent = money(0);
      if (summaryShip) summaryShip.textContent = money(0);
      if (summaryTotal) summaryTotal.textContent = money(0);
      if (checkoutForm) checkoutForm.hidden = true;
      return;
    }

    if (emptyEl) emptyEl.hidden = true;
    if (layoutEl) layoutEl.hidden = false;
    if (checkoutForm) checkoutForm.hidden = false;

    linesEl.innerHTML = "";
    cart.forEach((line, index) => {
      const p = getLineProduct(line.productId);
      if (!p) return;
      const row = document.createElement("div");
      row.className = "cart-line";
      const unit = p.consultationOnly ? 0 : Number(p.price) || 0;
      row.innerHTML = `
        <div class="cart-line__img"><img src="${p.images[0]}" alt="" width="100" height="100" /></div>
        <div>
          <strong><a href="product.html?id=${p.id}" style="color:inherit;text-decoration:none">${p.name}</a></strong>
          <p class="muted" style="margin:0.25rem 0">${line.color} · ${line.size}</p>
          <p class="muted" style="margin:0">${p.consultationOnly ? "Quote" : money(unit)} each</p>
          <button type="button" class="btn btn--ghost" style="margin-top:0.75rem;padding:0.35rem 0.75rem;font-size:0.85rem" data-remove="${index}">Remove</button>
        </div>
        <div>
          <div class="qty-control" role="group" aria-label="Quantity for ${p.name}">
            <button type="button" data-qty="${index}" data-delta="-1" aria-label="Decrease">−</button>
            <input type="text" readonly value="${line.qty}" aria-label="Quantity" />
            <button type="button" data-qty="${index}" data-delta="1" aria-label="Increase">+</button>
          </div>
        </div>
      `;
      linesEl.appendChild(row);
    });

    linesEl.querySelectorAll("[data-remove]").forEach((btn) => {
      btn.addEventListener("click", () => {
        window.LuminaStore.removeLine(Number(btn.getAttribute("data-remove")));
        render();
      });
    });
    linesEl.querySelectorAll("[data-qty]").forEach((btn) => {
      btn.addEventListener("click", () => {
        const i = Number(btn.getAttribute("data-qty"));
        const d = Number(btn.getAttribute("data-delta"));
        const cart = window.LuminaStore.getCart();
        const line = cart[i];
        if (!line) return;
        window.LuminaStore.updateLine(i, line.qty + d);
        render();
      });
    });

    const sub = window.LuminaStore.cartSubtotal(products);
    const ship = shippingFor(sub);
    if (summarySub) summarySub.textContent = money(sub);
    if (summaryShip) summaryShip.textContent = ship === 0 ? "Free" : money(ship);
    if (summaryTotal) summaryTotal.textContent = money(sub + ship);
  }

  // Telegram Integration Handled inside Checkout Form submission
  if (checkoutForm) {
    checkoutForm.addEventListener("submit", (e) => {
      e.preventDefault();

      // 1. Collect user contact information dynamically from form inputs
      const formData = new FormData(checkoutForm);
      let customerDetailsText = "";
      
      formData.forEach((value, key) => {
        // Formats input names neatly (e.g., "first_name" becomes "First name")
        const formattedKey = key.replace(/[-_]/g, ' ').replace(/^\w/, c => c.toUpperCase());
        customerDetailsText += `👤 *${formattedKey}:* ${value}\n`;
      });

      // 2. Gather items from the shopping cart
      const cart = window.LuminaStore.getCart();
      let itemsText = "";
      
      cart.forEach((line) => {
        const p = getLineProduct(line.productId);
        if (p) {
          const itemPrice = p.consultationOnly ? "Quote" : money(p.price);
          itemsText += `📦 *${p.name}* (${line.color} / ${line.size})\n   ↳ Qty: ${line.qty} × ${itemPrice}\n`;
        }
      });

      // 3. Get totals
      const sub = window.LuminaStore.cartSubtotal(products);
      const ship = shippingFor(sub);
      const finalTotal = money(sub + ship);

      // 4. Construct the Telegram Markdown message
      const telegramMessage = `
🛍️ *ШИНЭ ЗАХИАЛГА ИРЛЭЭ!*
---------------------------------
*Хэрэглэгчийн мэдээлэл:*
${customerDetailsText}
*Захиалгын мэдээлэл:*
${itemsText}
---------------------------------
💰 *Нийт үнэ:* ${money(sub)}
🚚 *Хүргэлт:* ${ship === 0 ? "Үнэгүй" : money(ship)}
💵 *Төлөх нийт дүн:* ${finalTotal}
      `.trim();

      // Disable button during network request to prevent double clicks
      const submitBtn = checkoutForm.querySelector('[type="submit"]');
      if (submitBtn) submitBtn.disabled = true;

      // 5. Send order directly to the Telegram API
      // 5. SEND TO YOUR NETLIFY BACKEND INTERMEDIARY (Token is safe!)
      fetch("/.netlify/functions/send-order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: telegramMessage }) // Send only the message text
      })
      .then(response => response.json())
      .then(data => {
        if (data.success) { 
          alert("Order placed successfully! We will contact you soon.");
          window.LuminaStore.saveCart([]); 
          checkoutForm.reset();            
          render();
        } else {
          // Changed data.description to data.error to match your Netlify function
          alert("Error: " + data.error); 
        }
      })
      .catch(error => {
        console.error("Error sending order to Telegram:", error);
        alert("Network error. Could not send order details.");
      })
      .finally(() => {
        if (submitBtn) submitBtn.disabled = false;
      });
    });
  }

  document.addEventListener("lumina:cart", render);
  render();
})();
