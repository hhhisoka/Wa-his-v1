/**
 * Copyright (C) 2025.
 * Licensed under the GPL-3.0 License;
 * Do not sell this script.
 * @project_name : FX-Bot Rank System
 * @author : hhhisoka
 * @description : Stylish XP rank system for WhatsApp bot.
 * @version 3.0.0
 **/

const { cmd } = require('../command');

// Simulated in-memory storage for user levels
const userLevels = {};

// Function to calculate level based on XP
const calculateLevel = (xp) => Math.floor(0.1 * Math.sqrt(xp));

cmd({
    pattern: "rank",
    desc: "Check the level of a user.",
    react: "📊",
    category: "utility",
    use: ".rank [@mention or reply]",
    filename: __filename,
}, async (conn, mek, m, { reply, isGroup, mentionedJid }) => {
    try {
        let target;

        if (mentionedJid?.length > 0) {
            target = mentionedJid[0];
        } else if (m.quoted && m.quoted.sender) {
            target = m.quoted.sender;
        } else {
            target = m.sender;
        }

        if (!target) {
            return reply("🧩 Mentionne un joueur ou réponds à un message pour voir son rang.");
        }

        if (!userLevels[target]) {
            userLevels[target] = { experience: 0, messages: 0 };
        }

        const userData = userLevels[target];
        userData.messages += 1;
        userData.experience += Math.floor(Math.random() * 10) + 5;

        const level = calculateLevel(userData.experience);
        const nextLevelXP = Math.pow((level + 1) / 0.1, 2);
        const currentLevelXP = Math.pow(level / 0.1, 2);
        const progressPercent = Math.floor(((userData.experience - currentLevelXP) / (nextLevelXP - currentLevelXP)) * 100);
        const progressBar = "🌕".repeat(progressPercent / 10) + "🌑".repeat(10 - progressPercent / 10);

        const levelImageURL = "https://files.catbox.moe/yfeca5.jpg";

        const caption = `
🧬 *『 𝙋𝙍𝙊𝙁𝙄𝙇 𝘿𝙀 𝙍𝘼𝙉𝙂 』*

👤 *Utilisateur* : @${target.split("@")[0]}
📈 *Niveau* : ${level}
📊 *Progression* : ${progressPercent}%
${progressBar}

📨 *Messages envoyés* : ${userData.messages}
✨ *XP total* : ${userData.experience}

> ⚡ _『𝙒𝘼・𝙃𝙄𝙎・𝙑𝟭』 × 𝙝𝙝𝙝𝙞𝙨𝙤𝙠𝙖_
        `;

        await conn.sendMessage(
            m.chat,
            { image: { url: levelImageURL }, caption: caption.trim(), mentions: [target] },
            { quoted: mek }
        );

    } catch (error) {
        console.error("Error in rank command:", error);
        reply("❌ Une erreur est survenue en calculant le rang.");
    }
});