const axios = require("axios");
const fs = require("fs-extra");
const request = require("request");
const path = require("path");

module.exports = {
  config: {
    name: "ig6",
    version: "1.3",
    author: "BaYjid",
    countDown: 5,
    role: 0,
    shortDescription: "Random Caption + video",
    longDescription: "Sends a random styled quote with a random mp4",
    category: "fun",
    guide: "{prefix}ig or -",
    usePrefix: false
  },

  onStart: async function ({ api, event }) {
    return sendQuoteWithImage(api, event);
  },

  onChat: async function ({ api, event }) {
    const body = event.body?.toLowerCase().trim();
    if (body === "?") {
      return sendQuoteWithImage(api, event);
    }
  }
};

function getRandomQuote() {
  const quotes = [
    "=== 「𝗣𝗿𝗲𝗳𝗶𝘅 𝐄𝐯𝐞𝐧𝐭」 ===\n--❖-- ɪᴛ'ᴢ ʙᴀʏᴊɪᴅ --❖--\n✢━━━━━━━━━━━━━━━✢\n\n- জীবনে এমন বন্ধু থাকা দরকার,\n- যেনো বিপদে আপদে পাশে পাওয়া যায়..!❤️🥀\n\n✢━━━━━━━━━━━━━━━✢\n𝐂𝐫𝐞𝐚𝐭𝐨𝐫 : ɪᴛ'ᴢ ʙᴀʏᴊɪᴅ",
    "=== 「𝗣𝗿𝗲𝗳𝗶𝘅 𝐄𝐯𝐞𝐧𝐭」 ===\n--❖-- ɪᴛ'ᴢ ʙᴀʏᴊɪᴅ --❖--\n✢━━━━━━━━━━━━━━━✢\n\n- শখের বয়সে টাকার অভাব থাকে 🙂💔\n- তখন পাশে নারী ওহ্ থাকে না 😅\n\n✢━━━━━━━━━━━━━━━✢\n𝐂𝐫𝐞𝐚𝐭𝐨𝐫 : ɪᴛ'ᴢ ʙᴀʏᴊɪᴅ",
  ];
  return quotes[Math.floor(Math.random() * quotes.length)];
}

function getRandomImageURL() {
  const video = [
    "https://i.imgur.com/xFrXAvd.mp4",
    "https://i.imgur.com/2gsrdtE.mp4",
    "https://i.imgur.com/bBE4sie.mp4",
    "https://i.imgur.com/q3rs9Kt.mp4",
    "https://i.imgur.com/aTgKzEy.mp4",
    "https://i.imgur.com/8azruKH.mp4",
    "https://i.imgur.com/S5UOlqE.mp4",
    "https://i.imgur.com/upza1DI.mp4",
    "https://i.imgur.com/HicZwwA.mp4"
  ];
  return video[Math.floor(Math.random() * video.length)];
}

async function sendQuoteWithImage(api, event) {
  const quote = getRandomQuote();
  const imageUrl = getRandomImageURL();
  const imgPath = path.join(__dirname, "cache", `start_mp4_${Date.now()}.mp4`);

  fs.ensureDirSync(path.join(__dirname, "cache"));

  await new Promise((resolve, reject) => {
    request(imageUrl)
      .pipe(fs.createWriteStream(imgPath))
      .on("finish", resolve)
      .on("error", reject);
  });

  api.sendMessage({
    body: quote,
    attachment: fs.createReadStream(imgPath)
  }, event.threadID, () => fs.unlinkSync(imgPath));
}