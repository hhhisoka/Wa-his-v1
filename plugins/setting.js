

const { cmd } = require('../command');
const config = require('../config');

cmd({
    pattern: "settings",
    react: "🎛️",
    alias: ["setting", "env"],
    desc: "Get bot's settings list.",
    category: "main",
    use: '.settings',
    filename: __filename
}, async (conn, mek, m, {
    from,
    quoted,
    body,
    isCmd,
    args,
    q,
    isGroup,
    sender,
    senderNumber,
    botNumber2,
    botNumber,
    pushname,
    isMe,
    isOwner,
    groupMetadata,
    groupName,
    participants,
    groupAdmins,
    isBotAdmins,
    isAdmins,
    reply
}) => {
    try {
        // Function to return ✅ or ❌ based on the boolean value, considering multiple formats
        const statusIcon = (status) => {
            return (status === true || status === 'true' || status === 1) ? "✅" : "❌";
        };

        // Create the settings message with the updated format
        let madeSetting = `
╭─❖ 『 ⚙️ 𝗦𝗘𝗧𝗧𝗜𝗡𝗚𝗦 𝗢𝗙 𝗕𝗢𝗧 』 ❖─╮
│
│ 🟢 Auto Read Status : ${statusIcon(config.AUTO_READ_STATUS)}
│ ⚙️ Mode            : *${config.MODE}*
│ 🎙️ Auto Voice      : ${statusIcon(config.AUTO_VOICE)}
│ 🖼️ Auto Sticker    : ${statusIcon(config.AUTO_STICKER)}
│ 💬 Auto Reply      : ${statusIcon(config.AUTO_REPLY)}
│ ✉️ Alive Message   : *${config.ALIVE_MSG}*
│ 🔗 Anti Link       : ${statusIcon(config.ANTI_LINK)}
│ 🚫 Anti Bad Words  : ${statusIcon(config.ANTI_BAD)}
│ ⌨️ Prefix          : *[ ${config.PREFIX} ]*
│ 🎥 Fake Recording  : ${statusIcon(config.FAKE_RECORDING)}
│ 😀 Auto React      : ${statusIcon(config.AUTO_REACT)}
│ ❤️ Heart React    : ${statusIcon(config.HEART_REACT)}
│ 👑 Owner React    : ${statusIcon(config.OWNER_REACT)}
│ 🤖 Bot Name       : *${config.BOT_NAME}*
│
╰─────────────────────────────╯

⚡ *Developed by hhhisoka* ⚡
`;

        // Send the settings message with the updated format
        await conn.sendMessage(from, {
            image: { url: config.ALIVE_IMG },
            caption: madeSetting
        }, { quoted: mek });

    } catch (e) {
        console.log(e);
        reply(`${e}`);
    }
});
