/**
 * Contact form handler for Netlify + Telegram Bot
 */
(function () {
  const form = document.getElementById("contact-form");
  const topic = document.getElementById("contact-topic");
  const params = new URLSearchParams(window.location.search);
  const t = params.get("topic");

  // --- TELEGRAM CONFIGURATION ---
  const TELEGRAM_BOT_TOKEN = "YOUR_BOT_TOKEN_HERE"; 
  const TELEGRAM_CHAT_ID = "YOUR_CHAT_ID_HERE";

  if (topic && t === "custom") {
    topic.value = "custom";
  }

  if (form) {
    form.addEventListener("submit", async (e) => {
      e.preventDefault();
      
      const status = document.getElementById("contact-status");
      const nameInput = document.getElementById("contact-name");
      const emailInput = document.getElementById("contact-email");
      const topicSelect = document.getElementById("contact-topic");
      const messageInput = document.getElementById("contact-message");
      const submitBtn = form.querySelector('button[type="submit"]');

      const name = nameInput ? nameInput.value.trim() : "";
      const email = emailInput ? emailInput.value.trim() : "";
      const message = messageInput ? messageInput.value.trim() : "";
      const selectedTopic = topicSelect ? topicSelect.value : "general";

      const topics = {
        general: "Ерөнхий асуулт",
        order: "Захиалгын тусламж",
        custom: "Захиалгаар хийлгэх / Тусгай хэмжээ",
        trade: "Түншлэлийн хөтөлбөр"
      };
      const topicMongolian = topics[selectedTopic] || selectedTopic;

      if (!name || !email || !message) {
        if (status) {
          status.hidden = false;
          status.style.color = "#c5221f";
          status.textContent = "Мэдээллийг бүрэн бөглөно үү.";
        }
        return;
      }

      let originalBtnText = "";
      if (submitBtn) {
        submitBtn.disabled = true;
        originalBtnText = submitBtn.textContent;
        submitBtn.textContent = "Илгээж байна...";
      }

      if (status) {
        status.hidden = true;
      }

      // 1. Submit to Netlify Forms first
      const formData = new FormData(form);
      formData.append("form-name", "contact");

      try {
        await fetch("/", {
          method: "POST",
          headers: { "Content-Type": "application/x-www-form-urlencoded" },
          body: new URLSearchParams(formData).toString(),
        });

        // 2. Submit to Telegram
        const telegramMessage = `
📩 *Шинэ зурвас ирлээ!* (Солонго Орд ХХК)
────────────────────
👤 *Нэр:* ${name}
📧 *Имэйл:* ${email}
🏷️ *Сэдэв:* ${topicMongolian}

📝 *Зурвас:*
${message}
────────────────────
        `;

        const telegramResponse = await fetch(`https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            chat_id: TELEGRAM_CHAT_ID,
            text: telegramMessage,
            parse_mode: "Markdown",
          }),
        });

        if (telegramResponse.ok) {
          if (status) {
            status.hidden = false;
            status.style.color = "#137333";
            status.textContent = "Зурвас амжилттай илгээгдлээ. Танд удахгүй хариу өгөх болно!";
          }
          form.reset();
        } else {
          throw new Error("Telegram error");
        }
      } catch (error) {
        console.error("Error:", error);
        if (status) {
          status.hidden = false;
          status.style.color = "#c5221f";
          status.textContent = "Зурвас илгээхэд алдаа гарлаа. Та дахин оролдоно уу эсвэл шууд утсаар холбогдоно уу.";
        }
      } finally {
        if (submitBtn) {
          submitBtn.disabled = false;
          submitBtn.textContent = originalBtnText;
        }
      }
    });
  }
})();
