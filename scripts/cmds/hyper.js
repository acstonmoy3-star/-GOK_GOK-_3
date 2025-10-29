const axios = require("axios");
const fs = require("fs");
const path = require("path");

module.exports = {
  config: {
    name: "hyper",
    version: "1.0",
    author: "Gok",
    countDown: 5,
    role: 2,
    shortDescription: "sarcasm",
    longDescription: "Responds with random media",
    category: "reply",
  },

  onStart: async function () {},

  onChat: async function ({ event, message }) {
    if (!event.body) return;
    const text = event.body.toLowerCase();

    // ✅ CASE-1: "Bal","bal","chudi",
    if (text === "magi") {
      return sendMedia(message, [
        "https://files.catbox.moe/runq5b.jpg",
        "https://files.catbox.moe/runq5b.jpg",
        "https://files.catbox.moe/runq5b.jpg"
      ]);
    }

    // ✅ CASE-2: "attack"
    if (text === "bal") {
      return sendMedia(message, [
        "https://files.catbox.moe/runq5b.jpg",
        "https://files.catbox.moe/runq5b.jpg",
        "https://files.catbox.moe/runq5b.jpg"
      ]);
    }

    // ✅ CASE-3: "cyber"
    if (text === "Bal") {
      return sendMedia(message, [
        "https://files.catbox.moe/runq5b.jpg",
        "https://files.catbox.moe/runq5b.jpg"
      ]);
    }

    // ✅ CASE-4: "security"
    if (text === "xudi") {
      return sendMedia(message, [
        "https://files.catbox.moe/runq5b.jpg",
        "https://files.catbox.moe/runq5b.jpg"
      ]);
    }

    // ✅ CASE-5: "acs boss"
    if (text === "khanki") {
      return sendMedia(message, [
        "https://files.catbox.moe/runq5b.jpg",
        "https://files.catbox.moe/runq5b.jpg",
        "https://files.catbox.moe/runq5b.jpg"
      ]);
    }

  }
};

async function sendMedia(message, list) {
  const randomLink = list[Math.floor(Math.random() * list.length)];
  const fileName = path.basename(randomLink);
  const filePath = path.join(__dirname, fileName);

  try {
    const res = await axios.get(randomLink, { responseType: "arraybuffer" });
    fs.writeFileSync(filePath, Buffer.from(res.data));

    await message.reply({
      body: "🎭_____________\n\n alert 🚨 এখানে গালাগালি করিস না মুখ মুcরে ভেঙে ফেলবো তাহলে বলদা ⚡👾👀🚩 \n\n গালাগালি করলে কিন্তু সিয়াম বস ঠাপ দিবে সাবধান 👑 🚩 \n c: - 々𝗦𝗜𝗬͜͡⁴𝗠 𝗩𝗜𝗥𝗨𝗦🚩🏴‍☠️📨\n\n____________☠️⚡",
      attachment: fs.createReadStream(filePath)
    });

  } catch (e) {
    console.log("Media fetch error:", e.message);
    await message.reply("⚠️ Media load failed!");
  } finally {
    fs.unlink(filePath, () => {});
  }
  }
