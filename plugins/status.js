const { cmd } = require('../command')
const { downloadMediaMessage } = require('../lib/msg')

cmd({
    pattern: "getstatus",
    react: "📱",
    alias: ["status", "downloadstatus"],
    desc: "Download status updates",
    category: "download",
    filename: __filename
},
async(conn, mek, m, {from, quoted, reply}) => {
try {
    if (!quoted) return reply("*Reply to a status message!*")
    
    // Vérifier si c'est un message de status
    if (!mek.key.remoteJid.includes('status@broadcast')) {
        return reply("*This is not a status message!*")
    }
    
    const messageType = Object.keys(quoted.message)[0]
    
    if (messageType === 'imageMessage') {
        const media = await downloadMediaMessage(quoted, 'buffer')
        await conn.sendMessage(from, {
            image: media,
            caption: quoted.message.imageMessage.caption || "*Status Image Downloaded*"
        }, { quoted: mek })
    } else if (messageType === 'videoMessage') {
        const media = await downloadMediaMessage(quoted, 'buffer')
        await conn.sendMessage(from, {
            video: media,
            caption: quoted.message.videoMessage.caption || "*Status Video Downloaded*"
        }, { quoted: mek })
    } else if (messageType === 'extendedTextMessage') {
        reply(`*Status Text:*\n${quoted.message.extendedTextMessage.text}`)
    }
    
} catch (e) {
    console.log(e)
    reply(`❌ *Error: ${e.message}*`)
}
})
