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

const fs = require("fs")
const path = require("path")
const config = require("../config")
const { cmd, commands } = require("../command")

//=============AUTO READ STATUS=======
cmd(
  {
    on: "body",
  },
  async (conn, mek, m, { from, body, isOwner }) => {
    // Auto read status functionality
    if (mek.key && mek.key.remoteJid === "status@broadcast") {
      if (config.AUTO_READ_STATUS === "true") {
        try {
          await conn.readMessages([mek.key])
          console.log("✅ Status lu automatiquement")
        } catch (error) {
          console.log("❌ Erreur lors de la lecture du status:", error)
        }
      }
    }
  },
)

//=============ALWAYS OFFLINE=======
cmd(
  {
    on: "body",
  },
  async (conn, mek, m, { from, body, isOwner }) => {
    // Always offline functionality
    if (config.ALWAYS_OFFLINE === "true") {
      try {
        // Maintenir le statut hors ligne
        await conn.sendPresenceUpdate("unavailable", from)
      } catch (error) {
        console.log("❌ Erreur lors du maintien du statut offline:", error)
      }
    }
  },
)

//=============AUTO READ ALL MESSAGES=======
cmd(
  {
    on: "body",
  },
  async (conn, mek, m, { from, body, isOwner }) => {
    // Auto read all messages functionality
    if (config.AUTO_READ_MESSAGES === "true") {
      try {
        // Marquer le message comme lu
        await conn.readMessages([mek.key])
      } catch (error) {
        console.log("❌ Erreur lors de la lecture automatique:", error)
      }
    }
  },
)

//=============ALWAYS TYPING=======
cmd(
  {
    on: "body",
  },
  async (conn, mek, m, { from, body, isOwner }) => {
    // Always typing functionality
    if (config.ALWAYS_TYPING === "true") {
      try {
        // Maintenir le statut "en train d'écrire"
        await conn.sendPresenceUpdate("composing", from)
      } catch (error) {
        console.log("❌ Erreur lors du maintien du statut typing:", error)
      }
    }
  },
)

//=============ALWAYS RECORDING=======
cmd(
  {
    on: "body",
  },
  async (conn, mek, m, { from, body, isOwner }) => {
    // Always recording functionality
    if (config.ALWAYS_RECORDING === "true") {
      try {
        // Maintenir le statut "en train d'enregistrer"
        await conn.sendPresenceUpdate("recording", from)
      } catch (error) {
        console.log("❌ Erreur lors du maintien du statut recording:", error)
      }
    }
  },
)

//=============SMART PRESENCE=======
cmd(
  {
    on: "body",
  },
  async (conn, mek, m, { from, body, isOwner }) => {
    // Smart presence - change selon le type de message
    if (config.SMART_PRESENCE === "true") {
      try {
        const messageType = Object.keys(mek.message)[0]

        switch (messageType) {
          case "conversation":
          case "extendedTextMessage":
            await conn.sendPresenceUpdate("composing", from)
            break
          case "audioMessage":
            await conn.sendPresenceUpdate("recording", from)
            break
          case "imageMessage":
          case "videoMessage":
            await conn.sendPresenceUpdate("composing", from)
            break
          default:
            await conn.sendPresenceUpdate("available", from)
        }
      } catch (error) {
        console.log("❌ Erreur Smart Presence:", error)
      }
    }
  },
)
