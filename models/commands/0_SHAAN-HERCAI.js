const axios = require("axios");

module.exports.config = {
  name: "hercai",
  version: "2.6.0",
  hasPermission: 0,
  credits: "Shaan Khan", 
  description: "Strict Script Persistence AI",
  commandCategory: "AI",
  usePrefix: false,
  usages: "[Reply to bot]",
  cooldowns: 2,
};

let userMemory = {};
let lastScript = {}; // Har user ki script preference yaad rakhne ke liye
let isActive = true;

module.exports.handleEvent = async function ({ api, event }) {
  if (global.client.commands.get("hercai").config.credits !== "Shaan Khan") {
    return api.sendMessage("⚠️ Error: Credits changed.", event.threadID, event.messageID);
  }

  const { threadID, messageID, senderID, body, messageReply } = event;
  if (!isActive || !body) return;
  if (!messageReply || messageReply.senderID !== api.getCurrentUserID()) return;

  api.setMessageReaction("⌛", messageID, () => {}, true);
  
  const userQuery = body.toLowerCase();
  if (!userMemory[senderID]) userMemory[senderID] = [];
  if (!lastScript[senderID]) lastScript[senderID] = "Roman Urdu";

  // Check for Language Switch Requests
  if (userQuery.includes("pashto mein") || userQuery.includes("pashto ki")) lastScript[senderID] = "Pashto (Native Script)";
  else if (userQuery.includes("urdu mein") || userQuery.includes("urdu script")) lastScript[senderID] = "Urdu (Native Nastaliq Script)";
  else if (userQuery.includes("hindi mein") || userQuery.includes("hindi script")) lastScript[senderID] = "Hindi (Devanagari Script)";
  else if (userQuery.includes("roman mein")) lastScript[senderID] = "Roman Urdu";

  const conversationHistory = userMemory[senderID].join("\n");
  
  // Strict System Prompt
  const systemPrompt = `You are an AI by Shaan Khan. 
  CURRENT REQUIRED SCRIPT: ${lastScript[senderID]}.
  RULE: User will chat in Roman Urdu, but you MUST reply ONLY in ${lastScript[senderID]}. 
  DO NOT switch back to Roman Urdu unless explicitly told "Roman mein baat karo".
  Context: ${conversationHistory}`;

  const apiURL = `https://text.pollinations.ai/${encodeURIComponent(systemPrompt + "\nUser: " + body)}?model=mistral&seed=${Math.random()}`;

  try {
    const response = await axios.get(apiURL, { timeout: 20000 });
    let botReply = response.data;

    userMemory[senderID].push(`U: ${body}`);
    userMemory[senderID].push(`B: ${botReply}`);
    if (userMemory[senderID].length > 6) userMemory[senderID].splice(0, 2);

    api.setMessageReaction("✅", messageID, () => {}, true);
    return api.sendMessage(botReply, threadID, messageID);

  } catch (error) {
    console.error(error);
    api.setMessageReaction("❌", messageID, () => {}, true);
    return api.sendMessage("❌ Connection issue! Dubara koshish karein.", threadID, messageID);
  }
};

module.exports.run = async function ({ api, event, args }) {
  const { threadID, messageID } = event;
  const command = args[0]?.toLowerCase();

  if (command === "on") {
    isActive = true;
    return api.sendMessage("✅ AI Active (Shaan Khan).", threadID, messageID);
  } else if (command === "off") {
    isActive = false;
    return api.sendMessage("⚠️ AI Paused.", threadID, messageID);
  } else if (command === "clear") {
    userMemory = {};
    lastScript = {};
    return api.sendMessage("🧹 History and Language settings cleared!", threadID, messageID);
  }
};
