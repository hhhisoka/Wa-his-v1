
<div align="center">

# ⚔️ Wa-his-v1 - Bot WhatsApp MD ⚔️

<img src="https://files.catbox.moe/jr7hl0.jpg" alt="Wa-his-v1 Logo" width="300">

**Un bot WhatsApp intelligent et puissant utilisant le Pairing Code** 🔐

[![GitHub Stars](https://img.shields.io/github/stars/hhhisoka/Wa-his-v1?style=for-the-badge&logo=github&color=yellow)](https://github.com/hhhisoka/Wa-his-v1/stargazers)
[![GitHub Forks](https://img.shields.io/github/forks/hhhisoka/Wa-his-v1?style=for-the-badge&logo=github&color=orange)](https://github.com/hhhisoka/Wa-his-v1/network/members)
[![License](https://img.shields.io/badge/License-GPL--3.0-blue?style=for-the-badge)](LICENSE)

</div>

---

## 🌟 Fonctionnalités Principales

| Fonctionnalité | Description | Status |
|----------------|-------------|--------|
| 🔐 **Pairing Code** | Connexion sans QR code | ✅ |
| 🤖 **IA Intégrée** | Réponses intelligentes automatiques | ✅ |
| 📥 **Multi-Download** | TikTok, YouTube, Facebook, Instagram | ✅ |
| 🎮 **Jeux & Fun** | Mini-jeux et divertissements | ✅ |
| 👑 **Gestion Groupes** | Administration complète des groupes | ✅ |
| 🎨 **Stickers & Médias** | Création et édition de stickers | ✅ |
| 🛡️ **Anti-Spam** | Protection contre liens et mots interdits | ✅ |
| 🔄 **Auto-Features** | Réponses, statuts, réactions automatiques | ✅ |

---

## 🚀 Déploiement Rapide

### 🎯 Replit (Recommandé)

<div align="center">

[![Deploy to Replit](https://img.shields.io/badge/🚀%20Deploy%20to-Replit-orange?style=for-the-badge&logo=replit&logoColor=white)](https://replit.com/new/github/hhhisoka/Wa-his-v1)

**Déploiement en 1 clic - Gratuit et Facile !**

</div>

#### 📋 Étapes Replit :
1. **Cliquez** sur le bouton "Deploy to Replit" ↗️
2. **Importez** le repository automatiquement
3. **Générez** votre SESSION_ID : [📱 Générateur](https://wa-his-session.onrender.com/)
4. **Configurez** vos variables dans l'onglet "Secrets" 🔒
5. **Lancez** le bot avec le bouton "Run" ▶️

---

### 🔑 Génération du SESSION_ID

<div align="center">

[![Get Session ID](https://img.shields.io/badge/📱%20Générer-SESSION_ID-green?style=for-the-badge&logo=whatsapp&logoColor=white)](https://wa-his-session.onrender.com/)

**Obtenez votre code de jumelage sécurisé**

</div>

#### 🔐 Procédure :
1. Visitez le [générateur de session](https://wa-his-session.onrender.com/)
2. Entrez votre numéro WhatsApp
3. Entrez le code reçu par SMS
4. Copiez votre SESSION_ID généré
5. Gardez-le secret et sécurisé ! ⚠️

---

## ⚙️ Configuration des Variables

### 🔑 Variables Obligatoires

```env
SESSION_ID=Wa-his-v1~votre_session_id_ici
BOT_NAME=『𝙒𝘼・𝙃𝙄𝙎・𝙑𝟭』
PREFIX=.
MODE=public
```

### 🛠️ Variables Optionnelles

```env
AUTO_READ_STATUS=true
AUTO_VOICE=false
AUTO_REPLY=true
AUTO_STICKER=false
ANTI_LINK=true
ANTI_BAD=false
FAKE_RECORDING=true
AUTO_REACT=false
HEART_REACT=false
OWNER_REACT=false
ALIVE_IMG=https://files.catbox.moe/jr7hl0.jpg
ALIVE_MSG=HI DEAR IM ONLINE.!!♻️
```

---

## 🎮 Commandes Populaires

| Commande | Description | Catégorie |
|----------|-------------|-----------|
| `.menu` | Affiche le menu principal | 📋 Main |
| `.alive` | Vérifie si le bot fonctionne | ✅ System |
| `.owner` | Informations du créateur | 👑 Owner |
| `.song <nom>` | Télécharge une chanson | 🎵 Download |
| `.video <nom>` | Télécharge une vidéo | 📹 Download |
| `.tiktok <url>` | Télécharge depuis TikTok | 📱 Download |
| `.sticker` | Convertit image en sticker | 🎨 Media |
| `.weather <ville>` | Météo d'une ville | 🌤️ Tools |

---

## 🏗️ Installation Locale

### 🔧 Prérequis
- Node.js v18+
- Git
- FFmpeg (optionnel)

### 📝 Instructions

```bash
# 1. Cloner le repository
git clone https://github.com/hhhisoka/Wa-his-v1
cd Wa-his-v1

# 2. Installer les dépendances
npm install

# 3. Configurer les variables (.env)
cp .env.example .env
# Éditez .env avec vos informations

# 4. Lancer le bot
npm start
```

---

## 🌍 Autres Plateformes de Déploiement

### 🚂 Railway
[![Deploy on Railway](https://img.shields.io/badge/🚂%20Deploy%20on-Railway-purple?style=for-the-badge&logo=railway&logoColor=white)](https://railway.app)

### 🔮 Render
[![Deploy to Render](https://img.shields.io/badge/🔮%20Deploy%20to-Render-blue?style=for-the-badge&logo=render&logoColor=white)](https://render.com)

### ⚡ Heroku
[![Deploy to Heroku](https://img.shields.io/badge/⚡%20Deploy%20to-Heroku-purple?style=for-the-badge&logo=heroku&logoColor=white)](https://heroku.com/deploy?template=https://github.com/hhhisoka/Wa-his-v1)

### 🎯 Glitch
[![Remix on Glitch](https://img.shields.io/badge/🎯%20Remix%20on-Glitch-pink?style=for-the-badge&logo=glitch&logoColor=white)](https://glitch.com)



---

## 🎯 Modes de Fonctionnement

| Mode | Description | Usage |
|------|-------------|-------|
| `public` | Bot répond à tous | Groupes publics |
| `private` | Propriétaire uniquement | Usage personnel |
| `inbox` | Messages privés seulement | Chat individuel |
| `group` | Groupes uniquement | Administration |

---

## 🔧 Résolution des Problèmes

### ❌ Bot ne se connecte pas
- ✅ Vérifiez votre SESSION_ID
- ✅ Régénérez si nécessaire
- ✅ Vérifiez les variables d'environnement

### 🔄 Bot se déconnecte
- ✅ Redémarrez le service
- ✅ Vérifiez les logs d'erreur
- ✅ Mettez à jour votre SESSION_ID

### 📱 Commandes ne marchent pas
- ✅ Vérifiez le PREFIX (défaut: `.`)
- ✅ Vérifiez le MODE du bot
- ✅ Assurez-vous d'être dans un groupe autorisé

---

## 🤝 Contribuer

Nous accueillons les contributions ! 

1. **Fork** le repository
2. **Créez** votre branche feature (`git checkout -b feature/AmazingFeature`)
3. **Commit** vos changements (`git commit -m 'Add AmazingFeature'`)
4. **Push** sur la branche (`git push origin feature/AmazingFeature`)
5. **Ouvrez** une Pull Request

---

## 📞 Support & Community

<div align="center">

[![WhatsApp Channel](https://img.shields.io/badge/📢%20WhatsApp-Channel-green?style=for-the-badge&logo=whatsapp&logoColor=white)](https://whatsapp.com/channel/0029Vb5u3VX0lwgllCdVTF0G)
[![GitHub Issues](https://img.shields.io/badge/🐛%20Report-Issues-red?style=for-the-badge&logo=github&logoColor=white)](https://github.com/hhhisoka/Wa-his-v1/issues)
[![Telegram Group](https://img.shields.io/badge/💬%20Telegram-Group-blue?style=for-the-badge&logo=telegram&logoColor=white)](https://t.me/hhhisoka)

</div>

---

## 📜 Licence & Crédits

<div align="center">

**GPL-3.0 License** 📄

Ce projet est open-source sous licence GPL-3.0  
Merci de créditer le créateur original **@hhhisoka** 

---

<img src="https://files.catbox.moe/jr7hl0.jpg" alt="Hisoka" width="100">

**⚔️ Créé avec passion par [Hisoka](https://github.com/hhhisoka) — 「 ひそか 」**

[![GitHub](https://img.shields.io/badge/GitHub-hhhisoka-black?style=for-the-badge&logo=github)](https://github.com/hhhisoka)
[![WhatsApp](https://img.shields.io/badge/WhatsApp-Contact-green?style=for-the-badge&logo=whatsapp)](https://wa.me/2250104610403)

</div>

---

<div align="center">

### 🌟 Si ce projet vous aide, donnez-lui une étoile ! ⭐

**Dernière mise à jour : Juillet 2025** 📅

</div>