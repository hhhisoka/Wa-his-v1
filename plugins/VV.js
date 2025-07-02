const { cmd } = require('../command')
const { downloadMediaMessage } = require('../lib/msg')

cmd({
    pattern: "viewonce",
    react: "👁️",
    alias: ["vo", "antiviewonce"],
    desc: "Download view once messages",
    category: "download",
    filename: __filename
},
async(conn, mek, m, {from, quoted, reply}) => {
try {
    if (!m.quoted) return reply("*❌ Reply to a view once message!*")
    
    const quotedMsg = m.quoted
    
    // Vérification plus robuste pour view once
    if (!quotedMsg.viewOnce && !quotedMsg.message?.viewOnceMessage) {
        return reply("*❌ This is not a view once message!*")
    }
    
    let mediaMsg;
    if (quotedMsg.message?.viewOnceMessage) {
        mediaMsg = quotedMsg.message.viewOnceMessage.message
    } else {
        mediaMsg = quotedMsg.message
    }
    
    const messageType = Object.keys(mediaMsg)[0]
    
    if (messageType === 'imageMessage') {
        const buffer = await quotedMsg.download()
        
        await conn.sendMessage(from, {
            image: buffer,
            caption: `*👁️ View Once Image Saved*\n\n${mediaMsg.imageMessage.caption || ''}`
        }, { quoted: mek })
        
    } else if (messageType === 'videoMessage') {
        const buffer = await quotedMsg.download()
        
        await conn.sendMessage(from, {
            video: buffer,
            caption: `*👁️ View Once Video Saved*\n\n${mediaMsg.videoMessage.caption || ''}`
        }, { quoted: mek })
    } else {
        reply("*❌ Unsupported view once message type!*")
    }
    
} catch (e) {
    console.log("ViewOnce Error:", e)
    reply(`❌ *Error downloading view once: ${e.message}*`)
}
})
