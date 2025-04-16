FROM node:20

# Crée un dossier de travail
WORKDIR /app

# Copie les fichiers du projet
COPY app/ ./

# Installe les dépendances et build l'app
RUN npm install && npm run build

# Expose le port
EXPOSE 3000

# Lance le serveur SvelteKit (production)
CMD ["node", "build"]

