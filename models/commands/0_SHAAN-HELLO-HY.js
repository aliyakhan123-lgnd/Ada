module.exports.config = {
  name: "SHAAN-HELLO-HY",
  version: "1.0.0",
  hasPermssion: 0,
  credits: "SHAAN BABU",
  description: "THIS BOT IS MADE BY SHAAN BABU",
  usePrefix: true,
  commandCategory: "HELLO HY",
  usages: "HY HELLO HI",
  cooldowns: 5
}

module.exports.handleEvent = async ({ event, api, Users }) => {
  let KEY = [ 
    "hello",
    "hi",
    "hello po",
    "hi po",
    "hiii",
    "helloo",
    "hy",
    "low",
    "lo",
    "hey",
    "heyy",
    "loe po",
    "low po",
    "hai",
    "kaisa",
    "chao",
    "KAISE",
    "kaise",
    "KAISE HO",
    "kaise ho",
    "lô",
    "helo",
    "Aap kaise",
    "yo",
    "AAP KAISE",
    "wassup",
    "hey",
    "hyyy",
    "hola"
  ];
  let thread = global.data.threadData.get(event.threadID) || {};
  if (typeof thread["hi"] == "undefined", thread["hi"] == false) return
  else {
  if (KEY.includes(event.body.toLowerCase()) !== false) {
    let data = [
      "184002922217363", "184023658881956", "184003212217334", "184002655550723", "184003438883978", "2379545595403511", "1926234657415528", "4046655705381617", "4046877352026119", "4046884992025355", "4070816262965561",      "526214684778630",
      "526220108111421",
      "526220308111401",
      "526220484778050",
      "526220691444696",
      "526220814778017",
      "526220978111334",
      "526221104777988",
      "526221318111300",
      "526221564777942",
      "526221711444594",
      "526221971444568",
     "2041011389459668", "2041011569459650", "2041011726126301", "2041011836126290", "2041011952792945", "2041012109459596", "2041012262792914", "2041012406126233", "2041012539459553", "2041012692792871", "2041014432792697", "2041014739459333", "2041015016125972", "2041015182792622", "2041015329459274", "2041015422792598", "2041015576125916", "2041017422792398", "2041020049458802", "2041020599458747", "2041021119458695", "2041021609458646", "2041022029458604", "2041022286125245"
    ];
    let sticker = data[Math.floor(Math.random() * data.length)];
let juswa = ["KYA AAP NE KHANA KHA LIYA...? 😊", "KYA KAR RAHI HO MERI JAAN...? 🤔", "KAISE HO MERI JAAN...? 😗", "MARA NAME SHAAN BABU HA AAP KA KYA NAME HA...? 🤐", "ME THARKI INSAAN K SATH MASTI KAR RAHA HU AAP KYA KAR RAHE HO...? 😒", "KYA AAP MERE BOSS SHAAN BABU SE BAAT KARNA CHAHTE HO TO UNKO MESSAGE KAR DO...!! 🙂","AAP BAHUT ACCHE HO JAAN OR ME MASOOM BHI HU...!! 😝", "I LOVE YOU SWEET HEART...!! 😛","KHA THE AAO ME AAPKA INTEZAR KAR RAHA THA...!! 🥺", "BOLO MARI JAAN KYA HA AAP KA HAL...?? 🤠", "CHALO AB JALDI SE MUJHE EK KIS DO...!! 😘", "AUR BATAO GHAR ME SAB THEEK HA AAPKE...? 🥰", "MASTI KARO MERI JAAN ME AAPKA SHAAN BABU HU AAPKE SATH...!! 🙈", "ABHI YAAD AAYI AAP KO MARI...!! 😕"];
 let juswa1 = juswa[Math.floor(Math.random() * juswa.length)];

    let moment = require("moment-timezone");
    let hours = moment.tz('Asia/Karachi).format('HHmm');
    let session = (
    hours > 0001 && hours <= 400 ? "SWEET MORNING" : 
    hours > 401 && hours <= 700 ? "LOVELY MORNING" :
    hours > 701 && hours <= 1000 ? "BEAUTIFUL MORNING" :
    hours > 1001 && hours <= 1100 ? "CUTE MORNING" : 
    hours > 1100 && hours <= 1500 ? "AFTER NOON" : 
    hours > 1501 && hours <= 1800 ? "EVENING" : 
    hours > 1801 && hours <= 2100 ? "EVENING" : 
    hours > 2101 && hours <= 2400 ? "NIGHT" : 
    "error");
    let name = await Users.getNameUser(event.senderID);
    let mentions = [];
    mentions.push({
      tag: name,
      id: event.senderID
    })
    let msg = {body: `┏━━━━━┓\n     SHAAN BABU                    ✧══•❁🐥❁•══✧\n┗━━━━━┛\n\n\nHELLO 𒁍 🌺${name}🌺\nHAVE A GOOD ${session}\n${juswa1}`, mentions}
    api.sendMessage(msg, event.threadID, (e, info) => {
      setTimeout(() => {
        api.sendMessage({sticker: sticker}, event.threadID);
      }, 100)
    }, event.messageID)
  }
  }
}

module.exports.languages = {
  "en": {
    "on": "on",
    "off": "off",
    "successText": `${this.config.name} success!`,
  }
}

module.exports.run = async ({ event, api, Threads, getText }) => {
  let { threadID, messageID } = event;
  let data = (await Threads.getData(threadID)).data;
  if (typeof data["hi"] == "undefined" || data["hi"] == true) data["hi"] = false;
  else data["hi"] = true;
  await Threads.setData(threadID, {
    data
  });
  global.data.threadData.set(threadID, data);
  return api.sendMessage(`${(data["hi"] == false) ? getText("off") : getText("on")} ${getText("successText")}`, threadID, messageID);
      }
