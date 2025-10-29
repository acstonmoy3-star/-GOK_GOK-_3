const axios = require("axios");

module.exports = {
  config: {
    name: "ig0",
    version: "2.0",
    author: "BaYjid + Optimized by Shiam",
    countDown: 5,
    role: 0,
    shortDescription: "Random Caption + fast video",
    longDescription: "Sends a random styled quote with a random mp4 instantly",
    category: "fun",
    guide: "{prefix}ig or +",
    usePrefix: false
  },

  onStart: async function ({ api, event }) {
    return sendQuoteWithVideo(api, event);
  },

  onChat: async function ({ api, event }) {
    const body = event.body?.toLowerCase().trim();
    if (body === "+") {
      return sendQuoteWithVideo(api, event);
    }
  }
};

// 🔹 Random Quote Generator
function getRandomQuote() {
  const quotes = [
    "=== 「𝗣𝗿𝗲𝗳𝗶𝘅 𝐄𝐯𝐞𝐧𝐭」 ===\n--❖-- ɪᴛ'ᴢ ʙᴀʏᴊɪᴅ --❖--\n✢━━━━━━━━━━━━━━━✢\n\n- জীবনে এমন বন্ধু থাকা দরকার,\n- যেনো বিপদে আপদে পাশে পাওয়া যায়..!❤️🥀\n\n✢━━━━━━━━━━━━━━━✢\n𝐂𝐫𝐞𝐚𝐭𝐨𝐫 : ɪᴛ'ᴢ ʙᴀʏᴊɪᴅ",
    "=== 「𝗣𝗿𝗲𝗳𝗶𝘅 𝐄𝐯𝐞𝐧𝐭」 ===\n--❖-- ɪᴛ'ᴢ ʙᴀʏᴊɪᴅ --❖--\n✢━━━━━━━━━━━━━━━✢\n\n- শখের বয়সে টাকার অভাব থাকে 🙂💔\n- তখন পাশে নারী ওহ্ থাকে না 😅\n\n✢━━━━━━━━━━━━━━━✢\n𝐂𝐫𝐞𝐚𝐭𝐨𝐫 : ɪᴛ'ᴢ ʙᴀʏᴊɪᴅ",
    "=== 「𝗟𝗼𝘃𝗲」 ===\n--❖-- ɪᴛ'ᴢ ʙᴀʏᴊɪᴅ --❖--\n✢━━━━━━━━━━━━━━━✢\n\n- তোমার হাসিটাই আমার সুখ 💖\n- তুমি পাশে থাকলেই সবকিছু সুন্দর লাগে 🌸\n\n✢━━━━━━━━━━━━━━━✢\n𝐂𝐫𝐞𝐚𝐭𝐨𝐫 : ɪᴛ'ᴢ ʙᴀʏᴊɪᴅ",
    "=== 「𝗠𝗼𝘁𝗶𝘃𝗮𝘁𝗶𝗼𝗻」 ===\n--❖-- ɪᴛ'ᴢ ʙᴀʏᴊɪᴅ --❖--\n✢━━━━━━━━━━━━━━━✢\n\n- কখনো হাল ছেড়ো না 💪\n- জীবন কঠিন হলেও লড়াই চালিয়ে যাও 🌟\n\n✢━━━━━━━━━━━━━━━✢\n𝐂𝐫𝐞𝐚𝐭𝐨𝐫 : ɪᴛ'ᴢ ʙᴀʏᴊɪᴅ"
  ];
  return quotes[Math.floor(Math.random() * quotes.length)];
}

// 🔹 Random Video URL Generator
function getRandomVideoURL() {
  const videos = [
    "https://cdn.discordapp.com/attachments/1276673258933436428/1299573798431572099/1.mp4",
    "https://cdn.discordapp.com/attachments/1276673258933436428/1299573798708195418/2.mp4",
    "https://cdn.discordapp.com/attachments/1276673258933436428/1299573798997542994/3.mp4",
    "https://cdn.discordapp.com/attachments/1276673258933436428/1299573799310387241/4.mp4",
    "https://cdn.discordapp.com/attachments/1276673258933436428/1299573799623166023/5.mp4"
  ];
  return videos[Math.floor(Math.random() * videos.length)];
}

// 🔹 Fast Send Function
async function sendQuoteWithVideo(api, event) {
  try {
    const quote = getRandomQuote();
    const videoUrl = getRandomVideoURL();

    // Send typing indicator (optional)
    api.sendTypingIndicator(event.threadID);

    // Fetch video as stream
    const response = await axios.get(videoUrl, { responseType: "stream" });

    // Send instantly without saving to file
    api.sendMessage({
      body: quote,
      attachment: response.data
    }, event.threadID);
  } catch (error) {
    console.error("Error sending video:", error);
    api.sendMessage("❌ কিছু সমস্যা হয়েছে, পরে চেষ্টা করো ভাই!", event.threadID);
  }
}