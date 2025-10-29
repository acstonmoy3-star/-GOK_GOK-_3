const axios = require("axios");
const fs = require("fs");
const path = require("path");

module.exports = {
	config: {
		name: "ariyan",
		version: "1.0",
		author: "Gookk",
		countDown: 5,
		role: 2,
		shortDescription: "sarcasm",
		longDescription: "Responds with random media when someone says 'ariyan",
		category: "reply",
	},

	onStart: async function () {},

	onChat: async function ({ event, message }) {
		if (event.body && event.body.toLowerCase() === "ariyan") {
			const mediaLinks = [
				"https://files.catbox.moe/ckn7se.mp4",
				"https://files.catbox.moe/3ykiwi.mp4",
				"https://files.catbox.moe/h8hd9w.mp4",
				"https://files.catbox.moe/99qnah.mp4",
				"https://files.catbox.moe/ff8pqi.mp4",
				"https://files.catbox.moe/6ygb47.mp4",
				"https://files.catbox.moe/ff8pqi.mp4",
				"https://files.catbox.moe/6ygb47.mp4",
				"https://files.catbox.moe/h8hd9w.mp4",
				"https://files.catbox.moe/99qnah.mp4"
			];

			const randomLink = mediaLinks[Math.floor(Math.random() * mediaLinks.length)];
			const fileName = path.basename(randomLink);
			const filePath = path.join(__dirname, fileName);

			try {
				const response = await axios.get(randomLink, { responseType: "arraybuffer" });
				fs.writeFileSync(filePath, Buffer.from(response.data));

				await message.reply({
					body: "🚩🏴‍☠️✨\n\n🎭»̶̶͓͓̽̽̽𝗩𝗔𝗥𝗧𝗨𝗔𝗟𝄞⋆⃝𓊈‎𝗔𝗟L༄𝗠𝗔𝗦𝗧𝗘𝗥𝗠𝗜𝗡𝗗༆✾❥𝗕𝗢𝗫༄\n\n🪐⚡👀",
					attachment: fs.createReadStream(filePath)
				});
			} catch (err) {
				console.error("Failed to fetch media:", err.message);
				await message.reply("Sorry, couldn't load the media.");
			} finally {
				fs.unlink(filePath, () => {});
			}
		}
	}
};