
# 🚀 Guide de Déploiement Wa-his-v1

## 📋 Table des Matières
- [Prérequis](#prérequis)
- [Génération de SESSION_ID](#génération-de-session_id)
- [Méthodes de Déploiement](#méthodes-de-déploiement)
  - [Replit (Recommandé)](#1-replit-recommandé)
  - [Railway](#2-railway)
  - [Autres Plateformes](#3-autres-plateformes)
- [Configuration des Variables](#configuration-des-variables)
- [Résolution des Problèmes](#résolution-des-problèmes)

---

## ⚡ Prérequis

Avant de commencer le déploiement, assurez-vous d'avoir :
- Un compte WhatsApp actif
- Un accès à votre téléphone pour scanner le QR code
- Votre SESSION_ID généré (voir section suivante)

---

## 🔑 Génération de SESSION_ID

**🎯 Étape Obligatoire** : Obtenez votre SESSION_ID avant le déploiement

### 🌐 Méthode Recommandée
1. **Visitez** : [https://wa-his-session.onrender.com/](https://wa-his-session.onrender.com/)
2. **Scannez le QR code** avec WhatsApp Web
3. **Copiez** votre SESSION_ID généré
4. **Gardez-le** précieusement pour la configuration

> ⚠️ **Important** : Ne partagez jamais votre SESSION_ID publiquement !

---

## 🌟 Méthodes de Déploiement

### 1. 🔧 Replit (Recommandé)

#### ✅ Avantages
- ✨ Déploiement en 1 clic
- 🔄 Mise à jour automatique
- 💰 Gratuit pour commencer
- 🛠️ Interface simple

#### 📝 Instructions
1. **Cliquez** sur le bouton : [![Deploy to Replit](https://replit.com/badge/github/hhhisoka/Wa-his-v1)](https://replit.com/new/github/hhhisoka/Wa-his-v1)

2. **Importez le repository** :
   ```
   https://github.com/hhhisoka/Wa-his-v1
   ```

3. **Configurez les variables d'environnement** :
   - Ouvrez l'onglet "Secrets" (🔒)
   - Ajoutez votre `SESSION_ID`
   - Configurez les autres variables selon vos besoins

4. **Lancez le bot** :
   - Cliquez sur "Run" ▶️
   - Attendez que le bot se connecte
   - ✅ Votre bot est en ligne !

---

### 2. 🚂 Railway

#### ✅ Avantages
- 🚀 Déploiement rapide
- 🔄 Auto-redémarrage
- 📊 Monitoring intégré
- 💳 5$ de crédit gratuit

#### 📝 Instructions

1. **Créez un compte** sur [Railway.app](https://railway.app)

2. **Nouveau projet** :
   - Cliquez sur "New Project"
   - Sélectionnez "Deploy from GitHub repo"
   - Connectez votre GitHub

3. **Importez le repository** :
   ```
   https://github.com/hhhisoka/Wa-his-v1
   ```

4. **Variables d'environnement** :
   - Allez dans l'onglet "Variables"
   - Ajoutez les variables suivantes :
   
   ```env
   SESSION_ID=votre_session_id_ici
   BOT_NAME=Wa-his-v1
   PREFIX=.
   MODE=public
   AUTO_READ_STATUS=true
   AUTO_VOICE=false
   AUTO_REPLY=true
   ANTI_LINK=true
   PORT=9090
   ```

5. **Déploiement** :
   - Railway détectera automatiquement Node.js
   - Le déploiement se lance automatiquement
   - ✅ Votre bot sera en ligne en quelques minutes !

6. **Domain personnalisé** (optionnel) :
   - Allez dans "Settings" > "Domains"
   - Générez un domaine gratuit `.railway.app`

---

### 3. 🌐 Autres Plateformes

#### Heroku
- 📋 Utilisez le fichier `app.json` fourni
- ⚙️ Variables via dashboard Heroku
- 💰 Plan gratuit limité

#### Render
- 🔗 Connectez votre GitHub
- 📄 Build automatique détecté
- 🔧 Variables dans "Environment"

#### Glitch
- 📥 Import depuis GitHub
- 📝 Éditeur en ligne disponible
- 🔄 Redémarrage automatique

---

## ⚙️ Configuration des Variables

### 🔑 Variables Obligatoires
```env
SESSION_ID=votre_session_id_ici          # Obtenu depuis wa-his-session.onrender.com
BOT_NAME=Wa-his-v1                       # Nom de votre bot
PREFIX=.                                 # Préfixe des commandes
MODE=public                              # public/private/inbox/group
```

### 🛠️ Variables Optionnelles
```env
AUTO_READ_STATUS=true                    # Lecture auto des statuts
AUTO_VOICE=false                         # Messages vocaux auto
AUTO_REPLY=true                          # Réponses automatiques
AUTO_STICKER=false                       # Stickers automatiques
ANTI_LINK=true                          # Anti-liens de groupe
ANTI_BAD=false                          # Anti-mots interdits
FAKE_RECORDING=true                     # Faux enregistrement
AUTO_REACT=false                        # Réactions automatiques
HEART_REACT=false                       # Réactions cœur uniquement
OWNER_REACT=false                       # Réactions du propriétaire
```

### 🎨 Variables de Personnalisation
```env
ALIVE_IMG=https://files.catbox.moe/jr7hl0.jpg     # Image du message "alive"
ALIVE_MSG=HI DEAR IM ONLINE.!!♻️                   # Message "alive"
STICKER_DATA=『𝙒𝘼・𝙃𝙄𝙎・𝙑𝟭』                     # Pack de stickers
```

---

## 🔧 Résolution des Problèmes

### ❌ Bot ne se connecte pas
1. **Vérifiez votre SESSION_ID** :
   - Format correct : `Wa-his-v1~fileId#hash`
   - Régénérez si nécessaire

2. **Variables d'environnement** :
   - Toutes les variables obligatoires sont définies
   - Pas d'espaces dans les valeurs

### 🔄 Bot se déconnecte
1. **Redémarrez le service**
2. **Vérifiez les logs** pour les erreurs
3. **Régénérez SESSION_ID** si nécessaire

### 🐛 Commandes ne fonctionnent pas
1. **Vérifiez le PREFIX** dans les variables
2. **Mode du bot** (public/private)
3. **Autorisations** dans les groupes

### 📱 Problèmes de SESSION_ID
1. **Visitez** : [https://wa-his-session.onrender.com/](https://wa-his-session.onrender.com/)
2. **Scannez à nouveau** le QR code
3. **Remplacez** l'ancien SESSION_ID

---

## 📞 Support

### 🆘 Besoin d'aide ?
- 📂 **GitHub Issues** : [Signaler un problème](https://github.com/hhhisoka/Wa-his-v1/issues)
- 📢 **Canal WhatsApp** : [Rejoindre](https://whatsapp.com/channel/0029Vb5u3VX0lwgllCdVTF0G)
- 👑 **Contact Développeur** : [hhhisoka](https://github.com/hhhisoka)

---

## ⭐ Recommandations

### 🥇 Pour Débutants
- **Utilisez Replit** : Interface la plus simple
- **Suivez le guide** étape par étape
- **Testez** d'abord en mode privé

### 🏆 Pour Utilisateurs Avancés
- **Railway** : Meilleure performance
- **Variables personnalisées** selon vos besoins
- **Monitoring** des logs et performances

---

*🔥 Créé avec passion par [hhhisoka](https://github.com/hhhisoka)*
