/**
 * Contact form handler with Telegram Bot integration + optional topic query param
 */
(function () {
  const form = document.getElementById("contact-form");
  const topic = document.getElementById("contact-topic");
  const params = new URLSearchParams(window.location.search);
  const t = params.get("topic");

  // --- TELEGRAM CONFIGURATION ---
  // Replace these with your actual Telegram Bot Token and Chat ID (same as your checkout/buying system)
  const TELEGRAM_BOT_TOKEN = "YOUR_BOT_TOKEN_HERE"; 
  const TELEGRAM_CHAT_ID = "YOUR_CHAT_ID_HERE";

  // Automatically select 'custom' topic if it's passed in the URL (e.g., contact.html?topic=custom)
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

      // Mongolian labels for the categories to display on your Telegram group
      const topics = {
        general: "Ерөнхий асуулт",
        order: "Захиалгын тусламж",
        custom: "Захиалгаар хийлгэх / Тусгай хэмжээ",
        trade: "Түншлэлийн хөтөлбөр"
      };
      const topicMongolian = topics[selectedTopic] || selectedTopic;

      // Form validation error in Mongolian
      if (!name || !email || !message) {
        if (status) {
          status.hidden = false;
          status.style.color = "#c5221f"; // Red color for error
          status.textContent = "Мэдээллийг бүрэн бөглөнө үү.";
        }
        return;
      }

      // Disable button and change button text to Mongolian "Sending..."
      let originalBtnText = "";
      if (submitBtn) {
        submitBtn.disabled = true;
        originalBtnText = submitBtn.textContent;
        submitBtn.textContent = "Илгээж байна...";
      }

      // Hide previous status
      if (status) {
        status.hidden = true;
      }

      // Format the notification layout that gets sent to your Telegram Channel/Chat
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

      const telegramUrl = `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`;

      try {
        const response = await fetch(telegramUrl, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            chat_id: TELEGRAM_CHAT_ID,
            text: telegramMessage,
            parse_mode: "Markdown",
          }),
        });

        const result = await response.json();

        if (result.ok) {
          // Success message in Mongolian
          if (status) {
            status.hidden = false;
            status.style.color = "#137333"; // Green color for success
            status.textContent = "Зурвас амжилттай илгээгдлээ. Танд удахгүй хариу өгөх болно!";
          }
          form.reset(); // Clear form fields
        } else {
          throw new Error("Telegram API error");
        }
      } catch (error) {
        console.error("Error sending message:", error);
        // Error message in Mongolian
        if (status) {
          status.hidden = false;
          status.style.color = "#c5221f"; // Red color for error
          status.textContent = "Зурвас илгээхэд алдаа гарлаа. Та дахин оролдоно уу эсвэл шууд утсаар холбогдоно уу.";
        }
      } finally {
        // Re-enable the submit button
        if (submitBtn) {
          submitBtn.disabled = false;
          submitBtn.textContent = originalBtnText;
        }
      }
    });
  }
})();
