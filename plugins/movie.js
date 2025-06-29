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

const axios = require('axios');
const { cmd } = require('../command');
const config = require('../config'); // Ensure your API key is in config

// Command to fetch movie details
cmd({
    pattern: "movieinfo",
    desc: "Fetch detailed information about a movie.",
    category: "utility",
    react: "🎞️",
    filename: __filename
}, async (conn, mek, m, { from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply }) => {
    try {
        const movieName = args.join(' ');
        if (!movieName) {
            return reply("📽️ Please provide the name of the movie.");
        }

        const apiUrl = `http://www.omdbapi.com/?t=${encodeURIComponent(movieName)}&apikey=${config.OMDB_API_KEY}`;
        const response = await axios.get(apiUrl);
        const data = response.data;

        if (data.Response === "False") {
            return reply("! Movie not found.");
        }

        const movieInfo = `
*🌸🎬 『𝙒𝘼・𝙃𝙄𝙎・𝙑𝟭』 𝗣𝗥𝗘𝗦𝗘𝗡𝗧𝗘 🎬🌸*

*『 🎞️ 𝗧𝗶𝘁𝗿𝗲 』:* *${data.Title}*
*『 🗓️ 𝗔𝗻𝗻é𝗲 』:* *${data.Year}*
*『 🧪 𝗖𝗹𝗮𝘀𝘀𝗲 』:* *${data.Rated}*
*『 🎉 𝗦𝗼𝗿𝘁𝗶𝗲 』:* *${data.Released}*
*『 ⏱️ 𝗗𝘂𝗿é𝗲 』:* *${data.Runtime}*

*『 🎭 𝗚𝗲𝗻𝗿𝗲 』:* _${data.Genre}_
*『 🎬 𝗥é𝗮𝗹𝗶𝘀𝗮𝘁𝗲𝘂𝗿 』:* _${data.Director}_
*『 ✍️ 𝗦𝗰é𝗻𝗮𝗿𝗶𝘀𝘁𝗲 』:* _${data.Writer}_
*『 👤 𝗔𝗰𝘁𝗲𝘂𝗿𝘀 』:* _${data.Actors}_

*『 🌐 𝗟𝗮𝗻𝗴𝘂𝗲 』:* _${data.Language}_
*『 🗺️ 𝗣𝗮𝘆𝘀 』:* _${data.Country}_
*『 🏆 𝗥𝗲𝗰𝗼𝗺𝗽𝗲𝗻𝘀𝗲𝘀 』:* _${data.Awards}_

*『 ⭐ 𝗜𝗠𝗗𝗕 𝗥𝗮𝘁𝗶𝗻𝗴 』:* *${data.imdbRating}/10*

───────────────
✨ _S𝘂𝗰𝗰𝘂𝗺𝗯𝗲 𝗮𝘂 𝗰𝗶𝗻é𝗺𝗮 𝗰𝗼𝗺𝗺𝗲 𝗛𝗶𝘀𝗼𝗸𝗮 𝘀𝘂𝗰𝗰𝘂𝗺𝗯𝗲 𝗮𝘂 𝗰𝗵𝗮𝗼𝘀..._ ✨

> *𝙋𝙤𝙬𝙚𝙧𝙚𝙙 𝙗𝙮 『𝙒𝘼・𝙃𝙄𝙎・𝙑𝟭』 👑*
`;

        const imageUrl = data.Poster && data.Poster !== 'N/A' ? data.Poster : config.ALIVE_IMG;

        await conn.sendMessage(from, {
            image: { url: imageUrl },
            caption: `${movieInfo}\n> CREATED BY your  name`
        }, { quoted: mek });
    } catch (e) {
        console.error(e);
        reply(`❌ Error: ${e.message}`);
    }
});
