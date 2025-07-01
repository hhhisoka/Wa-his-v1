
const { cmd } = require('../command');
const config = require('../config');
const fs = require('fs');

// Fonction pour mettre à jour une variable dans config.js
function updateConfigVariable(key, value) {
    try {
        const configPath = './config.js';
        let configContent = fs.readFileSync(configPath, 'utf8');
        
        // Pattern pour trouver la variable
        const pattern = new RegExp(`(${key}:\\s*process\\.env\\.${key}\\s*\\|\\|\\s*)(["'][^"']*["']|true|false)`, 'g');
        
        // Déterminer le type de valeur
        let formattedValue;
        if (value.toLowerCase() === 'true' || value.toLowerCase() === 'false') {
            formattedValue = `"${value}"`;
        } else if (!isNaN(value)) {
            formattedValue = `"${value}"`;
        } else {
            formattedValue = `"${value}"`;
        }
        
        // Remplacer la valeur
        configContent = configContent.replace(pattern, `$1${formattedValue}`);
        
        // Écrire le fichier modifié
        fs.writeFileSync(configPath, configContent);
        
        return true;
    } catch (error) {
        console.error('Erreur lors de la mise à jour:', error);
        return false;
    }
}

// Commande pour lister toutes les variables configurables
cmd({
    pattern: "configlist",
    react: "⚙️",
    alias: ["cfglist", "varlist"],
    desc: "Liste toutes les variables configurables",
    category: "owner",
    use: '.configlist',
    filename: __filename
}, async (conn, mek, m, {
    from, reply, isOwner
}) => {
    try {
        if (!isOwner) return reply("❌ Seul le propriétaire peut utiliser cette commande !");
        
        const configVars = `
╭─❖ 『 ⚙️ 𝗩𝗔𝗥𝗜𝗔𝗕𝗟𝗘𝗦 𝗖𝗢𝗡𝗙𝗜𝗚𝗨𝗥𝗔𝗕𝗟𝗘𝗦 』 ❖─╮
│
│ 🔧 **Variables Principales:**
│ • MODE (public/private/inbox/group)
│ • PREFIX (préfixe des commandes)
│ • BOT_NAME (nom du bot)
│ • ALIVE_MSG (message alive)
│
│ 🛠️ **Fonctionnalités Auto:**
│ • AUTO_READ_STATUS (true/false)
│ • AUTO_VOICE (true/false)
│ • AUTO_STICKER (true/false)
│ • AUTO_REPLY (true/false)
│ • AUTO_REACT (true/false)
│
│ 🛡️ **Sécurité:**
│ • ANTI_LINK (true/false)
│ • ANTI_BAD (true/false)
│
│ 🎭 **Interface:**
│ • FAKE_RECORDING (true/false)
│ • FAKE_TYPING (true/false)
│ • ALWAYS_ONLINE (true/false)
│ • HEART_REACT (true/false)
│ • OWNER_REACT (true/false)
│
│ 🖼️ **Médias:**
│ • ALIVE_IMG (URL d'image)
│ • MENU_IMG (URL d'image)
│
╰─────────────────────────────╯

📝 **Usage:** .setconfig [VARIABLE] [VALEUR]
📖 **Exemple:** .setconfig MODE public
`;

        await reply(configVars);
    } catch (e) {
        console.log(e);
        reply(`❌ Erreur: ${e}`);
    }
});

// Commande pour modifier une variable
cmd({
    pattern: "setconfig",
    react: "🔧",
    alias: ["setcfg", "setvar"],
    desc: "Modifier une variable de configuration",
    category: "owner",
    use: '.setconfig [VARIABLE] [VALEUR]',
    filename: __filename
}, async (conn, mek, m, {
    from, quoted, body, args, q, reply, isOwner
}) => {
    try {
        if (!isOwner) return reply("❌ Seul le propriétaire peut utiliser cette commande !");
        
        if (args.length < 2) {
            return reply(`❌ Usage: .setconfig [VARIABLE] [VALEUR]\n\n📖 Exemple: .setconfig MODE public\n\n💡 Utilisez .configlist pour voir toutes les variables`);
        }
        
        const variable = args[0].toUpperCase();
        const value = args.slice(1).join(' ');
        
        // Variables autorisées
        const allowedVars = [
            'MODE', 'PREFIX', 'BOT_NAME', 'ALIVE_MSG', 'AUTO_READ_STATUS',
            'AUTO_VOICE', 'AUTO_STICKER', 'AUTO_REPLY', 'AUTO_REACT',
            'ANTI_LINK', 'ANTI_BAD', 'FAKE_RECORDING', 'FAKE_TYPING',
            'ALWAYS_ONLINE', 'HEART_REACT', 'OWNER_REACT', 'ALIVE_IMG', 'MENU_IMG'
        ];
        
        if (!allowedVars.includes(variable)) {
            return reply(`❌ Variable non autorisée: ${variable}\n\n✅ Variables autorisées:\n${allowedVars.join(', ')}`);
        }
        
        // Validation des valeurs
        if (['AUTO_READ_STATUS', 'AUTO_VOICE', 'AUTO_STICKER', 'AUTO_REPLY', 'AUTO_REACT', 
             'ANTI_LINK', 'ANTI_BAD', 'FAKE_RECORDING', 'FAKE_TYPING', 'ALWAYS_ONLINE', 
             'HEART_REACT', 'OWNER_REACT'].includes(variable)) {
            if (!['true', 'false'].includes(value.toLowerCase())) {
                return reply(`❌ La variable ${variable} doit être 'true' ou 'false'`);
            }
        }
        
        if (variable === 'MODE') {
            if (!['public', 'private', 'inbox', 'group'].includes(value.toLowerCase())) {
                return reply(`❌ MODE doit être: public, private, inbox ou group`);
            }
        }
        
        // Mettre à jour la configuration
        const success = updateConfigVariable(variable, value);
        
        if (success) {
            // Mettre à jour la variable en mémoire
            config[variable] = value;
            
            await reply(`✅ **Configuration mise à jour avec succès !**\n\n🔧 **Variable:** ${variable}\n📝 **Nouvelle valeur:** ${value}\n\n⚠️ **Note:** Redémarrez le bot avec .restart pour appliquer tous les changements`);
        } else {
            await reply(`❌ Erreur lors de la mise à jour de la configuration`);
        }
        
    } catch (e) {
        console.log(e);
        reply(`❌ Erreur: ${e}`);
    }
});

// Commande pour voir la valeur actuelle d'une variable
cmd({
    pattern: "getconfig",
    react: "🔍",
    alias: ["getcfg", "getvar"],
    desc: "Voir la valeur d'une variable de configuration",
    category: "owner",
    use: '.getconfig [VARIABLE]',
    filename: __filename
}, async (conn, mek, m, {
    from, args, reply, isOwner
}) => {
    try {
        if (!isOwner) return reply("❌ Seul le propriétaire peut utiliser cette commande !");
        
        if (args.length < 1) {
            return reply(`❌ Usage: .getconfig [VARIABLE]\n\n📖 Exemple: .getconfig MODE\n\n💡 Utilisez .configlist pour voir toutes les variables`);
        }
        
        const variable = args[0].toUpperCase();
        
        if (config[variable] !== undefined) {
            await reply(`🔍 **Variable:** ${variable}\n📝 **Valeur actuelle:** ${config[variable]}`);
        } else {
            await reply(`❌ Variable introuvable: ${variable}\n\n💡 Utilisez .configlist pour voir toutes les variables`);
        }
        
    } catch (e) {
        console.log(e);
        reply(`❌ Erreur: ${e}`);
    }
});

// Commande pour réinitialiser une variable à sa valeur par défaut
cmd({
    pattern: "resetconfig",
    react: "🔄",
    alias: ["resetcfg", "resetvar"],
    desc: "Réinitialiser une variable à sa valeur par défaut",
    category: "owner",
    use: '.resetconfig [VARIABLE]',
    filename: __filename
}, async (conn, mek, m, {
    from, args, reply, isOwner
}) => {
    try {
        if (!isOwner) return reply("❌ Seul le propriétaire peut utiliser cette commande !");
        
        if (args.length < 1) {
            return reply(`❌ Usage: .resetconfig [VARIABLE]\n\n📖 Exemple: .resetconfig MODE`);
        }
        
        const variable = args[0].toUpperCase();
        
        // Valeurs par défaut
        const defaults = {
            'MODE': 'private',
            'PREFIX': '.',
            'BOT_NAME': '『𝙒𝘼・𝙃𝙄𝙎・𝙑𝟭』',
            'ALIVE_MSG': '_Hi 💁🏽 How Can I Assist You. Am alive Now._',
            'AUTO_READ_STATUS': 'true',
            'AUTO_VOICE': 'false',
            'AUTO_STICKER': 'false',
            'AUTO_REPLY': 'false',
            'AUTO_REACT': 'false',
            'ANTI_LINK': 'true',
            'ANTI_BAD': 'true',
            'FAKE_RECORDING': 'false',
            'FAKE_TYPING': 'true',
            'ALWAYS_ONLINE': 'true',
            'HEART_REACT': 'false',
            'OWNER_REACT': 'false',
            'ALIVE_IMG': 'https://files.catbox.moe/jr7hl0.jpg',
            'MENU_IMG': 'https://files.catbox.moe/7y7go8.png'
        };
        
        if (defaults[variable]) {
            const success = updateConfigVariable(variable, defaults[variable]);
            
            if (success) {
                config[variable] = defaults[variable];
                await reply(`✅ **Variable réinitialisée !**\n\n🔧 **Variable:** ${variable}\n📝 **Valeur par défaut:** ${defaults[variable]}`);
            } else {
                await reply(`❌ Erreur lors de la réinitialisation`);
            }
        } else {
            await reply(`❌ Variable introuvable: ${variable}`);
        }
        
    } catch (e) {
        console.log(e);
        reply(`❌ Erreur: ${e}`);
    }
});

// Commande pour sauvegarder la configuration actuelle
cmd({
    pattern: "saveconfig",
    react: "💾",
    alias: ["savecfg"],
    desc: "Sauvegarder la configuration actuelle",
    category: "owner",
    use: '.saveconfig',
    filename: __filename
}, async (conn, mek, m, {
    from, reply, isOwner
}) => {
    try {
        if (!isOwner) return reply("❌ Seul le propriétaire peut utiliser cette commande !");
        
        const configBackup = {
            timestamp: new Date().toISOString(),
            config: {
                MODE: config.MODE,
                PREFIX: config.PREFIX,
                BOT_NAME: config.BOT_NAME,
                ALIVE_MSG: config.ALIVE_MSG,
                AUTO_READ_STATUS: config.AUTO_READ_STATUS,
                AUTO_VOICE: config.AUTO_VOICE,
                AUTO_STICKER: config.AUTO_STICKER,
                AUTO_REPLY: config.AUTO_REPLY,
                AUTO_REACT: config.AUTO_REACT,
                ANTI_LINK: config.ANTI_LINK,
                ANTI_BAD: config.ANTI_BAD,
                FAKE_RECORDING: config.FAKE_RECORDING,
                FAKE_TYPING: config.FAKE_TYPING,
                ALWAYS_ONLINE: config.ALWAYS_ONLINE,
                HEART_REACT: config.HEART_REACT,
                OWNER_REACT: config.OWNER_REACT,
                ALIVE_IMG: config.ALIVE_IMG,
                MENU_IMG: config.MENU_IMG
            }
        };
        
        fs.writeFileSync('./data/config-backup.json', JSON.stringify(configBackup, null, 2));
        
        await reply(`💾 **Configuration sauvegardée !**\n\n📅 **Date:** ${new Date().toLocaleString()}\n📁 **Fichier:** data/config-backup.json\n\n💡 Utilisez .loadconfig pour restaurer`);
        
    } catch (e) {
        console.log(e);
        reply(`❌ Erreur: ${e}`);
    }
});
