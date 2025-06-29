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

const config = require('../config');
const { cmd, commands } = require('../command');
const axios = require('axios');

cmd({
  pattern: 'fb',
  alias: ['fbdl', 'facebook'],
  desc: 'Download Facebook videos and reels by providing the video URL.',
  category: 'utility',
  use: '.fbdl <facebook_url>',
  filename: __filename,
}, async (conn, mek, msg, { from, args, reply }) => {
  try {
    const fbUrl = args.join(" ");
    if (!fbUrl) {
      return reply('*𝐏𝐥𝐞𝐚𝐬𝐞 𝐩𝐫𝐨𝐯𝐢𝐝𝐞 𝐚 𝐅𝐚𝐜𝐞𝐛𝐨𝐨𝐤 𝐯𝐢𝐝𝐞𝐨 𝐨𝐫 𝐫𝐞𝐞𝐥 𝐔𝐑𝐋.*..*');
    }

    // Fetch video download links from the API
    const apiKey = 'e276311658d835109c'; // Replace with your API key if required
    const apiUrl = `https://api.nexoracle.com/downloader/facebook?apikey=${apiKey}&url=${encodeURIComponent(fbUrl)}`;
    const response = await axios.get(apiUrl);

    if (!response.data || !response.data.result || !response.data.result.sd) {
      return reply('*𝐏𝐥𝐞𝐚𝐬𝐞 𝐩𝐫𝐨𝐯𝐢𝐝𝐞 𝐚 𝐅𝐚𝐜𝐞𝐛𝐨𝐨𝐤 𝐯𝐢𝐝𝐞𝐨 𝐨𝐫 𝐫𝐞𝐞𝐥 𝐔𝐑𝐋.*..*');
    }

    const { thumb, title, desc, sd } = response.data.result;

    // Send the video as an attachment
    await conn.sendMessage(from, {
      video: { url: sd }, // Attach the video
    caption = `*🎭 𝙃𝙄𝙎𝙊𝙆𝘼'𝙎 𝙁𝙄𝙉𝘿 — FB VIDEO DL 🎭*\n\n` +
  `🔖 *Title:* ${title}\n` +
  `📜 *Description:* ${desc}\n` +
  `🔗 *URL:* ${fbUrl}\n\n` +
  `> _"A glimpse into another world... Careful what you watch." – 𝙃𝙞𝙨𝙤𝙠𝙖_`;
    });
  } catch (error) {
    console.error('Error downloading Facebook video:', error);
    reply('❌ Unable to download the Facebook video. Please try again later.');
  }
});
