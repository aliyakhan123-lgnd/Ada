const schedule = require('node-schedule');
const moment = require('moment-timezone');
const chalk = require('chalk');
const fs = require('fs');
const path = require('path');

module.exports.config = {
  name: 'AUTO-TIME',
  version: '14.0.0',
  hasPermssion: 0,
  credits: 'SHAAN BABU',
  description: 'Stylish Auto Time & Date Sender',
  commandCategory: 'system',
  usages: '[]',
  cooldowns: 3
};

// STYLISH TIME MESSAGE
function getTimeMessage() {
  const now = moment().tz("Asia/Karachi");

  const time = now.format("hh:mm A");
  const date = now.format("DD MMMM YYYY");
  const day  = now.format("dddd");

  return `✦••┈┈┈✅ 𝗧𝗜𝗠𝗘 🫠┈┈┈••✦

✰ 𝗧𝗜𝗠𝗘 ➪ ${time} ⏰
✰ 𝗗𝗔𝗧𝗘 ➪ ${date} 📆
✰ 𝗗𝗔𝗬 ➪ ${day} ⏳

✦••★ 𝐒𝐇𝐀𝐀𝐍-𝐊𝐇𝐀𝐍••✦`;
}

module.exports.onLoad = () => {
  console.log(
    chalk.bold.green("====== STYLISH AUTO TIME SYSTEM LOADED ======")
  );

  // CHECK EVERY MINUTE
  schedule.scheduleJob("*/1 * * * *", () => {
    const now = moment().tz("Asia/Karachi");

    // SEND ONLY AT 00 MINUTE
    if (now.format("mm") !== "00") return;

    const msg = getTimeMessage();

    // OPTIONAL AUTO ATTACHMENT
    const folder = path.join(__dirname, "AUTO-MEDIA");
    const supported = [".png", ".jpg", ".jpeg", ".gif", ".mp4", ".webp"];
    let attachment;

    if (fs.existsSync(folder)) {
      const files = fs.readdirSync(folder).filter(f =>
        supported.includes(path.extname(f).toLowerCase())
      );

      if (files.length > 0) {
        const randomFile = files[Math.floor(Math.random() * files.length)];
        attachment = fs.createReadStream(path.join(folder, randomFile));
      }
    }

    // SEND TO ALL THREADS
    global.data.allThreadID.forEach(threadID => {
      global.client.api.sendMessage(
        { body: msg, attachment },
        threadID
      );
    });
  });
};

module.exports.run = () => {};
