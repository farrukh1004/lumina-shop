exports.handler = async (event) => {
  // Only allow POST requests
  if (event.httpMethod !== "POST") {
    return { statusCode: 405, body: "Method Not Allowed" };
  }

  try {
    // 1. Pull your secret credentials safely from Netlify's environment variables
    const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
    const TELEGRAM_CHAT_ID = process.env.TELEGRAM_CHAT_ID;

    // 2. Grab the order text sent by your frontend website
    const { message } = JSON.parse(event.body);

    // 3. Fire the request to Telegram safely from the cloud backend
    const response = await fetch(`https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        chat_id: TELEGRAM_CHAT_ID,
        text: message,
        parse_mode: "Markdown"
      })
    });

    const data = await response.json();

    if (data.ok) {
      return { statusCode: 200, body: JSON.stringify({ success: true }) };
    } else {
      return { statusCode: 400, body: JSON.stringify({ error: data.description }) };
    }
  } catch (error) {
    return { statusCode: 500, body: JSON.stringify({ error: error.message }) };
  }
};