const { cmd } = require('../command')
const { getMessageType, isViewOnce, extractViewOnceContent, formatError } = require('../lib/functions')

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
    
    if (!isViewOnce(quotedMsg.message)) {
        return reply("*❌ This is not a view once message!*")
    }
    
    const viewOnceContent = extractViewOnceContent(quotedMsg.message)
    
    if (!viewOnceContent) {
        return reply("*❌ Could not extract view once content!*")
    }
    
    if (viewOnceContent.type === 'imageMessage') {
        const buffer = await quotedMsg.download()
        
        await conn.sendMessage(from, {
            image: buffer,
            caption: `*👁️ View Once Image Saved*\n\n${viewOnceContent.caption}`
        }, { quoted: mek })
        
    } else if (viewOnceContent.type === 'videoMessage') {
        const buffer = await quotedMsg.download()
        
        await conn.sendMessage(from, {
            video: buffer,
            caption: `*👁️ View Once Video Saved*\n\n${viewOnceContent.caption}`
        }, { quoted: mek })
    } else {
        reply(`*❌ Unsupported view once type: ${viewOnceContent.type}*`)
    }
    
} catch (e) {
    console.log("ViewOnce Error:", e)
    reply(`❌ *Error: ${formatError(e)}*`)
}
})
