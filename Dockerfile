FROM node:lts-buster

# Crée un dossier de travail propre
WORKDIR /app

# Copie tous les fichiers du projet dans le conteneur
COPY . .

# Installe les dépendances Node.js
RUN npm install

# Expose un port (optionnel, utile pour Render)
EXPOSE 9090

# Démarre le bot
CMD ["npm", "start"]