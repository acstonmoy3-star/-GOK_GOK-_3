const { getTime } = global.utils; // drive getFile এখন আর লাগবে না
if (!global.temp.welcomeEvent) global.temp.welcomeEvent = {};

module.exports = {
  config: {
    name: "welcome",
    version: "2.1",
    author: "Shiam + NTKhang",
    category: "events"
  },

  langs: {
    en: {
      welcomeMessage: `চলে এসেছি আমি নায়ক মিলন তোমাদের মাঝে ☄️📨✈️🧸🕸️👀\n\nকেমন আছো তোমরা 👀📨📌`,
      multiple1: "you",
      multiple2: "you guys"
    }
  },

  onStart: async ({ threadsData, message, event, api, getLang }) => {
    if (event.logMessageType !== "log:subscribe") return;

    const { threadID } = event;
    const { nickNameBot } = global.GoatBot.config;
    const dataAddedParticipants = event.logMessageData.addedParticipants;

    // যদি Bot Add হয়
    if (dataAddedParticipants.some(u => u.userFbId == api.getCurrentUserID())) {
      if (nickNameBot) api.changeNickname(nickNameBot, threadID, api.getCurrentUserID());

      // Picture URL
      const imageUrl = "https://i.imgur.com/qT4LYPl.jpeg"; // নিজের Picture URL বসাও

      return message.send({
        body: getLang("welcomeMessage"),
        attachment: imageUrl
      });
    }

    // নতুন মেম্বার Join
    if (!global.temp.welcomeEvent[threadID])
      global.temp.welcomeEvent[threadID] = { joinTimeout: null, dataAddedParticipants: [] };

    global.temp.welcomeEvent[threadID].dataAddedParticipants.push(...dataAddedParticipants);
    clearTimeout(global.temp.welcomeEvent[threadID].joinTimeout);

    global.temp.welcomeEvent[threadID].joinTimeout = setTimeout(async () => {
      const threadData = await threadsData.get(threadID);
      if (threadData.settings.sendWelcomeMessage === false) return;

      const dataAddedParticipants = global.temp.welcomeEvent[threadID].dataAddedParticipants;
      const dataBanned = threadData.data.banned_ban || [];
      const threadName = threadData.threadName;
      const userName = [];
      const mentions = [];
      let multiple = false;

      if (dataAddedParticipants.length > 1) multiple = true;

      for (const user of dataAddedParticipants) {
        if (dataBanned.some(item => item.id == user.userFbId)) continue;
        userName.push(user.fullName);
        mentions.push({ tag: user.fullName, id: user.userFbId });
      }

      if (userName.length === 0) return;

      let { welcomeMessage = getLang("welcomeMessage") } = threadData.data;

      const form = { mentions: welcomeMessage.match(/\{userNameTag\}/g) ? mentions : null };
      welcomeMessage = welcomeMessage
        .replace(/\{userName\}|\{userNameTag\}/g, userName.join(", "))
        .replace(/\{boxName\}|\{threadName\}/g, threadName)
        .replace(/\{multiple\}/g, multiple ? getLang("multiple2") : getLang("multiple1"))
        .replace(
          /\{session\}/g,
          (() => {
            const hours = getTime("HH");
            if (hours <= 10) return getLang("session1");
            if (hours <= 12) return getLang("session2");
            if (hours <= 18) return getLang("session3");
            return getLang("session4");
          })()
        );

      form.body = welcomeMessage;

      // যদি কোনো Picture/Attachment থাকে
      if (threadData.data.welcomeAttachment) {
        form.attachment = threadData.data.welcomeAttachment; // Image URL/Attachment
      }

      message.send(form);
      delete global.temp.welcomeEvent[threadID];
    }, 1500);
  }
};
