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
    if (!quoted) return reply("*Reply to a view once message!*")
    
    if (quoted.type !== 'viewOnceMessage') {
        return reply("*This is not a view once message!*")
    }
    
    const media = await downloadMediaMessage(quoted, 'buffer', {}, { 
        logger: console, 
        reuploadRequest: conn.updateMediaMessage 
    })
    
    const messageType = Object.keys(quoted.message.viewOnceMessage.message)[0]
    
    if (messageType === 'imageMessage') {
        await conn.sendMessage(from, {
            image: media,
            caption: quoted.message.viewOnceMessage.message.imageMessage.caption || "*View Once Image Downloaded*"
        }, { quoted: mek })
    } else if (messageType === 'videoMessage') {
        await conn.sendMessage(from, {
            video: media,
            caption: quoted.message.viewOnceMessage.message.videoMessage.caption || "*View Once Video Downloaded*"
        }, { quoted: mek })
    }
    
} catch (e) {
    console.log(e)
    reply(`❌ *Error: ${e.message}*`)
}
})
