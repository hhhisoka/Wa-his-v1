const { cmd, commands } = require("../command")
const {
  getBuffer,
  getGroupAdmins,
  getRandom,
  h2k,
  isUrl,
  Json,
  runtime,
  sleep,
  fetchJson,
} = require("../lib/functions")
const { Sticker, createSticker, StickerTypes } = require("wa-sticker-formatter")
const config = require("../config") // Declare the config variable

cmd(
  {
    pattern: "sticker",
    alias: ["s", "stiker"],
    desc: "Convert image/video to sticker",
    category: "convert",
    react: "🎨",
    filename: __filename,
  },
  async (
    conn,
    mek,
    m,
    {
      from,
      quoted,
      body,
      isCmd,
      command,
      args,
      q,
      isGroup,
      sender,
      senderNumber,
      botNumber2,
      botNumber,
      pushname,
      isMe,
      isOwner,
      groupMetadata,
      groupName,
      participants,
      groupAdmins,
      isBotAdmins,
      isAdmins,
      reply,
    },
  ) => {
    try {
      const isQuotedViewOnce = m.quoted ? m.quoted.type === "viewOnceMessage" : false
      const isQuotedImage = m.quoted
        ? m.quoted.type === "imageMessage" || (isQuotedViewOnce ? m.quoted.msg.type === "imageMessage" : false)
        : false
      const isQuotedVideo = m.quoted
        ? m.quoted.type === "videoMessage" || (isQuotedViewOnce ? m.quoted.msg.type === "videoMessage" : false)
        : false
      const isQuotedSticker = m.quoted ? m.quoted.type === "stickerMessage" : false

      if (m.type === "imageMessage" || isQuotedImage) {
        const nameJpg = getRandom("")
        const buff = await m.download(nameJpg)
        const stickerFromImg = await createSticker(buff, {
          pack: config.STICKER_DATA.split(";")[0],
          author: config.STICKER_DATA.split(";")[1],
          type: StickerTypes.FULL,
          categories: ["🤩", "🎉"],
          id: "12345",
          quality: 70,
          background: "transparent",
        })
        await conn.sendMessage(from, { sticker: stickerFromImg }, { quoted: mek })
      } else if (m.type === "videoMessage" || isQuotedVideo) {
        const nameJpg = getRandom("")
        const buff = await m.download(nameJpg)
        const stickerFromVid = await createSticker(buff, {
          pack: config.STICKER_DATA.split(";")[0],
          author: config.STICKER_DATA.split(";")[1],
          type: StickerTypes.FULL,
          categories: ["🤩", "🎉"],
          id: "12345",
          quality: 70,
        })
        await conn.sendMessage(from, { sticker: stickerFromVid }, { quoted: mek })
      } else {
        reply("*Reply to an image or video!*")
      }
    } catch (e) {
      console.log(e)
      reply(`Error: ${e}`)
    }
  },
)

cmd(
  {
    pattern: "toimg",
    alias: ["img"],
    desc: "Convert sticker to image",
    category: "convert",
    react: "🖼️",
    filename: __filename,
  },
  async (conn, mek, m, { from, quoted, reply }) => {
    try {
      const isQuotedSticker = m.quoted ? m.quoted.type === "stickerMessage" : false

      if (!isQuotedSticker) return reply("*Reply to a sticker!*")

      const buff = await m.quoted.download()
      await conn.sendMessage(from, { image: buff }, { quoted: mek })
    } catch (e) {
      console.log(e)
      reply(`Error: ${e}`)
    }
  },
)

cmd(
  {
    pattern: "take",
    desc: "Steal sticker and change pack info",
    category: "convert",
    react: "🥷",
    filename: __filename,
  },
  async (conn, mek, m, { from, quoted, args, reply }) => {
    try {
      const isQuotedSticker = m.quoted ? m.quoted.type === "stickerMessage" : false

      if (!isQuotedSticker) return reply("*Reply to a sticker!*")

      const packname = args[0] || config.STICKER_DATA.split(";")[0]
      const author = args[1] || config.STICKER_DATA.split(";")[1]

      const buff = await m.quoted.download()
      const stickerFromImg = await createSticker(buff, {
        pack: packname,
        author: author,
        type: StickerTypes.FULL,
        categories: ["🤩", "🎉"],
        id: "12345",
        quality: 70,
        background: "transparent",
      })
      await conn.sendMessage(from, { sticker: stickerFromImg }, { quoted: mek })
    } catch (e) {
      console.log(e)
      reply(`Error: ${e}`)
    }
  },
)

cmd(
  {
    pattern: "attp",
    desc: "Create animated text sticker",
    category: "convert",
    react: "✨",
    filename: __filename,
  },
  async (conn, mek, m, { from, args, reply }) => {
    try {
      if (!args[0]) return reply("*Please provide text!*\nExample: .attp Hello World")

      const text = args.join(" ")
      const apiUrl = `https://api.xteam.xyz/attp?file&text=${encodeURIComponent(text)}`

      const stickerFromImg = await createSticker(apiUrl, {
        pack: config.STICKER_DATA.split(";")[0],
        author: config.STICKER_DATA.split(";")[1],
        type: StickerTypes.FULL,
        categories: ["🤩", "🎉"],
        id: "12345",
        quality: 70,
      })
      await conn.sendMessage(from, { sticker: stickerFromImg }, { quoted: mek })
    } catch (e) {
      console.log(e)
      reply(`Error: ${e}`)
    }
  },
)

cmd(
  {
    pattern: "ttp",
    desc: "Create text sticker",
    category: "convert",
    react: "📝",
    filename: __filename,
  },
  async (conn, mek, m, { from, args, reply }) => {
    try {
      if (!args[0]) return reply("*Please provide text!*\nExample: .ttp Hello World")

      const text = args.join(" ")
      const apiUrl = `https://api.xteam.xyz/ttp?file&text=${encodeURIComponent(text)}`

      const stickerFromImg = await createSticker(apiUrl, {
        pack: config.STICKER_DATA.split(";")[0],
        author: config.STICKER_DATA.split(";")[1],
        type: StickerTypes.FULL,
        categories: ["🤩", "🎉"],
        id: "12345",
        quality: 70,
        background: "transparent",
      })
      await conn.sendMessage(from, { sticker: stickerFromImg }, { quoted: mek })
    } catch (e) {
      console.log(e)
      reply(`Error: ${e}`)
    }
  },
)
