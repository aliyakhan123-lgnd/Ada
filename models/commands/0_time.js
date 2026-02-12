const moment = require("moment-timezone");

module.exports.config = {
  name: "time",
  version: "1.0.3",
  hasPermission: 0,
  credits: "SHAAN SIR",
  description: "Get the current time of multiple countries in a styled format",
  commandCategory: "Utility",
  usages: "[time]",
  cooldowns: 5,
};

module.exports.run = async function ({ api, event }) {
  const { threadID, messageID } = event;

  // List of countries with their primary timezones
  const timezones = {
    "𝐏𝐀𝐊𝐈𝐒𝐓𝐀𝐍": "Asia/Karachi",
    "𝐈𝐍𝐃𝐀𝐈": "Asia/Kolkata",
    "𝐔𝐒𝐀 𝐍𝐄𝐖 𝐘𝐎𝐑𝐊": "America/New_York",
    "𝐔𝐒𝐀 𝐋𝐎𝐒 𝐀𝐍𝐆𝐄𝐋𝐄𝐒": "America/Los_Angeles",
    "𝐔𝐍𝐈𝐓𝐄𝐃 𝐊𝐈𝐍𝐆𝐃𝐎𝐌": "Europe/London",
    "𝐀𝐔𝐒𝐓𝐑𝐀𝐋𝐈𝐀 𝐒𝐘𝐃𝐍𝐄𝐘": "Australia/Sydney",
    "𝐉𝐀𝐏𝐀𝐍": "Asia/Tokyo",
    "𝐂𝐇𝐈𝐍𝐀": "Asia/Shanghai",
    "𝐆𝐄𝐑𝐌𝐀𝐍𝐘": "Europe/Berlin",
    "𝐅𝐑𝐀𝐍𝐂𝐄": "Europe/Paris",
    "𝐒𝐎𝐔𝐓𝐇 𝐊𝐎𝐑𝐄𝐀": "Asia/Seoul",
    "𝐁𝐑𝐀𝐙𝐈𝐋": "America/Sao_Paulo",
    "𝐑𝐔𝐒𝐒𝐈𝐀": "Europe/Moscow",
    "𝐒𝐎𝐔𝐓𝐇 𝐀𝐅𝐑𝐈𝐂𝐀": "Africa/Johannesburg",
    "𝐔𝐀𝐄": "Asia/Dubai",
    "𝐂𝐀𝐍𝐀𝐃𝐀 𝐓𝐎𝐑𝐎𝐍𝐓𝐎": "America/Toronto",
    "𝐌𝐄𝐗𝐈𝐂𝐎": "America/Mexico_City",
    "𝐒𝐈𝐍𝐆𝐀𝐏𝐎𝐑𝐄": "Asia/Singapore",
    "𝐈𝐓𝐀𝐋𝐘": "Europe/Rome",
    "𝐒𝐏𝐀𝐈𝐍": "Europe/Madrid",
    "𝐓𝐔𝐑𝐊𝐄𝐘": "Europe/Istanbul",
    "𝐒𝐀𝐔𝐃𝐈 𝐀𝐑𝐀𝐁𝐈𝐀": "Asia/Riyadh",
    "𝐄𝐆𝐘𝐏𝐓": "Africa/Cairo",
    "𝐏𝐇𝐈𝐋𝐈𝐏𝐏𝐈𝐍𝐄𝐒": "Asia/Manila",
    "𝐍𝐄𝐖 𝐙𝐄𝐀𝐋𝐀𝐍𝐃": "Pacific/Auckland",
    "𝐓𝐇𝐀𝐈𝐋𝐀𝐍𝐃": "Asia/Bangkok",
    "𝐀𝐑𝐆𝐄𝐍𝐓𝐈𝐍𝐀": "America/Argentina/Buenos_Aires",
  };

  let timeMessage = "🌍 **𝐂𝐔𝐑𝐑𝐄𝐍𝐓 𝐓𝐈𝐌𝐄 𝐈𝐍 𝐕𝐀𝐑𝐈𝐎𝐔𝐒 𝐂𝐎𝐔𝐍𝐓𝐑𝐈𝐄𝐒 𝐂𝐑𝐄𝐀𝐓𝐄𝐃 𝐁𝐘 𝐒𝐇𝐀𝐀𝐍 𝐊𝐇𝐀𝐍 𝐊**:\n\n";

  // Generate current time for each timezone
  for (const [country, timezone] of Object.entries(timezones)) {
    const now = moment.tz(timezone);
    const currentTime = now.format("h:mm:ss A ⏰"); // Includes seconds
    const currentDate = now.format("DD/MM/YYYY 📆");
    const currentDay = now.format("dddd ⏳");

    timeMessage += `❁ ━[ ${country} ]━ ❁\n\n`;
    timeMessage += `✰ 𝗧𝗜𝗠𝗘 ➪ ${currentTime}\n`;
    timeMessage += `✰ 𝗗𝗔𝗧𝗘 ➪ ${currentDate}\n`;
    timeMessage += `✰ 𝗗𝗔𝗬 ➪ ${currentDay}\n\n`;
    timeMessage += `❁ ━━━━━━━━━━━━━━ ❁\n\n`;
  }

  // Send the styled message with all times
  return api.sendMessage(timeMessage, threadID, messageID);
};