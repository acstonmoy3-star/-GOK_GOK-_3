const axios = require("axios");
const fs = require("fs-extra");
const request = require("request");
const path = require("path");

module.exports = {
  config: {
    name: "ig",
    version: "1.3",
    author: "BaYjid",
    countDown: 5,
    role: 0,
    shortDescription: "Random Caption + Picture",
    longDescription: "Sends a random styled quote with a random image",
    category: "fun",
    guide: "{prefix}ig or /",
    usePrefix: false
  },

  onStart: async function ({ api, event }) {
    return sendQuoteWithImage(api, event);
  },

  onChat: async function ({ api, event }) {
    const body = event.body?.toLowerCase().trim();
    if (body === "/" || body === "/") {
      return sendQuoteWithImage(api, event);
    }
  }
};


function getRandomQuote() {
  const quotes = [
    "=== 「𝗣𝗿𝗲𝗳𝗶𝘅 𝐄𝐯𝐞𝐧𝐭」 ===\n--❖-- ɪᴛ'ᴢ ʙᴀʏᴊɪᴅ --❖--\n✢━━━━━━━━━━━━━━━✢\n\n- জীবনে এমন বন্ধু থাকা দরকার,\n- যেনো বিপদে আপদে পাশে পাওয়া যায়..!❤️🥀\n\n✢━━━━━━━━━━━━━━━✢\n𝐂𝐫𝐞𝐚𝐭𝐨𝐫 : ɪᴛ'ᴢ ʙᴀʏᴊɪᴅ",
    "=== 「𝗣𝗿𝗲𝗳𝗶𝘅 𝐄𝐯𝐞𝐧𝐭」 ===\n--❖-- ɪᴛ'ᴢ ʙᴀʏᴊɪᴅ --❖--\n✢━━━━━━━━━━━━━━━✢\n\n- শখের বয়সে টাকার অভাব থাকে 🙂💔\n- তখন পাশে নারী ওহ্ থাকে না 😅\n\n✢━━━━━━━━━━━━━━━✢\n𝐂𝐫𝐞𝐚𝐭𝐨𝐫 : ɪᴛ'ᴢ ʙᴀʏᴊɪᴅ",
    "=== 「𝗣𝗿𝗲𝗳𝗶𝘅 𝐄𝐯𝐞𝐧𝐭」 ===\n--❖-- ɪᴛ'ᴢ ʙᴀʏᴊɪᴅ --❖--\n✢━━━━━━━━━━━━━━━✢\n\n- প্রিয় মানুষটার কথা ভাবতে ভাবতে\n- হঠাৎ হেসে ফেলার অনুভূতি টা সুন্দর!'🖤🌸\n\n✢━━━━━━━━━━━━━━━✢\n𝐂𝐫𝐞𝐚𝐭𝐨𝐫 : ɪᴛ'ᴢ ʙᴀʏᴊɪᴅ",
    "=== 「𝗣𝗿𝗲𝗳𝗶𝘅 𝐄𝐯𝐞𝐧𝐭」 ===\n--❖-- ɪᴛ'ᴢ ʙᴀʏᴊɪᴅ --❖--\n✢━━━━━━━━━━━━━━━✢\n\n- মন থেকে ভালোবাসা পূর্ণতা পাক 💖\n- নাটকীয় ভালোবাসা থেকে মানুষ মুক্তি পাক!🙂🌸✨\n\n✢━━━━━━━━━━━━━━━✢\n𝐂𝐫𝐞𝐚𝐭𝐨𝐫 : ɪᴛ'ᴢ ʙᴀʏᴊɪᴅ",
    "=== 「𝗠𝗼𝘁𝗶𝘃𝗮𝘁𝗶𝗼𝗻」 ===\n--❖-- ɪᴛ'ᴢ ʙᴀʏᴊɪᴅ --❖--\n✢━━━━━━━━━━━━━━━✢\n\n- কখনো হাল ছেড়ো না 💪\n- জীবন কঠিন হলেও লড়াই চালিয়ে যাও 🌟\n\n✢━━━━━━━━━━━━━━━✢\n𝐂𝐫𝐞𝐚𝐭𝐨𝐫 : ɪᴛ'ᴢ ʙᴀʏᴊɪᴅ",
    "=== 「𝗜𝘀𝗹𝗮𝗺𝗶𝗰」 ===\n--❖-- ɪᴛ'ᴢ ʙᴀʏᴊɪᴅ --❖--\n✢━━━━━━━━━━━━━━━✢\n\n- দোয়া মানুষের নিয়তি পরিবর্তন করতে পারে 🕋\n- তাই দোয়া করতে ভুলবে না 🤲\n\n✢━━━━━━━━━━━━━━━✢\n𝐂𝐫𝐞𝐚𝐭𝐨𝐫 : ɪᴛ'ᴢ ʙᴀʏᴊɪᴅ",
    "=== 「𝗟𝗼𝘃𝗲」 ===\n--❖-- ɪᴛ'ᴢ ʙᴀʏᴊɪᴅ --❖--\n✢━━━━━━━━━━━━━━━✢\n\n- তোমার হাসিটাই আমার সুখ 💖\n- তুমি পাশে থাকলেই সবকিছু সুন্দর লাগে 🌸\n\n✢━━━━━━━━━━━━━━━✢\n𝐂𝐫𝐞𝐚𝐭𝐨𝐫 : ɪᴛ'ᴢ ʙᴀʏᴊɪᴅ"
  ];
  return quotes[Math.floor(Math.random() * quotes.length)];
}


function getRandomImageURL() {
  const images = [
    "https://i.postimg.cc/L4Cx5RKH/9e67645f927eaae0ba18f19b05622eac.jpg",
    "https://i.postimg.cc/7YXT11nD/780eb0e434ce5ca92e863a92e6cb27cf.jpg",
    "https://i.postimg.cc/1Xsfw4gf/2d1bcd832d2efb496e53cb45190e5325.jpg",
    "https://i.postimg.cc/ryjp7V0N/58137f27ceebf0482a58875d6ded3c1c.jpg",
    "https://i.postimg.cc/KvVmyRZB/1552cbe4d268c5f3a92f8ce0188f9fe7.jpg",
    "https://i.postimg.cc/L5WFRbM2/b68323d41ab7df1274342dd194292ede.jpg",
    "https://i.postimg.cc/nLxbHmNj/456ed64f3c38f3008f5f30f678563409.jpg",
    "https://i.postimg.cc/KYxwX2gt/95bf51e4d462707bf1557bbc47694849.jpg",
    "https://i.postimg.cc/g2mbpRCw/2bb146f811030e9a91b6654ac23101d1.jpg",
    "https://i.postimg.cc/tRxKV2yZ/98b0af95a9349c7705b7febf884e2fad.jpg",
    "https://i.postimg.cc/rwQ3LHGb/d13da3cb14a9630bf859795c26a2c972.jpg"
  ];
  return images[Math.floor(Math.random() * images.length)];
}


async function sendQuoteWithImage(api, event) {
  const quote = getRandomQuote();
  const imageUrl = getRandomImageURL();
  const imgPath = path.join(__dirname, "cache", `start_img_${Date.now()}.jpg`);

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