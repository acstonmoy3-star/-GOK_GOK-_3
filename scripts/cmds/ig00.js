const axios = require("axios");

module.exports = {
  config: {
    name: "ig00",
    version: "2.1",
    author: "BaYjid + Fixed by Shiam",
    countDown: 5,
    role: 0,
    shortDescription: "Random Caption + fast video",
    longDescription: "Sends a random styled quote with a random mp4 instantly",
    category: "fun",
    guide: "{prefix}ig or -",
    usePrefix: false
  },

  onStart: async function ({ api, event }) {
    return sendQuoteWithVideo(api, event);
  },

  onChat: async function ({ api, event }) {
    const body = event.body?.toLowerCase().trim();
    if (body === "_") {
      return sendQuoteWithVideo(api, event);
    }
  }
};

function getRandomQuote() {
  const quotes = [
    "=== 「𝗣𝗿𝗲𝗳𝗶𝘅 𝐄𝐯𝐞𝐧𝐭」 ===\n--❖-- ɪᴛ'ᴢ ʙᴀʏᴊɪᴅ --❖--\n✢━━━━━━━━━━━━━━━✢\n\n- জীবনে এমন বন্ধু থাকা দরকার,\n- যেনো বিপদে আপদে পাশে পাওয়া যায়..!❤️🥀",
    "=== 「𝗟𝗼𝘃𝗲」 ===\n--❖-- ɪᴛ'ᴢ ʙᴀʏᴊɪᴅ --❖--\n✢━━━━━━━━━━━━━━━✢\n\n- তোমার হাসিটাই আমার সুখ 💖\n- তুমি পাশে থাকলেই সবকিছু সুন্দর লাগে 🌸",
    "=== 「𝗠𝗼𝘁𝗶𝘃𝗮𝘁𝗶𝗼𝗻」 ===\n--❖-- ɪᴛ'ᴢ ʙᴀʏᴊɪᴅ --❖--\n✢━━━━━━━━━━━━━━━✢\n\n- কখনো হাল ছেড়ো না 💪\n- জীবন কঠিন হলেও লড়াই চালিয়ে যাও 🌟"
  ];
  return quotes[Math.floor(Math.random() * quotes.length)];
}

function getRandomVideoURL() {
  const videos = [
    "https://i.imgur.com/xFrXAvd.mp4",
    "https://i.imgur.com/2gsrdtE.mp4",
    "https://i.imgur.com/bBE4sie.mp4",
    "https://i.imgur.com/q3rs9Kt.mp4",
    "https://i.imgur.com/8azruKH.mp4"
  ];
  return videos[Math.floor(Math.random() * videos.length)];
}

async function sendQuoteWithVideo(api, event) {
  try {
    const quote = getRandomQuote();
    const videoUrl = getRandomVideoURL();

    api.sendTypingIndicator(event.threadID);

    const response = await axios.get(videoUrl, {
      responseType: "stream",
      headers: { "User-Agent": "Mozilla/5.0" }
    });

    api.sendMessage(
      { body: quote, attachment: response.data },
      event.threadID
    );
  } catch (error) {
    console.error("❌ Video send error:", error.message);
    api.sendMessage("❌ ভিডিও পাঠাতে সমস্যা হয়েছে ভাই!", event.threadID);
  }
}