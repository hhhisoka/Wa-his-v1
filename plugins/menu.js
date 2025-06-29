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

const {readEnv} = require('../config')
const {cmd , commands} = require('../command')
const os = require("os")
const {runtime} = require('../lib/functions')
cmd({
    pattern: "menu",
    alias: ["list"],
    desc: "bot's commands",
    react: "📜",
    category: "main"
},
async (conn, mek, m, { from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply }) => {
    try {
 let desc = `
╭──❖ 『👋 𝗞𝗢𝗡𝗡𝗜𝗖𝗛𝗜𝗪𝗔 ${pushname}』 ❖─╮

╭─「 🤖 𝘽𝙊𝙏 𝙎𝙏𝘼𝙏𝙐𝙎 」─╮
│ ◈ 𝙍𝙪𝙣𝙩𝙞𝙢𝙚      : ${runtime(process.uptime())}
│ ◈ 𝙍𝘼𝙈 𝙐𝙨𝙖𝙜𝙚    : ${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)}MB / ${Math.round(require('os').totalmem() / 1024 / 1024)}MB
│ ◈ 𝙋𝙡𝙖𝙩𝙛𝙤𝙧𝙢     : ${os.hostname()}
│ ◈ 𝙑𝙚𝙧𝙨𝙞𝙤𝙣     : 3.0.0
╰────────────────────╯

╭─「 🧭 𝙈𝙀𝙉𝙐 𝘾𝙃𝙊𝙄𝙓 」─╮
│ 1. 🌐 MAIN
│ 2. 🔍 SEARCH
│ 3. ⬇️ DOWNLOAD
│ 4. 👥 GROUP
│ 5. 👑 OWNER
│ 6. 🎭 FUN
╰────────────────────╯

_🌟 *Réponds avec le numéro que tu veux explorer.*_

> 🔮 *Powered by 『𝙒𝘼・𝙃𝙄𝙎・𝙑𝟭』 × hhhisoka*
`;
        const vv = await conn.sendMessage(from, { image: { url: config.MENU_IMG}, caption: desc }, { quoted: mek });

        conn.ev.on('messages.upsert', async (msgUpdate) => {
            const msg = msgUpdate.messages[0];
            if (!msg.message || !msg.message.extendedTextMessage) return;

            const selectedOption = msg.message.extendedTextMessage.text.trim();

            if (msg.message.extendedTextMessage.contextInfo && msg.message.extendedTextMessage.contextInfo.stanzaId === vv.key.id) {
                switch (selectedOption) {
                    case '1':
                    reply(`

╔═════════════════════╗  
║ 🔧 *『 𝗠𝗔𝗜𝗡 𝗖𝗢𝗠𝗠𝗔𝗡𝗗𝗦 』* 🔧  
╚═════════════════════╝  

╭───〔 ⚙️ 𝘾𝙤𝙢𝙢𝙖𝙣𝙙𝙨 〕───╮  
│ ◈ .alive  
│ ◈ .menu  
│ ◈ .menu2  
│ ◈ .system  
│ ◈ .ping  
│ ◈ .runtime  
│ ◈ .jid  
╰────────────────────╯  

📊 *Total MAIN Commands:* 7  

> 🔮 *Powered by 『𝙒𝘼・𝙃𝙄𝙎・𝙑𝟭』 × hhhisoka*
`);
                        break;
                    case '2':               
               reply(`

╔═══════════════════════╗  
║ 🔍 *『 𝗦𝗘𝗔𝗥𝗖𝗛 𝗖𝗢𝗠𝗠𝗔𝗡𝗗𝗦 』* 🔍  
╚═══════════════════════╝  

╭───〔 ⚙️ 𝘾𝙤𝙢𝙢𝙖𝙣𝙙𝙨 〕───╮  
│ ◈ .yts  
│ ◈ .image  
╰─────────────────────╯  

📊 *Total SEARCH Commands:* 2  

> 🔮 *Powered by 『𝙒𝘼・𝙃𝙄𝙎・𝙑𝟭』 × hhhisoka*
`);
                        break;
                    case '3':               
               reply(`

╔═══════════════════════╗  
║ 📥 *『 𝗗𝗢𝗪𝗡𝗟𝗢𝗔𝗗 𝗖𝗢𝗠𝗠𝗔𝗡𝗗𝗦 』* 📥  
╚═══════════════════════╝  

╭───〔 ⚙️ 𝘾𝙤𝙢𝙢𝙖𝙣𝙙𝙨 〕───╮  
│ ◈ .apk  
│ ◈ .twitter  
│ ◈ .gdrive  
│ ◈ .mediafire  
│ ◈ .fb  
│ ◈ .play  
│ ◈ .play2  
│ ◈ .video  
│ ◈ .video2  
│ ◈ .yta  
│ ◈ .ytmp3  
│ ◈ .tiktok  
╰─────────────────────╯  

📊 *Total DOWNLOAD Commands:* 12  

> 🔮 *Powered by 『𝙒𝘼・𝙃𝙄𝙎・𝙑𝟭』 × hhhisoka*
`);
                        break;
                    case '4':               
                        reply(`

╔═══════════════════════╗  
║ 👥 *『 𝗚𝗥𝗢𝗨𝗣 𝗖𝗢𝗠𝗠𝗔𝗡𝗗𝗦 』* 👥  
╚═══════════════════════╝  

╭───〔 ⚙️ 𝘾𝙤𝙢𝙢𝙖𝙣𝙙𝙨 〕───╮  
│ ◈ .mute  
│ ◈ .unmute  
│ ◈ .promote  
│ ◈ .demote  
│ ◈ .del  
│ ◈ .add  
│ ◈ .admins  
│ ◈ .groupdesc  
│ ◈ .groupinfo  
│ ◈ .gname  
│ ◈ .setsubject  
│ ◈ .tagall  
│ ◈ .hidetag  
│ ◈ .unlock  
│ ◈ .lock  
│ ◈ .join  
│ ◈ .leave  
│ ◈ .invite  
│ ◈ .tagadmin  
╰─────────────────────╯  

📊 *Total GROUP Commands:* 19  

> 🔮 *Powered by 『𝙒𝘼・𝙃𝙄𝙎・𝙑𝟭』 × hhhisoka*
`);
                    break;
                    case '5':               
              reply(`

╔═══════════════════════╗  
║ 👨‍💻 *『 𝗢𝗪𝗡𝗘𝗥 𝗖𝗢𝗠𝗠𝗔𝗡𝗗𝗦 』* 👨‍💻  
╚═══════════════════════╝  

╭───〔 🍿 𝘾𝙤𝙢𝙢𝙖𝙣𝙙𝙨 〕───╮  
│ ◈ .shutdown  
│ ◈ .alive  
│ ◈ .ping  
│ ◈ .clearchats  
│ ◈ .block  
│ ◈ .unblock  
│ ◈ .repo  
│ ◈ .owner  
│ ◈ .owner2  
╰─────────────────────╯  

📊 *Total OWNER Commands:* 9  

> 🔮 *Powered by 『𝙒𝘼・𝙃𝙄𝙎・𝙑𝟭』 × hhhisoka*
`);
                    break;
                    case '6':               
                        reply(`

╔═══════════════════════╗  
║ 🧰 *『 𝗧𝗢𝗢𝗟𝗦 𝗖𝗢𝗠𝗠𝗔𝗡𝗗𝗦 』* 🧰  
╚═══════════════════════╝  

╭───〔 🛠️ 𝘾𝙤𝙢𝙢𝙖𝙣𝙙𝙨 〕───╮  
│ ◈ .joke  
│ ◈ .flirt  
│ ◈ .truth  
│ ◈ .dare  
│ ◈ .fact  
│ ◈ .pickupline  
│ ◈ .character  
│ ◈ .repeat  
│ ◈ .spam  
│ ◈ .readmore  
╰─────────────────────╯  

📊 *Total TOOLS Commands:* 10  

> 🔮 *Powered by 『𝙒𝘼・𝙃𝙄𝙎・𝙑𝟭』 × hhhisoka*
`);
                        
                    break;
                    default:
                    
                        reply("Invalid option. Please select a valid option🔴");
                }

            }
        });

    } catch (e) {
        console.error(e);
        await conn.sendMessage(from, { react: { text: '❌', key: mek.key } })
        reply('An error occurred while processing your request.');
    }
});
