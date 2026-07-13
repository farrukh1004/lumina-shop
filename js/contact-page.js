/**
 * Contact form demo handler + optional topic query param
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
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const status = document.getElementById("contact-status");
      if (status) {
        status.hidden = false;
        status.textContent = "Thanks — your message has been recorded for this demo. We’ll reply within one business day.";
      }
      form.reset();
    });
  }
})();
