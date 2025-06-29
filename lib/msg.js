const { proto, downloadContentFromMessage, getContentType } = require('@whiskeysockets/baileys');
const fs = require('fs');

// Fonction pour télécharger les médias depuis un message
const downloadMediaMessage = async (message, filename) => {
    // Gestion des messages "viewOnceMessage"
    if (message.type === 'viewOnceMessage') {
        message.type = message.msg.type;
    }

    // Téléchargement d'image
    if (message.type === 'imageMessage') {
        var filePath = filename ? filename + '.jpg' : 'undefined.jpg';
        const stream = await downloadContentFromMessage(message.msg, 'image');
        let buffer = Buffer.from([]);
        
        for await (const chunk of stream) {
            buffer = Buffer.concat([buffer, chunk]);
        }
        
        fs.writeFileSync(filePath, buffer);
        return fs.readFileSync(filePath);
    }
    // Téléchargement de vidéo
    else if (message.type === 'videoMessage') {
        var filePath = filename ? filename + '.mp4' : 'undefined.mp4';
        const stream = await downloadContentFromMessage(message.msg, 'video');
        let buffer = Buffer.from([]);
        
        for await (const chunk of stream) {
            buffer = Buffer.concat([buffer, chunk]);
        }
        
        fs.writeFileSync(filePath, buffer);
        return fs.readFileSync(filePath);
    }
    // Téléchargement d'audio
    else if (message.type === 'audioMessage') {
        var filePath = filename ? filename + '.mp3' : 'undefined.mp3';
        const stream = await downloadContentFromMessage(message.msg, 'audio');
        let buffer = Buffer.from([]);
        
        for await (const chunk of stream) {
            buffer = Buffer.concat([buffer, chunk]);
        }
        
        fs.writeFileSync(filePath, buffer);
        return fs.readFileSync(filePath);
    }
    // Téléchargement de sticker
    else if (message.type === 'stickerMessage') {
        var filePath = filename ? filename + '.webp' : 'undefined.webp';
        const stream = await downloadContentFromMessage(message.msg, 'sticker');
        let buffer = Buffer.from([]);
        
        for await (const chunk of stream) {
            buffer = Buffer.concat([buffer, chunk]);
        }
        
        fs.writeFileSync(filePath, buffer);
        return fs.readFileSync(filePath);
    }
    // Téléchargement de document
    else if (message.type === 'documentMessage') {
        var fileExtension = message.msg.fileName.split('.')[1].toLowerCase()
            .replace('jpeg', 'jpg')
            .replace('png', 'jpg')
            .replace('m4a', 'mp3');
        var filePath = filename ? filename + '.' + fileExtension : 'undefined.' + fileExtension;
        
        const stream = await downloadContentFromMessage(message.msg, 'document');
        let buffer = Buffer.from([]);
        
        for await (const chunk of stream) {
            buffer = Buffer.concat([buffer, chunk]);
        }
        
        fs.writeFileSync(filePath, buffer);
        return fs.readFileSync(filePath);
    }
};

// Fonction principale pour traiter les messages SMS/WhatsApp
const sms = (conn, messageInfo) => {
    // Extraction des informations du chat
    if (messageInfo.key) {
        messageInfo.id = messageInfo.key.id;
        messageInfo.chat = messageInfo.key.remoteJid;
        messageInfo.fromMe = messageInfo.key.fromMe;
        messageInfo.isGroup = messageInfo.chat.endsWith('@g.us');
        messageInfo.sender = messageInfo.fromMe 
            ? conn.user.id.split(':')[0] + '@s.whatsapp.net'
            : messageInfo.isGroup 
                ? messageInfo.key.participant 
                : messageInfo.key.remoteJid;
    }

    // Traitement du message
    if (messageInfo.message) {
        messageInfo.type = getContentType(messageInfo.message);
        messageInfo.msg = messageInfo.type === 'viewOnceMessage' 
            ? messageInfo.message[messageInfo.type].message[getContentType(messageInfo.message[messageInfo.type].message)]
            : messageInfo.message[messageInfo.type];

        if (messageInfo.msg) {
            // Gestion des messages "viewOnceMessage"
            if (messageInfo.type === 'viewOnceMessage') {
                messageInfo.msg.type = getContentType(messageInfo.message[messageInfo.type].message);
            }

            // Extraction des mentions et du contexte
            var participantFromContext = messageInfo.msg.contextInfo != null 
                ? messageInfo.msg.contextInfo.participant 
                : '';
            var mentionedJids = messageInfo.msg.contextInfo != null 
                ? messageInfo.msg.contextInfo.mentionedJid 
                : [];
            var mentions = typeof mentionedJids == 'string' ? [mentionedJids] : mentionedJids;
            
            if (mentions != undefined) {
                mentions.push(participantFromContext);
            }
            
            messageInfo.mentionUser = mentions != undefined 
                ? mentions.filter(user => user) 
                : [];

            // Extraction du texte du message selon le type
            messageInfo.body = messageInfo.type === 'conversation' 
                ? messageInfo.msg
                : messageInfo.type === 'extendedTextMessage' 
                    ? messageInfo.msg.text
                    : messageInfo.type == 'imageMessage' && messageInfo.msg.caption 
                        ? messageInfo.msg.caption
                        : messageInfo.type == 'videoMessage' && messageInfo.msg.caption 
                            ? messageInfo.msg.caption
                            : messageInfo.type == 'templateButtonReplyMessage' && messageInfo.msg.selectedId 
                                ? messageInfo.msg.selectedId
                                : messageInfo.type == 'buttonsResponseMessage' && messageInfo.msg.selectedButtonId 
                                    ? messageInfo.msg.selectedButtonId
                                    : '';

            // Gestion des messages quotés
            messageInfo.quoted = messageInfo.msg.contextInfo != undefined 
                ? messageInfo.msg.contextInfo.quotedMessage 
                : null;

            if (messageInfo.quoted) {
                messageInfo.quoted.type = getContentType(messageInfo.quoted);
                messageInfo.quoted.id = messageInfo.msg.contextInfo.stanzaId;
                messageInfo.quoted.sender = messageInfo.msg.contextInfo.participant;
                messageInfo.quoted.fromMe = messageInfo.quoted.sender.split('@')[0]
                    .includes(conn.user.id.split(':')[0]);
                messageInfo.quoted.msg = messageInfo.quoted.type === 'viewOnceMessage' 
                    ? messageInfo.quoted[messageInfo.quoted.type].message[getContentType(messageInfo.quoted[messageInfo.quoted.type].message)]
                    : messageInfo.quoted[messageInfo.quoted.type];

                if (messageInfo.quoted.type === 'viewOnceMessage') {
                    messageInfo.quoted.msg.type = getContentType(messageInfo.quoted[messageInfo.quoted.type].message);
                }

                // Gestion des mentions dans les messages quotés
                var quotedParticipant = messageInfo.quoted.msg.contextInfo != null 
                    ? messageInfo.quoted.msg.contextInfo.participant 
                    : '';
                var quotedMentions = messageInfo.quoted.msg.contextInfo != null 
                    ? messageInfo.quoted.msg.contextInfo.mentionedJid 
                    : [];
                var quotedMentionsList = typeof quotedMentions == 'string' ? [quotedMentions] : quotedMentions;
                
                if (quotedMentionsList != undefined) {
                    quotedMentionsList.push(quotedParticipant);
                }
                
                messageInfo.quoted.mentionUser = quotedMentionsList != undefined 
                    ? quotedMentionsList.filter(user => user) 
                    : [];

                // Création de l'objet fake pour le message quoté
                messageInfo.quoted.fakeObj = proto.WebMessageInfo.fromObject({
                    key: {
                        remoteJid: messageInfo.chat,
                        fromMe: messageInfo.quoted.fromMe,
                        id: messageInfo.quoted.id,
                        participant: messageInfo.quoted.sender
                    },
                    message: messageInfo.quoted
                });

                // Fonctions pour le message quoté
                messageInfo.quoted.download = (filename) => downloadMediaMessage(messageInfo.quoted, filename);
                messageInfo.quoted.delete = () => conn.sendMessage(messageInfo.chat, {
                    delete: messageInfo.quoted.fakeObj.key
                });
                messageInfo.quoted.react = (emoji) => conn.sendMessage(messageInfo.chat, {
                    react: {
                        text: emoji,
                        key: messageInfo.quoted.fakeObj.key
                    }
                });
            }
        }

        // Fonction de téléchargement pour le message principal
        messageInfo.download = (filename) => downloadMediaMessage(messageInfo, filename);
    }

    // Fonctions de réponse
    messageInfo.reply = (text, chatJid = messageInfo.chat, options = { mentions: [messageInfo.sender] }) => 
        conn.sendMessage(chatJid, {
            text: text,
            contextInfo: {
                mentionedJid: options.mentions
            }
        }, { quoted: messageInfo });

    messageInfo.replyS = (sticker, chatJid = messageInfo.chat, options = { mentions: [messageInfo.sender] }) => 
        conn.sendMessage(chatJid, {
            sticker: sticker,
            contextInfo: {
                mentionedJid: options.mentions
            }
        }, { quoted: messageInfo });

    messageInfo.replyImg = (image, caption, chatJid = messageInfo.chat, options = { mentions: [messageInfo.sender] }) => 
        conn.sendMessage(chatJid, {
            image: image,
            caption: caption,
            contextInfo: {
                mentionedJid: options.mentions
            }
        }, { quoted: messageInfo });

    messageInfo.replyVid = (video, caption, chatJid = messageInfo.chat, options = { mentions: [messageInfo.sender], gif: false }) => 
        conn.sendMessage(chatJid, {
            video: video,
            caption: caption,
            gifPlayback: options.gif,
            contextInfo: {
                mentionedJid: options.mentions
            }
        }, { quoted: messageInfo });

    messageInfo.replyAud = (audio, chatJid = messageInfo.chat, options = { mentions: [messageInfo.sender], ptt: false }) => 
        conn.sendMessage(chatJid, {
            audio: audio,
            ptt: options.ptt,
            mimetype: 'audio/mpeg',
            contextInfo: {
                mentionedJid: options.mentions
            }
        }, { quoted: messageInfo });

    messageInfo.replyDoc = (document, chatJid = messageInfo.chat, options = { 
        mentions: [messageInfo.sender], 
        filename: 'undefined.pdf', 
        mimetype: 'application/pdf' 
    }) => 
        conn.sendMessage(chatJid, {
            document: document,
            mimetype: options.mimetype,
            fileName: options.filename,
            contextInfo: {
                mentionedJid: options.mentions
            }
        }, { quoted: messageInfo });

    // Fonction pour envoyer un contact
    messageInfo.replyContact = (name, number, organization) => {
        var vcard = 'BEGIN:VCARD\n'
            + 'VERSION:3.0\n'
            + 'FN:' + name + '\n'
            + 'ORG:' + organization + ';\n'
            + 'TEL;type=CELL;type=VOICE;waid=' + number + ':+' + number + '\n'
            + 'END:VCARD';
        
        conn.sendMessage(messageInfo.chat, {
            contacts: {
                displayName: name,
                contacts: [{
                    vcard: vcard
                }]
            }
        }, { quoted: messageInfo });
    };

    // Fonction pour réagir au message
    messageInfo.react = (emoji) => conn.sendMessage(messageInfo.chat, {
        react: {
            text: emoji,
            key: messageInfo.key
        }
    });

    return messageInfo;
};

module.exports = {
    sms: sms,
    downloadMediaMessage: downloadMediaMessage
};