
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

const { cmd } = require('../command');
const axios = require('axios');

cmd({
    pattern: "tiktok",
    alias: ["ttdl", "tt", "tiktokdl"],
    desc: "Download TikTok video without watermark",
    category: "downloader",
    react: "⌛",
    filename: __filename
},
async (conn, mek, m, { from, args, q, reply }) => {
    try {
        if (!q) return reply("Please provide a TikTok video link.");
        if (!q.includes("tiktok.com")) return reply("Invalid TikTok link.");
        
        
        const apiUrl = `https://delirius-apiofc.vercel.app/download/tiktok?url=${q}`;
        const { data } = await axios.get(apiUrl);
        
        if (!data.status || !data.data) return reply("Failed to fetch TikTok video.");
        
        const { title, like, comment, share, author, meta } = data.data;
        const videoUrl = meta.media.find(v => v.type === "video").org;
        
        const caption = `*🎭 𝙃𝙄𝙎𝙊𝙆𝘼'𝙎 𝙑𝙄𝘿𝙀𝙊 𝙎𝙉𝘼𝙏𝘾𝙃𝙀𝙍 — 『𝙒𝘼・𝙃𝙄𝙎・𝙑𝟭』 🎭*\n\n` +
    `🃏 *Target:* ${author.nickname}\n` +
    `♥️ *Likes:* ${like}\n💬 *Comments:* ${comment}\n🔁 *Shares:* ${share}\n\n` +
    `_“Popularity is such a... fragile illusion. Let’s break it, shall we?” – 𝙃𝙞𝙨𝙤𝙠𝙖_`;
        
        await conn.sendMessage(from, {
            video: { url: videoUrl },
            caption: caption,
            contextInfo: { mentionedJid: [m.sender] }
        }, { quoted: mek });
        
    } catch (e) {
        console.error("Error in TikTok downloader command:", e);
        reply(`An error occurred: ${e.message}`);
    }
});
          
