## Setup

### Instralation du projet
```bash
git clone ...
cd ... 
yarn install
```

### Postgress
Installer postgresql

Créer une base de donnée:
```bash 
createdb -h localhost -p 5432 -U <Votre nom d'ulitisateur> tvleo 
```

### Env
copier le .env.example en .env et remplir les champs  
surtour le DATABASE_URL  

### Setup Prisma 
```bash
yarn prisma migrate dev
```

## Developpement
```bash
yarn run dev
```

## Acceder a la base de données
```bash
npx prisma studio
```
Ouais des images !