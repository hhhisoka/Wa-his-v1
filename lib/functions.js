const axios = require('axios');

// Fonction pour récupérer un buffer depuis une URL
const getBuffer = async (url, options) => {
  try {
    options = options || {};
    var response = await axios({
      method: 'get',
      url: url,
      headers: {
        'DNT': 1,
        'Upgrade-Insecure-Request': 1
      },
      ...options,
      responseType: 'arraybuffer'
    });
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

// Fonction pour obtenir les admins d'un groupe
const getGroupAdmins = (participants) => {
  var admins = [];
  for (let participant of participants) {
    if (participant.admin !== null) {
      admins.push(participant.id);
    }
  }
  return admins;
};

// Fonction pour générer un nombre aléatoire avec un suffixe
const getRandom = (suffix) => {
  return '' + Math.floor(Math.random() * 10000) + suffix;
};

// Fonction pour convertir les nombres en format lisible (K, M, B, etc.)
const h2k = (number) => {
  var suffixes = ['', 'K', 'M', 'B', 'T', 'P', 'E'];
  var tier = Math.log10(Math.abs(number)) / 3 | 0;
  
  if (tier == 0) return number;
  
  var suffix = suffixes[tier];
  var scale = Math.pow(10, tier * 3);
  var scaled = number / scale;
  var formatted = scaled.toFixed(1);
  
  if (/\.0$/.test(formatted)) {
    formatted = formatted.substr(0, formatted.length - 2);
  }
  
  return formatted + suffix;
};

// Fonction pour vérifier si une chaîne est une URL
const isUrl = (string) => {
  return string.match(new RegExp(/https?:\/\/(www\.)?[-a-zA-Z0-9@:%.+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%+.~#?&/=]*)/, 'gi'));
};

// Fonction pour convertir en JSON formaté
const Json = (object) => {
  return JSON.stringify(object, null, 2);
};

// Fonction pour calculer le temps d'exécution en format lisible
const runtime = (seconds) => {
  seconds = Number(seconds);
  
  var days = Math.floor(seconds / (3600 * 24));
  var hours = Math.floor(seconds % (3600 * 24) / 3600);
  var minutes = Math.floor(seconds % 3600 / 60);
  var remainingSeconds = Math.floor(seconds % 60);
  
  var daysString = days > 0 ? days + (days == 1 ? ' day, ' : ' days, ') : '';
  var hoursString = hours > 0 ? hours + (hours == 1 ? ' hour, ' : ' hours, ') : '';
  var minutesString = minutes > 0 ? minutes + (minutes == 1 ? ' minute, ' : ' minutes, ') : '';
  var secondsString = remainingSeconds > 0 ? remainingSeconds + (remainingSeconds == 1 ? ' second' : ' seconds') : '';
  
  return daysString + hoursString + minutesString + secondsString;
};

// Fonction pour créer une pause/délai
const sleep = async (milliseconds) => {
  return new Promise(resolve => setTimeout(resolve, milliseconds));
};

// Fonction pour récupérer des données JSON depuis une URL
const fetchJson = async (url, options) => {
  try {
    options = options || {};
    const response = await axios({
      method: 'GET',
      url: url,
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/95.0.4638.69 Safari/537.36'
      },
      ...options
    });
    return response.data;
  } catch (error) {
    return error;
  }
};

// ✅ NOUVELLES FONCTIONS AJOUTÉES

// Fonction pour détecter le type de message de manière robuste
const getMessageType = (message) => {
  if (!message) return 'unknown';
  
  if (message.imageMessage) return 'imageMessage';
  if (message.videoMessage) return 'videoMessage';
  if (message.audioMessage) return 'audioMessage';
  if (message.stickerMessage) return 'stickerMessage';
  if (message.documentMessage) return 'documentMessage';
  if (message.conversation) return 'conversation';
  if (message.extendedTextMessage) return 'extendedTextMessage';
  if (message.viewOnceMessage) return 'viewOnceMessage';
  if (message.reactionMessage) return 'reactionMessage';
  if (message.contactMessage) return 'contactMessage';
  if (message.locationMessage) return 'locationMessage';
  
  return 'unknown';
};

// Fonction pour vérifier si un message est un view once
const isViewOnce = (message) => {
  if (!message) return false;
  return !!(message.viewOnceMessage || message.viewOnceMessageV2 || message.viewOnceMessageV2Extension);
};

// Fonction pour vérifier si un message provient d'un status
const isStatusMessage = (key) => {
  if (!key || !key.remoteJid) return false;
  return key.remoteJid === 'status@broadcast' || key.remoteJid.includes('status@broadcast');
};

// Fonction pour extraire le contenu d'un message view once
const extractViewOnceContent = (message) => {
  if (!message || !message.viewOnceMessage) return null;
  
  const viewOnceMsg = message.viewOnceMessage.message;
  const messageType = Object.keys(viewOnceMsg)[0];
  
  return {
    type: messageType,
    content: viewOnceMsg[messageType],
    caption: viewOnceMsg[messageType]?.caption || ''
  };
};

// Fonction pour formater les erreurs de manière lisible
const formatError = (error) => {
  if (typeof error === 'string') return error;
  if (error.message) return error.message;
  if (error.error) return error.error;
  return JSON.stringify(error);
};

// Fonction pour valider un numéro de téléphone
const isValidPhoneNumber = (number) => {
  const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
  return phoneRegex.test(number.replace(/\s/g, ''));
};

// Fonction pour nettoyer un numéro de téléphone
const cleanPhoneNumber = (number) => {
  return number.replace(/[^\d]/g, '');
};

// Fonction pour vérifier si une chaîne contient des caractères spéciaux dangereux
const containsUnsafeChars = (text) => {
  const unsafeChars = /<script|javascript:|data:|vbscript:|onload=|onerror=/i;
  return unsafeChars.test(text);
};

// Fonction pour limiter la longueur d'un texte
const truncateText = (text, maxLength = 100) => {
  if (!text || text.length <= maxLength) return text;
  return text.substring(0, maxLength) + '...';
};

// Fonction pour générer un ID unique
const generateUniqueId = () => {
  return Date.now().toString(36) + Math.random().toString(36).substr(2);
};

module.exports = {
  'getBuffer': getBuffer,
  'getGroupAdmins': getGroupAdmins,
  'getRandom': getRandom,
  'h2k': h2k,
  'isUrl': isUrl,
  'Json': Json,
  'runtime': runtime,
  'sleep': sleep,
  'fetchJson': fetchJson,
  // ✅ Nouvelles fonctions
  'getMessageType': getMessageType,
  'isViewOnce': isViewOnce,
  'isStatusMessage': isStatusMessage,
  'extractViewOnceContent': extractViewOnceContent,
  'formatError': formatError,
  'isValidPhoneNumber': isValidPhoneNumber,
  'cleanPhoneNumber': cleanPhoneNumber,
  'containsUnsafeChars': containsUnsafeChars,
  'truncateText': truncateText,
  'generateUniqueId': generateUniqueId
};
