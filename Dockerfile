# Dockerfile pour l'application React
FROM node:14

# Définir le répertoire de travail
WORKDIR /usr/src/app

# Copier package.json et package-lock.json
COPY package*.json ./

# Installer les dépendances
RUN npm install

# Copier le reste du code de l'application
COPY . .

# Construire l'application pour la production
RUN npm run build

# Installer un serveur web simple pour servir les fichiers statiques
RUN npm install -g serve

# Exposer le port
EXPOSE 3000

# Démarrer le serveur
CMD ["serve", "-s", "build"]

