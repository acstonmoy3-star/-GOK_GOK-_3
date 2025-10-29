const axios = require("axios");
const fs = require("fs");
const path = require("path");

module.exports = {
	config: {
		name: "opps",
		version: "1.0",
		author: "siyam8881",
		countDown: 5,
		role: 2,
		shortDescription: "sarcasm",
		longDescription: "Responds with random media when someone says 'acs",
		category: "reply",
	},

	onStart: async function () {},

	onChat: async function ({ event, message }) {
		if (event.body && event.body.toLowerCase() === "opps") {
			const mediaLinks = [
				"https://files.catbox.moe/pnx17k.mp4",
				"https://files.catbox.moe/pnx17k.mp4",
				"https://files.catbox.moe/pnx17k.mp4",
				"https://files.catbox.moe/pnx17k.mp4",
				"https://files.catbox.moe/pnx17k.mp4",
				"https://files.catbox.moe/v03s7j.jpg",
				"https://files.catbox.moe/pnx17k.mp4",
				"https://files.catbox.moe/evhfl1.jpg",
				"https://files.catbox.moe/pnx17k.mp4",
				"https://files.catbox.moe/v03s7j.jpg"
			];

			const randomLink = mediaLinks[Math.floor(Math.random() * mediaLinks.length)];
			const fileName = path.basename(randomLink);
			const filePath = path.join(__dirname, fileName);

			try {
				const response = await axios.get(randomLink, { responseType: "arraybuffer" });
				fs.writeFileSync(filePath, Buffer.from(response.data));

				await message.reply({
					body: "🎭𝐀𝐓𝐓𝐀𝐂𝐊-𝐂𝐘𝐁𝐄𝐑-𝐒𝐄𝐂𝐔𝐑𝐈𝐓𝐘",
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