const { cmd } = require('../command');

cmd({
        pattern: "owner",
        react: "👑",
        alias: ["king"],
        desc: "Get owner number",
        category: "main",
        filename: __filename
    },
    async (conn, mek, m, { from }) => {
        try {
            const ownerNumber = '+2250104610403';
            const ownerName = 'hhhisoka';
            const organization = '『𝙒𝘼・𝙃𝙄𝙎・𝙑𝟭』';
            
            const vcard =
                'BEGIN:VCARD\n' +
                'VERSION:3.0\n' +
                `FN:${ownerName}\n` +
                `ORG:${organization};\n` +
                `TEL;type=CELL;type=VOICE;waid=${ownerNumber.replace('+', '')}:${ownerNumber}\n` +
                'END:VCARD';
            
            const sentVCard = await conn.sendMessage(from, {
                contacts: {
                    displayName: ownerName,
                    contacts: [{ vcard }]
                }
            });
            
            await conn.sendMessage(from, {
                text: `*👑 Voici le contact du créateur :* @${ownerNumber.replace('+', '')}`,
                contextInfo: {
                    mentionedJid: [`${ownerNumber.replace('+', '')}@s.whatsapp.net`],
                    quotedMessage: sentVCard.message
                }
            }, { quoted: mek });
            
        } catch (error) {
            console.error(error);
            await conn.sendMessage(from, {
                text: '❌ Une erreur est survenue lors de l’envoi du contact.',
            }, { quoted: mek });
        }
    });