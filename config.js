/**
 * Copyright (C) 2025 hhhisoka
 *
 * This code is licensed under the GPL-3.0 LICENSE 
 * See the LICENSE file in the repository root for full license text.
 *
 * Wa-his-v1 WhatsApp Bot
 * Version: 1.0.0
 * Created by hhhisoka
 * GitHub: https://github.com/hhhisoka/Wa-his-v1
 */


const fs = require('fs');
if (fs.existsSync('config.env')) require('dotenv').config({ path: './config.env' });

function convertToBool(text, fault = 'true') {
    return text === fault ? true : false;
}
module.exports = {
SESSION_ID: process.env.SESSION_ID || "PUT YOUR SESSION ID HERE",
AUTO_READ_STATUS: process.env.AUTO_READ_STATUS || "true",
MODE: process.env.MODE || "private",
AUTO_VOICE: process.env.AUTO_VOICE || "false",
AUTO_STICKER: process.env.AUTO_STICKER || "false",
AUTO_REPLY: process.env.AUTO_REPLY || "false",
ALIVE_IMG: process.env.ALIVE_IMG || "https://files.catbox.moe/jr7hl0.jpg",
MENU_IMG: process.env.MENU_IMG || "https://files.catbox.moe/7y7go8.png",
ALIVE_MSG: process.env.ALIVE_MSG || "_Hi 💁🏽 How Can I Assist You. Am alive Now._",
ANTI_LINK: process.env.ANTI_LINK || "true",
ANTI_BAD: process.env.ANTI_BAD || "true",
PREFIX: process.env.PREFIX || ".",
FAKE_RECORDING: process.env.FAKE_RECORDING || "false",
FAKE_TYPING: process.env.FAKE_TYPING || "true",
ALWAYS_ONLINE: process.env.ALWAYS_ONLINE || "true",
CURRENT_STATUS: process.env.CURRENT_STATUS || "true",
AUTO_REACT: process.env.AUTO_REACT || "false",
HEART_REACT: process.env.HEART_REACT || "false",
OWNER_REACT: process.env.OWNER_REACT || "false",
BOT_NAME: process.env.BOT_NAME || "『𝙒𝘼・𝙃𝙄𝙎・𝙑𝟭』",
OMDB_API_KEY: process.env.OMDB_API_KEY || "76cb7f39", // omdbapi.com
STICKER_DATA: process.env.STICKER_DATA || "『𝙒𝘼・𝙃𝙄𝙎・𝙑𝟭』",

AUTO_DOWNLOAD: process.env.AUTO_DOWNLOAD || false,

AUTO_READ_STATUS: process.env.AUTO_READ_STATUS || true,

AUTO_DOWNLOAD: process.env.AUTO_DOWNLOAD || false,
  DOWNLOAD_KEYWORDS: ["save", "download", "dl", "télécharge", "sauve","send"],
  DOWNLOAD_IMAGES: process.env.DOWNLOAD_IMAGES || true,
  DOWNLOAD_VIDEOS: process.env.DOWNLOAD_VIDEOS || true,
  DOWNLOAD_AUDIO: process.env.DOWNLOAD_AUDIO || true,
  MAX_FILE_SIZE: process.env.MAX_FILE_SIZE ||  50, // MB
  NOTIFY_DOWNLOAD: process.env.NOTIFY_DOWNLOAD || true,
  SAVE_SENDER_INFO: process.env.SAVE_SENDER_INFO || true,
};