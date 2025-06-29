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
const config = require('../config')
const {cmd , commands} = require('../command')
const os = require("os")
const { exec } = require('child_process')
const {runtime} = require('../lib/functions')


cmd({
    pattern: "owner",
    desc: "owner the bot",
    category: "owner",
    react: "👨‍💻",
    filename: __filename
},

async(conn, mek, m,{from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
try{

let dec = `
╭─❍ *『👋 𝗞𝗢𝗡𝗡𝗜𝗖𝗛𝗜𝗪𝗔 ${pushname}』* ❍─╮

*『 👨‍💻 𝗕𝗢𝗧 𝗡𝗔𝗠𝗘 』:*  『𝙒𝘼・𝙃𝙄𝙎・𝙑𝟭』

╰───────────────❍

> *👑 𝗢𝗪𝗡𝗘𝗥 𝗜𝗡𝗙𝗢 👑*

*✦ 𝗡𝗼𝗺 𝗱𝘂 𝗰𝗿é𝗮𝘁𝗲𝘂𝗿:* hhhisoka
*✦ 𝗡𝘂𝗺é𝗿𝗼:* wa.me/2250104610403

*✦ 𝗖𝗵𝗮𝗶𝗻𝗲 𝗼𝗳𝗳𝗶𝗰𝗶𝗲𝗹𝗹𝗲:*  
🔗� https://whatsapp.com/channel/0029Vb5u3VX0lwgllCdVTF0G

───────────────
🧠 *𝗣𝗼𝘄𝗲𝗿𝗲𝗱 𝗯𝘆 hhhisoka*
`;
await conn.sendMessage(from,{image:{url:config.MENU_IMG},caption:dec},{quoted:mek});

}catch(e){
console.log(e)
reply(`${e}`)
}
});

cmd({
    pattern: "repo",
    desc: "repo the bot",
    react: "📡",
    category: "owner",
    filename: __filename
},

async(conn, mek, m,{from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
try{

let dec = `
*╭──❖ 『 🃏 𝙃𝙄𝙎𝙊𝙆𝘼 𝙈𝙊𝘿𝙀 : 𝙍𝙀𝙋𝙊 𝙎𝙃𝘼𝙍𝙀𝙍 』 ❖──╮*

*🔗 𝙍𝙀𝙋𝙊 𝙊𝙁 𝘿𝙀𝘼𝙏𝙃 💥*

*📁 Github:*  
> 👨‍💻 https://github.com/hhhisoka/Wa-his-v1

*📢 𝘾𝙃𝘼𝙉𝙉𝙀𝙇 𝙊𝙁 𝙈𝘼𝘿𝙉𝙀𝙎𝙎 💫*

*🔗 WhatsApp Channel:*  
> 👁️‍🗨️ https://whatsapp.com/channel/0029Vb5u3VX0lwgllCdVTF0G

*╰───────⊹❖⊹───────╯*

🩸 _"𝙇𝙖 𝙘𝙪𝙧𝙞𝙤𝙨𝙞𝙩é 𝙢𝙚 𝙙é𝙫𝙤𝙧𝙚… 𝙥𝙖𝙧𝙩𝙖𝙜𝙚 𝙖𝙫𝙖𝙣𝙩 𝙦𝙪𝙚 𝙟𝙚 𝙣𝙚 𝙩𝙚 𝙘𝙝𝙖𝙩𝙞𝙚…"_ 🃏

> *🕸️ 𝙋𝙤𝙬𝙚𝙧𝙚𝙙 𝙗𝙮 『𝙒𝘼・𝙃𝙄𝙎・𝙑𝟭』 × hhhisoka*
`;
await conn.sendMessage(from,{image:{url: config.MENU_IMG},caption:dec},{quoted:mek});

}catch(e){
console.log(e)
reply(`${e}`)
}
});
cmd({
    pattern: "system",
    alias: ["status","botinfo"],
    desc: "Check up time , ram usage and more",
    category: "owner",
    filename: __filename
},
async(conn, mek, m,{from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
try{
let status = `
╭─❖ 『 🧠 𝙎𝙔𝙎𝙏𝙀𝙈 𝙎𝙏𝘼𝙏𝙐𝙎 』 ❖─╮

├ ⏰ *Runtime :* ${runtime(process.uptime())}
├ 📟 *RAM Usage :* ${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)}MB / ${Math.round(require('os').totalmem() / 1024 / 1024)}MB
├ ⚙️ *Platform :* ${os.hostname()}
├ 👨‍💻 *Owner :* hhhisoka
├ 🧬 *Version :* 1.0.0

╰──────────────────────╯

> *🔮 Powered by 『𝙒𝘼・𝙃𝙄𝙎・𝙑𝟭』*
`;
return reply(`${status}`)
  
}catch(e){
console.log(e)
reply(`${e}`)

}
})
cmd({
    pattern: "alive",
    desc: "Check bot online or no.",
    react: "👋",
    category: "owner",
    filename: __filename
},
async(conn, mek, m,{from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
try{
return await conn.sendMessage(from,{image: {url: config.ALIVE_IMG},caption: config.ALIVE_MSG},{quoted: mek})
}catch(e){
console.log(e)
reply(`${e}`)
}
});

cmd({
    pattern: "jid",
    desc: "Get the JID of the chat.",
    category: "owner",
   // react: "🔍",
    filename: __filename
}, async (conn, mek, m, { from, reply }) => {
    try {
       
        
        const chatJid = from;

        
       await reply (`${chatJid}`)

    } catch (e) {
        console.error(e);
        reply(`${e}`);
    }
});

cmd({
    pattern: "restart",
    desc: "restart the bot",
    react :"🔄",
    category: "owner",
    filename: __filename
},
async(conn, mek, m,{from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
try{
if(!isOwner) return reply(`only for owner`);
const {exec} = require("child_process")
reply("restarting...")
await sleep(1500)
exec("pm2 restart all")
}catch(e){
console.log(e)
reply(`${e}`)
}
})
// 1. Shutdown Bot
cmd({
    pattern: "shutdown",
    desc: "Shutdown the bot.",
    category: "owner",
    react: "🛑",
    filename: __filename
},
async (conn, mek, m, { from, isOwner, reply }) => {
    if (!isOwner) return reply("❌ You are not the owner!");
    reply("🛑 Shutting down...").then(() => process.exit());
});

// 2. Broadcast Message to All Groups
cmd({
    pattern: "broadcast",
    desc: "Broadcast a message to all groups.",
    category: "owner",
    react: "📢",
    filename: __filename
},
async (conn, mek, m, { from, isOwner, args, reply }) => {
    if (!isOwner) return reply("❌ You are not the owner!");
    if (args.length === 0) return reply("📢 Please provide a message to broadcast.");

    const message = args.join(' ');
    const groups = Object.keys(await conn.groupFetchAllParticipating());

    for (const groupId of groups) {
        await conn.sendMessage(groupId, { text: message }, { quoted: mek });
    }

    reply("📢 Message broadcasted to all groups.");
});

// 3. Set Profile Picture
cmd({
    pattern: "setpp",
    desc: "Set bot profile picture.",
    category: "owner",
    react: "🖼️",
    filename: __filename
},
async (conn, mek, m, { from, isOwner, quoted, reply }) => {
    if (!isOwner) return reply("❌ You are not the owner!");
    if (!quoted || !quoted.message.imageMessage) return reply("❌ Please reply to an image.");

    try {
        const media = await conn.downloadMediaMessage(quoted);
        await conn.updateProfilePicture(conn.user.jid, { url: media });
        reply("🖼️ Profile picture updated successfully!");
    } catch (error) {
        reply(`❌ Error updating profile picture: ${error.message}`);
    }
});

// 4. Block User
cmd({
    pattern: "block",
    desc: "Block a user.",
    category: "owner",
    react: "🚫",
    filename: __filename
},
async (conn, mek, m, { from, isOwner, quoted, reply }) => {
    if (!isOwner) return reply("❌ You are not the owner!");
    if (!quoted) return reply("❌ Please reply to the user you want to block.");

    const user = quoted.sender;
    try {
        await conn.updateBlockStatus(user, 'block');
        reply(`🚫 User ${user} blocked successfully.`);
    } catch (error) {
        reply(`❌ Error blocking user: ${error.message}`);
    }
});

// 5. Unblock User
cmd({
    pattern: "unblock",
    desc: "Unblock a user.",
    category: "owner",
    react: "✅",
    filename: __filename
},
async (conn, mek, m, { from, isOwner, quoted, reply }) => {
    if (!isOwner) return reply("❌ You are not the owner!");
    if (!quoted) return reply("❌ Please reply to the user you want to unblock.");

    const user = quoted.sender;
    try {
        await conn.updateBlockStatus(user, 'unblock');
        reply(`✅ User ${user} unblocked successfully.`);
    } catch (error) {
        reply(`❌ Error unblocking user: ${error.message}`);
    }
});


// 6. Clear All Chats
cmd({
    pattern: "clearchats",
    desc: "Clear all chats from the bot.",
    category: "owner",
    react: "🧹",
    filename: __filename
},
async (conn, mek, m, { from, isOwner, reply }) => {
    if (!isOwner) return reply("❌ You are not the owner!");
    try {
        const chats = conn.chats.all();
        for (const chat of chats) {
            await conn.modifyChat(chat.jid, 'delete');
        }
        reply("🧹 All chats cleared successfully!");
    } catch (error) {
        reply(`❌ Error clearing chats: ${error.message}`);
    }
});

cmd({
    pattern: "ping",
    desc: "Check bot's response time.",
    category: "owner",
    react: "✅",
    filename: __filename
},
async (conn, mek, m, { from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply }) => {
    try {
        const startTime = Date.now()
        const message = await conn.sendMessage(from, { text: '𝗣𝗶𝗻𝗴𝗶𝗻𝗴...' })
        const endTime = Date.now()
        const ping = endTime - startTime
        await conn.sendMessage(from, { text: `📍 Ping : ${ping}ms` }, { quoted: message })
    } catch (e) {
        console.log(e)
        reply(`${e}`)
    }
});
