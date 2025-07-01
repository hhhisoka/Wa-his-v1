
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

const { cmd } = require('../command');

// Collection de plus de 50 polices fancy
const fancyFonts = {
    1: { name: "𝐁𝐨𝐥𝐝", convert: (text) => text.replace(/[a-zA-Z0-9]/g, char => String.fromCharCode(char.charCodeAt(0) + (char >= 'A' && char <= 'Z' ? 0x1D5D4 - 0x41 : char >= 'a' && char <= 'z' ? 0x1D5EE - 0x61 : char >= '0' && char <= '9' ? 0x1D7CE - 0x30 : 0))) },
    2: { name: "𝑰𝒕𝒂𝒍𝒊𝒄", convert: (text) => text.replace(/[a-zA-Z]/g, char => String.fromCharCode(char.charCodeAt(0) + (char >= 'A' && char <= 'Z' ? 0x1D608 - 0x41 : 0x1D622 - 0x61))) },
    3: { name: "𝗕𝗼𝗹𝗱 𝗦𝗮𝗻𝘀", convert: (text) => text.replace(/[a-zA-Z0-9]/g, char => String.fromCharCode(char.charCodeAt(0) + (char >= 'A' && char <= 'Z' ? 0x1D5A0 - 0x41 : char >= 'a' && char <= 'z' ? 0x1D5BA - 0x61 : char >= '0' && char <= '9' ? 0x1D7CE - 0x30 : 0))) },
    4: { name: "𝘐𝘵𝘢𝘭𝘪𝘤 𝘚𝘢𝘯𝘴", convert: (text) => text.replace(/[a-zA-Z]/g, char => String.fromCharCode(char.charCodeAt(0) + (char >= 'A' && char <= 'Z' ? 0x1D63C - 0x41 : 0x1D656 - 0x61))) },
    5: { name: "𝕯𝖔𝖚𝖇𝖑𝖊 𝕾𝖙𝖗𝖚𝖈𝖐", convert: (text) => text.replace(/[a-zA-Z]/g, char => String.fromCharCode(char.charCodeAt(0) + (char >= 'A' && char <= 'Z' ? 0x1D56C - 0x41 : 0x1D586 - 0x61))) },
    6: { name: "𝚂𝚌𝚛𝚒𝚙𝚝", convert: (text) => text.replace(/[a-zA-Z]/g, char => String.fromCharCode(char.charCodeAt(0) + (char >= 'A' && char <= 'Z' ? 0x1D49C - 0x41 : 0x1D4B6 - 0x61))) },
    7: { name: "𝔾𝕠𝕥𝕙𝕚𝕔", convert: (text) => text.replace(/[a-zA-Z]/g, char => String.fromCharCode(char.charCodeAt(0) + (char >= 'A' && char <= 'Z' ? 0x1D504 - 0x41 : 0x1D51E - 0x61))) },
    8: { name: "𝓒𝓾𝓻𝓼𝓲𝓿𝓮", convert: (text) => text.replace(/[a-zA-Z]/g, char => String.fromCharCode(char.charCodeAt(0) + (char >= 'A' && char <= 'Z' ? 0x1D4D0 - 0x41 : 0x1D4EA - 0x61))) },
    9: { name: "Small Caps", convert: (text) => text.replace(/[a-z]/g, char => String.fromCharCode(char.charCodeAt(0) + 0x1D00 - 0x61)) },
    10: { name: "Ⓒⓘⓡⓒⓛⓔⓓ", convert: (text) => text.replace(/[a-zA-Z0-9]/g, char => char >= 'A' && char <= 'Z' ? String.fromCharCode(0x24B6 + char.charCodeAt(0) - 0x41) : char >= 'a' && char <= 'z' ? String.fromCharCode(0x24D0 + char.charCodeAt(0) - 0x61) : char >= '0' && char <= '9' ? String.fromCharCode(0x2460 + char.charCodeAt(0) - 0x30 - 1) : char) },
    11: { name: "🅂🅀🅄🄰🅁🄴🄳", convert: (text) => text.replace(/[a-zA-Z]/g, char => char >= 'A' && char <= 'Z' ? String.fromCharCode(0x1F170 + char.charCodeAt(0) - 0x41) : char >= 'a' && char <= 'z' ? String.fromCharCode(0x1F170 + char.charCodeAt(0) - 0x61) : char) },
    12: { name: "🅽🅴🅶🅰🆃🅸🆅🅴", convert: (text) => text.replace(/[a-zA-Z]/g, char => char >= 'A' && char <= 'Z' ? String.fromCharCode(0x1F1E6 + char.charCodeAt(0) - 0x41) : char >= 'a' && char <= 'z' ? String.fromCharCode(0x1F1E6 + char.charCodeAt(0) - 0x61) : char) },
    13: { name: "Ｆｕｌｌｗｉｄｔｈ", convert: (text) => text.replace(/[a-zA-Z0-9 ]/g, char => String.fromCharCode(char.charCodeAt(0) + 0xFF00 - 0x20)) },
    14: { name: "ǝpᴉsdn uʍop", convert: (text) => { const flipped = {'a':'ɐ','b':'q','c':'ɔ','d':'p','e':'ǝ','f':'ɟ','g':'ƃ','h':'ɥ','i':'ᴉ','j':'ɾ','k':'ʞ','l':'l','m':'ɯ','n':'u','o':'o','p':'d','q':'b','r':'ɹ','s':'s','t':'ʇ','u':'n','v':'ʌ','w':'ʍ','x':'x','y':'ʎ','z':'z','A':'∀','B':'B','C':'Ɔ','D':'D','E':'Ǝ','F':'Ⅎ','G':'פ','H':'H','I':'I','J':'ſ','K':'K','L':'˥','M':'W','N':'N','O':'O','P':'Ԁ','Q':'Q','R':'R','S':'S','T':'┴','U':'∩','V':'Λ','W':'M','X':'X','Y':'⅄','Z':'Z','0':'0','1':'Ɩ','2':'ᄅ','3':'Ɛ','4':'ㄣ','5':'ϛ','6':'9','7':'ㄥ','8':'8','9':'6','?':'¿','!':'¡','.':',',','':'˙','"':'„',"'":'‛','&':'⅋','_':'‾'}; return text.split('').map(char => flipped[char] || char).reverse().join(''); } },
    15: { name: "ᴄᴀᴘɪᴛᴀʟ sᴍᴀʟʟ", convert: (text) => { const small = {'A':'ᴀ','B':'ʙ','C':'ᴄ','D':'ᴅ','E':'ᴇ','F':'ғ','G':'ɢ','H':'ʜ','I':'ɪ','J':'ᴊ','K':'ᴋ','L':'ʟ','M':'ᴍ','N':'ɴ','O':'ᴏ','P':'ᴘ','Q':'Q','R':'ʀ','S':'s','T':'ᴛ','U':'ᴜ','V':'ᴠ','W':'ᴡ','X':'x','Y':'ʏ','Z':'ᴢ'}; return text.replace(/[A-Z]/g, char => small[char] || char.toLowerCase()); } },
    16: { name: "ƬӉƖƧ ƖƧ ҞӦƠƬ", convert: (text) => { const weird = {'a':'α','b':'в','c':'¢','d':'∂','e':'є','f':'ƒ','g':'g','h':'н','i':'ι','j':'ј','k':'к','l':'ℓ','m':'м','n':'η','o':'σ','p':'ρ','q':'q','r':'я','s':'ѕ','t':'т','u':'υ','v':'ν','w':'ω','x':'χ','y':'у','z':'z','A':'Α','B':'Β','C':'¢','D':'∂','E':'Є','F':'Ƒ','G':'G','H':'Η','I':'Ι','J':'J','K':'Κ','L':'Ł','M':'Μ','N':'Η','O':'Ø','P':'Ρ','Q':'Q','R':'Я','S':'Ѕ','T':'Т','U':'Υ','V':'V','W':'Ω','X':'Χ','Y':'Ƴ','Z':'Z'}; return text.replace(/[a-zA-Z]/g, char => weird[char] || char); } },
    17: { name: "░B░l░o░c░k░y░", convert: (text) => text.split('').join('░') },
    18: { name: "▀█▀ █▄█ █▀█", convert: (text) => { const blocks = {'a':'▄▀█','b':'█▄▄','c':'▄▀█','d':'█▄█','e':'█▀▀','f':'█▀▀','g':'▄▀█','h':'█▄█','i':'█','j':'  █','k':'█ █','l':'█  ','m':'█▄█','n':'█▄█','o':'▄▀█','p':'█▀▀','q':'▄▀█','r':'█▀▄','s':'▄▀█','t':'▀█▀','u':'█▄█','v':'█ █','w':'█ █','x':'▀▄▀','y':'▀▄▀','z':'▀▀█','A':'▄▀█','B':'█▄▄','C':'▄▀█','D':'█▄█','E':'█▀▀','F':'█▀▀','G':'▄▀█','H':'█▄█','I':'█','J':'  █','K':'█ █','L':'█  ','M':'█▄█','N':'█▄█','O':'▄▀█','P':'█▀▀','Q':'▄▀█','R':'█▀▄','S':'▄▀█','T':'▀█▀','U':'█▄█','V':'█ █','W':'█ █','X':'▀▄▀','Y':'▀▄▀','Z':'▀▀█'}; return text.replace(/[a-zA-Z]/g, char => blocks[char] || char); } },
    19: { name: "♥ Decorated ♥", convert: (text) => `♥ ${text} ♥` },
    20: { name: "★ Starred ★", convert: (text) => `★ ${text} ★` },
    21: { name: "♫♪ Musical ♪♫", convert: (text) => `♫♪ ${text} ♪♫` },
    22: { name: "❤️‍🔥 Fire Hearts ❤️‍🔥", convert: (text) => `❤️‍🔥 ${text} ❤️‍🔥` },
    23: { name: "🔥 Flaming 🔥", convert: (text) => `🔥 ${text} 🔥` },
    24: { name: "💎 Diamond 💎", convert: (text) => `💎 ${text} 💎` },
    25: { name: "⚡ Electric ⚡", convert: (text) => `⚡ ${text} ⚡` },
    26: { name: "🌟 Starry 🌟", convert: (text) => `🌟 ${text} 🌟` },
    27: { name: "🎭 Dramatic 🎭", convert: (text) => `🎭 ${text} 🎭` },
    28: { name: "🎨 Artistic 🎨", convert: (text) => `🎨 ${text} 🎨` },
    29: { name: "🔮 Mystical 🔮", convert: (text) => `🔮 ${text} 🔮` },
    30: { name: "👑 Royal 👑", convert: (text) => `👑 ${text} 👑` },
    31: { name: "🗡️ Warrior 🗡️", convert: (text) => `🗡️ ${text} 🗡️` },
    32: { name: "🌸 Sakura 🌸", convert: (text) => `🌸 ${text} 🌸` },
    33: { name: "💝 Gift 💝", convert: (text) => `💝 ${text} 💝` },
    34: { name: "🎯 Target 🎯", convert: (text) => `🎯 ${text} 🎯` },
    35: { name: "🎪 Circus 🎪", convert: (text) => `🎪 ${text} 🎪` },
    36: { name: "🎰 Jackpot 🎰", convert: (text) => `🎰 ${text} 🎰` },
    37: { name: "🎮 Gaming 🎮", convert: (text) => `🎮 ${text} 🎮` },
    38: { name: "🚀 Rocket 🚀", convert: (text) => `🚀 ${text} 🚀` },
    39: { name: "🌈 Rainbow 🌈", convert: (text) => `🌈 ${text} 🌈` },
    40: { name: "🎃 Spooky 🎃", convert: (text) => `🎃 ${text} 🎃` },
    41: { name: "🦄 Unicorn 🦄", convert: (text) => `🦄 ${text} 🦄` },
    42: { name: "🐉 Dragon 🐉", convert: (text) => `🐉 ${text} 🐉` },
    43: { name: "🦋 Butterfly 🦋", convert: (text) => `🦋 ${text} 🦋` },
    44: { name: "🌙 Lunar 🌙", convert: (text) => `🌙 ${text} 🌙` },
    45: { name: "☄️ Comet ☄️", convert: (text) => `☄️ ${text} ☄️` },
    46: { name: "🌊 Ocean 🌊", convert: (text) => `🌊 ${text} 🌊` },
    47: { name: "🏔️ Mountain 🏔️", convert: (text) => `🏔️ ${text} 🏔️` },
    48: { name: "🎼 Musical Notes 🎼", convert: (text) => `🎼 ${text} 🎼` },
    49: { name: "🎺 Jazz 🎺", convert: (text) => `🎺 ${text} 🎺` },
    50: { name: "🎸 Rock 🎸", convert: (text) => `🎸 ${text} 🎸` },
    51: { name: "🎻 Classical 🎻", convert: (text) => `🎻 ${text} 🎻` },
    52: { name: "🥁 Drums 🥁", convert: (text) => `🥁 ${text} 🥁` },
    53: { name: "🎤 Microphone 🎤", convert: (text) => `🎤 ${text} 🎤` },
    54: { name: "🎬 Cinema 🎬", convert: (text) => `🎬 ${text} 🎬` },
    55: { name: "📸 Photo 📸", convert: (text) => `📸 ${text} 📸` },
    56: { name: "🎊 Party 🎊", convert: (text) => `🎊 ${text} 🎊` },
    57: { name: "🎉 Celebration 🎉", convert: (text) => `🎉 ${text} 🎉` },
    58: { name: "🎀 Ribbon 🎀", convert: (text) => `🎀 ${text} 🎀` },
    59: { name: "🌺 Tropical 🌺", convert: (text) => `🌺 ${text} 🌺` },
    60: { name: "🔥💎 Fire Diamond 💎🔥", convert: (text) => `🔥💎 ${text} 💎🔥` }
};

cmd({
    pattern: "fancy",
    alias: ["font", "style"],
    desc: "🎨 Transform your text with 60+ fancy fonts and styles",
    react: "🎨",
    category: "fun",
    filename: __filename
}, async (conn, mek, m, { from, quoted, body, isCmd, command, args, q, reply, pushname }) => {
    try {
        if (!q) {
            let menuText = `
╭─❖ 『 🎨 𝙁𝘼𝙉𝘾𝙔 𝙁𝙊𝙉𝙏 𝙈𝙀𝙉𝙐 』 ❖─╮

🌟 *Salut ${pushname}! Voici 60+ styles disponibles :*

╭───〔 ✨ 𝗦𝘁𝘆𝗹𝗲𝘀 𝗠𝗮𝗷𝗲𝘀𝘁𝘂𝗲𝘂𝘅 〕───╮
│ 1. 𝐁𝐨𝐥𝐝 (Gras)
│ 2. 𝑰𝒕𝒂𝒍𝒊𝒄 (Italique)
│ 3. 𝗕𝗼𝗹𝗱 𝗦𝗮𝗻𝘀 (Gras Sans)
│ 4. 𝘐𝘵𝘢𝘭𝘪𝘤 𝘚𝘢𝘯𝘴 (Italique Sans)
│ 5. 𝕯𝖔𝖚𝖇𝖑𝖊 𝕾𝖙𝖗𝖚𝖈𝖐 (Double Strike)
│ 6. 𝚂𝚌𝚛𝚒𝚙𝚝 (Script)
│ 7. 𝔾𝕠𝕥𝕙𝕚𝕔 (Gothique)
│ 8. 𝓒𝓾𝓻𝓼𝓲𝓿𝓮 (Cursive)
│ 9. Small Caps (Petites Majuscules)
│ 10. Ⓒⓘⓡⓒⓛⓔⓓ (Encerclé)
╰─────────────────────────╯

╭───〔 🎭 𝗦𝘁𝘆𝗹𝗲𝘀 𝗨𝗻𝗶𝗾𝘂𝗲𝘀 〕───╮
│ 11. 🅂🅀🅄🄰🅁🄴🄳 (Carré)
│ 12. 🅽🅴🅶🅰🆃🅸🆅🅴 (Négatif)
│ 13. Ｆｕｌｌｗｉｄｔｈ (Pleine largeur)
│ 14. ǝpᴉsdn uʍop (À l'envers)
│ 15. ᴄᴀᴘɪᴛᴀʟ sᴍᴀʟʟ (Capital Small)
│ 16. ƬӉƖƧ ƖƧ ҞӦƠƬ (Kool)
│ 17. ░B░l░o░c░k░y░ (Bloqué)
│ 18. ▀█▀ █▄█ █▀█ (ASCII Art)
╰─────────────────────────╯

╭───〔 💎 𝗦𝘁𝘆𝗹𝗲𝘀 𝗗é𝗰𝗼𝗿𝗮𝘁𝗶𝗳𝘀 〕───╮
│ 19. ♥ Decorated ♥
│ 20. ★ Starred ★
│ 21. ♫♪ Musical ♪♫
│ 22. ❤️‍🔥 Fire Hearts ❤️‍🔥
│ 23. 🔥 Flaming 🔥
│ 24. 💎 Diamond 💎
│ 25. ⚡ Electric ⚡
│ 26. 🌟 Starry 🌟
│ 27. 🎭 Dramatic 🎭
│ 28. 🎨 Artistic 🎨
│ 29. 🔮 Mystical 🔮
│ 30. 👑 Royal 👑
╰─────────────────────────╯

╭───〔 🎪 𝗦𝘁𝘆𝗹𝗲𝘀 𝗧𝗵é𝗺𝗮𝘁𝗶𝗾𝘂𝗲𝘀 〕───╮
│ 31. 🗡️ Warrior 🗡️
│ 32. 🌸 Sakura 🌸
│ 33. 💝 Gift 💝
│ 34. 🎯 Target 🎯
│ 35. 🎪 Circus 🎪
│ 36. 🎰 Jackpot 🎰
│ 37. 🎮 Gaming 🎮
│ 38. 🚀 Rocket 🚀
│ 39. 🌈 Rainbow 🌈
│ 40. 🎃 Spooky 🎃
│ 41. 🦄 Unicorn 🦄
│ 42. 🐉 Dragon 🐉
│ 43. 🦋 Butterfly 🦋
│ 44. 🌙 Lunar 🌙
│ 45. ☄️ Comet ☄️
╰─────────────────────────╯

╭───〔 🎵 𝗦𝘁𝘆𝗹𝗲𝘀 𝗠𝘂𝘀𝗶𝗰𝗮𝘂𝘅 〕───╮
│ 46. 🌊 Ocean 🌊
│ 47. 🏔️ Mountain 🏔️
│ 48. 🎼 Musical Notes 🎼
│ 49. 🎺 Jazz 🎺
│ 50. 🎸 Rock 🎸
│ 51. 🎻 Classical 🎻
│ 52. 🥁 Drums 🥁
│ 53. 🎤 Microphone 🎤
│ 54. 🎬 Cinema 🎬
│ 55. 📸 Photo 📸
│ 56. 🎊 Party 🎊
│ 57. 🎉 Celebration 🎉
│ 58. 🎀 Ribbon 🎀
│ 59. 🌺 Tropical 🌺
│ 60. 🔥💎 Fire Diamond 💎🔥
╰─────────────────────────╯

📝 *Utilisation :*
• \`.fancy <numéro> <texte>\`
• \`.fancy 1 Hello World\`
• \`.fancy 23 Mon texte\`

> 🔮 *Powered by 『𝙒𝘼・𝙃𝙄𝙎・𝙑𝟭』 × hhhisoka*
`;
            return reply(menuText);
        }

        const args = q.split(' ');
        const styleNum = parseInt(args[0]);
        const textToStyle = args.slice(1).join(' ');

        if (!textToStyle) {
            return reply("❌ *Erreur :* Veuillez fournir un texte à styliser.\n\n📝 *Exemple :* `.fancy 1 Hello World`");
        }

        if (!styleNum || styleNum < 1 || styleNum > 60) {
            return reply(`❌ *Erreur :* Numéro de style invalide. Utilisez un numéro entre 1 et 60.\n\n📋 *Tapez* \`.fancy\` *pour voir tous les styles disponibles.*`);
        }

        const selectedFont = fancyFonts[styleNum];
        if (!selectedFont) {
            return reply("❌ *Erreur :* Style non trouvé.");
        }

        const styledText = selectedFont.convert(textToStyle);
        
        const result = `
╭─❖ 『 🎨 𝙁𝘼𝙉𝘾𝙔 𝙏𝙀𝙓𝙏 』 ❖─╮

✨ *Style :* ${selectedFont.name}
📝 *Original :* ${textToStyle}
🎭 *Résultat :* 

${styledText}

╰─────────────────────────╯

> 🔮 *Powered by 『𝙒𝘼・𝙃𝙄𝙎・𝙑𝟭』 × hhhisoka*
`;

        await conn.sendMessage(from, { text: result }, { quoted: mek });

    } catch (e) {
        console.error('Erreur dans fancy command:', e);
        reply(`❌ *Erreur :* ${e.message || 'Une erreur inattendue s\'est produite.'}`);
    }
});

// Commande pour tous les styles en une fois
cmd({
    pattern: "fancyall",
    alias: ["fontall", "styleall"],
    desc: "🎨 Shows your text in all 60+ fancy styles at once",
    react: "🌟",
    category: "fun",
    filename: __filename
}, async (conn, mek, m, { from, quoted, body, isCmd, command, args, q, reply, pushname }) => {
    try {
        if (!q) {
            return reply(`❌ *Erreur :* Veuillez fournir un texte.\n\n📝 *Exemple :* \`.fancyall Hello World\``);
        }

        let allStyles = `
╭─❖ 『 🎨 𝙏𝙊𝙐𝙎 𝙇𝙀𝙎 𝙎𝙏𝙔𝙇𝙀𝙎 』 ❖─╮

🌟 *Texte original :* ${q}

`;

        // Génère tous les styles
        for (let i = 1; i <= 60; i++) {
            const font = fancyFonts[i];
            if (font) {
                const styled = font.convert(q);
                allStyles += `${i}. ${font.name}\n${styled}\n\n`;
            }
        }

        allStyles += `
╰─────────────────────────╯

> 🔮 *Powered by 『𝙒𝘼・𝙃𝙄𝙎・𝙑𝟭』 × hhhisoka*
`;

        await conn.sendMessage(from, { text: allStyles }, { quoted: mek });

    } catch (e) {
        console.error('Erreur dans fancyall command:', e);
        reply(`❌ *Erreur :* ${e.message || 'Une erreur inattendue s\'est produite.'}`);
    }
});
