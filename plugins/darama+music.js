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

const {cmd , commands} = require('../command')
const fg = require('api-dylux')
const yts = require('yt-search')
cmd({
    pattern: "play2",
    desc: "To download songs.",
    react: "🃏",
    category: "download",
    filename: __filename
},
async(conn, mek, m,{from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
try{
if(!q) return reply("Please give me a url or title")  
const search = await yts(q)
const data = search.videos[0];
const url = data.url
    
    
let desc = `
*🎭 𝙃𝙄𝙎𝙊𝙆𝘼'𝙎 𝙋𝙄𝘾𝙆 — 𝙈𝙐𝙎𝙄𝘾 𝘿𝙊𝙒𝙉𝙇𝙊𝘼𝘿 🎭*

🔎 *A delicious sound has been found...*  

╭─❖
│ 🎵 *Title:* ${data.title}  
│ ⏳ *Duration:* ${data.timestamp}  
│ 👁️ *Views:* ${data.views}  
│ 🗓️ *Uploaded:* ${data.ago}  
│ 🔗 *Link:* ${data.url}  
╰─────────────★

🎧 *Let the melody play... and maybe twist your soul a little.*  

> _"Music is just another game... and I do love to play." – 𝙃𝙞𝙨𝙤𝙠𝙖_

╰╴🎩 *Brought to you by 『𝙒𝘼・𝙃𝙄𝙎・𝙑𝟭』... enjoy the thrill.* 
`

await conn.sendMessage(from,{image:{url: data.thumbnail},caption:desc},{quoted:mek});

//download audio

let down = await fg.yta(url)
let downloadUrl = down.dl_url

//send audio message
await conn.sendMessage(from,{audio: {url:downloadUrl},mimetype:"audio/mpeg"},{quoted:mek})
await conn.sendMessage(from,{document: {url:downloadUrl},mimetype:"audio/mpeg",fileName:data.title + ".mp3",caption:"*© Powered by Your Botname*"},{quoted:mek})

}catch(e){
console.log(e)
  reply(`_Hi ${pushname} retry later_`)
}
})

//====================video_dl=======================

cmd({
    pattern: "darama",
    alias: ["video2"],
    desc: "To download videos.",
    react: "🎥",
    category: "download",
    filename: __filename
},
async(conn, mek, m,{from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
try{
if(!q) return reply("Please give me a url or title")  
const search = await yts(q)
const data = search.videos[0];
const url = data.url
    
    
let desc = `
*🎭 𝙃𝙄𝙎𝙊𝙆𝘼'𝙎 𝙁𝙄𝙇𝙀𝙎 — 𝙑𝙄𝘿𝙀𝙊 𝘿𝙊𝙒𝙉𝙇𝙊𝘼𝘿 🎭*

🎥 *A twisted gem has been unearthed...*  

╭─❖
│ 🎞️ *Title:* ${data.title}  
│ ⏳ *Duration:* ${data.timestamp}  
│ 👁️ *Views:* ${data.views}  
│ 📅 *Uploaded:* ${data.ago}  
│ 🔗 *Link:* ${data.url}  
╰─────────────★

🎬 *Sit back, press play… and let it seduce your senses.*  

> _"Every frame... a game. Every second... a trap." – 𝙃𝙞𝙨𝙤𝙠𝙖_

╰╴🎩 *© Powered by your 『𝙒𝘼・𝙃𝙄𝙎・𝙑𝟭』... entertainment with a grin.* 
`

await conn.sendMessage(from,{image:{url: data.thumbnail},caption:desc},{quoted:mek});

//download video

let down = await fg.ytv(url)
let downloadUrl = down.dl_url

//send video message
await conn.sendMessage(from,{video: {url:downloadUrl},mimetype:"video/mp4"},{quoted:mek})
await conn.sendMessage(from,{document: {url:downloadUrl},mimetype:"video/mp4",fileName:data.title + ".mp4",caption:"*© Powered by your Botname*"},{quoted:mek})

}catch(e){
console.log(e)
  reply(`_Hi ${pushname} retry later_`)
}
})
//
