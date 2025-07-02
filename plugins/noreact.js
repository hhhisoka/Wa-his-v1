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
const fs = require('fs');
const path = require('path');
const config = require('../config')
const { cmd, commands } = require('../command')

// FONCTION ABSOLUE : Bloque toutes les réactions automatiques sauf commandes
cmd({
    on: "body"
  },
  async (conn, mek, m, { from, body, isOwner, isCmd }) => {
    // 🚫 RÈGLE ABSOLUE : Si ce n'est pas une commande, AUCUNE réaction automatique
    if (!isCmd) {
      return; // ARRÊT TOTAL - Aucune fonction automatique ne s'exécute
    }
    // ✅ Les commandes passent et gardent leurs réactions définies
  });

//auto_voice - DÉSACTIVÉ pour messages normaux
cmd({
    on: "body"
  },
  async (conn, mek, m, { from, body, isOwner, isCmd }) => {
    // 🚫 BLOQUÉ si ce n'est pas une commande
    if (!isCmd) return;
    
    const filePath = path.join(__dirname, '../data/autovoice.json');
    const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));
    for (const text in data) {
      if (body.toLowerCase() === text.toLowerCase()) {
        if (config.AUTO_VOICE === 'true') {
          await conn.sendPresenceUpdate('recording', from);
          await conn.sendMessage(from, { audio: { url: data[text] }, mimetype: 'audio/mpeg', ptt: true }, { quoted: mek });
        }
      }
    }
  });

//auto sticker - DÉSACTIVÉ pour messages normaux
cmd({
    on: "body"
  },
  async (conn, mek, m, { from, body, isOwner, isCmd }) => {
    // 🚫 BLOQUÉ si ce n'est pas une commande
    if (!isCmd) return;
    
    const filePath = path.join(__dirname, '../data/autosticker.json');
    const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));
    for (const text in data) {
      if (body.toLowerCase() === text.toLowerCase()) {
        if (config.AUTO_STICKER === 'true') {
          await conn.sendMessage(from, { sticker: { url: data[text] }, package: 'hhhisoka-『𝙒𝘼・𝙃𝙄𝙎・𝙑𝟭』' }, { quoted: mek })
        }
      }
    }
  });

//auto reply - DÉSACTIVÉ pour messages normaux
cmd({
    on: "body"
  },
  async (conn, mek, m, { from, body, isOwner, isCmd }) => {
    // 🚫 BLOQUÉ si ce n'est pas une commande
    if (!isCmd) return;
    
    const filePath = path.join(__dirname, '../data/autoreply.json');
    const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));
    for (const text in data) {
      if (body.toLowerCase() === text.toLowerCase()) {
        if (config.AUTO_REPLY === 'true') {
          await m.reply(data[text])
        }
      }
    }
  });

//fake recording - DÉSACTIVÉ pour messages normaux
cmd({
    on: "body"
  },
  async (conn, mek, m, { from, body, isOwner, isCmd }) => {
    // 🚫 BLOQUÉ si ce n'est pas une commande
    if (!isCmd) return;
    
    if (config.FAKE_RECORDING === 'true') {
      await conn.sendPresenceUpdate('recording', from);
    }
  });

//fake typing - DÉSACTIVÉ pour messages normaux  
cmd({
    on: "body"
  },
  async (conn, mek, m, { from, body, isOwner, isCmd }) => {
    // 🚫 BLOQUÉ si ce n'est pas une commande
    if (!isCmd) return;
    
    if (config.FAKE_TYPING === 'true') {
      await conn.sendPresenceUpdate('composing', from);
    }
  });

//auto react - DÉSACTIVÉ pour messages normaux
cmd({
    on: "body"
  },
  async (conn, mek, m, { from, body, isOwner, isCmd }) => {
    // 🚫 BLOQUÉ si ce n'est pas une commande
    if (!isCmd) return;
    
    if (config.AUTO_REACT === 'true') {
      const reactions = ['❤️', '😍', '🔥', '👍', '😂', '🎉', '✨', '💯', '🌟', '👏'];
      const randomReaction = reactions[Math.floor(Math.random() * reactions.length)];
      
      await conn.sendMessage(from, {
        react: {
          text: randomReaction,
          key: mek.key
        }
      });
    }
  });

//always online - RESTE ACTIF (pas lié aux messages)
cmd({
    on: "body"
  },
  async (conn, mek, m, { from, body, isOwner }) => {
    if (config.ALWAYS_ONLINE === 'true') {
      await conn.sendPresenceUpdate('available', from);
    }
  });