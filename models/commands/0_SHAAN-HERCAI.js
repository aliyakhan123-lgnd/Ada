const axios = require("axios");

module.exports.config = {
  name: "hercai",
  version: "5.0.0",
  hasPermission: 0,
  credits: "Shaan Khan", 
  description: "Stable AI with Free API - No Key Needed",
  commandCategory: "AI",
  usePrefix: false,
  usages: "[Reply to bot]",
  cooldowns: 2,
};

let userMemory = {};
let lastScript = {}; 
let isActive = true;

module.exports.handleEvent = async function ({ api, event }) {
  if (this.config.credits !== "Shaan Khan") {
    return api.sendMessage("⚠️ Error: Credits changed. Creator: Shaan Khan", event.threadID, event.messageID);
  }

  const { threadID, messageID, senderID, body, messageReply } = event;
  if (!isActive || !body) return;
  if (!messageReply || messageReply.senderID !== api.getCurrentUserID()) return;

  api.setMessageReaction("⌛", messageID, (err) => {}, true);

  const userQuery = body.toLowerCase();
  if (!userMemory[senderID]) userMemory[senderID] = [];
  if (!lastScript[senderID]) lastScript[senderID] = "Roman Urdu";

  // Script Logic
  if (userQuery.includes("pashto") || userQuery.includes("پښتو")) {
    lastScript[senderID] = "NATIVE PASHTO SCRIPT (پښتو)";
  } else if (userQuery.includes("urdu") && (userQuery.includes("script") || userQuery.includes("mein"))) {
    lastScript[senderID] = "NATIVE URDU SCRIPT (اردو)";
  } else if (userQuery.includes("hindi") || userQuery.includes("हिंदी")) {
    lastScript[senderID] = "NATIVE HINDI SCRIPT (हिंदी)";
  } else if (userQuery.includes("roman")) {
    lastScript[senderID] = "Roman Urdu";
  }

  const conversationHistory = userMemory[senderID].join("\n");

  const systemPrompt = `You are an AI by Shaan Khan. Strictly respond in ${lastScript[senderID]} and use emojis. Context: ${conversationHistory}`;

  // FREE STABLE API (No key required)
  const apiURL = `https://sandipapi.onrender.com/gpt?prompt=${encodeURIComponent(body)}&system=${encodeURIComponent(systemPrompt)}`;

  try {
    const res = await axios.get(apiURL);
    let botReply = res.data.answer; // Sandip API returns 'answer'

    if (!botReply) throw new Error("Empty Response");

    userMemory[senderID].push(`U: ${body}`, `B: ${botReply}`);
    if (userMemory[senderID].length > 6) userMemory[senderID].splice(0, 2);

    api.setMessageReaction("✅", messageID, (err) => {}, true);
    return api.sendMessage(botReply, threadID, messageID);

  } catch (error) {
    // Agar Sandip API fail ho toh backup free API
    try {
      const backupRes = await axios.get(`https://api.shinn07.repl.co/ai?query=${encodeURIComponent(body)}`);
      return api.sendMessage(backupRes.data.answer + " ✨", threadID, messageID);
    } catch (e) {
      api.setMessageReaction("❌", messageID, (err) => {}, true);
      return api.sendMessage("❌ Server down hai, thodi der baad koshish karein. ✨", threadID, messageID);
    }
  }
};

module.exports.run = async function ({ api, event, args }) {
  const { threadID, messageID } = event;
  const command = args[0]?.toLowerCase();

  if (command === "on") {
    isActive = true;
    return api.sendMessage("✅ AI Online!", threadID, messageID);
  } else if (command === "off") {
    isActive = false;
    return api.sendMessage("⚠️ AI Offline.", threadID, messageID);
  } else if (command === "clear") {
    userMemory = {};
    lastScript = {};
    return api.sendMessage("🧹 Memory Cleared!", threadID, messageID);
  }
};
