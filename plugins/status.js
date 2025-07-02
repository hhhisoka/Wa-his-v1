const { cmd } = require('../command')

cmd({
    pattern: "getstatus",
    react: "📱",
    alias: ["status", "savestatus"],
    desc: "Download status updates",
    category: "download",
    filename: __filename
},
async(conn, mek, m, {from, reply}) => {
try {
    if (!m.quoted) return reply("*❌ Reply to a status message!*")
    
    const quotedMsg = m.quoted
    
    // Vérification pour status
    if (!quotedMsg.key?.remoteJid?.includes('status@broadcast')) {
        return reply("*❌ This is not a status message!*")
    }
    
    const messageType = quotedMsg.mtype || Object.keys(quotedMsg.message || {})[0]
    
    if (messageType === 'imageMessage' || quotedMsg.imageMessage) {
        const buffer = await quotedMsg.download()
        
        await conn.sendMessage(from, {
            image: buffer,
            caption: `*📱 Status Image Saved*\n\n${quotedMsg.imageMessage?.caption || quotedMsg.caption || ''}`
        }, { quoted: mek })
        
    } else if (messageType === 'videoMessage' || quotedMsg.videoMessage) {
        const buffer = await quotedMsg.download()
        
        await conn.sendMessage(from, {
            video: buffer,
            caption: `*📱 Status Video Saved*\n\n${quotedMsg.videoMessage?.caption || quotedMsg.caption || ''}`
        }, { quoted: mek })
        
    } else if (messageType === 'conversation' || quotedMsg.text) {
        const statusText = quotedMsg.text || quotedMsg.conversation || quotedMsg.message?.conversation
        reply(`*📱 Status Text Saved:*\n\n${statusText}`)
        
    } else {
        reply(`*❌ Unsupported status type: ${messageType}*`)
    }
    
} catch (e) {
    console.log("Status Error:", e)
    reply(`❌ *Error downloading status: ${e.message}*`)
}
})
