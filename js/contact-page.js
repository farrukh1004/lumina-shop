/**
 * Contact form handler - Sends data to Netlify Serverless Function
 */
(function () {
  const form = document.getElementById("contact-form");
  const topic = document.getElementById("contact-topic");
  const params = new URLSearchParams(window.location.search);
  const t = params.get("topic");

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
          status.textContent = "Мэдээллийг бүрэн бөглөнө үү.";
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

      try {
        // Send to Netlify Serverless Function endpoint
        const response = await fetch("//.netlify/functions/send-telegram", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            name: name,
            email: email,
            topic: topicMongolian,
            message: message
          })
        });

        const result = await response.json();

        if (response.ok && result.success) {
          if (status) {
            status.hidden = false;
            status.style.color = "#137333";
            status.textContent = "Зурвас амжилттай илгээгдлээ. Танд удахгүй хариу өгөх болно!";
          }
          form.reset();
        } else {
          throw new Error(result.error || "Server error");
        }
      } catch (error) {
        console.error("Error sending message:", error);
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
