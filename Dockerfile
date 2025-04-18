FROM node:22-alpine

RUN apk add --no-cache \
  python3 \
  make \
  g++ \
  cairo-dev \
  pango-dev \
  jpeg-dev \
  giflib-dev \
  pixman-dev \
  pkgconfig


# Crée un dossier de travail
WORKDIR /app

# Copie les fichiers du projet
COPY package.json yarn.lock ./
COPY ./ ./


# Installe les dépendances et build l'app
RUN yarn install 
RUN npx prisma generate
RUN yarn run build

# Expose le port
EXPOSE 3000

# Lance le serveur SvelteKit (production)
CMD ["yarn", "preview", "--port", "3000", "--host", "0.0.0.0"]

