// netlify/functions/send-telegram.js

exports.handler = async (event) => {
  // Only handle POST requests
  if (event.httpMethod !== "POST") {
    return { 
      statusCode: 405, 
      body: JSON.stringify({ error: "Method Not Allowed" }) 
    };
  }

  try {
    const { name, email, topic, message } = JSON.parse(event.body);

    // Retrieve your hidden API keys from Netlify Environment Settings
    const token = process.env.TELEGRAM_BOT_TOKEN;
    const chatId = process.env.TELEGRAM_CHAT_ID;

    if (!token || !chatId) {
      return {
        statusCode: 500,
        body: JSON.stringify({ error: "System Configuration Error: Missing API credentials on the server." })
      };
    }

    // Format the message with HTML so special characters (@, -, _) don't cause parser crashes
    const telegramMessage = `
<b>📩 Шинэ зурвас ирлээ!</b> (Солонго Орд ХХК)
────────────────────
👤 <b>Нэр:</b> ${name}
📧 <b>Имэйл:</b> ${email}
🏷️ <b>Сэдэв:</b> ${topic}

📝 <b>Зурвас:</b>
${message}
────────────────────
    `;

    const telegramUrl = `https://api.telegram.org/bot${token}/sendMessage`;
    
    const response = await fetch(telegramUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        chat_id: chatId,
        text: telegramMessage,
        parse_mode: "HTML"
      })
    });

    const result = await response.json();

    if (result.ok) {
      return {
        statusCode: 200,
        body: JSON.stringify({ success: true })
      };
    } else {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: result.description })
      };
    }

  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message })
    };
  }
};