FROM node:22-alpine

# Crée un dossier de travail
WORKDIR /app

# Copie les fichiers du projet
COPY ./ ./

# Installe les dépendances et build l'app
RUN yarn install && yarn run build

# Expose le port
EXPOSE 3000

# Lance le serveur SvelteKit (production)
CMD ["yarn", "preview", "--port", "3000", "--host"]

