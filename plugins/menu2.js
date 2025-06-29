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




const config = require('../config')
const {cmd , commands} = require('../command')
cmd({
    pattern: "menu2",
    react: "👾",
    desc: "get cmd list",
    category: "main",
    filename: __filename
},
async(conn, mek, m,{from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
try{
let menu = {
main: '',
download: '',
group: '',
owner: '',
convert: '',
search: ''
};

for (let i = 0; i < commands.length; i++) {
if (commands[i].pattern && !commands[i].dontAddCommandList) {
menu[commands[i].category] += `*┋* ${commands[i].pattern}\n`;
 }
}

let madeMenu = `
┏━━━━━❰ 『𝙒𝘼・𝙃𝙄𝙎・𝙑𝟭』 𝙎𝙝𝙞𝙣𝙞𝙜𝙖𝙢𝙞 ❱━━━━━┓

   𝙃𝙚𝙮, 𝙩𝙧𝙖𝙫𝙚𝙡𝙚𝙧 *${pushname}*...  
   𝙏𝙝𝙚 𝙬𝙤𝙧𝙡𝙙 𝙤𝙛 𝙘𝙤𝙢𝙢𝙖𝙣𝙙𝙨 𝙞𝙨 𝙮𝙤𝙪𝙧𝙨 𝙩𝙤 𝙨𝙥𝙞𝙣.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

【 ✦ 】 𝙏𝙝𝙚 𝙎𝙝𝙖𝙙𝙤𝙬𝙨 𝙤𝙛 𝘿𝙤𝙬𝙣𝙡𝙤𝙖𝙙
${menu.download}

【 ✧ 】 𝙏𝙝𝙚 𝙍𝙖𝙣𝙠𝙨 𝙤𝙛 𝙈𝙖𝙞𝙣
${menu.main}

【 ✦ 】 𝙏𝙝𝙚 𝙂𝙖𝙩𝙚𝙨 𝙤𝙛 𝙂𝙧𝙤𝙪𝙥
${menu.group}

【 ✧ 】 𝙏𝙝𝙚 𝙈𝙖𝙨𝙩𝙚𝙧’𝙨 𝙆𝙚𝙮𝙨
${menu.owner}

【 ✦ 】 𝙏𝙝𝙚 𝙎𝙥𝙚𝙡𝙡𝙨 𝙤𝙛 𝘾𝙤𝙣𝙫𝙚𝙧𝙩
${menu.convert}

【 ✧ 】 𝙏𝙝𝙚 𝙎𝙚𝙚𝙠𝙚𝙧’𝙨 𝙇𝙚𝙣𝙨
${menu.search}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

☯ *Created by hhhisoka — The Phantom Coder* ☯

╰━═☆ 『𝙒𝘼・𝙃𝙄𝙎・𝙑𝟭』 𝙍𝙚𝙞𝙣𝙨 𝙞𝙣 𝙩𝙝𝙚 𝙎𝙝𝙖𝙙𝙤𝙬☆═━╯
`;

await conn.sendMessage(from,{image:{url:config.MENU_IMG},caption:madeMenu},{quoted:mek})

}catch(e){
console.log(e)
reply(`${e}`)
}
})
