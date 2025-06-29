

const { cmd } = require('../command');

cmd({
    pattern: "hack",
    desc: "Displays a dynamic and playful 'Hacking' message for fun.",
    category: "fun",
    react: "👨‍💻",
    filename: __filename
}, async (conn, mek, m, { from, reply }) => {
    try {
        const steps = [
            '💻 *HACK INITIATED...* 💻\n\n*Booting hacking tools...* 🛠️\n*Establishing remote connections...* 🌐',
            '```[███.........] 10%``` ⏳',
            '```[██████......] 30%``` ⏳',
            '```[██████████..] 60%``` ⏳',
            '```[████████████] 100%``` ✅',
            '',
            '🔒 *System Breach: Successful!* 🔓',
            '🚀 *Commands executed flawlessly!* 🎯',
            '',
            '*📡 Transmitting confidential data...* 📤',
            '*🕵️‍♂️ Maintaining stealth mode...* 🤫',
            '*🔧 Finalizing operations...* 🏁',
            '*🎁 Acquiring your secrets...*',
            '',
            '⚠️ *Disclaimer:* For entertainment purposes only.',
            '⚠️ *Remember:* Ethical hacking is the way.',
            '',
            '*👨‍💻 HACK COMPLETE — Your data is safe... for now.* 👩‍💻☣'
        ];
        
        for (const line of steps) {
            await conn.sendMessage(from, { text: line }, { quoted: mek });
            await new Promise(resolve => setTimeout(resolve, 1000));
        }
    } catch (error) {
        console.error(error);
        reply(`❌ *Error:* ${error.message}`);
    }
});