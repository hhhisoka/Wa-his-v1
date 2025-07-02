/**
 * Copyright (C) 2025 hhhisoka
 *
 * Plugin ViewOnce Manuel - Version améliorée
 * Téléchargement manuel des messages ViewOnce en répondant avec .vv
 * Wa-his-v1 WhatsApp Bot
 */

const fs = require("fs")
const path = require("path")
const { tmpdir } = require("os")
const { downloadMediaMessage } = require("../lib/msg")
const config = require("../config")
const { cmd } = require("../command")

// Dossier de sauvegarde
const viewOnceDir = path.join(__dirname, "../downloads/viewonce")

// Créer le dossier si nécessaire
function createViewOnceDirectory() {
  if (!fs.existsSync(viewOnceDir)) {
    fs.mkdirSync(viewOnceDir, { recursive: true })
  }
}

// Initialiser le dossier
createViewOnceDirectory()

//=============COMMANDE MANUELLE VIEWONCE AMÉLIORÉE=======
cmd(
  {
    pattern: "vv",
    alias: ["viewonce", "vo", "view"],
    desc: "Révéler un message ViewOnce en répondant au message",
    category: "tools",
    react: "👁️",
    filename: __filename,
  },
  async (conn, mek, m, { from, quoted, isOwner, reply, pushname, sender }) => {
    try {
      // Vérifier si c'est une réponse à un message
      if (!quoted) {
        return reply("❌ *Répondez à un message ViewOnce !*\n\n📝 *Usage:* Répondez à un message vue unique avec `.vv`")
      }

      // Extraire le message cité depuis le contexte
      const quotedMessage = mek.message?.extendedTextMessage?.contextInfo?.quotedMessage

      if (!quotedMessage) {
        return reply("❌ *Impossible de récupérer le message cité !*")
      }

      // Vérifier si c'est un ViewOnce
      const messageType = Object.keys(quotedMessage)[0]

      if (messageType !== "viewOnceMessage" && messageType !== "viewOnceMessageV2") {
        return reply("❌ *Ce message n'est pas un ViewOnce !*\n\n👁️ Répondez uniquement aux messages vue unique.")
      }

      await reply("👁️ *Révélation du message ViewOnce en cours...*")

      // Extraire le contenu ViewOnce
      const viewOnceContent = quotedMessage[messageType]
      const actualMessage = viewOnceContent.message
      const mediaType = Object.keys(actualMessage)[0]
      const mediaContent = actualMessage[mediaType]

      // Vérifier le type de média supporté
      if (!["imageMessage", "videoMessage"].includes(mediaType)) {
        return reply(
          `❌ *Type de ViewOnce non supporté !*\n\n📝 Types supportés: Images, Vidéos\n🔍 Type détecté: ${mediaType}`,
        )
      }

      // Créer un message temporaire pour le téléchargement
      const tempMessage = {
        key: {
          ...mek.key,
          id: mek.message.extendedTextMessage.contextInfo.stanzaId || mek.key.id,
        },
        message: quotedMessage,
      }

      // Télécharger le média
      let buffer
      try {
        buffer = await conn.downloadMediaMessage(tempMessage)
      } catch (downloadError) {
        console.log("Erreur téléchargement direct, tentative alternative...")
        // Méthode alternative
        buffer = await downloadMediaMessage(tempMessage, "buffer")
      }

      if (!buffer) {
        return reply("❌ *Échec du téléchargement !*\n\n🔄 Veuillez réessayer.")
      }

      // Déterminer l'extension et créer le fichier temporaire
      const timestamp = Date.now()
      const senderNumber = sender.split("@")[0]
      let fileExtension, tempFileName, permanentFileName

      if (mediaType === "imageMessage") {
        fileExtension = ".jpg"
        tempFileName = `${timestamp}.jpg`
        permanentFileName = `viewonce_${senderNumber}_${new Date().toISOString().replace(/[:.]/g, "-")}.jpg`
      } else if (mediaType === "videoMessage") {
        fileExtension = ".mp4"
        tempFileName = `${timestamp}.mp4`
        permanentFileName = `viewonce_${senderNumber}_${new Date().toISOString().replace(/[:.]/g, "-")}.mp4`
      }

      // Créer le fichier temporaire
      const tempFilePath = path.join(tmpdir(), tempFileName)
      const permanentFilePath = path.join(viewOnceDir, permanentFileName)

      // Écrire les fichiers
      fs.writeFileSync(tempFilePath, buffer)
      fs.writeFileSync(permanentFilePath, buffer)

      // Préparer le message de caption
      const caption = mediaContent.caption || ""
      const fileSize = buffer.length
      const fileSizeKB = (fileSize / 1024).toFixed(2)

      let revealMsg = `👁️ *VIEW ONCE RÉVÉLÉ !*\n\n`
      revealMsg += `👤 *De:* ${pushname || senderNumber}\n`
      revealMsg += `📱 *Numéro:* ${senderNumber}\n`
      revealMsg += `📊 *Taille:* ${fileSizeKB} KB\n`
      revealMsg += `📅 *Date:* ${new Date().toLocaleString()}\n`
      if (caption) {
        revealMsg += `💬 *Caption original:* ${caption}\n`
      }
      revealMsg += `💾 *Sauvegardé:* ${permanentFileName}`

      // Envoyer le média révélé
      if (mediaType === "imageMessage") {
        await conn.sendMessage(
          from,
          {
            image: { url: tempFilePath },
            caption: revealMsg,
          },
          { quoted: mek },
        )
      } else if (mediaType === "videoMessage") {
        await conn.sendMessage(
          from,
          {
            video: { url: tempFilePath },
            caption: revealMsg,
          },
          { quoted: mek },
        )
      }

      // Nettoyer le fichier temporaire
      try {
        fs.unlinkSync(tempFilePath)
      } catch (cleanupError) {
        console.log("Erreur nettoyage fichier temporaire:", cleanupError)
      }

      console.log(`✅ ViewOnce révélé: ${permanentFileName}`)
    } catch (error) {
      console.error("❌ Erreur révélation ViewOnce:", error)
      reply("❌ *Échec de la révélation du ViewOnce !*\n\n🔧 Vérifiez que le message est bien un ViewOnce valide.")
    }
  },
)

//=============COMMANDE VIEWONCE AVEC SAUVEGARDE UNIQUEMENT=======
cmd(
  {
    pattern: "vvsave",
    alias: ["viewoncesave", "vos"],
    desc: "Sauvegarder un ViewOnce sans le révéler publiquement",
    category: "tools",
    react: "💾",
    filename: __filename,
  },
  async (conn, mek, m, { from, quoted, isOwner, reply, pushname, sender }) => {
    try {
      if (!quoted) {
        return reply("❌ *Répondez à un message ViewOnce !*")
      }

      const quotedMessage = mek.message?.extendedTextMessage?.contextInfo?.quotedMessage
      if (!quotedMessage) {
        return reply("❌ *Impossible de récupérer le message cité !*")
      }

      const messageType = Object.keys(quotedMessage)[0]
      if (messageType !== "viewOnceMessage" && messageType !== "viewOnceMessageV2") {
        return reply("❌ *Ce message n'est pas un ViewOnce !*")
      }

      const viewOnceContent = quotedMessage[messageType]
      const actualMessage = viewOnceContent.message
      const mediaType = Object.keys(actualMessage)[0]
      const mediaContent = actualMessage[mediaType]

      if (!["imageMessage", "videoMessage"].includes(mediaType)) {
        return reply(`❌ *Type non supporté: ${mediaType}*`)
      }

      const tempMessage = {
        key: {
          ...mek.key,
          id: mek.message.extendedTextMessage.contextInfo.stanzaId || mek.key.id,
        },
        message: quotedMessage,
      }

      let buffer
      try {
        buffer = await conn.downloadMediaMessage(tempMessage)
      } catch {
        buffer = await downloadMediaMessage(tempMessage, "buffer")
      }

      if (!buffer) {
        return reply("❌ *Échec du téléchargement !*")
      }

      const senderNumber = sender.split("@")[0]
      const fileExtension = mediaType === "imageMessage" ? ".jpg" : ".mp4"
      const fileName = `viewonce_${senderNumber}_${new Date().toISOString().replace(/[:.]/g, "-")}${fileExtension}`
      const filePath = path.join(viewOnceDir, fileName)

      fs.writeFileSync(filePath, buffer)

      const fileSize = (buffer.length / 1024).toFixed(2)
      const caption = mediaContent.caption || ""

      let saveMsg = `💾 *VIEWONCE SAUVEGARDÉ DISCRÈTEMENT*\n\n`
      saveMsg += `👤 *De:* ${pushname || senderNumber}\n`
      saveMsg += `📊 *Taille:* ${fileSize} KB\n`
      saveMsg += `📁 *Type:* ${mediaType === "imageMessage" ? "Image" : "Vidéo"}\n`
      if (caption) {
        saveMsg += `💬 *Caption:* ${caption}\n`
      }
      saveMsg += `💾 *Fichier:* ${fileName}`

      reply(saveMsg)
      console.log(`💾 ViewOnce sauvegardé discrètement: ${fileName}`)
    } catch (error) {
      console.error("❌ Erreur sauvegarde ViewOnce:", error)
      reply("❌ *Échec de la sauvegarde !*")
    }
  },
)

//=============COMMANDES D'AIDE ET GESTION=======
cmd(
  {
    pattern: "vvhelp",
    alias: ["viewoncehelp", "vohelp"],
    desc: "Aide pour les commandes ViewOnce",
    category: "help",
    react: "❓",
    filename: __filename,
  },
  async (conn, mek, m, { from, reply }) => {
    let helpMsg = `*👁️ AIDE - VIEWONCE MANUEL*\n\n`
    helpMsg += `*📖 DESCRIPTION:*\n`
    helpMsg += `Révèle et sauvegarde les messages ViewOnce (vue unique).\n\n`

    helpMsg += `*📝 COMMANDES:*\n`
    helpMsg += `• \`.vv\` - Révéler et sauvegarder\n`
    helpMsg += `• \`.vvsave\` - Sauvegarder discrètement\n`
    helpMsg += `• \`.vo\` / \`.view\` - Alias de .vv\n`
    helpMsg += `• \`.vvstats\` - Statistiques (owner)\n`
    helpMsg += `• \`.vvclean\` - Nettoyer (owner)\n\n`

    helpMsg += `*🎯 UTILISATION:*\n`
    helpMsg += `1️⃣ Répondez au message ViewOnce\n`
    helpMsg += `2️⃣ Tapez la commande souhaitée\n`
    helpMsg += `3️⃣ Le bot traite le message\n\n`

    helpMsg += `*🔄 DIFFÉRENCES:*\n`
    helpMsg += `• \`.vv\` - Révèle publiquement + sauvegarde\n`
    helpMsg += `• \`.vvsave\` - Sauvegarde discrètement seulement\n\n`

    helpMsg += `*✅ TYPES SUPPORTÉS:*\n`
    helpMsg += `• 🖼️ Images ViewOnce\n`
    helpMsg += `• 🎥 Vidéos ViewOnce\n\n`

    helpMsg += `*📂 SAUVEGARDE:*\n`
    helpMsg += `Tous les fichiers sont sauvegardés dans:\n`
    helpMsg += `\`downloads/viewonce/\``

    reply(helpMsg)
  },
)

// Statistiques et nettoyage (gardés identiques)
cmd(
  {
    pattern: "vvstats",
    desc: "Statistiques des ViewOnce",
    category: "owner",
    react: "📊",
    filename: __filename,
  },
  async (conn, mek, m, { from, isOwner, reply }) => {
    if (!isOwner) return reply("❌ *Seul le propriétaire peut voir les statistiques !*")

    try {
      if (!fs.existsSync(viewOnceDir)) {
        return reply("📂 *Aucun ViewOnce téléchargé.*")
      }

      const files = fs.readdirSync(viewOnceDir)
      const mediaFiles = files.filter((f) => !f.endsWith(".json"))

      let totalSize = 0
      let imageCount = 0
      let videoCount = 0

      mediaFiles.forEach((file) => {
        const filePath = path.join(viewOnceDir, file)
        const stats = fs.statSync(filePath)
        totalSize += stats.size

        if (file.includes(".jpg") || file.includes(".jpeg")) {
          imageCount++
        } else if (file.includes(".mp4")) {
          videoCount++
        }
      })

      let statsMsg = `*📊 STATISTIQUES VIEWONCE*\n\n`
      statsMsg += `*👁️ FICHIERS RÉVÉLÉS:*\n`
      statsMsg += `├ 🖼️ Images: ${imageCount}\n`
      statsMsg += `├ 🎥 Vidéos: ${videoCount}\n`
      statsMsg += `└ 📊 Total: ${mediaFiles.length}\n\n`
      statsMsg += `*💾 ESPACE:* ${(totalSize / 1024 / 1024).toFixed(2)} MB\n\n`
      statsMsg += `*📂 EMPLACEMENT:* downloads/viewonce/`

      reply(statsMsg)
    } catch (error) {
      reply("❌ *Erreur calcul statistiques !*")
    }
  },
)

cmd(
  {
    pattern: "vvclean",
    desc: "Nettoyer les ViewOnce sauvegardés",
    category: "owner",
    react: "🧹",
    filename: __filename,
  },
  async (conn, mek, m, { from, isOwner, reply }) => {
    if (!isOwner) return reply("❌ *Seul le propriétaire peut nettoyer !*")

    try {
      if (!fs.existsSync(viewOnceDir)) {
        return reply("📂 *Aucun fichier à nettoyer.*")
      }

      const files = fs.readdirSync(viewOnceDir)
      let deletedCount = 0
      let freedSpace = 0

      files.forEach((file) => {
        const filePath = path.join(viewOnceDir, file)
        const stats = fs.statSync(filePath)
        freedSpace += stats.size
        fs.unlinkSync(filePath)
        deletedCount++
      })

      reply(
        `🧹 *NETTOYAGE TERMINÉ !*\n\n📁 *Supprimés:* ${deletedCount}\n💾 *Libéré:* ${(freedSpace / 1024 / 1024).toFixed(2)} MB`,
      )
    } catch (error) {
      reply("❌ *Erreur nettoyage !*")
    }
  },
)

module.exports = {
  createViewOnceDirectory,
}
