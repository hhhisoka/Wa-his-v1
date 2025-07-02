/**
 * Gestionnaire avancé de présence
 */

const config = require("../config")
const { cmd } = require("../command")

// Variables globales pour gérer les timers
const presenceTimer = null
let lastPresenceUpdate = 0

//=============GESTIONNAIRE DE PRÉSENCE AVANCÉ=======
cmd(
  {
    on: "body",
  },
  async (conn, mek, m, { from, body, isOwner }) => {
    const now = Date.now()

    // Éviter les mises à jour trop fréquentes
    if (now - lastPresenceUpdate < Number.parseInt(config.PRESENCE_UPDATE_DELAY || 3000)) {
      return
    }

    try {
      // Priorité des statuts (du plus important au moins important)
      if (config.ALWAYS_OFFLINE === "true") {
        await conn.sendPresenceUpdate("unavailable", from)
        console.log("🔴 Statut: Hors ligne")
      } else if (config.ALWAYS_RECORDING === "true") {
        await conn.sendPresenceUpdate("recording", from)
        console.log("🎤 Statut: En enregistrement")
      } else if (config.ALWAYS_TYPING === "true") {
        await conn.sendPresenceUpdate("composing", from)
        console.log("⌨️ Statut: En train d'écrire")
      } else if (config.ALWAYS_ONLINE === "true") {
        await conn.sendPresenceUpdate("available", from)
        console.log("🟢 Statut: En ligne")
      } else if (config.SMART_PRESENCE === "true") {
        // Logique intelligente basée sur le contenu du message
        await handleSmartPresence(conn, mek, from)
      }

      lastPresenceUpdate = now
    } catch (error) {
      console.log("❌ Erreur gestionnaire de présence:", error)
    }
  },
)

//=============PRÉSENCE INTELLIGENTE=======
async function handleSmartPresence(conn, mek, from) {
  const messageType = Object.keys(mek.message)[0]
  const delay = Number.parseInt(config.READ_MESSAGE_DELAY || 1000)

  switch (messageType) {
    case "conversation":
    case "extendedTextMessage":
      // Simuler la frappe pour les messages texte
      await conn.sendPresenceUpdate("composing", from)
      setTimeout(async () => {
        await conn.sendPresenceUpdate("paused", from)
      }, delay * 2)
      break

    case "audioMessage":
      // Simuler l'écoute pour les messages audio
      await conn.sendPresenceUpdate("recording", from)
      setTimeout(async () => {
        await conn.sendPresenceUpdate("available", from)
      }, delay * 3)
      break

    case "imageMessage":
    case "videoMessage":
    case "documentMessage":
      // Simuler la visualisation pour les médias
      await conn.sendPresenceUpdate("available", from)
      setTimeout(async () => {
        await conn.sendPresenceUpdate("composing", from)
      }, delay)
      break

    default:
      await conn.sendPresenceUpdate("available", from)
  }

  console.log(`🤖 Smart Presence: ${messageType}`)
}

//=============LECTURE AUTOMATIQUE AVEC DÉLAI=======
cmd(
  {
    on: "body",
  },
  async (conn, mek, m, { from, body, isOwner }) => {
    // Auto read avec délai réaliste
    if (config.AUTO_READ_MESSAGES === "true") {
      const delay = Number.parseInt(config.READ_MESSAGE_DELAY || 1000)

      setTimeout(async () => {
        try {
          await conn.readMessages([mek.key])
          console.log("✅ Message lu automatiquement")
        } catch (error) {
          console.log("❌ Erreur lecture auto:", error)
        }
      }, delay)
    }
  },
)

//=============NETTOYAGE DES TIMERS=======
process.on("SIGINT", () => {
  if (presenceTimer) {
    clearInterval(presenceTimer)
  }
  console.log("🧹 Timers nettoyés")
  process.exit(0)
})

module.exports = { handleSmartPresence }
