/**
 * Copyright (C) 2025 hhhisoka
 *
 * Plugin Auto Status Downloader
 * Lecture automatique et téléchargement des statuts WhatsApp
 * Wa-his-v1 WhatsApp Bot
 */

const fs = require("fs")
const path = require("path")
const { downloadMediaMessage } = require("../lib/msg")
const config = require("../config")
const { cmd } = require("../command")

// Dossiers de sauvegarde
const statusDir = path.join(__dirname, "../downloads/status")
const configPath = path.join(__dirname, "../data/status-config.json")

// Configuration par défaut
const defaultConfig = {
  AUTO_READ_STATUS: true,
  AUTO_DOWNLOAD: false,
  DOWNLOAD_KEYWORDS: ["save", "download", "dl", "télécharge", "sauve","send"],
  DOWNLOAD_IMAGES: true,
  DOWNLOAD_VIDEOS: true,
  DOWNLOAD_AUDIO: true,
  MAX_FILE_SIZE: 50, // MB
  NOTIFY_DOWNLOAD: true,
  SAVE_SENDER_INFO: true,
}

// Créer les dossiers nécessaires
function createDirectories() {
  const dirs = [
    statusDir,
    path.join(statusDir, "images"),
    path.join(statusDir, "videos"),
    path.join(statusDir, "audio"),
  ]

  dirs.forEach((dir) => {
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true })
    }
  })
}

// Charger la configuration
function loadStatusConfig() {
  try {
    if (!fs.existsSync(configPath)) {
      fs.writeFileSync(configPath, JSON.stringify(defaultConfig, null, 2))
      return defaultConfig
    }
    const data = fs.readFileSync(configPath, "utf8")
    return { ...defaultConfig, ...JSON.parse(data) }
  } catch (error) {
    console.log("❌ Erreur chargement config status:", error)
    return defaultConfig
  }
}

// Sauvegarder la configuration
function saveStatusConfig(config) {
  try {
    fs.writeFileSync(configPath, JSON.stringify(config, null, 2))
    return true
  } catch (error) {
    console.log("❌ Erreur sauvegarde config status:", error)
    return false
  }
}

// Initialiser les dossiers
createDirectories()

//=============LECTURE AUTOMATIQUE DES STATUTS=======
cmd(
  {
    on: "body",
  },
  async (conn, mek, m, { from, body, isOwner }) => {
    // Vérifier si c'est un statut
    if (mek.key && mek.key.remoteJid === "status@broadcast") {
      const statusConfig = loadStatusConfig()

      try {
        // Lecture automatique
        if (statusConfig.AUTO_READ_STATUS) {
          await conn.readMessages([mek.key])
          console.log("✅ Statut lu automatiquement")
        }

        // Vérifier si téléchargement requis
        const shouldDownload = checkDownloadTrigger(mek, statusConfig)

        if (shouldDownload) {
          await downloadStatus(conn, mek, statusConfig)
        }
      } catch (error) {
        console.log("❌ Erreur traitement statut:", error)
      }
    }
  },
)

// Vérifier si le téléchargement doit être déclenché
function checkDownloadTrigger(mek, config) {
  // Auto download activé
  if (config.AUTO_DOWNLOAD) return true

  // Vérifier les mots-clés dans le texte du statut
  const messageType = Object.keys(mek.message)[0]
  let text = ""

  if (messageType === "conversation") {
    text = mek.message.conversation
  } else if (messageType === "extendedTextMessage") {
    text = mek.message.extendedTextMessage.text
  } else if (mek.message[messageType]?.caption) {
    text = mek.message[messageType].caption
  }

  // Chercher les mots-clés
  const lowerText = text.toLowerCase()
  return config.DOWNLOAD_KEYWORDS.some((keyword) => lowerText.includes(keyword.toLowerCase()))
}

// Télécharger le statut
async function downloadStatus(conn, mek, config) {
  try {
    const messageType = Object.keys(mek.message)[0]
    const messageContent = mek.message[messageType]

    // Vérifier le type de média
    let shouldDownload = false
    let mediaType = ""
    let fileExtension = ""

    switch (messageType) {
      case "imageMessage":
        shouldDownload = config.DOWNLOAD_IMAGES
        mediaType = "images"
        fileExtension = ".jpg"
        break
      case "videoMessage":
        shouldDownload = config.DOWNLOAD_VIDEOS
        mediaType = "videos"
        fileExtension = ".mp4"
        break
      case "audioMessage":
        shouldDownload = config.DOWNLOAD_AUDIO
        mediaType = "audio"
        fileExtension = ".mp3"
        break
      default:
        console.log(`📝 Statut texte détecté: ${messageType}`)
        return
    }

    if (!shouldDownload) {
      console.log(`⏭️ Type ${messageType} ignoré selon la configuration`)
      return
    }

    // Vérifier la taille du fichier
    const fileSize = messageContent.fileLength || 0
    const maxSize = config.MAX_FILE_SIZE * 1024 * 1024 // Convertir en bytes

    if (fileSize > maxSize) {
      console.log(`⚠️ Fichier trop volumineux: ${(fileSize / 1024 / 1024).toFixed(2)}MB`)
      return
    }

    // Télécharger le média
    const media = await downloadMediaMessage(mek, "buffer")
    if (!media) {
      console.log("❌ Échec téléchargement média")
      return
    }

    // Générer le nom de fichier
    const timestamp = new Date().toISOString().replace(/[:.]/g, "-")
    const sender = mek.key.participant || "unknown"
    const senderNumber = sender.split("@")[0]
    const fileName = `status_${senderNumber}_${timestamp}${fileExtension}`
    const filePath = path.join(statusDir, mediaType, fileName)

    // Sauvegarder le fichier
    fs.writeFileSync(filePath, media)

    // Sauvegarder les infos du sender si activé
    if (config.SAVE_SENDER_INFO) {
      const infoFile = path.join(statusDir, mediaType, `${fileName}.info.json`)
      const statusInfo = {
        sender: senderNumber,
        timestamp: new Date().toISOString(),
        messageType: messageType,
        caption: messageContent.caption || "",
        fileSize: fileSize,
        downloadedAt: new Date().toISOString(),
      }
      fs.writeFileSync(infoFile, JSON.stringify(statusInfo, null, 2))
    }

    console.log(`✅ Statut téléchargé: ${fileName}`)

    // Notification si activée
    if (config.NOTIFY_DOWNLOAD) {
      const notificationMsg = `📥 *STATUT TÉLÉCHARGÉ*\n\n📁 *Type:* ${mediaType}\n👤 *De:* ${senderNumber}\n📊 *Taille:* ${(fileSize / 1024).toFixed(2)} KB\n📅 *Date:* ${new Date().toLocaleString()}\n\n💾 Sauvegardé dans: downloads/status/${mediaType}/`

      // Envoyer notification au propriétaire
      const ownerNumber = config.OWNER_NUMBER || "2250104610403" // Remplacez par votre numéro
      await conn.sendMessage(`${ownerNumber}@s.whatsapp.net`, { text: notificationMsg })
    }
  } catch (error) {
    console.log("❌ Erreur téléchargement statut:", error)
  }
}

//=============COMMANDES DE GESTION=======

// Configuration du plugin status
cmd(
  {
    pattern: "statusconfig",
    alias: ["sconfig", "statusset"],
    desc: "Configuration du téléchargeur de statuts",
    category: "owner",
    react: "⚙️",
    filename: __filename,
  },
  async (conn, mek, m, { from, isOwner, reply }) => {
    if (!isOwner) return reply("❌ *Seul le propriétaire peut utiliser cette commande !*")

    const config = loadStatusConfig()

    let message = `*📥 CONFIGURATION STATUS DOWNLOADER*\n\n`
    message += `*📖 LECTURE:*\n`
    message += `├ Auto Read: ${config.AUTO_READ_STATUS ? "🟢 ON" : "🔴 OFF"}\n\n`

    message += `*💾 TÉLÉCHARGEMENT:*\n`
    message += `├ Auto Download: ${config.AUTO_DOWNLOAD ? "🟢 ON" : "🔴 OFF"}\n`
    message += `├ Images: ${config.DOWNLOAD_IMAGES ? "🟢 ON" : "🔴 OFF"}\n`
    message += `├ Vidéos: ${config.DOWNLOAD_VIDEOS ? "🟢 ON" : "🔴 OFF"}\n`
    message += `├ Audio: ${config.DOWNLOAD_AUDIO ? "🟢 ON" : "🔴 OFF"}\n`
    message += `├ Taille max: ${config.MAX_FILE_SIZE} MB\n`
    message += `└ Notifications: ${config.NOTIFY_DOWNLOAD ? "🟢 ON" : "🔴 OFF"}\n\n`

    message += `*🔑 MOTS-CLÉS:*\n`
    message += `${config.DOWNLOAD_KEYWORDS.map((k) => `• ${k}`).join("\n")}\n\n`

    message += `*📝 COMMANDES:*\n`
    message += `• \`.statusset <option> <on/off>\`\n`
    message += `• \`.addkeyword <mot>\`\n`
    message += `• \`.removekeyword <mot>\`\n`
    message += `• \`.statusstats\` - Statistiques`

    reply(message)
  },
)

// Modifier les paramètres
cmd(
  {
    pattern: "statusset",
    desc: "Modifier les paramètres du status downloader",
    category: "owner",
    react: "🔧",
    filename: __filename,
  },
  async (conn, mek, m, { from, args, isOwner, reply }) => {
    if (!isOwner) return reply("❌ *Seul le propriétaire peut utiliser cette commande !*")

    if (args.length < 2) {
      return reply(
        `*❌ Usage incorrect !*\n\n*Syntaxe:* .statusset <option> <on/off>\n\n*Options:*\n• autoread, autodownload\n• images, videos, audio\n• notifications\n\n*Exemple:* .statusset autodownload on`,
      )
    }

    const option = args[0].toLowerCase()
    const value = ["on", "true", "1"].includes(args[1].toLowerCase())
    const config = loadStatusConfig()

    const optionMap = {
      autoread: "AUTO_READ_STATUS",
      autodownload: "AUTO_DOWNLOAD",
      images: "DOWNLOAD_IMAGES",
      videos: "DOWNLOAD_VIDEOS",
      audio: "DOWNLOAD_AUDIO",
      notifications: "NOTIFY_DOWNLOAD",
    }

    const configKey = optionMap[option]
    if (!configKey) {
      return reply(`❌ *Option inconnue !*\n\nOptions disponibles:\n${Object.keys(optionMap).join(", ")}`)
    }

    config[configKey] = value
    saveStatusConfig(config)

    const emoji = value ? "🟢" : "🔴"
    const status = value ? "ACTIVÉ" : "DÉSACTIVÉ"
    reply(`${emoji} *${option.toUpperCase()} ${status} !*`)
  },
)

// Ajouter mot-clé
cmd(
  {
    pattern: "addkeyword",
    desc: "Ajouter un mot-clé de téléchargement",
    category: "owner",
    react: "➕",
    filename: __filename,
  },
  async (conn, mek, m, { from, args, isOwner, reply }) => {
    if (!isOwner) return reply("❌ *Seul le propriétaire peut utiliser cette commande !*")

    if (args.length < 1) {
      return reply("*❌ Usage:* .addkeyword <mot-clé>")
    }

    const keyword = args.join(" ").toLowerCase()
    const config = loadStatusConfig()

    if (config.DOWNLOAD_KEYWORDS.includes(keyword)) {
      return reply("⚠️ *Ce mot-clé existe déjà !*")
    }

    config.DOWNLOAD_KEYWORDS.push(keyword)
    saveStatusConfig(config)

    reply(`✅ *Mot-clé ajouté:* "${keyword}"\n\n📝 Total: ${config.DOWNLOAD_KEYWORDS.length} mots-clés`)
  },
)

// Supprimer mot-clé
cmd(
  {
    pattern: "removekeyword",
    desc: "Supprimer un mot-clé de téléchargement",
    category: "owner",
    react: "➖",
    filename: __filename,
  },
  async (conn, mek, m, { from, args, isOwner, reply }) => {
    if (!isOwner) return reply("❌ *Seul le propriétaire peut utiliser cette commande !*")

    if (args.length < 1) {
      return reply("*❌ Usage:* .removekeyword <mot-clé>")
    }

    const keyword = args.join(" ").toLowerCase()
    const config = loadStatusConfig()

    const index = config.DOWNLOAD_KEYWORDS.indexOf(keyword)
    if (index === -1) {
      return reply("⚠️ *Ce mot-clé n'existe pas !*")
    }

    config.DOWNLOAD_KEYWORDS.splice(index, 1)
    saveStatusConfig(config)

    reply(`✅ *Mot-clé supprimé:* "${keyword}"\n\n📝 Total: ${config.DOWNLOAD_KEYWORDS.length} mots-clés`)
  },
)

// Statistiques
cmd(
  {
    pattern: "statusstats",
    desc: "Statistiques des téléchargements de statuts",
    category: "owner",
    react: "📊",
    filename: __filename,
  },
  async (conn, mek, m, { from, isOwner, reply }) => {
    if (!isOwner) return reply("❌ *Seul le propriétaire peut utiliser cette commande !*")

    try {
      const imageDir = path.join(statusDir, "images")
      const videoDir = path.join(statusDir, "videos")
      const audioDir = path.join(statusDir, "audio")

      const imageCount = fs.existsSync(imageDir)
        ? fs.readdirSync(imageDir).filter((f) => !f.endsWith(".json")).length
        : 0
      const videoCount = fs.existsSync(videoDir)
        ? fs.readdirSync(videoDir).filter((f) => !f.endsWith(".json")).length
        : 0
      const audioCount = fs.existsSync(audioDir)
        ? fs.readdirSync(audioDir).filter((f) => !f.endsWith(".json")).length
        : 0

      const totalCount = imageCount + videoCount + audioCount

      let message = `*📊 STATISTIQUES STATUS DOWNLOADER*\n\n`
      message += `*📁 FICHIERS TÉLÉCHARGÉS:*\n`
      message += `├ 🖼️ Images: ${imageCount}\n`
      message += `├ 🎥 Vidéos: ${videoCount}\n`
      message += `├ 🎵 Audio: ${audioCount}\n`
      message += `└ 📊 Total: ${totalCount}\n\n`

      message += `*💾 EMPLACEMENT:*\n`
      message += `📂 downloads/status/\n\n`

      message += `*🔧 ACTIONS:*\n`
      message += `• \`.statusconfig\` - Configuration\n`
      message += `• \`.cleanstatus\` - Nettoyer les fichiers`

      reply(message)
    } catch (error) {
      reply("❌ *Erreur lors du calcul des statistiques !*")
    }
  },
)

module.exports = {
  loadStatusConfig,
  saveStatusConfig,
  downloadStatus,
}
